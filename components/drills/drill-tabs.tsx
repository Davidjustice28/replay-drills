'use client'

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Edit, ChartColumnDecreasing } from "lucide-react"
import { useState } from "react"

export const DrillTabs = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'analytics'>('edit')
  return (
    <TabsList aria-label="manage drill tabs" className={"flex items-center border-b-2"}>
      <TabsTrigger 
        value="edit" 
        className={"flex items-center px-4 py-2 gap-1 border-b-2 " + (activeTab === 'edit' ? 'border-black' : 'border-transparent')}
        onClick={() => setActiveTab('edit')}
      >
        <Edit/> Edit
      </TabsTrigger>
      <TabsTrigger 
        value="analytics" 
        className={"flex items-center px-4 py-2 gap-1 border-b-2 " + (activeTab === 'analytics' ? 'border-black' : 'border-transparent')}
        onClick={() => setActiveTab('analytics')}
      >
        <ChartColumnDecreasing/> Analytics
      </TabsTrigger>
    </TabsList>
  )
}