import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  ShieldAlert,
  Users,
  Printer,
  ArrowRight,
  ExternalLink,
  XCircle,
  AlertCircle,
  ChevronDown,
  History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

// Report archive data
const reportArchive = [
  {
    id: "report-2026-w04",
    weekNumber: 4,
    dateRange: "20 Jan - 26 Jan 2026",
    status: "current" as const,
    generatedDate: "26 Jan 2026",
    keyHighlights: "MS02 delivered, MS03 at risk, ABACUS decision pending"
  },
  {
    id: "report-2026-w03",
    weekNumber: 3,
    dateRange: "13 Jan - 19 Jan 2026",
    status: "archived" as const,
    generatedDate: "19 Jan 2026",
    keyHighlights: "MS02 design finalization, scope trade discussions"
  },
  {
    id: "report-2026-w02",
    weekNumber: 2,
    dateRange: "06 Jan - 12 Jan 2026",
    status: "archived" as const,
    generatedDate: "12 Jan 2026",
    keyHighlights: "MS02 delivery, client review pending"
  }
];

// Report period selector
function ReportPeriodSelector({ 
  period, 
  onPeriodChange 
}: { 
  period: string; 
  onPeriodChange: (period: string) => void;
}) {
  const periods = [
    { value: "current-week", label: "Current Week (W04)" },
    { value: "last-week", label: "Last Week (W03)" },
    { value: "2-weeks-ago", label: "2 Weeks Ago (W02)" },
    { value: "custom", label: "Custom Range" }
  ];

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="text-sm border rounded-md px-3 py-1.5 bg-background"
      >
        {periods.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
    </div>
  );
}

