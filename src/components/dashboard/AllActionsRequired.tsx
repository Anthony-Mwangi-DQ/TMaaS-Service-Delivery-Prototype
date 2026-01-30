import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ActionItem {
  id: string;
  serviceId: string;
  serviceName: string;
  type: "feedback" | "approval" | "action";
  title: string;
  dueIn: string;
  priority: "high" | "medium" | "low";
  isOverdue?: boolean;
}

const allActions: ActionItem[] = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Digital GRC Strategy",
    type: "feedback",
    title: "Feedback Due: Draft Strategy Document",
    dueIn: "48 hours",
    priority: "high",
  },
  {
    id: "2",
    serviceId: "1",
    serviceName: "Digital GRC Strategy",
    type: "approval",
    title: "Approve Milestone 1 Completion",
    dueIn: "72 hours",
    priority: "medium",
  },
];

export function AllActionsRequired() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <AlertTriangle className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Required from You</h2>
            <p className="text-xs text-muted-foreground">{allActions.length} items across all services</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {allActions.map((action) => (
          <div
            key={action.id}
            className={cn(
              "rounded-lg border bg-card p-4 transition-all hover:shadow-sm",
              action.priority === "high" && "priority-high",
              action.priority === "medium" && "priority-medium",
              action.priority === "low" && "priority-low"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {action.serviceName}
                  </Badge>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    action.type === "feedback" && "bg-info/10 text-info",
                    action.type === "approval" && "bg-warning/10 text-warning",
                    action.type === "action" && "bg-primary/10 text-primary"
                  )}>
                    {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 text-xs",
                    action.isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
                  )}>
                    <Clock className="h-3 w-3" />
                    {action.isOverdue ? "Overdue" : `Due in ${action.dueIn}`}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
              </div>
              <Button asChild size="sm" variant={action.isOverdue ? "destructive" : "default"} className="shrink-0">
                <Link to={`/services/${action.serviceId}`}>
                  Take Action
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
