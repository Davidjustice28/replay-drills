'use client'
import { Mic, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "../ui/card"
import { ObjectionWithVoiceover } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder";
import { transcribeAudio } from "./actions"

interface StepProps {
  objection: ObjectionWithVoiceover
  onNextClick: (transcription?: string) => void
  onFinish: (transcription?: string) => void
  lastStep?: boolean
  playingVoiceover: boolean
}
export const SessionStep = ({objection, onFinish, onNextClick, lastStep, playingVoiceover}: StepProps) => {
  const [transcription, setTranscription] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const [userBase64, setUserBase64] = useState('')

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ 
    audio: true,
    askPermissionOnMount: true,
    onStop(_blobUrl, blob) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        if (fileReader.result) {
          setUserBase64(fileReader.result.toString().split(',')[1])
        }
      }
      fileReader.readAsDataURL(blob)
    },
  });

  useEffect(() => {
    if (userBase64 && formRef.current) {
      formRef.current?.requestSubmit()
    }
  }, [userBase64])

  useEffect(() => {
    setTranscription('')
    setUserBase64('')
  }, [objection])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (transcription && nextButtonRef.current) {
  //       nextButtonRef.current.click()
  //     }
  //   }, 3000);

  // }, [transcription])
  
  return (
    <div className="gap-6 flex flex-col flex-grow items-center justify-center h-full w-full">
      <form
        ref={formRef}
        action={async(formData) => {
          const text = await transcribeAudio(formData)
          if (text) setTranscription(text)
        }}
      >
        <input type="hidden" name="base64" value={userBase64}/>
      </form>
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
            <Button 
              size='icon-lg' 
              variant='ghost'
              className={status === 'recording' ? 'text-red-600 animate-pulse' : ''}
              disabled={playingVoiceover}
              onClick={() => {
                if (status !== 'recording') {
                  startRecording()
                } else {
                  stopRecording()
                }
              }}
            >
              <Mic/>
            </Button>            
          </div>
          <div className="mt-3 bg-gray-900 rounded-lg p-8 min-h-[160px] border border-gray-700 flex flex-col items-center justify-center">
            {status === 'recording' ? (
              <div className="flex items-center gap-2 h-16 justify-center">
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
                <div className="signal-bar bg-blue-400 rounded-full w-1.5"></div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center">
                {transcription ? (
                  <span className="text-gray-100">{transcription}</span>
                ) : (
                  'Click microphone to record your response...'
                )}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between w-full mt-3">
            {
              (!lastStep && !playingVoiceover) && (
                <Button
                  onClick={() => lastStep ? onFinish() : onNextClick()}
                  variant='ghost' 
                >Skip</Button>
              )
            }
            <Button
              className="ml-auto"
              ref={nextButtonRef}
              onClick={() => lastStep ? onFinish(transcription) : onNextClick(transcription)}
              disabled={playingVoiceover && !lastStep}
            >
              {lastStep ? 'Finish Drill' : 'Next Objection'} <ChevronRight/>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}