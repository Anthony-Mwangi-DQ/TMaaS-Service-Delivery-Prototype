import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MilestonesTab } from "./MilestonesTab";
import { DeliverablesList } from "./DeliverablesList";
import { InputDocumentsList } from "./InputDocumentsList";
import { Package, FileCheck, FolderInput } from "lucide-react";

export function DeliveryTab() {
  return (
    <div className="space-y-6">
      {/* Delivery Overview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Delivery Execution</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track milestones, deliverables, and input documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-info/10 text-info border-info/20">
            2 Active Milestones
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            3 Pending Deliverables
          </Badge>
        </div>
      </div>

      {/* Sub-tabs for Delivery content */}
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="milestones" className="gap-2">
            <Package className="h-4 w-4" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="deliverables" className="gap-2">
            <FileCheck className="h-4 w-4" />
            Deliverables
          </TabsTrigger>
          <TabsTrigger value="inputs" className="gap-2">
            <FolderInput className="h-4 w-4" />
            Input Documents
          </TabsTrigger>
        </TabsList>

        {/* Milestones Sub-tab */}
        <TabsContent value="milestones" className="mt-6">
          <MilestonesTab />
        </TabsContent>

        {/* Deliverables Sub-tab */}
        <TabsContent value="deliverables" className="mt-6">
          <DeliverablesList />
        </TabsContent>

        {/* Input Documents Sub-tab */}
        <TabsContent value="inputs" className="mt-6">
          <InputDocumentsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
