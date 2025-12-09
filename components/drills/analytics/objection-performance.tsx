'use client'
import { Progress } from "@/components/ui/progress"

interface ObjectionPerformanceProps{
  objection: string;
  attempts: number;
  averagePercentage: number
}
export const ObjectionPerformance = ({objection, attempts, averagePercentage}: ObjectionPerformanceProps) => {
  const color = averagePercentage < 70 ? '#dc2626' : averagePercentage < 80 ? '#FBBF24'  :'#0D9488'
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-base text-neutral-950">{objection}</p>
        <div className="flex items-center gap-3">
          <p className="text-neutral-500 bg-red text-base">{attempts} Attempts</p>
          <p className={`text-[${color}] text-base`}>{averagePercentage}%</p>
        </div>
      </div>
      <Progress value={averagePercentage} indicatorClassName={`bg-[${color}]`} className="bg-neutral-100  h-2 rounded-lg mt-2"/>
    </div>
  )
}