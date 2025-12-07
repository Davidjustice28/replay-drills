'use client'
import { DrillModel, DrillSessionModel, ObjectionWithVoiceover } from "@/lib/types"
import { SessionStep } from "./session-step"
import { Progress } from "@radix-ui/react-progress"
import { Volume2 } from "lucide-react"
import { CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import { useEffect, useState } from "react"

interface SessionProps {
  drill: DrillModel
  session: DrillSessionModel
  objections: ObjectionWithVoiceover[]
}
export const PracticeSession = ({drill, session, objections}: SessionProps) => {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
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

    // 💡 When audio finishes...
    audio.addEventListener("ended", () => {
      console.log("Audio done")
      setPlaying(false)
    })

    audio.play();
  }
  useEffect(() => {
    const handler = () => {
      console.log('playing')
      playAiAudio();
      window.removeEventListener("click", handler);
    };

    window.addEventListener("click", handler, { once: true });

    return () => window.removeEventListener("click", handler);
  }, [step]);
  return (
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
          onNextClick={(transcription) => setStep(prev => prev + 1)}
          lastStep={step + 1 === objections.length}
          onFinish={(transcription) => {
            setStep(prev => prev + 1)
          }}
          playingVoiceover={playing}
        />
      </div>
    </div>
  )
}