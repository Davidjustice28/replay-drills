'use client'
import { DrillModel } from "@/lib/types"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card"
import { Edit, Play } from "lucide-react"
import { useAuthContext } from "@/providers/auth"
import { useRouter } from "next/navigation"

interface DrillProps {
  data: DrillModel
}
export const DrillCard = ({data}: DrillProps) => {
  const {userRole} = useAuthContext()
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="line-clamp-1">{data.title}</CardTitle>
        <CardDescription className="line-clamp-3">{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full" onClick={() => router.push(`/drills/${data.id}/session`)}>
          <Play/> Practice
        </Button>
        {
          userRole === 'admin' && (
            <Button variant='secondary' className="w-full" onClick={() => router.push(`/drills/${data.id}/manage`)}>
              <Edit/> Edit
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}