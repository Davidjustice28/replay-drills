'use client'
import { Link } from "lucide-react"
import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"
import { useRouter } from "next/navigation"
import { userId } from "@/lib/constants"
import { createDrillSession } from "./actions"

interface FooterProps {
  drill_id: string
}
export const NewSessionFooter = ({drill_id}: FooterProps) => {
  const router = useRouter()
  return (
    <CardFooter className="flex-col gap-2 w-full mt-6">
      <form className="w-full" action={async (formData) => {
        const session = await createDrillSession(formData)
        router.push(`/drills/${drill_id}/session/${session.id}`)
      }}>
        <input type='hidden' value={drill_id} name="drill_id"/>
        <input type='hidden' value={userId} name="user_id"/>
        <Button className="w-full mb-2">
          Start Drill
        </Button>
        <Button type="button" className="w-full" variant='outline' onClick={(e) => {
          e.preventDefault()
          router.replace('/drills')
        }}>
          Go Back
        </Button>
      </form>
    </CardFooter>
  )
}