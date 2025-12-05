'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "../ui/card"
import { Trash } from "lucide-react"
import { FieldGroup, FieldSet, Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { DrillObjectionModel } from "@/lib/types"

interface ObjectionProps {
  data: DrillObjectionModel
  position: number
}
export const EditableObjection = ({data, position}: ObjectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [objection, setObjection] = useState(data.objection)
  const [idealResponse, setIdealResponse] = useState(data.ideal_response)
  return (
    <Card className="pb-0 cursor-pointer">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-2"
      >
        <CollapsibleTrigger asChild onClick={() => console.log('triggered')}>
          <CardHeader className="pb-3">
            <CardTitle>Objection {position}</CardTitle>
            <CardDescription>
              {objection}
            </CardDescription>
            <CardAction>
                <Button variant='ghost' size='icon'>
                  <Trash className="text-red-600"/>
                </Button>
            </CardAction>
          </CardHeader>
        </CollapsibleTrigger>
        <CardContent className="bg-neutral-100/30 px-0">
          <CollapsibleContent className="flex flex-col gap-2 px-6 border-t-[1px] border-neutral-200">
            <form className="my-4">
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="objection_text" className="after:text-destructive after:content-['*'] after:text-red-600 text-base" >
                        Objection Text
                      </FieldLabel>
                      <Input
                        id="objection_text"
                        placeholder="We don't have budget for this right now."
                        required
                        className="bg-white"
                        value={objection}
                        onChange={(e) => {
                          setObjection(e.target.value)
                        }}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ideal_response" className="after:text-destructive after:content-['*'] after:text-red-600 text-base">
                        Ideal Reponse
                      </FieldLabel>
                      <Textarea
                        id="ideal_response"
                        placeholder="Describe the ideal response that learners should aim for. Be specific about key points, tone, and approach. Learners will be scored 1-10 on adherence to this response."
                        className="resize-none bg-white h-40"
                        value={idealResponse}
                        onChange={(e) => {
                          setIdealResponse(e.target.value)
                        }}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </form>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  )
}