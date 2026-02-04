import { useState } from "react";
import { 
  Package, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Eye,
  Download,
  History,
  User,
  MessageSquare,
  Target,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Deliverable,
  DeliverableStatus,
  MilestoneType,
  deliverableStatusConfig,
  milestoneConfig,
  milestoneOrder,
} from "@/types/deliverable";

// STC Deliverables Data
const mockDeliverables: Deliverable[] = [
  // Milestone 1 (MS01)
  {
    id: "1",
    name: "Project Charter",
    description: "Formal project authorization and governance document",
    milestone: "Milestone 1",
    status: "closed",
    contractedTargetDate: "27/02/2024",
    finishDate: "07/03/2025",
    currentVersion: "v1.0",
    versions: [
      { version: "v1.0", uploadedDate: "07/03/2025", uploadedBy: "DQ Lead", comment: "Accepted and closed" },
    ],
  },
  // Milestone 2 (MS02)
  {
    id: "2",
    name: "Digital GRC Design Summary",
    description: "Comprehensive design documentation for Digital GRC implementation",
    milestone: "Milestone 2",
    status: "pending-acceptance",
    contractedTargetDate: "10/07/2025",
    forecastedDate: "08/01/2026",
    currentVersion: "v1.0",
    versions: [
      { version: "v1.0", uploadedDate: "08/01/2026", uploadedBy: "DQ Lead", comment: "Submitted for client acceptance" },
    ],
  },
  // Milestone 3 (MS03)
  {
    id: "3",
    name: "Digital GRC Practice Playbook",
    description: "Operational playbook for GRC practice implementation",
    milestone: "Milestone 3",
    status: "in-progress",
    contractedTargetDate: "31/07/2025",
    forecastedDate: "05/02/2026",
    startDate: "15/08/2025",
    currentVersion: "v0.3",
    versions: [
      { version: "v0.3", uploadedDate: "20/01/2026", uploadedBy: "DQ Lead", comment: "Work in progress - major gaps identified" },
    ],
  },
  {
    id: "4",
    name: "Attachment: Target Procedure (4x)",
    description: "Four target procedure documents for GRC implementation",
    milestone: "Milestone 3",
    status: "in-progress",
    contractedTargetDate: "31/07/2025",
    forecastedDate: "05/02/2026",
    startDate: "01/09/2025",
    currentVersion: "v0.2",
    versions: [
      { version: "v0.2", uploadedDate: "15/01/2026", uploadedBy: "DQ Lead", comment: "Draft procedures under review" },
    ],
  },
  {
    id: "5",
    name: "Attachment: Job Descriptions (2x)",
    description: "Role definitions for GRC positions",
    milestone: "Milestone 3",
    status: "outscoped",
    outscopeReason: "Client confirmed job descriptions will be handled internally by HR",
    contractedTargetDate: "31/07/2025",
    forecastedDate: "08/01/2026",
    versions: [],
  },
  // Milestone 4 (MS04)
  {
    id: "6",
    name: "System Implementation Documents",
    description: "Technical implementation documentation for system deployment",
    milestone: "Milestone 4",
    status: "in-progress",
    contractedTargetDate: "02/06/2025",
    forecastedDate: "02/03/2026",
    startDate: "10/06/2025",
    currentVersion: "v0.4",
    versions: [
      { version: "v0.4", uploadedDate: "25/01/2026", uploadedBy: "DQ Lead", comment: "Implementation docs in progress" },
    ],
  },
  {
    id: "7",
    name: "User & Admin Guides",
    description: "End-user and administrator documentation",
    milestone: "Milestone 4",
    status: "not-started",
    contractedTargetDate: "28/07/2025",
    forecastedDate: "02/03/2026",
    versions: [],
  },
  {
    id: "8",
    name: "Support: System Transition",
    description: "Transition support documentation and handover materials",
    milestone: "Milestone 4",
    status: "not-started",
    forecastedDate: "02/03/2026",
    contractedTargetDate: "",
    versions: [],
  },
  {
    id: "9",
    name: "Deploy DTMP – Docwriter",
    description: "Document management platform - Docwriter module deployment",
    milestone: "Milestone 4",
    status: "in-progress",
    contractedTargetDate: "07/07/2025",
    forecastedDate: "02/03/2026",
    startDate: "15/07/2025",
    currentVersion: "v0.5",
    versions: [
      { version: "v0.5", uploadedDate: "20/01/2026", uploadedBy: "DQ Lead", comment: "Docwriter deployment in progress" },
    ],
  },
  {
    id: "10",
    name: "Deploy DTMP – Repository",
    description: "Document management platform - Repository module deployment",
    milestone: "Milestone 4",
    status: "in-progress",
    contractedTargetDate: "28/07/2025",
    forecastedDate: "02/03/2026",
    startDate: "01/08/2025",
    currentVersion: "v0.3",
    versions: [
      { version: "v0.3", uploadedDate: "18/01/2026", uploadedBy: "DQ Lead", comment: "Repository configuration ongoing" },
    ],
  },
  {
    id: "11",
    name: "Deploy DTMP – Analytics (Compliance Dashboard)",
    description: "Document management platform - Compliance analytics dashboard",
    milestone: "Milestone 4",
    status: "in-progress",
    contractedTargetDate: "07/07/2025",
    forecastedDate: "02/03/2026",
    startDate: "20/07/2025",
    currentVersion: "v0.4",
    versions: [
      { version: "v0.4", uploadedDate: "22/01/2026", uploadedBy: "DQ Lead", comment: "Dashboard widgets under development" },
    ],
  },
];

