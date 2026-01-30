import { AlertTriangle, FileCheck, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DeadlineItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  dueTime: string;
  type: "milestone" | "deliverable" | "meeting";
}

interface DependencyItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  blockedSince: string;
  severity: "critical" | "high" | "medium";
}

interface ApprovalItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  requestedBy: string;
  requestedAt: string;
  requestedDate: Date;
  type: "document" | "milestone" | "commercial";
  sla: {
    totalDays: number;
    daysRemaining: number;
    isOverdue: boolean;
  };
  impact: {
    level: "high" | "medium" | "low";
    description: string;
  };
}

// Mock data - would be replaced with real data from backend
const todaysDeadlines: DeadlineItem[] = [
  {
    id: "1",
    title: "Submit Risk Assessment Report",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    dueTime: "2:00 PM",
    type: "deliverable",
  },
  {
    id: "2",
    title: "Milestone 2 Review Meeting",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    dueTime: "4:30 PM",
    type: "meeting",
  },
];

const blockingDependencies: DependencyItem[] = [
  {
    id: "1",
    title: "Awaiting API credentials from IT",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    blockedSince: "3 days",
    severity: "critical",
  },
  {
    id: "2",
    title: "Security review pending",
    serviceName: "Cybersecurity Audit",
    serviceId: "2",
    blockedSince: "1 day",
    severity: "high",
  },
];

const pendingApprovals: ApprovalItem[] = [
  {
    id: "1",
    title: "Draft Strategy Document v2.1",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    requestedBy: "Sarah Chen",
    requestedAt: "Yesterday",
    requestedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    type: "document",
    sla: {
      totalDays: 5,
      daysRemaining: 4,
      isOverdue: false,
    },
    impact: {
      level: "medium",
      description: "Blocks MS02 design finalization",
    },
  },
  {
    id: "2",
    title: "Milestone 2 Sign-off",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    requestedBy: "Ahmed Hassan",
    requestedAt: "12 days ago",
    requestedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    type: "milestone",
    sla: {
      totalDays: 10,
      daysRemaining: -2,
      isOverdue: true,
    },
    impact: {
      level: "high",
      description: "Delays MS03 start, blocks $100K invoice",
    },
  },
];

const getSeverityColor = (severity: DependencyItem["severity"]) => {
  switch (severity) {
    case "critical":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "high":
      return "bg-warning/10 text-warning border-warning/20";
    case "medium":
      return "bg-info/10 text-info border-info/20";
  }
};

const getTypeIcon = (type: DeadlineItem["type"]) => {
  switch (type) {
    case "milestone":
      return "🎯";
    case "deliverable":
      return "📄";
    case "meeting":
      return "📅";
  }
};

const getApprovalTypeLabel = (type: ApprovalItem["type"]) => {
  switch (type) {
    case "document":
      return "Document";
    case "milestone":
      return "Milestone";
    case "commercial":
      return "Commercial";
  }
};

export function NotificationCenter() {
  const totalItems = todaysDeadlines.length + blockingDependencies.length + pendingApprovals.length;

  return (
    <Card className="card-elevated">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Decisions Required</h2>
          <Badge variant="secondary" className="text-xs">
            {pendingApprovals.length} pending
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Items requiring your approval or decision
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Deadlines */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Today's Deadlines</h3>
            <Badge variant="outline" className="text-xs ml-auto">
              {todaysDeadlines.length}
            </Badge>
          </div>
          {todaysDeadlines.length > 0 ? (
            <div className="space-y-2">
              {todaysDeadlines.map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.serviceId}`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.serviceName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.dueTime}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No deadlines today 🎉
            </p>
          )}
        </section>

        <Separator />

        {/* Blocking Dependencies */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Blocking Dependencies</h3>
            <Badge variant="outline" className="text-xs ml-auto border-destructive/30 text-destructive">
              {blockingDependencies.length}
            </Badge>
          </div>
          {blockingDependencies.length > 0 ? (
            <div className="space-y-2">
              {blockingDependencies.map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.serviceId}`}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors group",
                    getSeverityColor(item.severity)
                  )}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs capitalize", getSeverityColor(item.severity))}
                      >
                        {item.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Blocked for {item.blockedSince}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.serviceName}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No blocking dependencies ✅
            </p>
          )}
        </section>

        <Separator />

        {/* Pending Approvals with SLA */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="h-4 w-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Pending Approvals</h3>
            <Badge variant="outline" className="text-xs ml-auto border-warning/30 text-warning">
              {pendingApprovals.length}
            </Badge>
          </div>
          {pendingApprovals.length > 0 ? (
            <div className="space-y-2">
              {pendingApprovals.map((item) => {
                const getSLAColor = () => {
                  if (item.sla.isOverdue) return "text-destructive";
                  if (item.sla.daysRemaining <= 1) return "text-warning";
                  return "text-success";
                };
                
                const getImpactColor = () => {
                  switch (item.impact.level) {
                    case "high": return "bg-destructive/10 text-destructive border-destructive/20";
                    case "medium": return "bg-warning/10 text-warning border-warning/20";
                    case "low": return "bg-info/10 text-info border-info/20";
                  }
                };

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors",
                      item.sla.isOverdue 
                        ? "bg-destructive/5 border-destructive/30" 
                        : "bg-card border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {getApprovalTypeLabel(item.type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            from {item.requestedBy}
                          </span>
                          {item.sla.isOverdue ? (
                            <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              OVERDUE by {Math.abs(item.sla.daysRemaining)} day{Math.abs(item.sla.daysRemaining) > 1 ? 's' : ''}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className={cn("text-xs", getSLAColor())}>
                              <Clock className="h-3 w-3 mr-1" />
                              {item.sla.daysRemaining} day{item.sla.daysRemaining > 1 ? 's' : ''} remaining
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.serviceName} • Requested {item.requestedAt}
                        </p>
                      </div>
                    </div>
                    
                    {/* Impact & SLA Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-[10px]", getImpactColor())}>
                          {item.impact.level.toUpperCase()} IMPACT
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.impact.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          className={cn(
                            "h-7 text-xs",
                            item.sla.isOverdue && "bg-destructive hover:bg-destructive/90"
                          )}
                        >
                          {item.sla.isOverdue ? "Approve Now" : "Approve"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pending approvals 📋
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
