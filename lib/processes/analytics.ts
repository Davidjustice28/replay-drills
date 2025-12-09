import { db } from "@/db/drizzle"
import { drillObjectionAnswers, drillObjections, drillSessions, users  } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"
import { AnalyticsData, DrillObjectionAnswerModel, DrillSessionModel, ObjectionStats, Performer } from "../types"


export const getAnalyticsData = async (drill_id: string): Promise<AnalyticsData | null> => {
  try {

    const sessions = await db.select()
    .from(drillSessions)
    .leftJoin(drillObjectionAnswers, eq(drillSessions.id, drillObjectionAnswers.drill_session_id))
    
    const objections = await db.select().from(drillObjections).where(eq(drillObjections.drill_id, drill_id))
    const performers = await db.select().from(users).where(inArray(users.id, sessions.map(s => s.drill_sessions.user_id)))
    const initialData = sessions.reduce((acc, curr) => {
      if (!acc[curr.drill_sessions.id]) acc[curr.drill_sessions.id] = { data: curr.drill_sessions, answers:[]}
      if (curr.drill_objection_answers) acc[curr.drill_sessions.id].answers.push(curr.drill_objection_answers)
      
      return acc
    }, {} as Record<string, { data: DrillSessionModel, answers:DrillObjectionAnswerModel[]}>)
    const sessionsWithAnswer = Object.values(initialData)
  
    const sanitizedSessionData = sessionsWithAnswer
    .map(({data}) => ({ duration: data.duration!, score: data.score, user: performers.find(p => p.id === data.user_id)!}))
    .sort((a, b) => a.score - b.score)
  
    let totalScore = 0
    let totalDuration = 0
    let count = 0
    for (const {score, duration} of sanitizedSessionData) {
      if (score !== null) {
        count++
        totalScore += score
      }
      if (duration !== null) {
        totalDuration += duration
      }
    }
    const averageScore = count > 0 ? totalScore / count : 0
    const averageDurationMs = sanitizedSessionData.length > 0 ? totalDuration / sanitizedSessionData.length : 0
  
    const halfOfPerformers = Math.round(performers.length / 2)
    let topPerformers: Performer[] = []
    let worsePerformers: Performer[] = []
  
    if (halfOfPerformers) {
      topPerformers = sanitizedSessionData.slice(-halfOfPerformers).map(({user}) => {
        const userSessions = sessions.filter(s => s.drill_sessions.user_id === user.id)
        return {
          name: user.name,
          attempts: userSessions.length,
          highestScore: Math.max(...userSessions.map(s => s.drill_sessions.score)),
          lastSessionMs: Math.min(...userSessions.map(s => s.drill_sessions.date_started.getTime()))
        }
      })
  
      worsePerformers = sanitizedSessionData.slice(0, halfOfPerformers).map(({user}) => {
        const userSessions = sessions.filter(s => s.drill_sessions.user_id === user.id)
        return {
          name: user.name,
          attempts: userSessions.length,
          highestScore: Math.max(...userSessions.map(s => s.drill_sessions.score)),
          lastSessionMs: Math.min(...userSessions.map(s => s.drill_sessions.date_started.getTime()))
        }
      })
    }
  
    const answers = sessionsWithAnswer.flatMap(s => s.answers)
    const objectionStats: ObjectionStats[] = []
    
    for (const objection of objections) {
      const objectionAnswers = answers.filter(a => a.drill_objection_id === objection.id)
      let total = 0
      let validAnswers = 0
      for (const {score} of objectionAnswers) {
        if (score !== null) {
          validAnswers++
          total += score
        }
      }
  
      const objectionScore  = validAnswers > 0 ? totalScore / validAnswers : 0
  
      objectionStats.push({
        averageScore: Math.round(objectionScore),
        objection: objection.objection,
        attempts: sanitizedSessionData.length
      })
    }
  
    const result = {
      topPerformers,
      worsePerformers,
      averageDurationMs,
      objectionStats,
      numOfLearners: performers.length,
      averageScore: Math.round(averageScore)
    }
    return result
  } catch (e) {
    console.error('Unexpected error loading objection analytics: ', e)
    return null
  }
}