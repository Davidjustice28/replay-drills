import { generateObjectionVoiceovers } from "@/components/drills/actions";
import { BackButton } from "@/components/drills/back-button";
import { PracticeSession } from "@/components/drills/session-practice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db } from "@/db/drizzle";
import { drillObjections, drills, drillSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChevronRight, Mic, Volume2 } from "lucide-react";
interface SessionProps {
  params: Promise<{ session_id: string; drill_id: string }>
}

export default async function DrillSessionPage({ params }: SessionProps) {
  const {session_id, drill_id} = await params
  const session = (await db.select().from(drillSessions).where(eq(drillSessions.id, session_id)))[0]
  const drill = (await db.select().from(drills).where(eq(drills.id, drill_id)))[0]
  const objections = (await db.select().from(drillObjections).where(eq(drillObjections.drill_id, drill_id)))
  const modifiedObjections = await generateObjectionVoiceovers(objections)
  return (
    <div className="min-h-screen w-full flex flex-col box-border">
      <style>
        {`
        .pulse-ring {
          animation: pulse-ring 1.3s ease-out infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes signal-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        .signal-bar {
          animation: signal-pulse 0.6s ease-in-out infinite;
        }

        .signal-bar:nth-child(1) {
          animation-delay: 0s;
          height: 4px !important;
        }
        
        .signal-bar:nth-child(2) {
          animation-delay: 0.15s;
          height: 8px !important;
        }
        
        .signal-bar:nth-child(3) {
          animation-delay: 0.3s;
          height: 12px !important;
        }
        
        .signal-bar:nth-child(4) {
          animation-delay: 0.15s;
          height: 8px !important;
        }
        
        .signal-bar:nth-child(5) {
          animation-delay: 0s;
          height: 4px !important;
        }
      `}
      </style>
      <PracticeSession 
        objections={modifiedObjections} 
        session={session} 
        drill={drill}
      />
    </div>
  );
}