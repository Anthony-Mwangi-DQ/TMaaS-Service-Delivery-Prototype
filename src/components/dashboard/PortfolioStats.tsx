import { FileStack, CheckCircle2, AlertTriangle, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Active Services",
    value: "1",
    icon: FileStack,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "On Track",
    value: "1",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "At Risk",
    value: "0",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Pending Actions",
    value: "2",
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

// RAID summary for visibility on Overview
const raidSummary = {
  openRisks: 2,
  openIssues: 1,
  blockedDependencies: 2,
};

export function PortfolioStats() {
  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RAID Summary Indicator */}
      <div className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">RAID Summary</p>
              <p className="text-xs text-muted-foreground">Across all active engagements</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-destructive">{raidSummary.openRisks}</p>
              <p className="text-xs text-muted-foreground">Open Risks</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-semibold text-warning">{raidSummary.openIssues}</p>
              <p className="text-xs text-muted-foreground">Open Issues</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-semibold text-info">{raidSummary.blockedDependencies}</p>
              <p className="text-xs text-muted-foreground">Dependencies</p>
            </div>
            <Link 
              to="/services/1?tab=raid" 
              className="ml-2 text-xs text-primary hover:underline"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
