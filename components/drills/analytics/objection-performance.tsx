'use client'
import { Progress } from "@/components/ui/progress"

interface ObjectionPerformanceProps{
  objection: string;
  attempts: number;
  averagePercentage: number
}
export const ObjectionPerformance = ({objection, attempts, averagePercentage}: ObjectionPerformanceProps) => {
  const textColor = averagePercentage < 70 ? 'text-red-600' 
    : averagePercentage < 80 ? 'text-amber-400' 
    : 'text-teal-600';

  const progressColor = averagePercentage < 70 ? 'bg-red-600' 
    : averagePercentage < 80 ? 'bg-amber-400' 
    : 'bg-teal-600';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-base text-neutral-950">{objection}</p>
        <div className="flex items-center gap-3">
          <p className="text-neutral-500 bg-red text-base">{attempts} Attempts</p>
          <p className={`${textColor} text-base`}>{averagePercentage}%</p>
        </div>
      </div>
      <Progress value={averagePercentage} indicatorClassName={progressColor} className="bg-neutral-100  h-2 rounded-lg mt-2"/>
    </div>
  )
}