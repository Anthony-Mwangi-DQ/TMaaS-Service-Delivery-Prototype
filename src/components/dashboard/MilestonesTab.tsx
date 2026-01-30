import { useState } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileCheck,
  Receipt,
  Banknote,
  ChevronDown,
  ChevronRight,
  Package,
  MessageSquare,
  Eye,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Milestone,
  MilestoneStatus,
  MilestoneActivity,
  MilestoneNote,
  milestoneStatusConfig,
  milestoneStatusOrder,
  isStatusComplete
} from "@/types/milestone";
import { MilestoneActivityTimeline } from "./MilestoneActivityTimeline";

// Mock data using real STC project data
// Deliverable data for linking
const linkedDeliverables: Record<string, { id: string; name: string; status: string }[]> = {
  "ms01": [
    { id: "del-1", name: "Project Charter", status: "closed" }
  ],
  "ms02": [
    { id: "del-2", name: "Digital GRC Design Summary", status: "pending-acceptance" }
  ],
  "ms03": [
    { id: "del-3", name: "Digital GRC Practice Playbook", status: "in-progress" },
    { id: "del-4", name: "Attachment: Target Procedure (4x)", status: "in-progress" },
    { id: "del-5", name: "Attachment: Job Descriptions (2x)", status: "outscoped" }
  ],
  "ms04": [
    { id: "del-6", name: "System Implementation Documents", status: "in-progress" },
    { id: "del-7", name: "User & Admin Guides", status: "not-started" },
    { id: "del-8", name: "Support: System Transition", status: "not-started" },
    { id: "del-9", name: "Deploy DTMP – Docwriter", status: "in-progress" },
    { id: "del-10", name: "Deploy DTMP – Repository", status: "in-progress" },
    { id: "del-11", name: "Deploy DTMP – Analytics (Compliance Dashboard)", status: "in-progress" }
  ]
};

