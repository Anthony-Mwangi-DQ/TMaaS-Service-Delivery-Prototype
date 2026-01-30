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
  Play,
  Send,
  Edit3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Milestone,
  MilestoneStatus,
  milestoneStatusConfig,
  milestoneStatusOrder,
  isStatusComplete,
  getNextStatus
} from "@/types/milestone";

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

// Mock data using real STC project data (same as customer view)
const mockMilestones: Milestone[] = [
  {
    id: "ms01",
    name: "Project Kickoff & Charter",
    code: "MS01",
    status: "paid",
    value: 75000,
    percentageOfProject: 15,
    currency: "USD",
    originalContractDate: "27/02/2025",
    forecastDate: "27/02/2025",
    actualDate: "07/03/2025",
    acceptanceDate: "10/03/2025",
    invoiceDate: "12/03/2025",
    paymentDate: "25/03/2025",
    linkedDeliverableIds: ["del-1"],
    isDelayed: false
  },
  {
    id: "ms02",
    name: "GRC Design Summary",
    code: "MS02",
    status: "delivered",
    value: 100000,
    percentageOfProject: 20,
    currency: "USD",
    originalContractDate: "10/07/2025",
    forecastDate: "08/01/2026",
    actualDate: "06/01/2026",
    linkedDeliverableIds: ["del-2"],
    isDelayed: true
  },
  {
    id: "ms03",
    name: "Practice Playbook & Procedures",
    code: "MS03",
    status: "in-delivery",
    value: 125000,
    percentageOfProject: 25,
    currency: "USD",
    originalContractDate: "31/07/2025",
    forecastDate: "05/02/2026",
    linkedDeliverableIds: ["del-3", "del-4", "del-5"],
    isDelayed: true
  },
  {
    id: "ms04",
    name: "System Implementation & Deployment",
    code: "MS04",
    status: "in-delivery",
    value: 200000,
    percentageOfProject: 40,
    currency: "USD",
    originalContractDate: "28/07/2025",
    adjustedContractDate: "02/03/2026",
    forecastDate: "02/03/2026",
    linkedDeliverableIds: ["del-6", "del-7", "del-8", "del-9", "del-10", "del-11"],
    isDelayed: false
  }
];

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
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted" />
        <div 
          className="absolute top-4 left-4 h-0.5 bg-success transition-all"
          style={{ width: `calc(${progressPercentage}% - 32px)` }}
        />
        
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

// Date comparison component with edit capability
function DateCompare({ 
  contractDate, 
  adjustedDate,
  forecastDate, 
  actualDate,
  isDelayed,
  canEdit,
  onEditForecast
}: { 
  contractDate: string;
  adjustedDate?: string;
  forecastDate?: string;
  actualDate?: string;
  isDelayed: boolean;
  canEdit?: boolean;
  onEditForecast?: () => void;
}) {
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
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium",
            isDelayed ? "text-destructive" : "text-foreground"
          )}>
            {forecastDate || "—"}
          </span>
          {canEdit && onEditForecast && (
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onEditForecast}>
              <Edit3 className="h-3 w-3" />
            </Button>
          )}
        </div>
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

