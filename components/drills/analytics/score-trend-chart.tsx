'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  XAxis, YAxis, ResponsiveContainer,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts"
export function ScoreTrend() {
  const data = [
    { date: "11/01", score: 72 },
    { date: "11/08", score: 74 },
    { date: "11/15", score: 76 },
    { date: "11/22", score: 78 },
    { date: "11/29", score: 80 },
  ]
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">Score Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={3} dot={{ r: 3, fill: "#f97316" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}