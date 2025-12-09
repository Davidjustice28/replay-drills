'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { use } from "react"
import { ObjectionPerformance } from "./objection-performance"
import { PerformancesCard } from "./performances-card"
import { ScoreDistribution } from "./score-distribution-chart"
import { ScoreTrend } from "./score-trend-chart"
import { StatCard } from "./stat-card"
import { AnalyticsData } from "@/lib/types"

interface DashboardProps {
  analyticsPromise: Promise<AnalyticsData | null>
}
export const AnalyticsDashboard = async ({analyticsPromise}: DashboardProps) => {
  const data = use(analyticsPromise)
  return (
    <>
      {
        !data ? <p className="text-neutral-500 text-base text-center mt-28">No analytics data available for this drill yet.</p> 
        : (
          <div className="w-full pt-8 px-2 md:px-8 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full gap-4">   
              <StatCard
                stat="142"
                label="Total Attempts"
                description="+12 this week"
                isUp
              />

              <StatCard
                stat="48"
                label="Unique Learners"
                description="+5 this week"
                isUp
              />

              <StatCard
                stat="78%"
                label="Average Score"
                description="+3% this week"
                isUp
              />

              <StatCard
                stat="7.5 min"
                label="Avg Completion Time"
                description="-0.5 min vs last week"
                isUp
              />

            </div>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <ScoreDistribution/>
              <ScoreTrend/>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Performance by Objection</CardTitle>
              </CardHeader>
              <CardContent className="gap-3 flex flex-col">
                
                <ObjectionPerformance
                  objection="Budget concerns"
                  averagePercentage={88}
                  attempts={142}
                />

                <ObjectionPerformance
                  objection="Working with competitor"
                  averagePercentage={76}
                  attempts={138}
                />

                <ObjectionPerformance
                  objection="Need to think about it"
                  averagePercentage={79}
                  attempts={135}
                />

                <ObjectionPerformance
                  objection="Send information"
                  averagePercentage={74}
                  attempts={140}
                />

                <ObjectionPerformance
                  objection="Budget concerns"
                  averagePercentage={75}
                  attempts={139}
                />
              </CardContent>
            </Card>
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <PerformancesCard underPerformers={false} title="Top Performers"/>
              <PerformancesCard underPerformers={true} title="Needs Improvement"/>
            </div>
          </div>
        )
      }
    </>
  )
}