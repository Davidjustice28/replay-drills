import { RotateCcw } from "lucide-react"
import router from "next/router"
import { Button } from "../ui/button"
import { createDrillSession } from "./actions"

interface ButtonProps {
  drill_id: string
}
export const PracticeAgainButton = ({drill_id} : ButtonProps) => {
  return (
    <form className="flex-grow" action={async (formData) => {
      const session = await createDrillSession(formData)
      router.push(`/drills/${drill_id}/session/${session.id}`)
    }}>
      <Button className="w-full">
        <RotateCcw/>
        Practice Again
      </Button>
    </form>
  )
}