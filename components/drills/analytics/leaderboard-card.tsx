'use client'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface LeaderBoardCardProps {
  underPerformer: boolean
}
export const LeaderBoardCard = ({underPerformer}: LeaderBoardCardProps) => {
  return (
    <Card className="bg-neutral-100">
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge className={(underPerformer ? "bg-transparent text-neutral-500 shadow-sm": "bg-[#0D9488]") + " h-8 w-8 rounded-full font-mono tabular-nums flex items-center justify-center text-base"}>
            1
          </Badge>
          <div className="flex flex-col gap-1.5">
            <p className="text-base text-neutral-950">Sarah Johnson</p>
            <p className="text-neutral-500 text-xs">6 attempts • Last: 2025-11-29</p>
          </div>
        </div>
        <p className={(underPerformer ? "text-[#FBBF24]": "text-[#0D9488]") + " text-base"}>92%</p>
      </CardContent>
    </Card>
  )
}