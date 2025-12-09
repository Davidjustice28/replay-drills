'use client'

import { Card, CardHeader, CardDescription, CardAction, CardContent, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string;
  description: string;
  isUp: boolean
  stat: string
}

export const StatCard = ({label, description, isUp, stat}: StatCardProps) => {
  return (
    <Card className="flex flex-col gap-0 flex-grow">
      <CardHeader>
        <CardDescription className="text-sm font-medium">{label}</CardDescription>
        <CardAction>
          <Users/>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-3xl mb-2">{stat}</CardTitle>
        <p className={(isUp ? "text-[#0D9488]" : "text-red-600")  + " text-xs"}>
          {
            isUp ? <TrendingUp className="inline"/> : <TrendingDown className="inline"/>
          } {description}
        </p>
      </CardContent>
    </Card>
  )
}