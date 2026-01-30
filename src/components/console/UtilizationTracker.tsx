import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, TrendingDown, AlertTriangle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface UtilizationData {
  budgetedHours: number;
  actualHours: number;
  remainingHours: number;
  burnRate: "on-track" | "under" | "over";
  weeklyBreakdown: {
    week: string;
    hours: number;
  }[];
}

const mockUtilization: UtilizationData = {
  budgetedHours: 320,
  actualHours: 142,
  remainingHours: 178,
  burnRate: "on-track",
  weeklyBreakdown: [
    { week: "Week 1", hours: 32 },
    { week: "Week 2", hours: 36 },
    { week: "Week 3", hours: 28 },
    { week: "Week 4", hours: 30 },
    { week: "Week 5", hours: 16 },
  ],
};

const burnRateConfig = {
  "on-track": {
    label: "On Track",
    color: "bg-success/10 text-success border-success/20",
    icon: TrendingUp,
    description: "Burn rate aligns with project timeline",
  },
  under: {
    label: "Under Budget",
    color: "bg-info/10 text-info border-info/20",
    icon: TrendingDown,
    description: "Spending below planned rate",
  },
  over: {
    label: "Over Budget",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertTriangle,
    description: "Spending above planned rate - review required",
  },
};

export function UtilizationTracker() {
  const utilizationPercent = Math.round((mockUtilization.actualHours / mockUtilization.budgetedHours) * 100);
  const BurnRateIcon = burnRateConfig[mockUtilization.burnRate].icon;
  const maxWeeklyHours = Math.max(...mockUtilization.weeklyBreakdown.map((w) => w.hours));

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <Clock className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Effort Utilization</h2>
              <p className="text-sm text-muted-foreground">Budget tracking for this engagement</p>
            </div>
          </div>
          <Button className="bg-[#001035] hover:bg-[#001035]/90">
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Button>
        </div>

        {/* Hours Overview */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Budgeted Hours</p>
            <p className="text-2xl font-semibold text-foreground">{mockUtilization.budgetedHours}h</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Hours Used</p>
            <p className="text-2xl font-semibold text-[#001035]">{mockUtilization.actualHours}h</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-semibold text-foreground">{mockUtilization.remainingHours}h</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget Utilization</span>
            <span className="font-medium text-foreground">{utilizationPercent}%</span>
          </div>
          <Progress value={utilizationPercent} className="h-3 [&>div]:bg-[#001035]" />
        </div>

        {/* Burn Rate Status */}
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-lg border",
          burnRateConfig[mockUtilization.burnRate].color
        )}>
          <BurnRateIcon className="h-5 w-5 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Burn Rate:</span>
              <Badge variant="outline" className={burnRateConfig[mockUtilization.burnRate].color}>
                {burnRateConfig[mockUtilization.burnRate].label}
              </Badge>
            </div>
            <p className="text-sm mt-0.5">{burnRateConfig[mockUtilization.burnRate].description}</p>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="card-elevated p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Weekly Breakdown</h3>
        <div className="space-y-3">
          {mockUtilization.weeklyBreakdown.map((week, index) => (
            <div key={week.week} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">{week.week}</span>
              <div className="flex-1">
                <div
                  className="h-6 rounded bg-[#001035]/80 flex items-center justify-end pr-2"
                  style={{ width: `${(week.hours / maxWeeklyHours) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{week.hours}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members (placeholder) */}
      <div className="card-elevated p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Team Allocation</h3>
        <div className="space-y-3">
          {[
            { name: "Sarah Mitchell", role: "Lead Consultant", hours: 64 },
            { name: "Ahmed Khan", role: "Senior Analyst", hours: 48 },
            { name: "Maria Santos", role: "Consultant", hours: 30 },
          ].map((member) => (
            <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#001035] flex items-center justify-center text-white text-xs font-semibold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-[#001035]">{member.hours}h logged</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
