'use client'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Performer } from "@/lib/types"

interface LeaderBoardCardProps {
  underPerformer: boolean
  performer: Performer
  position: number
}
export const LeaderBoardCard = ({underPerformer, performer, position}: LeaderBoardCardProps) => {
  return (
    <Card className="bg-neutral-100">
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge className={(underPerformer ? "bg-transparent text-neutral-500 shadow-sm": "bg-[#0D9488]") + " h-8 w-8 rounded-full font-mono tabular-nums flex items-center justify-center text-base"}>
            {position}
          </Badge>
          <div className="flex flex-col gap-1.5">
            <p className="text-base text-neutral-950">{performer.name}</p>
            <p className="text-neutral-500 text-xs">{performer.attempts} attempts • Last: {new Date(performer.lastSessionMs).toISOString().split("T")[0]}</p>
          </div>
        </div>
        <p className={(underPerformer ? "text-[#FBBF24]": "text-[#0D9488]") + " text-base"}>{performer.highestScore}%</p>
      </CardContent>
    </Card>
  )
}