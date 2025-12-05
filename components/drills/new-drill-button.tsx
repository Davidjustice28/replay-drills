'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { DrillForm } from "./new-drill-form"

export const NewDrillButton = () => {
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus/> New drill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Drill</DialogTitle>
          <DialogDescription>
            Help your team practice fighting objections.
          </DialogDescription>
        </DialogHeader>
        <div>
        <DrillForm/>

        </div>
      </DialogContent>
    </Dialog>
  )
}