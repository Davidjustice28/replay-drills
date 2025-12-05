'use client'

import { useState } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DrillModel } from "@/lib/types"
import { Textarea } from "../ui/textarea"

interface DrillFormProps {
  drill?: DrillModel
}
export const DrillForm = ({drill}: DrillFormProps) => {
  const [title, setTitle] = useState(drill?.title)
  const [description, setDescription] = useState(drill?.description)
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title" className="after:text-destructive after:content-['*'] after:text-red-600"> 
                Title
              </FieldLabel>
              <Input
                id="title"
                placeholder="Discover Call Essentials"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description <span className="text-neutral-500">(Optional)</span>
              </FieldLabel>
              <Textarea
                id="description"
                className="resize-none h-20"
                placeholder="Brief description of what learners will practice in this drill"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            {
              false && (
                <Field orientation="horizontal">
                  <Button type="submit">Save</Button>
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