'use client'
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()
  return (
    <Button variant='ghost' size='icon-lg' onClick={() => router.back()}>
      <ArrowLeft/>
    </Button>
  )
}