import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Table } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  serviceOrder: string;
  name: string;
  type: "Design" | "Deploy";
  requestedDate: string;
  currentMilestone: string;
  progress: number;
  healthStatus: "on-track" | "at-risk" | "blocked";
  status: string;
  supplier: string;
}

const services: Service[] = [
  {
    id: "1",
    serviceOrder: "STC_SO_01",
    name: "Digital GRC Strategy",
    type: "Design",
    requestedDate: "15 Jan 2024",
    currentMilestone: "MS03 - Practice Playbook",
    progress: 50,
    healthStatus: "at-risk",
    status: "Active",
    supplier: "DigitalQatalyst",
  },
];

const statusConfig = {
  "on-track": { label: "On Track", className: "status-on-track" },
  "at-risk": { label: "At Risk", className: "status-at-risk" },
  "blocked": { label: "Blocked", className: "status-blocked" },
};

const typeConfig = {
  Design: "bg-info/10 text-info border-info/20",
  Deploy: "bg-primary/10 text-primary border-primary/20",
};

export function ActiveServicesTable() {
  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Table className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Active Services</h2>
            <p className="text-sm text-muted-foreground">{services.length} engagements in progress</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="table-header py-3 px-6 text-left">Service Order</th>
              <th className="table-header py-3 px-6 text-left">Service</th>
              <th className="table-header py-3 px-6 text-left">Type</th>
              <th className="table-header py-3 px-6 text-left">Requested</th>
              <th className="table-header py-3 px-6 text-left">Current Stage</th>
              <th className="table-header py-3 px-6 text-left">Progress</th>
              <th className="table-header py-3 px-6 text-left">Status</th>
              <th className="table-header py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const statusBadge = statusConfig[service.healthStatus];
              return (
                <tr key={service.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-sm font-mono font-semibold text-foreground">{service.serviceOrder}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{service.supplier}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={cn("text-xs", typeConfig[service.type])}>
                      {service.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-foreground">{service.requestedDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-foreground">{service.currentMilestone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${service.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{service.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs w-fit">
                        {service.status}
                      </Badge>
                      <Badge className={cn("text-xs w-fit", statusBadge.className)}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
                      <Link to={`/services/${service.id}`}>
                        View
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