const mockMilestones: Milestone[] = [
  {
    id: "ms01",
    name: "Project Kickoff & Charter",
    code: "MS01",
    status: "paid",
    value: 318215.25,
    percentageOfProject: 25,
    currency: "SAR",
    originalContractDate: "27/02/2025",
    forecastDate: "27/02/2025",
    actualDate: "07/03/2025",
    acceptanceDate: "10/03/2025",
    invoiceDate: "12/03/2025",
    paymentDate: "25/03/2025",
    linkedDeliverableIds: ["del-1"],
    isDelayed: false,
    activityLog: [
      {
        id: "act-1",
        timestamp: "2025-03-25T14:30:00Z",
        activityType: "status-change",
        actor: "System",
        description: "Milestone status changed to Paid",
        metadata: { from: "Invoiced", to: "Paid" }
      },
      {
        id: "act-2",
        timestamp: "2025-03-12T09:15:00Z",
        activityType: "status-change",
        actor: "Sarah Mitchell",
        description: "Invoice issued for milestone",
        metadata: { from: "Accepted", to: "Invoiced" }
      },
      {
        id: "act-3",
        timestamp: "2025-03-10T16:45:00Z",
        activityType: "acceptance",
        actor: "Jane Doe",
        description: "Milestone accepted by client",
        metadata: { from: "Delivered", to: "Accepted" }
      }
    ],
    notes: [
      {
        id: "note-1",
        timestamp: "2025-03-08T10:00:00Z",
        author: "Sarah Mitchell",
        content: "Kickoff meeting went well. All stakeholders aligned on objectives and timeline.",
        isInternal: false,
        tags: ["kickoff"]
      }
    ]
  },
  {
    id: "ms02",
    name: "GRC Design Summary",
    code: "MS02",
    status: "delivered",
    value: 318215.25,
    percentageOfProject: 25,
    currency: "SAR",
    originalContractDate: "10/07/2025",
    forecastDate: "08/01/2026",
    actualDate: "06/01/2026",
    linkedDeliverableIds: ["del-2"],
    isDelayed: true,
    activityLog: [
      {
        id: "act-4",
        timestamp: "2026-01-06T17:30:00Z",
        activityType: "status-change",
        actor: "Ahmed Hassan",
        description: "Milestone delivered to client",
        metadata: { from: "In Delivery", to: "Delivered" }
      },
      {
        id: "act-5",
        timestamp: "2025-12-15T11:20:00Z",
        activityType: "date-change",
        actor: "Sarah Mitchell",
        description: "Forecast date updated due to scope expansion",
        metadata: { 
          from: "10/12/2025", 
          to: "08/01/2026",
          reason: "Client requested additional risk categories and detailed impact analysis, requiring 4 additional weeks"
        }
      },
      {
        id: "act-6",
        timestamp: "2025-11-20T14:00:00Z",
        activityType: "deliverable-update",
        actor: "Ahmed Hassan",
        description: "Design document v2.0 uploaded for review",
        metadata: { documentName: "GRC_Design_Summary_v2.0.pdf" }
      }
    ],
    notes: [
      {
        id: "note-2",
        timestamp: "2026-01-07T09:00:00Z",
        author: "Sarah Mitchell",
        content: "Delivered successfully. Awaiting client acceptance. Follow up scheduled for next week.",
        isInternal: false
      },
      {
        id: "note-3",
        timestamp: "2025-12-15T11:30:00Z",
        author: "Sarah Mitchell",
        content: "Delay caused by client-requested scope expansion. Additional 4 weeks needed for comprehensive risk analysis.",
        isInternal: true,
        tags: ["delay", "scope-change"]
      }
    ]
  },
  {
    id: "ms03",
    name: "Practice Playbook & Procedures",
    code: "MS03",
    status: "in-delivery",
    value: 318215.25,
    percentageOfProject: 25,
    currency: "SAR",
    originalContractDate: "31/07/2025",
    forecastDate: "05/02/2026",
    linkedDeliverableIds: ["del-3", "del-4", "del-5"],
    isDelayed: true,
    activityLog: [
      {
        id: "act-7",
        timestamp: "2026-01-20T10:00:00Z",
        activityType: "deliverable-update",
        actor: "Mike Chen",
        description: "Job Descriptions deliverable marked as outscoped",
        metadata: { deliverableId: "del-5", reason: "Client confirmed internal HR will handle job descriptions" }
      },
      {
        id: "act-8",
        timestamp: "2026-01-15T15:30:00Z",
        activityType: "date-change",
        actor: "Sarah Mitchell",
        description: "Forecast date adjusted",
        metadata: { 
          from: "31/01/2026", 
          to: "05/02/2026",
          reason: "Resource constraints and scope clarification discussions extended timeline by 1 week"
        }
      },
      {
        id: "act-9",
        timestamp: "2025-12-10T09:00:00Z",
        activityType: "comment",
        actor: "Jane Doe",
        description: "Client requested clarification on procedure templates",
        metadata: { reason: "Need to align with existing organizational standards" }
      }
    ],
    notes: [
      {
        id: "note-4",
        timestamp: "2026-01-20T10:15:00Z",
        author: "Sarah Mitchell",
        content: "Agreed with client to descope Job Descriptions deliverable. This will help us meet the revised timeline.",
        isInternal: false,
        tags: ["scope-change", "decision"]
      },
      {
        id: "note-5",
        timestamp: "2026-01-15T16:00:00Z",
        author: "Mike Chen",
        content: "Team working overtime to minimize further delays. Playbook at 60% completion.",
        isInternal: true,
        tags: ["progress"]
      }
    ]
  },
  {
    id: "ms04",
    name: "System Implementation & Deployment",
    code: "MS04",
    status: "in-delivery",
    value: 318215.25,
    percentageOfProject: 25,
    currency: "SAR",
    originalContractDate: "28/07/2025",
    adjustedContractDate: "02/03/2026",
    forecastDate: "02/03/2026",
    linkedDeliverableIds: ["del-6", "del-7", "del-8", "del-9", "del-10", "del-11"],
    isDelayed: false,
    activityLog: [
      {
        id: "act-10",
        timestamp: "2026-01-25T11:00:00Z",
        activityType: "status-change",
        actor: "Ahmed Hassan",
        description: "Milestone moved to In Delivery",
        metadata: { from: "New", to: "In Delivery" }
      },
      {
        id: "act-11",
        timestamp: "2026-01-15T14:00:00Z",
        activityType: "date-change",
        actor: "Sarah Mitchell",
        description: "Contract date adjusted by mutual agreement",
        metadata: { 
          from: "28/07/2025", 
          to: "02/03/2026",
          reason: "Contractual adjustment to accommodate MS03 delays and ensure quality delivery"
        }
      }
    ],
    notes: [
      {
        id: "note-6",
        timestamp: "2026-01-26T09:30:00Z",
        author: "Ahmed Hassan",
        content: "Implementation started. Waiting for client API access to proceed with integration work.",
        isInternal: false,
        tags: ["blocked", "dependency"]
      }
    ]
  }
];

