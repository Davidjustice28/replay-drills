import { RotateCcw } from "lucide-react"
import { Button } from "../ui/button"
import { createDrillSession } from "./actions"
import { redirect } from "next/navigation"

interface ButtonProps {
  drill_id: string
  user_id: string
}
export const PracticeAgainButton = ({drill_id, user_id} : ButtonProps) => {
  return (
    <form className="flex-grow" action={async (formData) => {
      const session = await createDrillSession(formData)
      redirect(`/drills/${drill_id}/session/${session.id}`)
    }}>
      <input type="hidden" name="drill_id" value={drill_id}/>
      <input type="hidden" name="user_id" value={user_id}/>
      <Button className="w-full">
        <RotateCcw/>
        Practice Again
      </Button>
    </form>
  )
}