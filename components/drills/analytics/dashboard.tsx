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
export const AnalyticsDashboard = ({analyticsPromise}: DashboardProps) => {
  const data = use(analyticsPromise)
  return (
    <>
      {
        !data ? <p className="text-neutral-500 text-base text-center mt-28">No analytics data available for this drill yet.</p> 
        : (
          <div className="w-full pt-8 px-2 md:px-8 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full gap-4">   
              <StatCard
                stat={data.numOfSessions.toString()}
                label="Total Attempts"
                description="+12 this week"
                isUp
              />

              <StatCard
                stat={data.numOfLearners.toString()}
                label="Unique Learners"
                description="+5 this week"
                isUp
              />

              <StatCard
                stat={`${data.averageScore}%`}
                label="Average Score"
                description="+3% this week"
                isUp
              />

              <StatCard
                stat={`${(data.averageDurationMs / 3600).toFixed(1)} min`}
                label="Avg Completion Time"
                description="-0.5 min vs last week"
                isUp
              />

            </div>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <ScoreDistribution distributionData={data.distribution}/>
              <ScoreTrend data={data.trends}/>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Performance by Objection</CardTitle>
              </CardHeader>
              <CardContent className="gap-3 flex flex-col">
                {
                  data.objectionStats.map(({objection, averageScore, attempts}, i) => {
                    return (
                      <ObjectionPerformance
                        key={`objection-stat-${i}`}
                        objection={objection}
                        averagePercentage={averageScore}
                        attempts={attempts}
                      />
                    )
                  })
                }
              </CardContent>
            </Card>
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <PerformancesCard performers={data.topPerformers} underPerformers={false} title="Top Performers"/>
              <PerformancesCard performers={data.worsePerformers} underPerformers={true} title="Needs Improvement"/>
            </div>
          </div>
        )
      }
    </>
  )
}