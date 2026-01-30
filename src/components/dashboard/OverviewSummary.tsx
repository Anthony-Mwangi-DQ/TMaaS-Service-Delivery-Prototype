import { 
  Calendar,
  ArrowRight,
  Users,
  Clock,
  FileText,
  Target,
  ShieldAlert,
  AlertTriangle,
  XCircle,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Mock data - would come from props/context in real implementation
const topRisksIssues = [
  {
    id: "R001",
    title: "ABACUS RFQ",
    severity: "high" as const,
    impact: "Project Timeline - timely procurement of tool licenses required",
    owner: "DQ",
    linkedMilestone: "MS04"
  },
  {
    id: "D002",
    title: "API Access Blocked",
    severity: "critical" as const,
    impact: "Blocking MS04 integration work (15 days)",
    owner: "STC Bank",
    linkedMilestone: "MS04"
  },
  {
    id: "R002",
    title: "Assessment Findings - Review Delays",
    severity: "medium" as const,
    impact: "Project Timeline - delays in review cycles",
    owner: "STC Bank",
    linkedMilestone: "MS03"
  }
];

const pendingClientActions = [
  {
    id: "1",
    title: "MS02 Design Summary - Acceptance",
    daysOverdue: 2,
    impact: "Blocks MS03 start, delays SAR 318K invoice",
    linkedTo: "MS02"
  },
  {
    id: "2",
    title: "Scope Trade Confirmation",
    daysRemaining: 3,
    impact: "Required for MS03 planning",
    linkedTo: "MS03"
  }
];

const upcomingDeadlines = [
  {
    id: "1",
    title: "MS03 Practice Playbook & Procedures",
    date: "05/02/2026",
    daysUntil: 7,
    status: "at-risk" as const,
    type: "milestone" as const
  },
  {
    id: "2",
    title: "ABACUS Vendor Decision",
    date: "29/01/2026",
    daysUntil: 0,
    status: "today" as const,
    type: "dependency" as const
  },
  {
    id: "3",
    title: "MS04 System Implementation",
    date: "02/03/2026",
    daysUntil: 32,
    status: "on-track" as const,
    type: "milestone" as const
  }
];

const nextSession = {
  date: "26/02/2024",
  time: "10:00 AM",
  topic: "Strategy Workshop: Risk Framework Review",
  type: "Workshop",
  attendees: 4
};

export function OverviewSummary() {
  const getSeverityConfig = (severity: "critical" | "high" | "medium" | "low") => {
    switch (severity) {
      case "critical":
        return { color: "text-destructive", bgColor: "bg-destructive/10", borderColor: "border-destructive/30" };
      case "high":
        return { color: "text-warning", bgColor: "bg-warning/10", borderColor: "border-warning/30" };
      case "medium":
        return { color: "text-warning", bgColor: "bg-warning/10", borderColor: "border-warning/30" };
      default:
        return { color: "text-info", bgColor: "bg-info/10", borderColor: "border-info/30" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Milestones Status */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Active Milestones</CardTitle>
              <Badge variant="outline" className="text-xs bg-info/10 text-info border-info/20">
                2 In Progress
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
              <Link to="#delivery">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* MS03 - At Risk */}
            <div className="p-3 rounded-lg border border-warning/30 bg-warning/5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-mono">MS03</Badge>
                  <span className="text-sm font-semibold">Practice Playbook & Procedures</span>
                </div>
                <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  At Risk
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-muted-foreground">Target: </span>
                    <span className="font-medium">05/02/2026</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value: </span>
                    <span className="font-medium">SAR 318K</span>
                  </div>
                </div>
                <span className="text-warning font-medium">6 days remaining</span>
              </div>
            </div>

            {/* MS04 - On Track */}
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-mono">MS04</Badge>
                  <span className="text-sm font-semibold">System Implementation & Deployment</span>
                </div>
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  On Track
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-muted-foreground">Target: </span>
                    <span className="font-medium">02/03/2026</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value: </span>
                    <span className="font-medium">SAR 318K</span>
                  </div>
                </div>
                <span className="text-muted-foreground">31 days remaining</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top 3 Risks & Issues */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <CardTitle className="text-sm font-medium">Top Risks & Issues</CardTitle>
              <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                {topRisksIssues.length} Active
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
              <Link to="#raid">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topRisksIssues.map((item) => {
              const config = getSeverityConfig(item.severity);
              return (
                <div 
                  key={item.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    config.borderColor,
                    config.bgColor
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-mono">
                        {item.id}
                      </Badge>
                      <span className="text-sm font-semibold text-foreground">{item.title}</span>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", config.bgColor, config.color, config.borderColor)}>
                      {item.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{item.impact}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Owner: {item.owner}</span>
                    <Button variant="outline" size="sm" className="h-6 text-xs" asChild>
                      <Link to="#raid">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pending Client Actions */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-medium">Pending Client Actions</CardTitle>
              <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                {pendingClientActions.length} Items
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingClientActions.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "p-3 rounded-lg border",
                  item.daysOverdue 
                    ? "bg-destructive/5 border-destructive/30" 
                    : "bg-warning/5 border-warning/30"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  {item.daysOverdue ? (
                    <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                      {item.daysOverdue} days overdue
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                      {item.daysRemaining} days left
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.impact}</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-7 text-xs" asChild>
                    <Link to="#delivery">
                      Review & Approve
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                    <Link to="#messages">
                      Discuss
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <span className="text-xs text-muted-foreground">(Next 7 days)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingDeadlines.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  item.status === "today" && "bg-info/5 border-info/30",
                  item.status === "at-risk" && "bg-warning/5 border-warning/30",
                  item.status === "on-track" && "bg-muted/30"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {item.type === "milestone" ? "Milestone" : "Dependency"}
                    </Badge>
                    {item.status === "today" && (
                      <Badge variant="outline" className="text-xs bg-info/10 text-info border-info/20">
                        TODAY
                      </Badge>
                    )}
                    {item.status === "at-risk" && (
                      <AlertTriangle className="h-3 w-3 text-warning" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.date} • {item.daysUntil === 0 ? "Today" : `${item.daysUntil} days`}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                  <Link to="#delivery">
                    View
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Working Session */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-info" />
            <CardTitle className="text-sm font-medium">Next Working Session</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">{nextSession.topic}</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {nextSession.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {nextSession.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                {nextSession.type}
              </Badge>
              <span className="text-xs text-muted-foreground">{nextSession.attendees} attendees</span>
            </div>
            <Button variant="outline" size="sm" className="w-full text-xs mt-2" asChild>
              <Link to="#sessions">
                View All Sessions
                <ArrowRight className="h-3 w-3 ml-1.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
