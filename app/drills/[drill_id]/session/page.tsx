import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { drills } from "@/db/schema";
import { NewSessionFooter } from "@/components/drills/new-session-footer";
interface SessionProps {
  params: Promise<{ drill_id: string; }>
}

export default async function DrillEditPage({ params }: SessionProps) {
  const {drill_id} = await params
  const drill = (await db.select().from(drills).where(eq(drills.id, drill_id)))[0]

  return (
    <div className="min-h-screen w-full p-8 bg-neutral-100 flex justify-center items-center">
      <Card className="w-1/2 bg-white">
        <CardHeader>
          <CardTitle className="line-clamp-1 text-3xl font-bold text-neutral-950">{drill.title}</CardTitle>
          <CardDescription className="line-clamp-3 text-base text-neutral-500">{drill.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-neutral-950 text-lg font-semibold mb-3 mx-6">
            What to Expect
          </h2>
          <ul className="list-disc mx-6">
            <li className="text-neutral-500 text-base ml-4">You will be presented a list of comments to respond to</li>
            <li className="text-neutral-500 text-base ml-4">Type your response in the text box, then click "Submit"</li>
            <li className="text-neutral-500 text-base ml-4">Once you have submitted each response, you will be scored on how well you adhered to your training</li>
          </ul>
        </CardContent>
        <NewSessionFooter drill_id={drill_id}/>
      </Card>
    </div>
  );
}