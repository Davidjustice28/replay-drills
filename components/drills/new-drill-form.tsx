'use client'

import { useRef, useState } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DrillModel } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { organizationId } from "@/lib/constants"
import { createDrill, updateDrill } from "./actions"
import { useRouter } from "next/navigation"

interface DrillFormProps {
  drill?: DrillModel
}
export const DrillForm = ({drill}: DrillFormProps) => {
  const [title, setTitle] = useState(drill?.title)
  const [description, setDescription] = useState(drill?.description)
  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()
  return (
    <form ref={ref} action={async (formdata) => {
      if (drill) {
        await updateDrill(formdata)
      } else {
        const newDrill = await createDrill(formdata)
        router.replace(`/drills/${newDrill.id}/manage`)
      }
    }}>
      <input type="hidden" name="id" value={drill?.id} />
      <input type="hidden" name="organization_id" value={organizationId} />
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title" className="after:text-destructive after:content-['*'] after:text-red-600"> 
                Title
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Discover Call Essentials"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                onBlur={() => {
                  if (drill) ref.current?.requestSubmit()
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description <span className="text-neutral-500">(Optional)</span>
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                className="resize-none h-20"
                placeholder="Brief description of what learners will practice in this drill"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}

                onBlur={() => {
                  if (drill) ref.current?.requestSubmit()
                }}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            {
              !drill && (
                <Field orientation="horizontal">
                  <Button type="submit" disabled={!title}>Save</Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Field>
              )
            }
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}