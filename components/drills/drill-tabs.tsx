'use client'

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Edit, ChartColumnDecreasing } from "lucide-react"

export const DrillTabs = () => {
  return (
    <TabsList aria-label="manage drill tabs" className="flex items-center border-b-2">
      <TabsTrigger 
        value="edit" 
        className={"flex items-center px-4 py-2 gap-1"}
      >
        <Edit/> Edit
      </TabsTrigger>
      <TabsTrigger 
        value="analytics" 
        className="flex items-center px-4 py-2 gap-1" 
      >
        <ChartColumnDecreasing/> Analytics
      </TabsTrigger>
    </TabsList>
  )
}