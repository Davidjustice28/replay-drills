'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "../ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FieldGroup, FieldSet, Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { DrillObjectionAnswerModel, DrillObjectionModel } from "@/lib/types"
import { Badge } from "../ui/badge"

interface ObjectionProps {
  objection: DrillObjectionModel
  score: number
  userResponse: string
  position: number
}
export const ObjectionResponse = ({objection, userResponse, position, score}: ObjectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const getBadgeClasses = () => {
    if (score <= 6) {
      return 'bg-[#FF0000]/10 text-[#FF0000]'
    } else if (score <= 8){
      return 'bg-[#FBBF24]/10 text-[#FBBF24]'
    } else {
      return 'bg-[#0d9488]/10 text-[#0d9488]'
    }
  }

  const getTextBackgroundClasses = () => {
    if (score <= 6) {
      return 'bg-[#FF0000]/10 border-[#FF0000]/20'
    } else if (score <= 8){
      return 'bg-[#FBBF24]/10 border-[#FBBF24]/20'
    } else {
      return 'bg-[#0d9488]/10 border-[#0d9488]/20'
    }
  }
  return (
    <Card className="pb-0 cursor-pointer">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-2"
      >
        <CollapsibleTrigger asChild onClick={() => console.log('triggered')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">Objection {position} <Badge className={"ml-3 text-xs rounded-xl " + getBadgeClasses()}>{score}/10</Badge></CardTitle>
            <CardDescription>
              {objection.objection}
            </CardDescription>
            <CardAction>
              <Button variant='ghost' size='icon'>
                {
                  isOpen ? 
                  <ChevronUp className="text-neutral-500"/>
                  : 
                  <ChevronDown className="text-neutral-500"/>
                }
              </Button>
            </CardAction>
          </CardHeader>
        </CollapsibleTrigger>
        <CardContent className="bg-neutral-100/30 px-0">
          <CollapsibleContent className="flex flex-col gap-2 px-6 border-t-[1px] border-neutral-200">
            <div className="my-4">
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="user_response" className="after:text-destructive  text-base" >
                        Your Reponse
                      </FieldLabel>
                      <Input
                        id="user_response"
                        className="bg-white"
                        value={userResponse}
                       
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ideal_response" className="after:text-destructive text-base">
                        Ideal Reponse
                      </FieldLabel>
                      <Textarea
                        id="ideal_response"
                        name="ideal_response"
                        placeholder="Describe the ideal response that learners should aim for. Be specific about key points, tone, and approach. Learners will be scored 1-10 on adherence to this response."
                        className={"resize-none  h-40 " + getTextBackgroundClasses()}
                        value={objection.ideal_response}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  )
}