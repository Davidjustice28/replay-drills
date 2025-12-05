'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

export const AddObjectionButton = () => {
  const router = useRouter()
  return (
    <Button>
      <Plus/> Add Objection
    </Button>
  )
}