// Progress milestone dialog
function ProgressMilestoneDialog({ 
  milestone, 
  onProgress 
}: { 
  milestone: Milestone;
  onProgress: (status: MilestoneStatus) => void;
}) {
  const nextStatus = getNextStatus(milestone.status);
  if (!nextStatus || nextStatus === "accepted") return null; // Supplier cannot accept

  const getActionConfig = (status: MilestoneStatus) => {
    switch (status) {
      case "in-delivery":
        return { label: "Start Delivery", icon: Play, description: "Begin work on this milestone" };
      case "delivered":
        return { label: "Mark as Delivered", icon: Send, description: "Submit for client acceptance" };
      case "invoiced":
        return { label: "Mark as Invoiced", icon: Receipt, description: "Record invoice issuance" };
      case "paid":
        return { label: "Mark as Paid", icon: Banknote, description: "Record payment receipt" };
      default:
        return null;
    }
  };

  const actionConfig = getActionConfig(nextStatus);
  if (!actionConfig) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5" style={{ backgroundColor: '#001035' }}>
          <actionConfig.icon className="h-4 w-4" />
          {actionConfig.label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionConfig.label}</DialogTitle>
          <DialogDescription>
            {actionConfig.description} for <strong>{milestone.name}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {nextStatus === "delivered" && (
            <div className="space-y-2">
              <Label>Actual Delivery Date</Label>
              <Input type="text" placeholder="DD/MM/YYYY" defaultValue={new Date().toLocaleDateString('en-GB')} />
            </div>
          )}
          {nextStatus === "invoiced" && (
            <>
              <div className="space-y-2">
                <Label>Invoice Number</Label>
                <Input placeholder="INV-2026-001" />
              </div>
              <div className="space-y-2">
                <Label>Invoice Date</Label>
                <Input type="text" placeholder="DD/MM/YYYY" defaultValue={new Date().toLocaleDateString('en-GB')} />
              </div>
            </>
          )}
          {nextStatus === "paid" && (
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="text" placeholder="DD/MM/YYYY" defaultValue={new Date().toLocaleDateString('en-GB')} />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => onProgress(nextStatus)} style={{ backgroundColor: '#001035' }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Milestone card component for supplier
function SupplierMilestoneCard({ milestone, isExpanded, onToggle }: { 
  milestone: Milestone; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = milestoneStatusConfig[milestone.status];
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(milestone.value);

  const handleProgress = (newStatus: MilestoneStatus) => {
    console.log(`Progress milestone ${milestone.id} to ${newStatus}`);
    // In real implementation, this would update the milestone status
  };

  const canEditForecast = milestone.status === "new" || milestone.status === "in-delivery";
  
  const deliverables = linkedDeliverables[milestone.id] || [];
  const closedCount = deliverables.filter(d => d.status === "closed").length;

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
                <div className="text-muted-foreground">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                    {milestone.code}
                  </span>
                  <CardTitle className="text-base font-semibold">
                    {milestone.name}
                  </CardTitle>
                </div>
                
                {milestone.isDelayed && milestone.status !== "paid" && milestone.status !== "accepted" && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Delayed
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-6">
                <Badge className={cn(
                  "gap-1.5 px-3 py-1",
                  config.bgColor,
                  config.color,
                  "border",
                  config.borderColor
                )}>
                  {config.label}
                </Badge>
                
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
            {/* Lifecycle visualization */}
            <div className="bg-muted/30 rounded-lg p-4">
              <LifecycleProgress milestone={milestone} />
            </div>
            
            {/* Date comparison */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Delivery Dates</h4>
                <DateCompare
                  contractDate={milestone.originalContractDate}
                  adjustedDate={milestone.adjustedContractDate}
                  forecastDate={milestone.forecastDate}
                  actualDate={milestone.actualDate}
                  isDelayed={milestone.isDelayed}
                  canEdit={canEditForecast}
                  onEditForecast={() => console.log('Edit forecast')}
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
                
                <ProgressMilestoneDialog milestone={milestone} onProgress={handleProgress} />
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
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// Summary stats component
function MilestoneSummary({ milestones }: { milestones: Milestone[] }) {
  const totalValue = milestones.reduce((sum, m) => sum + m.value, 0);
  const paidValue = milestones
    .filter(m => m.status === "paid")
    .reduce((sum, m) => sum + m.value, 0);
  const invoicedValue = milestones
    .filter(m => m.status === "invoiced")
    .reduce((sum, m) => sum + m.value, 0);
  const pendingAcceptance = milestones.filter(m => m.status === "delivered").length;
  
  const paidPercentage = (paidValue / totalValue) * 100;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="text-sm text-muted-foreground mb-1">Contract Value</div>
        <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
        <div className="text-xs text-muted-foreground">{milestones.length} milestones</div>
      </Card>
      
      <Card className="p-4">
        <div className="text-sm text-muted-foreground mb-1">Collected</div>
        <div className="text-2xl font-bold text-success">{formatCurrency(paidValue)}</div>
        <Progress value={paidPercentage} className="h-1.5 mt-2" />
        <div className="text-xs text-muted-foreground mt-1">{paidPercentage.toFixed(0)}% of contract</div>
      </Card>
      
      <Card className="p-4">
        <div className="text-sm text-muted-foreground mb-1">Awaiting Payment</div>
        <div className="text-2xl font-bold text-warning">{formatCurrency(invoicedValue)}</div>
        <div className="text-xs text-muted-foreground">invoiced, pending</div>
      </Card>
      
      <Card className={cn("p-4", pendingAcceptance > 0 && "border-info/50")}>
        <div className="text-sm text-muted-foreground mb-1">Pending Acceptance</div>
        <div className={cn(
          "text-2xl font-bold",
          pendingAcceptance > 0 ? "text-info" : "text-muted-foreground"
        )}>
          {pendingAcceptance}
        </div>
        <div className="text-xs text-muted-foreground">
          {pendingAcceptance === 0 ? "None awaiting" : `milestone${pendingAcceptance > 1 ? 's' : ''} delivered`}
        </div>
      </Card>
    </div>
  );
}

export function SupplierMilestonesTab() {
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
      {/* Summary stats */}
      <MilestoneSummary milestones={mockMilestones} />
      
      {/* Milestone cards */}
      <div className="space-y-4">
        {mockMilestones.map(milestone => (
          <SupplierMilestoneCard
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
