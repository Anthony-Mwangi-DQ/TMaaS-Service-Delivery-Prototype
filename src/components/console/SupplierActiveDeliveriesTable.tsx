import { Link } from "react-router-dom";
import { ArrowRight, Table } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Delivery {
  id: string;
  name: string;
  type: "Design" | "Deploy";
  currentMilestone: string;
  progress: number;
  healthStatus: "on-track" | "at-risk" | "blocked";
  targetDate: string;
  client: string;
  clientOrg: string;
}

const deliveries: Delivery[] = [
  {
    id: "1",
    name: "Digital GRC Strategy",
    type: "Design",
    currentMilestone: "Milestone 2",
    progress: 42,
    healthStatus: "on-track",
    targetDate: "Apr 15, 2024",
    client: "Jane Doe",
    clientOrg: "STC",
  },
];

const statusConfig = {
  "on-track": { label: "On Track", className: "status-on-track" },
  "at-risk": { label: "At Risk", className: "status-at-risk" },
  "blocked": { label: "Blocked", className: "status-blocked" },
};

const typeConfig = {
  Design: "bg-info/10 text-info border-info/20",
  Deploy: "bg-[#001035]/10 text-[#001035] border-[#001035]/20",
};

export function SupplierActiveDeliveriesTable() {
  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
            <Table className="h-5 w-5 text-[#001035]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Active Deliveries</h2>
            <p className="text-sm text-muted-foreground">{deliveries.length} services in delivery</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/console/deliveries">View All</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="table-header py-3 px-6 text-left">Service</th>
              <th className="table-header py-3 px-6 text-left">Type</th>
              <th className="table-header py-3 px-6 text-left">Client</th>
              <th className="table-header py-3 px-6 text-left">Current Stage</th>
              <th className="table-header py-3 px-6 text-left">Progress</th>
              <th className="table-header py-3 px-6 text-left">Health</th>
              <th className="table-header py-3 px-6 text-left">Target Date</th>
              <th className="table-header py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => {
              const status = statusConfig[delivery.healthStatus];
              return (
                <tr key={delivery.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-foreground">{delivery.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={cn("text-xs", typeConfig[delivery.type])}>
                      {delivery.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-foreground">{delivery.client}</p>
                      <p className="text-xs text-muted-foreground">{delivery.clientOrg}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-foreground">{delivery.currentMilestone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#001035] rounded-full transition-all"
                          style={{ width: `${delivery.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{delivery.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={cn("text-xs", status.className)}>
                      {status.label}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{delivery.targetDate}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button asChild variant="ghost" size="sm" className="text-[#001035] hover:text-[#001035]">
                      <Link to={`/console/deliveries/${delivery.id}`}>
                        Manage
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
