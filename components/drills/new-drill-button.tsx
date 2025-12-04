'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

export const NewDrillButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/drills/new')}>
      <Plus/> New drill
    </Button>
  )
}