'use client'

import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { createObjection } from "./actions"

interface ButtonProps {
  title?:string; 
  drill_id: string;  
  position: number;
}

export const AddObjectionButton = ({drill_id, position, title="Add Objection"} : ButtonProps) => {
  return (
    <form action={async (formData: FormData) => {
      await createObjection(formData)
    }}>
      <input type="hidden" value={drill_id} name="drill_id" />
      <input type="hidden" value={position} name="position"/>
      <Button type="submit">
        <Plus/> {title}
      </Button>
    </form>
  )
}