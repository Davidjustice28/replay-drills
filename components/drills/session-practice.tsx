'use client'
import { DrillModel, DrillSessionModel, DrillSessionResult, ObjectionWithVoiceover } from "@/lib/types"
import { SessionStep } from "./session-step"
import { Progress } from "@radix-ui/react-progress"
import { Home, RotateCcw, Volume2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { BackButton } from "./back-button"
import { useEffect, useRef, useState } from "react"
import { userId } from "@/lib/constants"
import { generateSessionResult } from "./actions"
import { ObjectionResponse } from "./objection-response"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { PracticeAgainButton } from "./practice-again-button"

interface SessionProps {
  drill: DrillModel
  session: DrillSessionModel
  objections: ObjectionWithVoiceover[]
}
export const PracticeSession = ({drill, session, objections}: SessionProps) => {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Omit<ObjectionWithVoiceover,'ai_audio'>[]>([])
  const [result, setResult] = useState<DrillSessionResult>()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const playAiAudio = async () => {
    setPlaying(true)
    function base64ToUint8Array(base64: string) {
      const binary = atob(base64);
      return Uint8Array.from(binary, c => c.charCodeAt(0));
    }

    const bytes = base64ToUint8Array(objections[step].ai_audio.base64);
    const blob = new Blob([bytes], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.addEventListener("ended", () => {
      setPlaying(false)
    })

    audio.play()
  }
  useEffect(() => {
    const handler = () => {
      playAiAudio()
      window.removeEventListener("click", handler)
    };

    window.addEventListener("click", handler, { once: true })

    return () => window.removeEventListener("click", handler)
  }, [step])
  return (
    <div className="flex flex-col flex-grow">
      {
        result ? (
          <div className="p-8 flex flex-col items-center">
            <Card className="w-full max-w-[896px]">
              <CardContent className="flex flex-col items-center gap-2">
                <CardDescription className="text-sm text-neutral-500">Total Score</CardDescription>
                <CardDescription className="text-2xl font-bold text-[#0d9488]">{result.total_score}/10</CardDescription>
                <CardTitle className="text-2xl mb-1">Outstanding Performance</CardTitle>
                <CardDescription className="text-xs text-neutral-500">Average of {objections.length} objections</CardDescription>
              </CardContent>
            </Card>
            <h2 className="text-2xl font-bold w-full max-w-[896px] mt-6 mb-4">Individual Objection Scores</h2>
            <div className="flex flex-col gap-4 w-full max-w-[896px]">
              {
                result.answers.map(({answer, objection, score}, i) => {
                  return (
                    <ObjectionResponse
                      score={score}
                      objection={objection}
                      key={`score-${i}`} 
                      userResponse={answer} 
                      position={i + 1}
                    />
                  )
                })
              }
            </div>
            <div className="w-full max-w-[896px] flex items-center gap-4 mt-6 box-border">
              <Button variant='secondary' className="flex-grow bg-neutral-100" onClick={() => router.push('/drills')}>
                <Home/>
                Back to Drills
              </Button>
              <PracticeAgainButton drill_id={drill.id}/>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            <CardHeader className="border-b-2 items-center flex flex-col py-5 relative">
              <div className="flex items-center justify-between min-w-[75%] max-w-4xl">
                <div className="flex gap-4">
                  <BackButton type="x"/>
                  <div>
                    <h1 className="text-lg font-semibold text-neutral-950">
                      {drill.title}
                    </h1>
                    <p className="text-xs text-neutral-500">
                      Objection {step + 1} of {objections.length}
                    </p>
                  </div>
                </div>
                {playing && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-full pulse-ring"></div>
                      <Volume2 className="w-4 h-4 text-blue-600 relative z-10" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium whitespace-nowrap">AI Speaking</span>
                  </div>
                )}
              </div>
              <Progress value={20} className="w-full absolute -bottom-1 h-1" />
            </CardHeader>
            <div className="border-2 flex-grow flex items-center justify-center">
              <SessionStep
                objection={objections[step]}
                onNextClick={(transcription) => {
                  const {ai_audio,...obj} = objections[step]
                  setUserAnswers(prev => [...prev, {...obj, user_response: transcription ?? ''}])
                  setStep(prev => prev + 1)
                }}
                lastStep={step + 1 === objections.length}
                onFinish={(transcription) => {
                  const {ai_audio,...obj} = objections[step]
                  const finalEntries = [...userAnswers, {...obj, user_response: transcription ?? ''}]
                  setUserAnswers(finalEntries)
                  if (formRef.current) formRef.current.requestSubmit()
                }}
                playingVoiceover={playing}
              />
            </div>
            <form ref={formRef} action={async (formData) => {
              const result = await generateSessionResult(formData)
              if (result) setResult(result)
            }}>
              <input type="hidden" value={userId} name={'user_id'}/>
              <input type="hidden" value={session.id} name={'session_id'}/>
              {
                userAnswers.map((data, i) => {
                  return (
                      <input type="hidden" value={JSON.stringify(data)} name={`objection-${data.id}`} key={`drill-objection-${i}`}/>
                  )
                })
              }
            </form>
          </div>
        )
      }
    </div>
  )
}