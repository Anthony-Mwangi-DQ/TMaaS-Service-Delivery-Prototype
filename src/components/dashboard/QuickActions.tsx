import { Plus, Calendar, MessageSquare, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "New Service Request", icon: Plus, variant: "default" as const },
  { label: "Upload Document", icon: Upload, variant: "outline" as const },
  { label: "Schedule Meeting", icon: Calendar, variant: "outline" as const },
  { label: "Send Message", icon: MessageSquare, variant: "outline" as const },
];

export function QuickActions() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Common tasks</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            className="gap-2"
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
