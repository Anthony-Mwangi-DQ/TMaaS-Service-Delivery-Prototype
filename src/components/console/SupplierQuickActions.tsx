import { Upload, RefreshCw, MessageSquare, Clock, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "Upload Deliverable", icon: Upload, variant: "default" as const, isPrimary: true },
  { label: "Update Status", icon: RefreshCw, variant: "outline" as const, isPrimary: false },
  { label: "Request Client Input", icon: MessageSquare, variant: "outline" as const, isPrimary: false },
  { label: "Log Time", icon: Clock, variant: "outline" as const, isPrimary: false },
  { label: "Schedule Session", icon: Calendar, variant: "outline" as const, isPrimary: false },
];

export function SupplierQuickActions() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
          <Zap className="h-5 w-5 text-[#001035]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Delivery tasks</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            className={action.isPrimary ? "gap-2 bg-[#001035] hover:bg-[#001035]/90" : "gap-2"}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
