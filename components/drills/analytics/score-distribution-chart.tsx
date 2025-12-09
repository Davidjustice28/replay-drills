'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreDistribution as Distribution } from "@/lib/types";
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts"

export function ScoreDistribution({distributionData}: {distributionData: Distribution}) {
  const data = Object.entries(distributionData).map(([range, value]) => ({range, value}))
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