// Helper function for deliverable status badges
const getDeliverableStatusBadge = (status: string) => {
  switch (status) {
    case "closed":
      return <Badge variant="outline" className="text-success border-success/30 bg-success/10 text-[10px]">Closed</Badge>;
    case "pending-acceptance":
      return <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10 text-[10px]">Pending</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="text-info border-info/30 bg-info/10 text-[10px]">In Progress</Badge>;
    case "outscoped":
      return <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30 bg-muted text-[10px]">Outscoped</Badge>;
    default:
      return <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Started</Badge>;
  }
};

// Lifecycle step component
function LifecycleStep({ 
  status, 
  currentStatus, 
  icon: Icon,
  label,
  date
}: { 
  status: MilestoneStatus;
  currentStatus: MilestoneStatus;
  icon: React.ElementType;
  label: string;
  date?: string;
}) {
  const isComplete = isStatusComplete(currentStatus, status);
  const isCurrent = currentStatus === status;
  const config = milestoneStatusConfig[status];
  
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div 
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
          isComplete && "bg-success border-success text-success-foreground",
          isCurrent && `${config.bgColor} ${config.borderColor} ${config.color}`,
          !isComplete && !isCurrent && "bg-muted border-muted-foreground/20 text-muted-foreground/50"
        )}
      >
        {isComplete ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>
      <span className={cn(
        "text-[10px] font-medium",
        isCurrent ? config.color : isComplete ? "text-success" : "text-muted-foreground/60"
      )}>
        {label}
      </span>
      {date && (isCurrent || isComplete) && (
        <span className="text-[9px] text-muted-foreground">
          {date}
        </span>
      )}
    </div>
  );
}

