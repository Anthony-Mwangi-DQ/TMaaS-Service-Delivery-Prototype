// Deliverable Entity Definition for TMaaS Platform
// A Deliverable represents a contractual output tied to a service engagement and milestone.
// It is acceptance-driven, status-managed, and forms part of the delivery audit trail.

export type DeliverableStatus = 
  | "not-started"      // Deliverable defined but work not initiated
  | "in-progress"      // Actively being worked on
  | "delayed"          // Forecasted date exceeds contracted target date
  | "pending-acceptance" // Submitted and awaiting formal acceptance
  | "closed"           // Accepted and completed
  | "outscoped";       // Formally removed from scope (with reason)

export type MilestoneType = 
  | "Kickoff" 
  | "Milestone 1" 
  | "Milestone 2" 
  | "Milestone 3" 
  | "Milestone 4" 
  | "Closure";

export interface DeliverableVersion {
  version: string;
  uploadedDate: string;
  uploadedBy: string;
  comment?: string;
  fileUrl?: string;
}

export interface Deliverable {
  // Identity & Context
  id: string;
  name: string;
  description?: string;
  milestone: MilestoneType;
  serviceId?: string;
  serviceName?: string;
  
  // Status & Lifecycle
  status: DeliverableStatus;
  outscopeReason?: string; // Required when status is "outscoped"
  
  // Key Dates
  startDate?: string;          // Date work on the deliverable started
  contractedTargetDate: string; // Contractually agreed completion date
  forecastedDate?: string;      // Current expected completion date
  finishDate?: string;          // Actual completion date (mandatory when Closed)
  
  // Version Management
  currentVersion?: string;
  versions: DeliverableVersion[];
  
  // Audit
  createdAt?: string;
  updatedAt?: string;
}

// Status configuration for UI rendering
export const deliverableStatusConfig: Record<DeliverableStatus, { 
  label: string; 
  color: string; 
  description: string;
}> = {
  "not-started": { 
    label: "Not Started", 
    color: "bg-muted text-muted-foreground border-border",
    description: "Deliverable defined but work not initiated"
  },
  "in-progress": { 
    label: "In Progress", 
    color: "bg-info/10 text-info border-info/20",
    description: "Actively being worked on"
  },
  "delayed": { 
    label: "Delayed", 
    color: "bg-destructive/10 text-destructive border-destructive/20",
    description: "Forecasted date exceeds contracted target date"
  },
  "pending-acceptance": { 
    label: "Pending Acceptance", 
    color: "bg-warning/10 text-warning border-warning/20",
    description: "Submitted and awaiting formal acceptance"
  },
  "closed": { 
    label: "Closed", 
    color: "bg-success/10 text-success border-success/20",
    description: "Accepted and completed"
  },
  "outscoped": { 
    label: "Outscoped", 
    color: "bg-muted text-muted-foreground border-border line-through",
    description: "Formally removed from scope"
  },
};

export const milestoneConfig: Record<MilestoneType, { color: string; order: number }> = {
  "Kickoff": { color: "bg-success/10 text-success border-success/20", order: 0 },
  "Milestone 1": { color: "bg-info/10 text-info border-info/20", order: 1 },
  "Milestone 2": { color: "bg-primary/10 text-primary border-primary/20", order: 2 },
  "Milestone 3": { color: "bg-warning/10 text-warning border-warning/20", order: 3 },
  "Milestone 4": { color: "bg-accent text-accent-foreground border-border", order: 4 },
  "Closure": { color: "bg-muted text-muted-foreground border-border", order: 5 },
};

export const milestoneOrder: MilestoneType[] = [
  "Kickoff", 
  "Milestone 1", 
  "Milestone 2", 
  "Milestone 3", 
  "Milestone 4", 
  "Closure"
];
