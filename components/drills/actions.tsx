'use server'

import { db } from "@/db/drizzle"
import { drillObjectionAnswers, drillObjections, drills, drillSessions } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { generateObject, experimental_generateSpeech as generateSpeech, jsonSchema } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ObjectionWithVoiceover } from "@/lib/types";
import { experimental_transcribe } from 'ai'


export const updateDrill = async (formData: FormData) => {
  const id = formData.get('id') as string | null

  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  if (!id || !title) throw new Error('Drill Update Failed: Must have a title and id')
  const [updatedDrill] = await db.update(drills).set({
    title, 
    description: description || '',
    last_updated: new Date()
  }).where(eq(drills.id, id)).returning()
  revalidatePath('/drills')
  return updatedDrill
}

export const createDrill = async (formData: FormData) => {
  const organization_id = formData.get('organization_id') as string | null
  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  if (!organization_id || !title) throw new Error('Drill Creation Failed: Must have a title and organization_id')
  const [createdDrill] = await db.insert(drills).values([{
    title, 
    description: description || '',
    organization_id
  }]).returning()
  revalidatePath('/drills')

  return createdDrill
}

export const deleteDrill = async (formData: FormData) => {
  const id = formData.get('id') as string | null
  const organization_id = formData.get('organization_id') as string | null

  if (!id || !organization_id) throw new Error('Drill deletion Failed: Must have an id and organization_id')
  await db.update(drills).set({
    archived: true
  }).where(and(eq(drills.id, id), eq(drills.organization_id, organization_id)))
    
  revalidatePath(`/drills`)
  redirect('/drills')
}

export const createObjection = async (formData: FormData) => {
  const drill_id = formData.get('drill_id') as string | null
  const position = Number(formData.get('position') ?? '')

  const objection = formData.get('objection') as string | null
  const ideal_response = formData.get('ideal_response') as string | null

  if (!drill_id || !objection || !ideal_response || Number.isNaN(position)) throw new Error('Objection Creation Failed: Must have a drill_id and objection and position and ideal response')
  const [createdObjection] = await db.insert(drillObjections).values([{
    ideal_response, 
    objection,
    position,
    drill_id
  }]).returning()
  return createdObjection
}


export const updateObjection = async (formData: FormData) => {
  const id = formData.get('id') as string | null
  const position = Number(formData.get('position') ?? '')

  const objection = formData.get('objection') as string | null
  const ideal_response = formData.get('ideal_response') as string | null
  if (!id || !ideal_response || !objection || Number.isNaN(position)) throw new Error('Objection Update Failed: Must have a objection and ideal response and id')
  const [updatedObjection] = await db.update(drillObjections).set({
    objection,
    ideal_response,
    position
  }).where(eq(drillObjections.id, id)).returning()
  return updatedObjection
}

export const deleteObjection = async (formData: FormData) => {
  const id = formData.get('id') as string | null
  const drill_id = formData.get('drill_id') as string | null

  if (!id || !drill_id) throw new Error('Objection deletion Failed: Must have an id')
  const items = await db.select({id: drillObjections.id, position: drillObjections.position}).from(drillObjections).where(eq(drillObjections.drill_id, drill_id))
  const idx = items.findIndex(item => item.id === id)
  items.splice(idx, 1)
  const result = await db.delete(drillObjections).where(and(eq(drillObjections.drill_id, drill_id), eq(drillObjections.id, id)))
  if (result.rowCount) {
    for (let i =0; i < items.length; i++) {
      const objection = items[i]
      await db.update(drillObjections).set({
        position: i,
      }).where(eq(drillObjections.id, objection.id)).returning()
    }
  }
  revalidatePath(`/drills/${drill_id}/manage`)
}

export const createDrillSession = async (formData: FormData) => {
  const drill_id = formData.get('drill_id') as string | null
  const user_id = formData.get('user_id') as string | null
  if (!drill_id || !user_id) throw new Error('Drill Session Creation Failed: Must have a user_id and drill_id')
  const [session] = await db.insert(drillSessions).values([{
    drill_id, 
    user_id
  }]).returning()
  revalidatePath('/drills')

  return session
}

