import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PortfolioStats } from "@/components/dashboard/PortfolioStats";
import { ActiveServicesTable } from "@/components/dashboard/ActiveServicesTable";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <h1 className="text-xl font-semibold text-foreground">Portfolio Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monitor your active transformation services and pending actions
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <PortfolioStats />

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Active Services Table */}
            <ActiveServicesTable />

            {/* Daily Briefing */}
            <NotificationCenter />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="col-span-4">
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
