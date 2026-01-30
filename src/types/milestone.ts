// Milestone Lifecycle States (strict progression)
export type MilestoneStatus = 
  | "new"
  | "in-delivery"
  | "delivered"
  | "accepted"
  | "invoiced"
  | "paid";

// Milestone entity for TMaaS platform
export interface Milestone {
  id: string;
  name: string;
  code: string; // e.g., "MS01", "MS02"
  status: MilestoneStatus;
  
  // Commercial attributes
  value: number; // Currency amount
  percentageOfProject: number; // e.g., 15 for 15%
  currency: string; // e.g., "SAR"
  
  // Contractual baseline dates
  originalContractDate: string; // Immutable - DD/MM/YYYY
  adjustedContractDate?: string; // Auditable - DD/MM/YYYY
  
  // Delivery reality dates
  forecastDate?: string; // Required when In Delivery
  actualDate?: string; // Required when Delivered
  
  // Acceptance & finance dates
  acceptanceDate?: string; // Required when Accepted
  invoiceDate?: string; // Required when Invoiced
  paymentDate?: string; // Required when Paid
  
  // Governance
  linkedDeliverableIds: string[];
  isDelayed: boolean; // Computed: forecastDate > adjustedContractDate (or originalContractDate)
  
  // Audit trail
  lastStatusChange?: {
    from: MilestoneStatus;
    to: MilestoneStatus;
    changedAt: string;
    changedBy: string;
    reason?: string;
  };
  
  // Full activity history
  activityLog?: MilestoneActivity[];
  
  // Diary/notes
  notes?: MilestoneNote[];
}

// Activity log entry
export interface MilestoneActivity {
  id: string;
  timestamp: string; // ISO date string
  activityType: "status-change" | "date-change" | "deliverable-update" | "acceptance" | "comment" | "document-upload";
  actor: string; // User name or "System"
  description: string;
  metadata?: {
    from?: string;
    to?: string;
    reason?: string;
    documentName?: string;
    deliverableId?: string;
  };
}

// Note/diary entry
export interface MilestoneNote {
  id: string;
  timestamp: string;
  author: string;
  content: string;
  isInternal: boolean; // Internal notes vs client-visible
  tags?: string[]; // e.g., ["delay", "risk", "decision"]
}

// Status display configuration
export const milestoneStatusConfig: Record<MilestoneStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  "new": {
    label: "New",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted-foreground/30",
    description: "Milestone defined, not yet started"
  },
  "in-delivery": {
    label: "In Delivery",
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30",
    description: "Actively being worked on"
  },
  "delivered": {
    label: "Delivered",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description: "Work complete, awaiting acceptance"
  },
  "accepted": {
    label: "Accepted",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    description: "Formally accepted by client"
  },
  "invoiced": {
    label: "Invoiced",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    description: "Invoice issued, awaiting payment"
  },
  "paid": {
    label: "Paid",
    color: "text-success-foreground",
    bgColor: "bg-success",
    borderColor: "border-success",
    description: "Payment received, milestone complete"
  }
};

// Status progression order for lifecycle visualization
export const milestoneStatusOrder: MilestoneStatus[] = [
  "new",
  "in-delivery",
  "delivered",
  "accepted",
  "invoiced",
  "paid"
];

// Helper to determine if a status is complete relative to a target
export function isStatusComplete(current: MilestoneStatus, target: MilestoneStatus): boolean {
  const currentIndex = milestoneStatusOrder.indexOf(current);
  const targetIndex = milestoneStatusOrder.indexOf(target);
  return currentIndex > targetIndex;
}

// Helper to get next valid status
export function getNextStatus(current: MilestoneStatus): MilestoneStatus | null {
  const currentIndex = milestoneStatusOrder.indexOf(current);
  if (currentIndex < milestoneStatusOrder.length - 1) {
    return milestoneStatusOrder[currentIndex + 1];
  }
  return null;
}
