import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { SupplierPortfolioStats } from "@/components/console/SupplierPortfolioStats";
import { SupplierActiveDeliveriesTable } from "@/components/console/SupplierActiveDeliveriesTable";
import { SupplierNotificationCenter } from "@/components/console/SupplierNotificationCenter";
import { SupplierQuickActions } from "@/components/console/SupplierQuickActions";

const ConsoleIndex = () => {
  return (
    <ConsoleLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <h1 className="text-xl font-semibold text-foreground">Delivery Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your active service deliveries and client communications
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <SupplierPortfolioStats />

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Active Deliveries Table */}
            <SupplierActiveDeliveriesTable />

            {/* Daily Briefing */}
            <SupplierNotificationCenter />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="col-span-4">
            <SupplierQuickActions />
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default ConsoleIndex;
