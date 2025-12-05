'use client'
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface ButtonProps {
  redirectPath?: string
}
export const BackButton = ({redirectPath}: ButtonProps) => {
  const router = useRouter()
  return (
    <Button variant='ghost' size='icon-lg' onClick={() => {
      if (redirectPath) {
        router.replace(redirectPath)
      } else {
        router.back()
      }
    }}>
      <ArrowLeft/>
    </Button>
  )
}