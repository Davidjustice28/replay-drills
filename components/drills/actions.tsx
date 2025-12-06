'use server'

import { db } from "@/db/drizzle"
import { drillObjections, drills, drillSessions } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

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