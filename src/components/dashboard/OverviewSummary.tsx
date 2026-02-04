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
      {/* End-to-End Progress Status - Most Prominent */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">Project Progress Status</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                50% Complete
              </Badge>
              <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                <Link to="#delivery">
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Overall Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Delivery Progress</span>
              <span className="text-sm font-semibold text-primary">2 of 4 Milestones Delivered</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-success via-primary to-info rounded-full" style={{ width: "50%" }} />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Contract Value: SAR 1,273K</span>
              <span>Delivered Value: SAR 636K</span>
            </div>
          </div>

          {/* Three-Column Status View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* What's Completed */}
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <h3 className="text-sm font-semibold text-success">Completed</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS01: Project Kickoff</p>
                    <p className="text-xs text-muted-foreground">Delivered 07/03/2025</p>
                    <p className="text-xs text-success font-medium">SAR 318K • Paid</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS02: GRC Design Summary</p>
                    <p className="text-xs text-muted-foreground">Delivered 06/01/2026</p>
                    <p className="text-xs text-warning font-medium">SAR 318K • Pending Acceptance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's In Progress */}
            <div className="p-4 rounded-lg bg-info/5 border border-info/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-info" />
                <h3 className="text-sm font-semibold text-info">In Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-warning/20 shrink-0 mt-0.5">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS03: Practice Playbook</p>
                    <p className="text-xs text-muted-foreground">Target: 05/02/2026</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-warning rounded-full" style={{ width: "60%" }} />
                      </div>
                      <span className="text-xs font-medium text-warning">60%</span>
                    </div>
                    <p className="text-xs text-warning font-medium mt-1">At Risk • 6 days left</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-info/20 shrink-0 mt-0.5">
                    <Clock className="h-3 w-3 text-info" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS04: System Implementation</p>
                    <p className="text-xs text-muted-foreground">Target: 02/03/2026</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: "35%" }} />
                      </div>
                      <span className="text-xs font-medium text-info">35%</span>
                    </div>
                    <p className="text-xs text-success font-medium mt-1">On Track • 31 days left</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Coming Next */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Coming Next</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS03 Acceptance</p>
                    <p className="text-xs text-muted-foreground">Expected: 05/02/2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">MS04 Delivery</p>
                    <p className="text-xs text-muted-foreground">Expected: 02/03/2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Project Closure</p>
                    <p className="text-xs text-muted-foreground">Expected: Mar 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">2</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-info">2</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">1</p>
              <p className="text-xs text-muted-foreground">At Risk</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">50%</p>
              <p className="text-xs text-muted-foreground">Overall Progress</p>
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

      {/* Next Working Session */}
      <Card className="lg:col-span-2">
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
