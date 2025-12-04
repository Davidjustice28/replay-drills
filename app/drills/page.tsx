import { Drill } from "@/components/drills/drill";
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { drills } from "@/db/schema";
import { organizationId } from "@/lib/constants";
import { Plus } from "lucide-react";
import { NewDrillButton } from "@/components/drills/new-drill-button";

export default async function DrillsPage() {

  const organization_drills = await db.select().from(drills).where(eq(drills.organization_id, organizationId));

  return (
    <div className="min-h-screen w-full p-8">
      <Item className="mb-10 p-0">
        <ItemContent>
          <ItemTitle className="text-3xl font-bold text-neutral-950">Drills</ItemTitle>
          <ItemDescription className="text--base text-neutral-500">
            Select a drill to practice your objection handling skills
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <NewDrillButton/>
        </ItemActions>
      </Item>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          organization_drills.map((d, i) => <Drill key={`drill-${i}`} data={d}/> )
        }
      </div>
      
    </div>
  );
}
