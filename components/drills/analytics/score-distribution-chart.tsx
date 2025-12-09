'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts"

export function ScoreDistribution() {
  const data = [
    { range: "0–20", value: 2 },
    { range: "21–40", value: 10 },
    { range: "41–60", value: 25 },
    { range: "61–80", value: 60 },
    { range: "81–100", value: 50 },
  ]
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">Score Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="range" />
            <YAxis />
            <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}