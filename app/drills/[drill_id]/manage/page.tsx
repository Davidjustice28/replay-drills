import { AddObjectionButton } from "@/components/drills/add-objection-button";
import { EditableObjection } from "@/components/drills/editable-objection";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemFooter, ItemActions } from "@/components/ui/item";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { drillObjections, drills } from "@/db/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ArrowLeft, ChartColumnDecreasing, Edit } from "lucide-react";
import { DrillForm } from "@/components/drills/new-drill-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/drills/back-button";
import { DrillTabs } from "@/components/drills/drill-tabs";

interface HomePageProps {
  params: Promise<{ drill_id: string; }>
}

export default async function DrillPage({ params }: HomePageProps) {
  const {drill_id} = await params
  const drill = (await db.select().from(drills).where(eq(drills.id, drill_id)))[0]
  const objections = await db.select().from(drillObjections).where(eq(drillObjections.drill_id, drill_id));
  
  return (
    <div className="min-h-screen w-full p-8">
      <Item className="mb-4 p-0">
        <ItemContent>
          <div className="flex gap-4">
            <BackButton/>
            <div>
              <ItemTitle className="text-3xl font-bold text-neutral-950">
                {drill.title}
              </ItemTitle>
              <ItemDescription className="text--base text-neutral-500">
                {drill.description ?? 'No description'}
              </ItemDescription>
            </div>
          </div>
        </ItemContent>
        <ItemFooter>
        </ItemFooter>
      </Item>
      <Tabs defaultValue="edit" className="">
        <DrillTabs/>
        <TabsContent value="edit" className="w-full px-12 py-6">
          <DrillForm drill={drill}/>
          <Item className="mb-10 p-0 mt-3">
            <ItemContent>
              <ItemTitle className="text-lg font-bold text-neutral-950">Objections & Ideal Responses</ItemTitle>
              <ItemDescription className="text--base text-neutral-500">
                Add objections and define ideal responses. Learners will be scored 1-10 on how well they adhere to the ideal response.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <AddObjectionButton/>
            </ItemActions>
          </Item>
          {
            !objections.length ? (
              <Card className="bg-neutral-100/30 py-12">
                <CardContent className=" items-center justify-center flex flex-col gap-4">
                  <p className="text-neutral-500 text-base">No objections added yet</p>
                  <Button>Add Your First Objection</Button>
                </CardContent>
              </Card>
            )
            
            : (
              <div className="flex flex-col gap-4 ">
                {
                  objections.map((objection, i) => {
                    return (
                      <EditableObjection 
                        key={`objection-${i}`} 
                        data={objection} 
                        position={i + 1}
                      />
                    )
                  })
                }
              </div>
            )
          }
        </TabsContent>
        <TabsContent value="analytics">Analytics</TabsContent>
      </Tabs>
    </div>
  );
}
