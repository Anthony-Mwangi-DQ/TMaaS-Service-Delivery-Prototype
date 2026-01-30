import { FileStack, FileCheck, Clock, AlertTriangle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Active Deliveries",
    value: "1",
    icon: FileStack,
    color: "text-[#001035]",
    bgColor: "bg-[#001035]/10",
  },
  {
    label: "Pending Client Approvals",
    value: "2",
    icon: FileCheck,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Deliverables Due",
    value: "3",
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Client Blockers",
    value: "2",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

// Summary of items waiting on clients
const clientBlockerSummary = {
  awaitingApprovals: 2,
  missingInputs: 1,
  pendingDecisions: 1,
};

export function SupplierPortfolioStats() {
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

      {/* Client Blockers Summary */}
      <div className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Users className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Waiting on Client</p>
              <p className="text-xs text-muted-foreground">Items blocked pending client response</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-warning">{clientBlockerSummary.awaitingApprovals}</p>
              <p className="text-xs text-muted-foreground">Approvals</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-semibold text-info">{clientBlockerSummary.missingInputs}</p>
              <p className="text-xs text-muted-foreground">Inputs</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-semibold text-destructive">{clientBlockerSummary.pendingDecisions}</p>
              <p className="text-xs text-muted-foreground">Decisions</p>
            </div>
            <Link 
              to="/console/deliveries/1?tab=raid" 
              className="ml-2 text-xs text-[#001035] hover:underline"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
