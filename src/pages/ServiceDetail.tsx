import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ServiceHeader } from "@/components/dashboard/ServiceHeader";
import { OverviewSummary } from "@/components/dashboard/OverviewSummary";
import { DeliveryTab } from "@/components/dashboard/DeliveryTab";
import { RAIDLog } from "@/components/dashboard/RAIDLog";
import { WorkingSessions } from "@/components/dashboard/WorkingSessions";
import { ServiceChat } from "@/components/dashboard/ServiceChat";
import { CommercialsTab } from "@/components/dashboard/CommercialsTab";
import { StatusReportTab } from "@/components/dashboard/StatusReportTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceDetail = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="bg-background min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="bg-card px-6 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Active Engagements
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Digital GRC Strategy</span>
          </nav>
        </div>

        {/* Service Header */}
        <ServiceHeader
          serviceName="Digital GRC Strategy"
          serviceType="Design"
          serviceOrder="STC_SO_01"
          requestedDate="15 Jan 2024"
          status="Active"
        />

        {/* Tabbed Content */}
        <div className="p-6 bg-background">
          <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="overview" className="px-6">Summary</TabsTrigger>
            <TabsTrigger value="delivery" className="px-6">Delivery</TabsTrigger>
            <TabsTrigger value="status-reports" className="px-6">Status Reports</TabsTrigger>
            <TabsTrigger value="raid" className="px-6">RAID</TabsTrigger>
            <TabsTrigger value="commercials" className="px-6">Commercials</TabsTrigger>
            <TabsTrigger value="sessions" className="px-6">Sessions</TabsTrigger>
            <TabsTrigger value="messages" className="px-6">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewSummary />
          </TabsContent>

          {/* Delivery Tab - Consolidated Milestones + Deliverables + Documents */}
          <TabsContent value="delivery">
            <DeliveryTab />
          </TabsContent>

          {/* Status Reports Tab */}
          <TabsContent value="status-reports">
            <StatusReportTab />
          </TabsContent>

          {/* RAID Log Tab */}
          <TabsContent value="raid">
            <RAIDLog />
          </TabsContent>

          {/* Commercials Tab */}
          <TabsContent value="commercials">
            <CommercialsTab />
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <WorkingSessions />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="max-w-4xl">
              <ServiceChat />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceDetail;
