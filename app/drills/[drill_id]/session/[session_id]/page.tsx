import { db } from "@/db/drizzle";
import { drills, drillSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
interface SessionProps {
  params: Promise<{ session_id: string; drill_id: string }>
}

export default async function DrillSessionPage({ params }: SessionProps) {
  const {session_id, drill_id} = await params
  const session = (await db.select().from(drillSessions).where(eq(drillSessions.id, session_id)))[0]
  const drill = (await db.select().from(drills).where(eq(drills.id, drill_id)))[0]

  return (
    <div className="min-h-screen w-full">
      Drill session page
      {drill_id}

      {session_id}
    </div>
  );
}