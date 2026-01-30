import { TrendingUp, Target, AlertTriangle, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  progress: number;
  planProgress: number;
  healthStatus: "on-track" | "at-risk" | "blocked";
  variance?: number;
}

export function ProgressCard({
  title,
  progress,
  planProgress,
  healthStatus,
  variance = 0,
}: ProgressCardProps) {
  const statusConfig = {
    "on-track": {
      label: "On Track",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    "at-risk": {
      label: "At Risk",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    "blocked": {
      label: "Blocked",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
  };

  const status = statusConfig[healthStatus];

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">Performance metrics</p>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
          status.bgColor,
          status.color,
          status.borderColor
        )}>
          {healthStatus === "blocked" && <AlertTriangle className="h-3 w-3" />}
          {status.label}
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress vs Plan */}
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress vs Plan</span>
            <span className={cn(
              variance >= 0 ? "text-success" : "text-warning"
            )}>
              {variance >= 0 ? "+" : ""}{variance}%
            </span>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            {/* Plan line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
              style={{ left: `${planProgress}%` }}
            />
            {/* Actual progress */}
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                progress >= planProgress ? "bg-success" : "bg-warning"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <span className="text-muted-foreground">
              Actual: <span className="font-medium text-foreground">{progress}%</span>
            </span>
            <span className="text-muted-foreground">
              Plan: <span className="font-medium text-foreground">{planProgress}%</span>
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs">Velocity</span>
            </div>
            <p className="text-lg font-semibold text-foreground">94%</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Target className="h-3.5 w-3.5" />
              <span className="text-xs">Quality</span>
            </div>
            <p className="text-lg font-semibold text-foreground">98%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
