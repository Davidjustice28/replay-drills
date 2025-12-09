import { db } from "@/db/drizzle"
import { drillObjectionAnswers, drillObjections, drillSessions, users  } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"
import { AnalyticsData, DrillObjectionAnswerModel, DrillSessionModel, ObjectionStats, Performer, ScoreDistribution, ScoreTrend } from "../types"

const getScoreAsPercentage = (n: number) => Math.round((n / 10) * 100)
const parseDate = (d: Date) => {
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  const day = d.getDate()
  return `${month}-${day}-${year}`
}
export const getAnalyticsData = async (drill_id: string): Promise<AnalyticsData | null> => {
  try {

    const sessions = await db.select()
    .from(drillSessions)
    .leftJoin(drillObjectionAnswers, eq(drillSessions.id, drillObjectionAnswers.drill_session_id))
    .where(eq(drillSessions.drill_id, drill_id))
  
    const objections = await db.select().from(drillObjections).where(eq(drillObjections.drill_id, drill_id))
    const performers = await db.select().from(users).where(inArray(users.id, sessions.map(s => s.drill_sessions.user_id)))
    const initialData = sessions.reduce((acc, curr) => {
      if (!acc[curr.drill_sessions.id]) acc[curr.drill_sessions.id] = { data: curr.drill_sessions, answers:[]}
      if (curr.drill_objection_answers) acc[curr.drill_sessions.id].answers.push(curr.drill_objection_answers)
      
      return acc
    }, {} as Record<string, { data: DrillSessionModel, answers:DrillObjectionAnswerModel[]}>)
    const sessionsWithAnswer = Object.values(initialData)
  
    const sanitizedSessionData = sessionsWithAnswer
    .map(({data}) => ({ date: data.date_started, duration: data.duration!, score: data.score, user: performers.find(p => p.id === data.user_id)!}))
    .sort((a, b) => a.score - b.score)

    const trends: ScoreTrend[] = []
    const distribution: ScoreDistribution = {
      "0–20": 0,
      "21–40": 0,
      "41–60": 0,
      "61–80": 0,
      "81–100": 0,
    }

    let totalScore = 0
    let totalDuration = 0
    let count = 0
    for (const {score, duration, date} of sanitizedSessionData) {
      if (score !== null) {
        count++
        totalScore += score
        const scoreDateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
        const percentage = getScoreAsPercentage(score)
        const existingTrendIdx = trends.findIndex((t) => t.date === scoreDateStr)
        if (existingTrendIdx === -1) {
          trends.push({date: scoreDateStr, score: percentage})
        } else {
          if (percentage > trends[existingTrendIdx].score) trends[existingTrendIdx].score = percentage
        }
        if (percentage < 21) {
          distribution['0–20']++
        } else if (percentage < 41) {
          distribution['21–40']++
        } else if (percentage < 61) {
          distribution['41–60']++
        } else if (percentage < 81) {
          distribution['61–80']++
        } else {
          distribution['81–100']++
        }
      }
      if (duration !== null) {
        totalDuration += duration
      }
    }
    let lastDate = trends.length ? trends[trends.length -1].date : parseDate(new Date())
    while(trends.length < 5) {
      const nextDate = new Date(lastDate)
      const dayOfMonth = nextDate.getDate() + 1
      nextDate.setDate(dayOfMonth)
      lastDate = parseDate(nextDate)
      trends.push({date: `${nextDate.getMonth() + 1}-${nextDate.getDate()}-${nextDate.getFullYear()}`, score: 0})
    }

    const averageScore = Math.round((count > 0 ? totalScore / count : 0))
    const averageDurationMs = sanitizedSessionData.length > 0 ? totalDuration / sanitizedSessionData.length : 0
  
    const halfOfPerformers = Math.round(performers.length / 2)
    let topPerformers: Performer[] = []
    let worsePerformers: Performer[] = []
  
    if (halfOfPerformers) {
      topPerformers = sanitizedSessionData.slice(-halfOfPerformers).map(({user}) => {
        const userSessions = sessions.filter(s => s.drill_sessions.user_id === user.id)
        const topScore = Math.max(...userSessions.map(s => s.drill_sessions.score))
        return {
          name: user.name,
          attempts: userSessions.length,
          highestScore: getScoreAsPercentage(topScore),
          lastSessionMs: Math.min(...userSessions.map(s => s.drill_sessions.date_started.getTime()))
        }
      })
  
      worsePerformers = sanitizedSessionData.slice(0, halfOfPerformers).map(({user}) => {
        const userSessions = sessions.filter(s => s.drill_sessions.user_id === user.id)
        const topScore = Math.max(...userSessions.map(s => s.drill_sessions.score))
        return {
          name: user.name,
          attempts: userSessions.length,
          highestScore: getScoreAsPercentage(topScore),
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
  
      const objectionScore  = validAnswers > 0 ? total / validAnswers : 0
  
      objectionStats.push({
        averageScore: getScoreAsPercentage(objectionScore),
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
      averageScore: getScoreAsPercentage(averageScore),
      numOfSessions: sessions.length,
      trends,
      distribution
    }

    return result
  } catch (e) {
    console.error('Unexpected error loading objection analytics: ', e)
    return null
  }
}
