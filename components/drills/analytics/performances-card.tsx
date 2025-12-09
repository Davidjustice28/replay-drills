'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Award, Target } from "lucide-react"
import { LeaderBoardCard } from "./leaderboard-card"

interface PerformancesCardProps {
  underPerformers: boolean
  title: string
}

export const PerformancesCard = ({underPerformers, title}: PerformancesCardProps) => {
  return (
    <Card className="w-full md:w-1/2 gap-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          {
            underPerformers ? <Target className="text-[#FBBF24]"/> : <Award className="text-[#0D9488]"/>
          }
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <LeaderBoardCard underPerformer={underPerformers}/>
        <LeaderBoardCard underPerformer={underPerformers}/>
        <LeaderBoardCard underPerformer={underPerformers}/>
      </CardContent>
    </Card>
  )
}