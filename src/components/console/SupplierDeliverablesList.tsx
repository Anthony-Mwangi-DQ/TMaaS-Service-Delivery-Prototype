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
  CalendarCheck,
  Upload,
  MoreHorizontal,
  Play,
  Send,
  XCircle
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Deliverable,
  DeliverableStatus,
  MilestoneType,
  deliverableStatusConfig,
  milestoneConfig,
  milestoneOrder,
} from "@/types/deliverable";

// Mock deliverables data for supplier view (DFSA/Khalifa Fund clients)
const mockDeliverables: Deliverable[] = [
  // Kickoff Deliverables
  {
    id: "1",
    name: "Project Charter",
    description: "Formal project authorization document",
    milestone: "Kickoff",
    status: "closed",
    contractedTargetDate: "Jan 15, 2024",
    finishDate: "Jan 15, 2024",
    currentVersion: "v1.0",
    versions: [
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "DQ Lead", comment: "Approved by steering committee" },
    ],
  },
  {
    id: "2",
    name: "Stakeholder Register",
    description: "Complete list of project stakeholders",
    milestone: "Kickoff",
    status: "closed",
    contractedTargetDate: "Jan 18, 2024",
    finishDate: "Jan 18, 2024",
    currentVersion: "v1.1",
    versions: [
      { version: "v1.1", uploadedDate: "Jan 18, 2024", uploadedBy: "DQ Lead", comment: "Added executive sponsors" },
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "DQ Lead", comment: "Initial stakeholder list" },
    ],
  },
  // Milestone 1 Deliverables
  {
    id: "3",
    name: "Platform Requirements Document",
    description: "Detailed functional and technical requirements",
    milestone: "Milestone 1",
    status: "closed",
    contractedTargetDate: "Feb 5, 2024",
    finishDate: "Feb 5, 2024",
    currentVersion: "v2.0",
    versions: [
      { version: "v2.0", uploadedDate: "Feb 5, 2024", uploadedBy: "DQ Lead", comment: "Final approved version" },
      { version: "v1.0", uploadedDate: "Jan 28, 2024", uploadedBy: "DQ Lead", comment: "Initial requirements" },
    ],
  },
  // Milestone 2 Deliverables
  {
    id: "4",
    name: "Ecommerce Platform Design",
    description: "UI/UX design specifications and wireframes",
    milestone: "Milestone 2",
    status: "pending-acceptance",
    contractedTargetDate: "Feb 25, 2024",
    forecastedDate: "Feb 22, 2024",
    startDate: "Feb 5, 2024",
    currentVersion: "v2.1",
    versions: [
      { version: "v2.1", uploadedDate: "Feb 20, 2024", uploadedBy: "DQ Lead", comment: "Incorporated client feedback on checkout flow" },
      { version: "v2.0", uploadedDate: "Feb 15, 2024", uploadedBy: "DQ Lead", comment: "Added mobile responsive designs" },
      { version: "v1.0", uploadedDate: "Feb 5, 2024", uploadedBy: "DQ Lead", comment: "Initial design draft" },
    ],
  },
  {
    id: "5",
    name: "Integration Architecture",
    description: "System integration specifications and API design",
    milestone: "Milestone 2",
    status: "in-progress",
    contractedTargetDate: "Feb 28, 2024",
    forecastedDate: "Feb 28, 2024",
    startDate: "Feb 15, 2024",
    currentVersion: "v1.0",
    versions: [
      { version: "v1.0", uploadedDate: "Feb 15, 2024", uploadedBy: "DQ Lead", comment: "Work in progress" },
    ],
  },
  // Milestone 3 Deliverables
  {
    id: "6",
    name: "Development Sprint 1 Release",
    description: "Core platform features implementation",
    milestone: "Milestone 3",
    status: "not-started",
    contractedTargetDate: "Mar 15, 2024",
    versions: [],
  },
  {
    id: "7",
    name: "Testing & QA Report",
    description: "Comprehensive testing documentation",
    milestone: "Milestone 3",
    status: "not-started",
    contractedTargetDate: "Mar 20, 2024",
    versions: [],
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
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Package className="h-4 w-4 text-muted-foreground" />;
  }
}

function SupplierDeliverableRow({ deliverable }: { deliverable: Deliverable }) {
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
            
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10 shrink-0">
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
            {/* Status Actions for Supplier */}
            {deliverable.status === "not-started" && (
              <Button size="sm" variant="outline" className="text-[#001035] border-[#001035]/30">
                <Play className="h-4 w-4 mr-1.5" />
                Start
              </Button>
            )}
            {deliverable.status === "in-progress" && (
              <Button size="sm" className="bg-[#001035] hover:bg-[#001035]/90">
                <Send className="h-4 w-4 mr-1.5" />
                Submit for Acceptance
              </Button>
            )}
            {deliverable.status === "pending-acceptance" && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                Awaiting Client
              </Badge>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Version
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Update Forecast Date
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Request Outscope
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                      index === 0 ? "border-[#001035]/30 bg-[#001035]/5" : "border-border bg-muted/30"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={index === 0 ? "default" : "secondary"} 
                          className={index === 0 ? "bg-[#001035]" : ""}
                        >
                          {version.version}
                        </Badge>
                        {index === 0 && (
                          <span className="text-xs text-[#001035] font-medium">Current</span>
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

export function SupplierDeliverablesList() {
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
  const inProgress = mockDeliverables.filter(d => d.status === "in-progress").length;

  // Supplier-specific milestone config with navy branding
  const supplierMilestoneConfig: Record<MilestoneType, { color: string; order: number }> = {
    "Kickoff": { color: "bg-success/10 text-success border-success/20", order: 0 },
    "Milestone 1": { color: "bg-info/10 text-info border-info/20", order: 1 },
    "Milestone 2": { color: "bg-[#001035]/10 text-[#001035] border-[#001035]/20", order: 2 },
    "Milestone 3": { color: "bg-warning/10 text-warning border-warning/20", order: 3 },
    "Milestone 4": { color: "bg-accent text-accent-foreground border-border", order: 4 },
    "Closure": { color: "bg-muted text-muted-foreground border-border", order: 5 },
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats and Upload */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <Package className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Deliverables</h2>
              <p className="text-sm text-muted-foreground">
                Manage and submit contractual outputs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 mr-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{closedDeliverables}/{totalDeliverables}</p>
                <p className="text-xs text-muted-foreground">Accepted</p>
              </div>
              {pendingAcceptance > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{pendingAcceptance}</p>
                  <p className="text-xs text-muted-foreground">Awaiting Client</p>
                </div>
              )}
              {inProgress > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">{inProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              )}
            </div>
            <Button className="bg-[#001035] hover:bg-[#001035]/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload Deliverable
            </Button>
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
                  <Badge variant="outline" className={cn("text-xs", supplierMilestoneConfig[milestone]?.color)}>
                    {milestone}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {milestoneCompleted}/{milestoneTotal} accepted
                  </span>
                </div>
                <div className="space-y-2 ml-2 pl-4 border-l-2 border-border">
                  {deliverables.map((deliverable) => (
                    <SupplierDeliverableRow key={deliverable.id} deliverable={deliverable} />
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