export const generateObjectionVoiceover = async (formData: FormData) => {
  try {
    const objection_id = formData.get('objection_id') as string | null
    if (!objection_id) return null
    const [objection] = await db.select().from(drillObjections).where(eq(drillObjections.id, objection_id))
    const {audio} = await generateSpeech({ 
      model: openai.speech('tts-1'),
      text: objection.objection,
      voice: 'alloy',
    });
  
    return audio.base64
  } catch(e) {
    console.log('Failed to generate ai voiceover for objection: ', e)
    return null
  }
}

export const transcribeAudio = async (formData: FormData) => {
  const base64 = formData.get("base64") as string;

  if (!base64) {
    console.log('Transcription failed: Missing base64')
    return null
  }
  const buffer = Buffer.from(base64, 'base64')
  const file = new File([buffer], 'objection_response.wav', {type: 'audio/wav'})
  try {
    const result = await experimental_transcribe({
      model: openai.transcription('gpt-4o-mini-transcribe'),
      audio: await file.arrayBuffer(),
    });
    return result.text
  } catch (e) {
    console.log('Transcription failed: ', e)
    return null
  }
}

export const generateSessionResult = async (formData: FormData) => {
  const data: Omit<ObjectionWithVoiceover,'ai_audio'>[] = Array.from(formData
    .entries()
    .filter(([key, _value]) => key.startsWith('objection-'))
    .map(([_key, value]) => JSON.parse(value as string)))
  
  const user_id = formData.get('user_id') as string | null
  const drill_session_id = formData.get('session_id') as string | null
  if (!user_id || !drill_session_id) {
    console.error('Session Result Generation Failed: Missing required fields user_id and session_id')
    return null
  }
  const { object } = await generateObject<any>({
    model: openai('gpt-5-mini'),
    schema: jsonSchema({
      type: 'object',
      properties: {
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              score: { type: 'number' },
            },
            required: ['id', 'score'],
          },
        }
      }
    }),
    system: `
      You're a sales coach grading trainee's responses to common customer objections.
      You will be given a list objections, each with the following schema:

      {
        id: string;
        drill_id: string;
        position: number;
        objection: string;
        ideal_response: string;
        user_response: string;
      }

      Your job is to grade the user's response to each objection on a scale from 0 - 10 using the following guidelines:

      - 0 being no answer given and 10 being a great response as well as it being almost identical to the ideal_response provided
      - Bad responses should be between 1 - 5
      - Good responses should be between 6 - 8
      - Great responses should be 9 or 10

      Your response should be a JSON response in the following structure

      {
        "results": [
          {
            "id": string,
            "score": number
          }
        ]
      }
    `,
    prompt: `
      Here is the list of objections with the users answers:

      ${JSON.stringify(data)}

    `,
  });
  const {results} = object as {results: Array<{id: string; score: number;}>}
  const total_score = Math.round(results.reduce((sum, curr) => sum + curr.score, 0) / data.length)
  const [{date_started}] = await db.select({date_started: drillSessions.date_started, id: drillSessions.id}).from(drillSessions).where(eq(drillSessions.id, drill_session_id))
  const now = new Date()
  const duration = now.getTime() - date_started.getTime()
  await db.update(drillSessions).set({score: total_score, duration, date_completed: now}).where(eq(drillSessions.id, drill_session_id))
  const answers = await db.insert(drillObjectionAnswers).values(
    results.map(objectionResult => {
      const objectionData = data.find(d => d.id === objectionResult.id)!;
      return {
        user_id,
        drill_session_id,
        drill_objection_id: objectionData.id,
        answer: objectionData.user_response,
        score: objectionResult.score
      }
    })
  ).returning()
  return {
    duration,
    total_score,
    answers: answers.map(a => ({...a, objection: data.find(d => d.id === a.drill_objection_id)!}))}
}


