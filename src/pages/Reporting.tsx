import { BarChart3, TrendingUp, Lock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Reporting = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Reporting & Analytics</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Insights and analytics across your transformation journey
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Digital Maturity Placeholder */}
          <Card className="p-6 border-2 border-dashed border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Your Digital Maturity</h2>
                <p className="text-sm text-primary font-medium">Coming Soon</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Track your organization's digital transformation maturity across key dimensions including governance, 
              risk management, compliance, and operational excellence.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>This feature is under development</span>
            </div>
          </Card>

          {/* Engagement Analytics Placeholder */}
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Engagement Analytics</h2>
                <p className="text-sm text-muted-foreground">Performance Metrics</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              View detailed analytics on engagement progress, milestone completion rates, and delivery performance.
            </p>
          </Card>

          {/* Portfolio Overview Placeholder */}
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Portfolio Overview</h2>
                <p className="text-sm text-muted-foreground">Summary Reports</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Get a comprehensive view of all your active engagements with summary reports and trend analysis.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reporting;