// Report Archive Sidebar
function ReportArchive({ 
  currentReportId, 
  onSelectReport 
}: { 
  currentReportId: string;
  onSelectReport: (reportId: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Report Archive</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {reportArchive.map((report) => (
            <button
              key={report.id}
              onClick={() => onSelectReport(report.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-colors",
                report.id === currentReportId 
                  ? "bg-primary/10 border-primary/30" 
                  : "bg-muted/30 border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground">
                  Week {report.weekNumber}
                </span>
                {report.status === "current" && (
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{report.dateRange}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-2">
                {report.keyHighlights}
              </p>
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
          <History className="h-3 w-3 mr-1.5" />
          View All Reports
        </Button>
      </CardContent>
    </Card>
  );
}

// Executive Summary - Narrative Layer
function ExecutiveSummary() {
  const summaryItems = [
    {
      title: "Data Collection (Documents)",
      currentStatus: "First batch of L4 documents is being processed.",
      nextActions: "None."
    },
    {
      title: "Scope Trade",
      currentStatus: "STC B to confirm 4x procedures within 1 week of L3 assessment submission.",
      nextActions: "STC B to provide acknowledgement.",
      requiresClientAction: true
    },
    {
      title: "MS02 Design Summary Report",
      currentStatus: "DQ shared final submission workbook for review.",
      nextActions: "STC B to share their feedback by 22nd Jan, 2026. If not DQ will proceed with MS acceptance",
      requiresClientAction: true,
      linkedMilestone: "MS02"
    },
    {
      title: "MS03 Design Playbook",
      currentStatus: "L4 assessment value discussed on site with STC B team.",
      nextActions: "STC B team to internally discuss and sync with DQ on next steps.",
      requiresClientAction: true,
      linkedMilestone: "MS03"
    },
    {
      title: "ABACUS RFQ",
      currentStatus: "STC B advises vendor decision has been made.",
      nextActions: "DQ waiting for notification of decision."
    }
  ];

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="text-lg">Executive Summary</CardTitle>
        <p className="text-sm text-muted-foreground">
          Current status and next actions by workstream
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {summaryItems.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-semibold text-foreground">{item.title}:</h4>
              {item.requiresClientAction && (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                  Client Action Required
                </Badge>
              )}
            </div>
            
            <div className="ml-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">Current Status:</span>{" "}
                <span className="text-muted-foreground">{item.currentStatus}</span>
              </div>
              <div>
                <span className="font-medium">Next Actions:</span>{" "}
                <span className="text-muted-foreground">{item.nextActions}</span>
              </div>
            </div>

            {item.linkedMilestone && (
              <div className="ml-4 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7"
                  asChild
                >
                  <Link to="#delivery">
                    View {item.linkedMilestone}
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Progress & Timeline Status - Non-Linear, Parallel Milestones
function ProgressTimelineStatus() {
  const milestones = [
    {
      code: "MS01",
      name: "Project Kickoff & Charter",
      status: "completed",
      contractDate: "27/02/2025",
      actualDate: "07/03/2025",
      variance: "+8 days",
      varianceReason: "Stakeholder scheduling",
      value: 318215.25,
      isActive: false
    },
    {
      code: "MS02",
      name: "GRC Design Summary",
      status: "delivered",
      contractDate: "10/07/2025",
      forecastDate: "08/01/2026",
      actualDate: "06/01/2026",
      variance: "+5 months",
      varianceReason: "Client-requested scope expansion",
      value: 318215.25,
      isActive: false,
      pendingAction: "Awaiting client acceptance (2 days overdue)"
    },
    {
      code: "MS03",
      name: "Practice Playbook & Procedures",
      status: "active",
      contractDate: "31/07/2025",
      forecastDate: "05/02/2026",
      variance: "+6 months",
      varianceReason: "Scope clarification + resource constraints",
      value: 318215.25,
      isActive: true,
      progress: 60,
      linkedRisks: ["Scope confirmation pending", "Resource availability"]
    },
    {
      code: "MS04",
      name: "System Implementation & Deployment",
      status: "active",
      contractDate: "02/03/2026",
      adjustedContractDate: "02/03/2026",
      forecastDate: "02/03/2026",
      variance: "On track",
      value: 318215.25,
      isActive: true,
      progress: 35,
      linkedDependencies: ["API access credentials (blocked)"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Progress & Timeline Status
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Contracted vs forecast dates • Parallel milestone execution • Variance explained
        </p>
      </CardHeader>
      <CardContent>
        {/* Active Milestones Indicator */}
        <div className="mb-4 p-3 rounded-lg bg-info/10 border border-info/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-info" />
            <span className="text-sm font-medium text-info">
              2 milestones in parallel delivery
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              MS03 and MS04 running concurrently
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div 
              key={milestone.code}
              className={cn(
                "p-4 rounded-lg border-2",
                milestone.isActive && "border-info/30 bg-info/5",
                !milestone.isActive && milestone.status === "completed" && "border-success/30 bg-success/5",
                !milestone.isActive && milestone.status === "delivered" && "border-warning/30 bg-warning/5"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs font-mono">
                      {milestone.code}
                    </Badge>
                    <span className="text-sm font-semibold">{milestone.name}</span>
                    {milestone.isActive && (
                      <Badge variant="outline" className="text-xs bg-info/10 text-info border-info/20">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SAR {milestone.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Timeline Comparison */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="p-2 rounded bg-background/50">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Contract Date</p>
                  <p className="text-xs font-medium">
                    {milestone.adjustedContractDate ? (
                      <>
                        <span className="line-through text-muted-foreground">{milestone.contractDate}</span>
                        <br />
                        <span>{milestone.adjustedContractDate}</span>
                      </>
                    ) : (
                      milestone.contractDate
                    )}
                  </p>
                </div>
                <div className="p-2 rounded bg-background/50">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Forecast/Actual</p>
                  <p className={cn(
                    "text-xs font-medium",
                    milestone.variance !== "On track" && milestone.variance.includes("+") && "text-warning"
                  )}>
                    {milestone.actualDate || milestone.forecastDate || "—"}
                  </p>
                </div>
                <div className="p-2 rounded bg-background/50">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Variance</p>
                  <p className={cn(
                    "text-xs font-medium",
                    milestone.variance === "On track" ? "text-success" : "text-warning"
                  )}>
                    {milestone.variance}
                  </p>
                </div>
              </div>

              {/* Progress Bar for Active Milestones */}
              {milestone.isActive && milestone.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{milestone.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-info rounded-full"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Variance Explanation */}
              {milestone.varianceReason && (
                <div className="text-xs bg-muted/50 p-2 rounded mb-2">
                  <strong>Variance Reason:</strong> {milestone.varianceReason}
                </div>
              )}

              {/* Pending Action */}
              {milestone.pendingAction && (
                <div className="flex items-start gap-2 text-xs bg-destructive/10 p-2 rounded mb-2">
                  <AlertCircle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-destructive">{milestone.pendingAction}</span>
                </div>
              )}

              {/* Linked Items */}
              <div className="flex flex-wrap gap-2">
                {milestone.linkedRisks?.map((risk, idx) => (
                  <Button 
                    key={idx}
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-6"
                    asChild
                  >
                    <Link to="#raid">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {risk}
                    </Link>
                  </Button>
                ))}
                {milestone.linkedDependencies?.map((dep, idx) => (
                  <Button 
                    key={idx}
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-6"
                    asChild
                  >
                    <Link to="#raid">
                      <XCircle className="h-3 w-3 mr-1" />
                      {dep}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Delivery Health Indicators - Live System State
function DeliveryHealthIndicators() {
  const healthDimensions = [
    {
      dimension: "Stakeholder Commitment",
      status: "healthy",
      explanation: "All stakeholders engaged and responsive",
      evidence: []
    },
    {
      dimension: "Plan Confirmation",
      status: "healthy",
      explanation: "Project plan confirmed and baselined",
      evidence: []
    },
    {
      dimension: "Progress Against Schedule",
      status: "at-risk",
      explanation: "MS03 delayed by 6 months, MS02 acceptance overdue",
      evidence: [
        { label: "MS03 Delay Details", link: "#milestones" },
        { label: "MS02 Acceptance", link: "#milestones" }
      ]
    },
    {
      dimension: "Scope Confirmation",
      status: "attention",
      explanation: "MS03 Job Descriptions descoped, other items confirmed",
      evidence: [
        { label: "Scope Change Log", link: "#milestones" }
      ]
    },
    {
      dimension: "Dependencies Met",
      status: "blocked",
      explanation: "API access credentials pending from client (15 days)",
      evidence: [
        { label: "API Access Dependency", link: "#raid" }
      ]
    },
    {
      dimension: "Contractual Status",
      status: "healthy",
      explanation: "Contract signed, MS01 paid, MS02 invoicing pending acceptance",
      evidence: [
        { label: "View Commercials", link: "#commercials" }
      ]
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "healthy":
        return { 
          icon: CheckCircle2, 
          color: "text-success", 
          bgColor: "bg-success/10", 
          borderColor: "border-success/20",
          label: "Healthy"
        };
      case "attention":
        return { 
          icon: AlertCircle, 
          color: "text-warning", 
          bgColor: "bg-warning/10", 
          borderColor: "border-warning/20",
          label: "Requires Attention"
        };
      case "at-risk":
        return { 
          icon: AlertTriangle, 
          color: "text-warning", 
          bgColor: "bg-warning/10", 
          borderColor: "border-warning/20",
          label: "At Risk"
        };
      case "blocked":
        return { 
          icon: XCircle, 
          color: "text-destructive", 
          bgColor: "bg-destructive/10", 
          borderColor: "border-destructive/20",
          label: "Blocked"
        };
      default:
        return { 
          icon: Clock, 
          color: "text-muted-foreground", 
          bgColor: "bg-muted", 
          borderColor: "border-border",
          label: "Unknown"
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          Delivery Health Indicators
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Live system state across key delivery dimensions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {healthDimensions.map((item, idx) => {
            const config = getStatusConfig(item.status);
            const Icon = config.icon;
            
            return (
              <div 
                key={idx}
                className={cn(
                  "p-4 rounded-lg border-l-4",
                  config.borderColor,
                  config.bgColor
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", config.color)} />
                    <span className="text-sm font-semibold text-foreground">
                      {item.dimension}
                    </span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", config.bgColor, config.color, config.borderColor)}
                  >
                    {config.label}
                  </Badge>
                </div>
                <p className="text-sm text-foreground mb-2 ml-6">{item.explanation}</p>
                {item.evidence.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-6">
                    {item.evidence.map((evidence, evidenceIdx) => (
                      <Button 
                        key={evidenceIdx}
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-6"
                        asChild
                      >
                        <Link to={evidence.link}>
                          {evidence.label}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Risks & Issues - Linked from RAID Log
function RisksIssuesLinked() {
  const criticalItems = [
    {
      type: "risk",
      id: "R001",
      title: "ABACUS RFQ",
      severity: "high",
      owner: "DQ",
      impact: "Project Timeline - timely procurement of tool licenses required",
      mitigation: "ABACUS RFQ process to ensure the timely procurement of tool licenses",
      linkedTo: ["MS04"]
    },
    {
      type: "risk",
      id: "R002",
      title: "Assessment Findings - Review Delays",
      severity: "medium",
      owner: "STC Bank",
      impact: "Project Timeline - delays in review cycles",
      mitigation: "STC Bank must ensure sufficient effort is allocated to close reviews within 5 days of submission",
      linkedTo: ["MS03"]
    },
    {
      type: "dependency",
      id: "D002",
      title: "ABACUS EA Tool",
      severity: "medium",
      owner: "DQ",
      status: "in-progress",
      impact: "Required for ongoing compliance planning",
      linkedTo: ["MS04"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Critical Risks & Issues
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Pulled from RAID Log • Explains delays and status degradation
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="#raid">
              View Full RAID Log
              <ArrowRight className="h-3 w-3 ml-1.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalItems.map((item) => (
            <div 
              key={item.id}
              className={cn(
                "p-4 rounded-lg border-l-4",
                item.severity === "critical" && "border-l-destructive bg-destructive/5",
                item.severity === "high" && "border-l-warning bg-warning/5"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-mono">
                    {item.id}
                  </Badge>
                  <span className="text-sm font-semibold">{item.title}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    item.severity === "critical" && "bg-destructive/10 text-destructive border-destructive/20",
                    item.severity === "high" && "bg-warning/10 text-warning border-warning/20"
                  )}
                >
                  {item.severity.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Owner:</span>
                    <p className="font-medium">{item.owner}</p>
                  </div>
                  {item.status && (
                    <div>
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <p className="font-medium">{item.status}</p>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs text-muted-foreground">Impact:</span>
                  <p className="font-medium">{item.impact}</p>
                </div>

                {item.mitigation && (
                  <div>
                    <span className="text-xs text-muted-foreground">Mitigation:</span>
                    <p className="font-medium">{item.mitigation}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Linked to:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.linkedTo.map((link, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {link}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Dependencies & Blockers
function DependenciesBlockers() {
  const dependencies = [
    {
      id: "D001",
      title: "Data Submission & Access",
      owner: "STC Bank",
      dueDate: "13/03/2026",
      forecastDate: "20/03/2026",
      status: "closed",
      isOverdue: false,
      downstreamImpact: "Submission of the requested Data input prior to commencement of Baseline Analysis",
      linkedMilestones: ["MS02"]
    },
    {
      id: "D002",
      title: "ABACUS EA Tool Provision",
      owner: "DQ",
      dueDate: "29/01/2026",
      forecastDate: "29/01/2026+",
      status: "in-progress",
      isOverdue: false,
      downstreamImpact: "Provision of ABACUS EA tool for the purposes of ongoing compliance planning",
      linkedMilestones: ["MS04"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Dependencies & Blockers
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Overdue or blocking items • Downstream impact visible
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="#raid">
              View All Dependencies
              <ArrowRight className="h-3 w-3 ml-1.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dependencies.map((dep) => (
            <div 
              key={dep.id}
              className={cn(
                "p-4 rounded-lg border-l-4",
                dep.isOverdue ? "border-l-destructive bg-destructive/5" : "border-l-border bg-muted/30"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-mono">
                    {dep.id}
                  </Badge>
                  <span className="text-sm font-semibold">{dep.title}</span>
                </div>
                {dep.isOverdue && (
                  <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                    OVERDUE
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Owner</span>
                  <p className="text-sm font-medium">{dep.owner}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Due Date</span>
                  <p className={cn(
                    "text-sm font-medium",
                    dep.isOverdue && "text-destructive"
                  )}>
                    {dep.dueDate}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Forecast</span>
                  <p className="text-sm font-medium">{dep.forecastDate}</p>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-xs text-muted-foreground">Downstream Impact:</span>
                <p className="text-sm font-medium">{dep.downstreamImpact}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Affects:</span>
                {dep.linkedMilestones.map((ms, idx) => (
                  <Button 
                    key={idx}
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-6"
                    asChild
                  >
                    <Link to="#delivery">
                      {ms}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Commercial & Payment Awareness - Read-Only Status
function CommercialPaymentStatus() {
  const commercialStatus = [
    {
      milestone: "MS01",
      name: "Project Kickoff & Charter",
      value: 318215.25,
      approved: true,
      invoiced: true,
      paid: true,
      status: "complete"
    },
    {
      milestone: "MS02",
      name: "GRC Design Summary",
      value: 318215.25,
      approved: false,
      invoiced: false,
      paid: false,
      status: "pending-acceptance",
      blockingReason: "Awaiting client acceptance (2 days overdue)"
    },
    {
      milestone: "MS03",
      name: "Practice Playbook & Procedures",
      value: 318215.25,
      approved: false,
      invoiced: false,
      paid: false,
      status: "in-delivery"
    },
    {
      milestone: "MS04",
      name: "System Implementation & Deployment",
      value: 318215.25,
      approved: false,
      invoiced: false,
      paid: false,
      status: "in-delivery"
    }
  ];

  const totalValue = commercialStatus.reduce((sum, item) => sum + item.value, 0);
  const paidValue = commercialStatus.filter(item => item.paid).reduce((sum, item) => sum + item.value, 0);
  const invoicedValue = commercialStatus.filter(item => item.invoiced).reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Commercial & Payment Status
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Read-only view • Links to Commercials tab for details
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="#commercials">
              View Full Commercials
              <ArrowRight className="h-3 w-3 ml-1.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-xs text-muted-foreground mb-1">Total Contract</p>
            <p className="text-2xl font-bold">SAR {(totalValue / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <p className="text-xs text-muted-foreground mb-1">Invoiced</p>
            <p className="text-2xl font-bold text-info">SAR {(invoicedValue / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((invoicedValue / totalValue) * 100)}% of contract
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-xs text-muted-foreground mb-1">Paid</p>
            <p className="text-2xl font-bold text-success">SAR {(paidValue / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((paidValue / totalValue) * 100)}% collected
            </p>
          </div>
        </div>

        {/* Milestone Commercial Status */}
        <div className="space-y-2">
          {commercialStatus.map((item) => (
            <div 
              key={item.milestone}
              className={cn(
                "p-3 rounded-lg border",
                item.status === "complete" && "bg-success/5 border-success/20",
                item.status === "pending-acceptance" && "bg-warning/5 border-warning/20",
                item.status === "in-delivery" && "bg-muted/30"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-mono">
                    {item.milestone}
                  </Badge>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">
                  SAR {(item.value / 1000).toFixed(1)}K
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  {item.approved ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className={item.approved ? "text-success" : "text-muted-foreground"}>
                    Approved
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.invoiced ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className={item.invoiced ? "text-success" : "text-muted-foreground"}>
                    Invoiced
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.paid ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className={item.paid ? "text-success" : "text-muted-foreground"}>
                    Paid
                  </span>
                </div>
              </div>

              {item.blockingReason && (
                <div className="mt-2 text-xs bg-warning/10 p-2 rounded flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
                  <span className="text-warning">{item.blockingReason}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Main Status Report Tab Component
export function StatusReportTab() {
  const [reportPeriod, setReportPeriod] = useState("current-week");
  const [selectedReportId, setSelectedReportId] = useState("report-2026-w04");

  const currentReport = reportArchive.find(r => r.id === selectedReportId);

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // TODO: Implement PDF export
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = () => {
    console.log("Emailing report...");
    // TODO: Implement email functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Report Content */}
      <div className="lg:col-span-9 space-y-6">
        {/* Header with controls */}
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <div className="space-y-4">
              {/* Title and metadata */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Weekly Status Report</h2>
                      <p className="text-sm text-muted-foreground">
                        Digital GRC Strategy • Week {currentReport?.weekNumber} • {currentReport?.dateRange}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {currentReport?.status === "current" ? "Current Week" : "Archived"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <ReportPeriodSelector period={reportPeriod} onPeriodChange={setReportPeriod} />
                  <span className="text-xs text-muted-foreground">
                    Generated: {currentReport?.generatedDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleEmailReport}>
                    <Users className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button size="sm" onClick={handleExportPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <ExecutiveSummary />
        <ProgressTimelineStatus />
        <DeliveryHealthIndicators />
        <RisksIssuesLinked />
        <DependenciesBlockers />
        <CommercialPaymentStatus />

        {/* Footer */}
        <Card className="bg-muted/30">
          <CardContent className="py-3">
            <p className="text-xs text-muted-foreground text-center">
              This report is generated from live project data. All metrics link to underlying system records for full traceability.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Report Archive */}
      <div className="lg:col-span-3">
        <ReportArchive 
          currentReportId={selectedReportId}
          onSelectReport={setSelectedReportId}
        />
      </div>
    </div>
  );
}
