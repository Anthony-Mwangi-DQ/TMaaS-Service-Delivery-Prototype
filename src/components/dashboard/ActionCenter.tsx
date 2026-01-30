import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionItem {
  id: string;
  type: "feedback" | "approval" | "action";
  title: string;
  description: string;
  dueIn: string;
  priority: "high" | "medium" | "low";
  isOverdue?: boolean;
}

const actions: ActionItem[] = [
  {
    id: "1",
    type: "feedback",
    title: "Feedback Due: Draft Strategy Document",
    description: "Please review and provide feedback on the latest GRC strategy framework",
    dueIn: "48 hours",
    priority: "high",
  },
  {
    id: "2",
    type: "approval",
    title: "Approve Milestone 1 Completion",
    description: "Review and sign off on Milestone 1 deliverables",
    dueIn: "72 hours",
    priority: "medium",
  },
];

export function ActionCenter() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <AlertTriangle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Required from You</h2>
          <p className="text-sm text-muted-foreground">{actions.length} items need attention</p>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
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
                <div className="flex items-center gap-2 mb-1">
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
                    action.isOverdue ? "text-destructive" : "text-muted-foreground"
                  )}>
                    <Clock className="h-3 w-3" />
                    Due in {action.dueIn}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </div>
              <Button size="sm" className="shrink-0">
                Take Action
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
