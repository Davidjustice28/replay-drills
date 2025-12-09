'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreTrend as Trend } from "@/lib/types";
import { XAxis, YAxis, ResponsiveContainer, Line, LineChart, CartesianGrid } from "recharts"

export function ScoreTrend({data}: {data: Trend[]}) {
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">Score Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="date" tickFormatter={(v) => v.split("-").slice(0,2).join("-")}/>
            <YAxis domain={[0, 100]} />
            <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={3} dot={{ r: 3, fill: "#f97316" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}