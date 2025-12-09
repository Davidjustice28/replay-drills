'use server'

import { Suspense } from "react"
import { getAnalyticsData } from "@/lib/processes/analytics"
import { AnalyticsDashboard } from "./dashboard"

interface AnalyticsTabProps {
  drill_id: string
}
export const AnalyticsTab = async ({drill_id}: AnalyticsTabProps) => {
    const analyticsPromise = getAnalyticsData(drill_id)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnalyticsDashboard analyticsPromise={analyticsPromise}/>
    </Suspense>
    
  )
}