// Lifecycle progress bar
function LifecycleProgress({ milestone }: { milestone: Milestone }) {
  const lifecycleSteps: { status: MilestoneStatus; icon: React.ElementType; label: string; dateKey: keyof Milestone }[] = [
    { status: "new", icon: Package, label: "New", dateKey: "originalContractDate" },
    { status: "in-delivery", icon: Clock, label: "In Delivery", dateKey: "forecastDate" },
    { status: "delivered", icon: FileCheck, label: "Delivered", dateKey: "actualDate" },
    { status: "accepted", icon: CheckCircle2, label: "Accepted", dateKey: "acceptanceDate" },
    { status: "invoiced", icon: Receipt, label: "Invoiced", dateKey: "invoiceDate" },
    { status: "paid", icon: Banknote, label: "Paid", dateKey: "paymentDate" }
  ];

  const currentIndex = milestoneStatusOrder.indexOf(milestone.status);
  const progressPercentage = ((currentIndex + 1) / milestoneStatusOrder.length) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted" />
        <div 
          className="absolute top-4 left-4 h-0.5 bg-success transition-all"
          style={{ width: `calc(${progressPercentage}% - 32px)` }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {lifecycleSteps.map((step) => (
            <LifecycleStep
              key={step.status}
              status={step.status}
              currentStatus={milestone.status}
              icon={step.icon}
              label={step.label}
              date={milestone[step.dateKey] as string | undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Date comparison component
function DateCompare({ 
  label, 
  contractDate, 
  adjustedDate,
  forecastDate, 
  actualDate,
  isDelayed 
}: { 
  label: string;
  contractDate: string;
  adjustedDate?: string;
  forecastDate?: string;
  actualDate?: string;
  isDelayed: boolean;
}) {
  const effectiveContractDate = adjustedDate || contractDate;
  
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      {/* Contract baseline */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Contract
        </span>
        <div className="flex flex-col">
          <span className={cn(
            "font-medium",
            adjustedDate && "line-through text-muted-foreground text-xs"
          )}>
            {contractDate}
          </span>
          {adjustedDate && (
            <span className="font-medium text-foreground">
              {adjustedDate}
            </span>
          )}
        </div>
      </div>
      
      {/* Forecast */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Forecast
        </span>
        <span className={cn(
          "font-medium block",
          isDelayed ? "text-destructive" : "text-foreground"
        )}>
          {forecastDate || "—"}
        </span>
      </div>
      
      {/* Actual */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Actual
        </span>
        <span className="font-medium text-success block">
          {actualDate || "—"}
        </span>
      </div>
    </div>
  );
}

// Milestone acceptance workflow dialog
function MilestoneAcceptanceDialog({ 
  milestone, 
  onAccept,
  onRequestChanges 
}: { 
  milestone: Milestone;
  onAccept: () => void;
  onRequestChanges: (feedback: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"review" | "feedback" | "confirm">("review");
  const [feedback, setFeedback] = useState("");
  const [reviewChecklist, setReviewChecklist] = useState({
    deliverablesReviewed: false,
    criteriaValidated: false,
    qualityAcceptable: false,
  });

  const deliverables = linkedDeliverables[milestone.id] || [];
  const allChecklistComplete = Object.values(reviewChecklist).every(v => v);

  const handleAccept = () => {
    onAccept();
    setIsOpen(false);
    setStep("review");
  };

  const handleRequestChanges = () => {
    onRequestChanges(feedback);
    setIsOpen(false);
    setStep("review");
    setFeedback("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <FileCheck className="h-4 w-4" />
          Review Milestone
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Milestone Acceptance Review</DialogTitle>
          <DialogDescription>
            Review and accept <strong>{milestone.name}</strong> ({milestone.code})
          </DialogDescription>
        </DialogHeader>

        {step === "review" && (
          <div className="space-y-4 py-4">
            {/* Milestone Summary */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Milestone Value</p>
                  <p className="font-semibold text-foreground">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR', minimumFractionDigits: 2 }).format(milestone.value)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Delivered On</p>
                  <p className="font-semibold text-foreground">{milestone.actualDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contract Date</p>
                  <p className="font-medium text-foreground">
                    {milestone.adjustedContractDate || milestone.originalContractDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Delivery Status</p>
                  {milestone.isDelayed ? (
                    <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                      Delivered Late
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                      On Time
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Linked Deliverables Review */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Linked Deliverables ({deliverables.length})
              </h4>
              <div className="space-y-2">
                {deliverables.map(deliverable => (
                  <div 
                    key={deliverable.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-background"
                  >
                    <div className="flex items-center gap-2">
                      {deliverable.status === "closed" || deliverable.status === "pending-acceptance" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      )}
                      <span className="text-sm text-foreground">{deliverable.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDeliverableStatusBadge(deliverable.status)}
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceptance Checklist */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Acceptance Checklist</h4>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={reviewChecklist.deliverablesReviewed}
                    onChange={(e) => setReviewChecklist(prev => ({ ...prev, deliverablesReviewed: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">All deliverables reviewed</p>
                    <p className="text-xs text-muted-foreground">I have reviewed all {deliverables.length} linked deliverables</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={reviewChecklist.criteriaValidated}
                    onChange={(e) => setReviewChecklist(prev => ({ ...prev, criteriaValidated: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Acceptance criteria validated</p>
                    <p className="text-xs text-muted-foreground">All contractual requirements have been met</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={reviewChecklist.qualityAcceptable}
                    onChange={(e) => setReviewChecklist(prev => ({ ...prev, qualityAcceptable: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Quality is acceptable</p>
                    <p className="text-xs text-muted-foreground">Work meets expected quality standards</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Comments */}
            <div>
              <Label htmlFor="comments" className="text-sm font-medium">Comments (Optional)</Label>
              <Textarea 
                id="comments"
                placeholder="Add any comments or notes about this milestone..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        )}

        {step === "feedback" && (
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Request Changes</p>
                  <p className="text-xs text-muted-foreground">
                    The supplier will be notified and can address your feedback before resubmission.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="feedback" className="text-sm font-medium">
                What changes are needed? <span className="text-destructive">*</span>
              </Label>
              <Textarea 
                id="feedback"
                placeholder="Describe the changes or improvements needed..."
                className="mt-2"
                rows={6}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific about what needs to be changed or improved.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {step === "review" && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setStep("feedback")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Changes
              </Button>
              <Button 
                onClick={handleAccept}
                disabled={!allChecklistComplete}
                className="bg-success hover:bg-success/90"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Accept Milestone
              </Button>
            </>
          )}
          {step === "feedback" && (
            <>
              <Button variant="outline" onClick={() => setStep("review")}>
                Back
              </Button>
              <Button 
                onClick={handleRequestChanges}
                disabled={!feedback.trim()}
                variant="destructive"
              >
                Submit Feedback
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function MilestoneCard({ milestone, isExpanded, onToggle }: { 
  milestone: Milestone; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = milestoneStatusConfig[milestone.status];
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(milestone.value);

  const deliverables = linkedDeliverables[milestone.id] || [];
  const closedCount = deliverables.filter(d => d.status === "closed").length;
  const activeCount = deliverables.filter(d => d.status !== "closed" && d.status !== "outscoped").length;

  return (
    <Card className={cn(
      "transition-all",
      milestone.isDelayed && milestone.status !== "paid" && milestone.status !== "accepted" && "border-l-4 border-l-destructive"
    )}>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Expand/collapse */}
                <div className="text-muted-foreground">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                
                {/* Milestone code & name */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                    {milestone.code}
                  </span>
                  <CardTitle className="text-base font-semibold">
                    {milestone.name}
                  </CardTitle>
                </div>
                
                {/* Delayed flag */}
                {milestone.isDelayed && milestone.status !== "paid" && milestone.status !== "accepted" && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Delayed
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-6">
                {/* Status badge */}
                <Badge className={cn(
                  "gap-1.5 px-3 py-1",
                  config.bgColor,
                  config.color,
                  "border",
                  config.borderColor
                )}>
                  {config.label}
                </Badge>
                
                {/* Commercial value */}
                <div className="text-right">
                  <div className="font-semibold">{formattedValue}</div>
                  <div className="text-xs text-muted-foreground">
                    {milestone.percentageOfProject}% of project
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-6 space-y-6">
            {/* Tabs for Details and Activity */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Milestone Details</TabsTrigger>
                <TabsTrigger value="activity">
                  Activity & Notes
                  {milestone.activityLog && milestone.activityLog.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">
                      {(milestone.activityLog?.length || 0) + (milestone.notes?.length || 0)}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-4">
                {/* Lifecycle visualization */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <LifecycleProgress milestone={milestone} />
                </div>
                
                {/* Date comparison */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Delivery Dates</h4>
                    <DateCompare
                      label="Delivery"
                      contractDate={milestone.originalContractDate}
                      adjustedDate={milestone.adjustedContractDate}
                      forecastDate={milestone.forecastDate}
                      actualDate={milestone.actualDate}
                      isDelayed={milestone.isDelayed}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Acceptance & Payment</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Accepted
                        </span>
                        <span className="font-medium block">
                          {milestone.acceptanceDate || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Invoiced
                        </span>
                        <span className="font-medium block">
                          {milestone.invoiceDate || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Paid
                        </span>
                        <span className="font-medium block text-success">
                          {milestone.paymentDate || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Linked deliverables */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>Linked Deliverables</span>
                      <span className="text-muted-foreground">
                        ({closedCount}/{deliverables.filter(d => d.status !== "outscoped").length} complete)
                      </span>
                    </div>
                    
                    {/* Accept button for client (only when delivered) */}
                    {milestone.status === "delivered" && (
                      <MilestoneAcceptanceDialog 
                        milestone={milestone}
                        onAccept={() => console.log(`Accepted milestone ${milestone.id}`)}
                        onRequestChanges={(feedback) => console.log(`Requested changes: ${feedback}`)}
                      />
                    )}
                  </div>
                  
                  {/* Deliverables list */}
                  <div className="space-y-2">
                    {deliverables.map(deliverable => (
                      <div 
                        key={deliverable.id}
                        className={cn(
                          "flex items-center justify-between p-2.5 rounded-md border",
                          deliverable.status === "outscoped" ? "bg-muted/30 opacity-60" : "bg-background"
                        )}
                      >
                        <span className={cn(
                          "text-sm",
                          deliverable.status === "outscoped" && "line-through text-muted-foreground"
                        )}>
                          {deliverable.name}
                        </span>
                        {getDeliverableStatusBadge(deliverable.status)}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <MilestoneActivityTimeline
                  activities={milestone.activityLog}
                  notes={milestone.notes}
                  onAddNote={(content, isInternal, tags) => {
                    console.log("Adding note:", { content, isInternal, tags });
                    // TODO: Implement note addition
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export function MilestonesTab() {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set(["ms02", "ms03"]));

  const toggleMilestone = (id: string) => {
    setExpandedMilestones(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Milestone cards */}
      <div className="space-y-4">
        {mockMilestones.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            isExpanded={expandedMilestones.has(milestone.id)}
            onToggle={() => toggleMilestone(milestone.id)}
          />
        ))}
      </div>
    </div>
  );
}
