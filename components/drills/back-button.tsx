'use client'
import { ArrowLeft, X } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface ButtonProps {
  redirectPath?: string
  type?: 'x' | 'arrow'
}
export const BackButton = ({redirectPath, type}: ButtonProps) => {
  const router = useRouter()
  return (
    <Button variant='ghost' size='icon-lg' onClick={() => {
      if (redirectPath) {
        router.replace(redirectPath)
      } else {
        router.back()
      }
    }}>
      {type === 'x' ? <X className="text-neutral-500 text-xs"/> :  <ArrowLeft/>}
    </Button>
  )
}