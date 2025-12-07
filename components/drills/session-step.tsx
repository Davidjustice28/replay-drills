'use client'
import { Mic, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "../ui/card"
import { ObjectionWithVoiceover } from "@/lib/types"
import { useEffect, useRef, useState } from "react"

interface StepProps {
  objection: ObjectionWithVoiceover
  onNextClick: (transcription?: string) => void
  onFinish: (transcription?: string) => void
  lastStep?: boolean
  playingVoiceover: boolean
}
export const SessionStep = ({objection, onFinish, onNextClick, lastStep, playingVoiceover}: StepProps) => {
  const [transcription, setTranscription] = useState('')
  
  return (
    <form 
      className="gap-6 flex flex-col flex-grow items-center justify-center h-full w-full"
      action={async (formData) => {
        
      }}
    >
      <Card className="w-1/2">
        <CardHeader>
          <CardDescription className="font-medium text-xs text-neutral-500">AI says:</CardDescription>
          <CardTitle className="text-2xl font-bold">{objection.objection}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-1/2">
        <CardContent>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-neutral-950">Your Response</p>
            <Button size='icon-lg' variant='ghost' disabled={playingVoiceover}>
              <Mic/>
            </Button>
          </div>
          <div className="mt-3 bg-gray-900 rounded-lg p-8 min-h-[160px] border border-gray-700 flex flex-col items-center justify-center">
            {false ? (
              <div className="flex items-center gap-2 h-16 justify-center">
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center">
                {false ? (
                  <span className="text-gray-100">{''}</span>
                ) : (
                  'Click "Speak" to record your response...'
                )}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between w-full mt-3">
            {
              !lastStep && (
                <Button
                  onClick={() => lastStep ? onFinish() : onNextClick()}
                  variant='ghost' 
                >Skip</Button>
              )
            }
            <Button
              className="ml-auto"
              onClick={() => lastStep ? onFinish(transcription) : onNextClick(transcription)}
              disabled={playingVoiceover && !lastStep}
            >
              {lastStep ? 'Finish Drill' : 'Next Objection'} <ChevronRight/>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}