function getStatusIcon(status: DeliverableStatus) {
  switch (status) {
    case "closed":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "pending-acceptance":
      return <Clock className="h-4 w-4 text-warning" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-info" />;
    case "delayed":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "outscoped":
      return <Package className="h-4 w-4 text-muted-foreground line-through" />;
    default:
      return <Package className="h-4 w-4 text-muted-foreground" />;
  }
}

function DeliverableRow({ deliverable }: { deliverable: Deliverable }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasVersions = deliverable.versions.length > 0;
  const statusConfig = deliverableStatusConfig[deliverable.status];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn(
        "rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors",
        deliverable.status === "outscoped" && "opacity-60"
      )}>
        <div className="flex items-center justify-between p-4 group">
          <div className="flex items-center gap-3 flex-1">
            {hasVersions ? (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </CollapsibleTrigger>
            ) : (
              <div className="w-8" />
            )}
            
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              {getStatusIcon(deliverable.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn(
                  "text-sm font-medium text-foreground",
                  deliverable.status === "outscoped" && "line-through text-muted-foreground"
                )}>
                  {deliverable.name}
                </span>
                {deliverable.currentVersion && (
                  <span className="text-xs text-muted-foreground">{deliverable.currentVersion}</span>
                )}
                <Badge variant="outline" className={cn("text-xs", statusConfig.color)}>
                  {statusConfig.label}
                </Badge>
              </div>
              {deliverable.description && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {deliverable.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Target: {deliverable.contractedTargetDate}
                </span>
                {deliverable.forecastedDate && deliverable.status !== "closed" && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Forecast: {deliverable.forecastedDate}
                  </span>
                )}
                {deliverable.finishDate && (
                  <span className="flex items-center gap-1 text-success">
                    <CalendarCheck className="h-3 w-3" />
                    Completed: {deliverable.finishDate}
                  </span>
                )}
                {deliverable.versions.length > 1 && (
                  <span className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    {deliverable.versions.length} versions
                  </span>
                )}
              </div>
              {deliverable.outscopeReason && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  Reason: {deliverable.outscopeReason}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {deliverable.status === "pending-acceptance" && (
              <>
                <Button size="sm" className="bg-success hover:bg-success/90 text-white">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10">
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Request Changes
                </Button>
              </>
            )}
            {(deliverable.status === "in-progress" || deliverable.status === "closed") && hasVersions && (
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1.5" />
                Add Feedback
              </Button>
            )}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {hasVersions && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {hasVersions && (
          <CollapsibleContent>
            <div className="px-4 pb-4 pt-0">
              <div className="ml-[52px] border-l-2 border-border pl-4 space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <History className="h-3.5 w-3.5" />
                  Version History
                </h4>
                {deliverable.versions.map((version, index) => (
                  <div
                    key={version.version}
                    className={cn(
                      "flex items-start justify-between p-3 rounded-md border",
                      index === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                          {version.version}
                        </Badge>
                        {index === 0 && (
                          <span className="text-xs text-primary font-medium">Current</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {version.uploadedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {version.uploadedDate}
                        </span>
                      </div>
                      {version.comment && (
                        <p className="text-xs text-foreground flex items-start gap-1.5 mt-1">
                          <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                          {version.comment}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
}

export function DeliverablesList() {
  // Group deliverables by milestone
  const deliverablesByMilestone = mockDeliverables.reduce((acc, deliverable) => {
    const milestone = deliverable.milestone;
    if (!acc[milestone]) acc[milestone] = [];
    acc[milestone].push(deliverable);
    return acc;
  }, {} as Record<MilestoneType, Deliverable[]>);

  // Calculate stats
  const totalDeliverables = mockDeliverables.filter(d => d.status !== "outscoped").length;
  const closedDeliverables = mockDeliverables.filter(d => d.status === "closed").length;
  const pendingAcceptance = mockDeliverables.filter(d => d.status === "pending-acceptance").length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Deliverables Management</h2>
              <p className="text-sm text-muted-foreground">
                Review outputs, provide feedback, and approve deliverables
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{closedDeliverables}/{totalDeliverables}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
            {pendingAcceptance > 0 && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-sm px-3 py-1">
                {pendingAcceptance} Awaiting Your Review
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {milestoneOrder.map((milestone) => {
            const deliverables = deliverablesByMilestone[milestone];
            if (!deliverables || deliverables.length === 0) return null;

            const milestoneCompleted = deliverables.filter(d => d.status === "closed").length;
            const milestoneTotal = deliverables.filter(d => d.status !== "outscoped").length;

            return (
              <div key={milestone}>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={cn("text-xs", milestoneConfig[milestone]?.color)}>
                    {milestone}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {milestoneCompleted}/{milestoneTotal} completed
                  </span>
                </div>
                <div className="space-y-2 ml-2 pl-4 border-l-2 border-border">
                  {deliverables.map((deliverable) => (
                    <DeliverableRow key={deliverable.id} deliverable={deliverable} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
