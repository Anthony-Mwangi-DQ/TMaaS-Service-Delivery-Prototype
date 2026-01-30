import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { SupplierServiceHeader } from "@/components/console/SupplierServiceHeader";
import { SupplierDeliverablesList } from "@/components/console/SupplierDeliverablesList";
import { SupplierInputDocumentsList } from "@/components/console/SupplierInputDocumentsList";
import { SupplierRAIDLog } from "@/components/console/SupplierRAIDLog";
import { SupplierServiceChat } from "@/components/console/SupplierServiceChat";
import { SupplierCommercialsTab } from "@/components/console/SupplierCommercialsTab";
import { SupplierMilestonesTab } from "@/components/console/SupplierMilestonesTab";
import { MilestoneTracker } from "@/components/dashboard/MilestoneTracker";
import { WorkingSessions } from "@/components/dashboard/WorkingSessions";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierNotificationCenter } from "@/components/console/SupplierNotificationCenter";

const DeliveryDetail = () => {
  const { id } = useParams();

  return (
    <ConsoleLayout>
      {/* Back Navigation */}
      <div className="bg-card border-b border-border px-6 py-3">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
          <Link to="/console/deliveries">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Active Deliveries
          </Link>
        </Button>
      </div>

      {/* Supplier Service Header */}
      <SupplierServiceHeader
        serviceName="Digital GRC Strategy"
        serviceType="Design"
        clientName="Jane Doe"
        clientOrg="STC"
        currentMilestone="Milestone 2"
        targetDate="April 15, 2024"
        healthStatus="on-track"
        progress={42}
        lastActivity="2 hours ago"
      />

      {/* Tabbed Content */}
      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="overview" className="px-6">Overview</TabsTrigger>
            <TabsTrigger value="milestones" className="px-6">Milestones</TabsTrigger>
            <TabsTrigger value="commercials" className="px-6">Commercials</TabsTrigger>
            <TabsTrigger value="raid" className="px-6">RAID Log</TabsTrigger>
            <TabsTrigger value="sessions" className="px-6">Working Sessions</TabsTrigger>
            <TabsTrigger value="chat" className="px-6">Chat</TabsTrigger>
            <TabsTrigger value="deliverables" className="px-6">Deliverables</TabsTrigger>
            <TabsTrigger value="documents" className="px-6">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                <MilestoneTracker />
                <SupplierNotificationCenter />
              </div>
              <div className="col-span-4 space-y-6">
                <ProgressCard
                  title="Progress vs. Plan"
                  progress={42}
                  planProgress={40}
                  healthStatus="on-track"
                  variance={2}
                />
              </div>
            </div>
          </TabsContent>

          {/* Milestones Tab - Supplier Management */}
          <TabsContent value="milestones">
            <SupplierMilestonesTab />
          </TabsContent>

          {/* Commercials Tab - Same as Customer Side */}
          <TabsContent value="commercials">
            <SupplierCommercialsTab />
          </TabsContent>

          {/* RAID Log Tab - Supplier Perspective */}
          <TabsContent value="raid">
            <SupplierRAIDLog />
          </TabsContent>

          {/* Working Sessions Tab */}
          <TabsContent value="sessions">
            <WorkingSessions />
          </TabsContent>

          {/* Chat Tab - Client as Partner */}
          <TabsContent value="chat">
            <div className="max-w-4xl">
              <SupplierServiceChat />
            </div>
          </TabsContent>

          {/* Deliverables Tab - Supplier Upload & Management */}
          <TabsContent value="deliverables">
            <SupplierDeliverablesList />
          </TabsContent>

          {/* Documents Tab - Client Inputs (View Only) */}
          <TabsContent value="documents">
            <SupplierInputDocumentsList />
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>
  );
};

export default DeliveryDetail;
