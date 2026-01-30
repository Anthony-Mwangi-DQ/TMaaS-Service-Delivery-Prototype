# DQ TMaaS Platform - Full Implementation Prompt

## Project Overview

Build **DQ TMaaS (Transformation Management as a Service)** — a B2B SaaS platform for managing digital transformation service engagements. The platform serves two distinct user personas with role-based access to separate dashboards.

**Brand Color:** `#fb5535` (DQ Orange) for customer portal, `#001035` (Navy) for supplier console.

---

## Core Architecture

### Technology Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- Supabase (Auth, Database, RLS)
- React Router DOM for routing
- React Query for data fetching
- Lucide React for icons

### Two Platforms (Same Codebase)

1. **Customer Portal** (`/` routes) — For Customer Delivery Leads viewing their engagements
2. **DQ Delivery Console** (`/console/*` routes) — For Supplier Delivery Leads managing deliveries

---

## User Personas & Authentication

### Roles (Stored in separate `user_roles` table)
```typescript
type AppRole = "customer_delivery_lead" | "supplier_delivery_lead";
```

### Auth Requirements
- Email/password authentication with auto-confirm enabled
- Role assigned based on organization during signup (e.g., "STC" = customer, "DQ" = supplier)
- `profiles` table: id, user_id, display_name, organization, avatar_url
- `user_roles` table: id, user_id, role
- Route protection: Customers cannot access `/console/*`, suppliers redirect to `/console`

---

## Core Entities & Data Models

### 1. Milestone Entity
```typescript
type MilestoneStatus = "new" | "in-delivery" | "delivered" | "accepted" | "invoiced" | "paid";

interface Milestone {
  id: string;
  name: string;
  code: string; // "MS01", "MS02", etc.
  status: MilestoneStatus;
  
  // Commercial
  value: number;
  percentageOfProject: number;
  currency: "USD";
  
  // Contractual dates
  originalContractDate: string; // Immutable DD/MM/YYYY
  adjustedContractDate?: string; // Auditable changes
  
  // Delivery dates
  forecastDate?: string; // Required when In Delivery
  actualDate?: string; // Required when Delivered
  
  // Financial dates
  acceptanceDate?: string; // Required when Accepted
  invoiceDate?: string; // Required when Invoiced
  paymentDate?: string; // Required when Paid
  
  linkedDeliverableIds: string[];
  isDelayed: boolean; // Computed: forecastDate > adjustedContractDate || originalContractDate
}
```

**Business Rules:**
- Status progression is strict: New → In Delivery → Delivered → Accepted → Invoiced → Paid
- Milestone cannot move to "Delivered" unless all linked deliverables are Closed or Outscoped
- "Delayed" flag is system-derived when Forecast Date > Contract Date

### 2. Deliverable Entity
```typescript
type DeliverableStatus = "not-started" | "in-progress" | "delayed" | "pending-acceptance" | "closed" | "outscoped";

interface Deliverable {
  id: string;
  name: string;
  description?: string;
  milestone: string; // Reference to milestone
  
  status: DeliverableStatus;
  outscopeReason?: string; // Required when outscoped
  
  // Key dates
  startDate?: string;
  contractedTargetDate: string;
  forecastedDate?: string;
  finishDate?: string; // Only populated when Closed
  
  // Version management
  currentVersion?: string;
  versions: {
    version: string;
    uploadedDate: string;
    uploadedBy: string;
    comment?: string;
  }[];
}
```

**Business Rules:**
- Deliverables are milestone-bound contractual outputs (NOT general documents)
- "Delayed" status is derived: forecastedDate > contractedTargetDate
- finishDate is ONLY populated when status = "closed"

### 3. RAID Item Entity
```typescript
type RAIDType = "Risk" | "Assumption" | "Issue" | "Dependency";
type RAIDImpact = "High" | "Medium" | "Low";
type RAIDStatus = "Open" | "In Progress" | "Closed" | "Blocked";

interface RAIDItem {
  id: string;
  type: RAIDType;
  description: string;
  impact: RAIDImpact;
  owner: string; // "Client" | "DQ Lead" | "Joint"
  status: RAIDStatus;
  requiresCustomer?: boolean;
  actionRequired?: string;
  dueDate?: string;
}
```

### 4. Working Session Entity
```typescript
interface WorkingSession {
  id: string;
  date: string;
  time: string;
  topic: string;
  type: "video" | "workshop" | "review";
  status: "upcoming" | "completed";
  hasNotes?: boolean;
  notesUrl?: string;
}
```

---

## Navigation Structure

### Customer Portal Sidebar
1. **Overview** (`/`) — Portfolio dashboard with stats and daily briefing
2. **Active Engagements** (`/services`) — Table of all service engagements
3. **Notifications** (`/notifications`) — Full notification center
4. **Documents** (`/documents`) — Global document view across all engagements
5. **Messages** (`/messages`) — Global chat threads view
6. **Reporting & Analytics** (`/reporting`) — Future feature placeholder

### Supplier Console Sidebar
1. **Dashboard** (`/console`) — Delivery operations overview
2. **Active Deliveries** (`/console/deliveries`) — All deliveries being managed
3. **Notifications** (`/console/notifications`) — Supplier notifications
4. **Documents** (`/console/documents`) — All documents
5. **Messages** (`/console/messages`) — All chat threads

---

## Page Structures

### Customer Portal Main Dashboard (`/`)
**Layout:** 3-column grid (stats, table, briefing)

Components:
1. **PortfolioStats** — 4 cards: Active Services, Pending Approvals, Deliverables Due This Week, Open RAID Items
2. **QuickActions** — Buttons: View All Services, Review Documents, Check Notifications
3. **ActiveServicesTable** — Table with: Service Name, Type, Current Milestone, Health Status, Progress, Target Date
4. **NotificationCenter** (Daily Briefing) — Categorized: Today's Deadlines, Blocking Dependencies, Pending Approvals

### Service Detail Page (`/services/:id`)
**Layout:** Header + Tabbed content

**Service Header:**
- Service name, type badge (Design/Deploy)
- Current milestone, target date
- Health status indicator (On Track/At Risk/Blocked)
- Overall progress percentage

**Tabs:**
1. **Overview** — Executive summary (NOT a milestone list):
   - Current Milestone Focus card (active milestone only with contract vs. forecast dates)
   - RAID Summary card (open counts by type, client actions required)
   - Deliverables Summary card (progress bar, pending count)
   - Next Session card
   - Quick navigation buttons to other tabs

2. **Milestones** — Full milestone management:
   - Summary stats row (Total Contract, Paid, Accepted, Delayed count)
   - Expandable milestone cards with:
     - Status lifecycle stepper (New → Paid visualization)
     - Date comparison (Contract vs. Forecast vs. Actual)
     - Linked deliverables list with status badges
     - Accept Milestone button (when status = delivered)

3. **Commercials** — Contract governance:
   - Service Request Info (Order #, dates, organization, contract value)
   - Commercial Documents list (Contract, Service Order, SOW) with version history

4. **RAID Log** — Decision support view:
   - Action Summary section highlighting customer action items
   - Full RAID table with Type, Description, Impact, Owner, Status, Action Required

5. **Working Sessions** — Upcoming/Past tabs:
   - Session cards with date, time, topic, type
   - "View Minutes/Notes" button for completed sessions
   - "Join" button for upcoming sessions

6. **Chat** — Service-specific messaging thread

7. **Deliverables** — Grouped by milestone:
   - Status badges, contracted vs. forecasted dates
   - Version history expandable
   - Customer view-only (no upload for customers)

8. **Documents** — Input materials from client:
   - General document wallet (NOT deliverables)
   - Upload capability for customers

### Supplier Console Dashboard (`/console`)
Similar structure but focused on delivery operations:
- SupplierPortfolioStats: Active Deliveries, Pending Client Approvals, Deliverables Due, Client Blockers
- SupplierQuickActions: Upload Deliverable, Update Status, Request Client Input
- Active deliveries table
- SupplierNotificationCenter: DQ deliverables due, items awaiting client response

---

## Key UI Patterns

### Date Formatting
All dates use British format: `DD/MM/YYYY`

### Currency
All financial values in USD with `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`

### Status Color System
Use semantic design tokens (never hardcode colors):
- **Success:** `bg-success/10 text-success border-success/20`
- **Warning:** `bg-warning/10 text-warning border-warning/20`
- **Destructive:** `bg-destructive/10 text-destructive border-destructive/20`
- **Info:** `bg-info/10 text-info border-info/20`
- **Muted:** `bg-muted text-muted-foreground border-border`
- **Primary:** `bg-primary/10 text-primary border-primary/20`

### Card Patterns
- `.card-elevated` — White bg, border, subtle shadow
- Border-left accent for priority/focus items (e.g., `border-l-4 border-l-primary`)

### Icon Containers
Standard 10x10 (h-10 w-10) with semantic background colors

---

## Critical Business Logic

### Traceability Requirements
The platform's value is audit trail generation:
- All chat messages timestamped with author
- Working sessions linked to meeting notes
- RAID items track owner and status changes
- Milestone status transitions should record who/when/why

### Deliverables ≠ Documents
**Critical separation:**
- **Deliverables:** Formal, milestone-bound outputs. Acceptance-driven. Customers cannot upload.
- **Documents:** Input materials, working files. General exchange. Customers can upload.

### Contract vs. Forecast Visibility
Every milestone must show:
- Original Contract Date (immutable baseline)
- Adjusted Contract Date (if change requests occurred)
- Forecast Date (current reality)
- "Delayed" indicator when Forecast > Contract

### Overview Tab Philosophy
The Overview tab is an **executive summary aggregating data from other tabs**, NOT a duplicate milestone view. It shows:
- Only the current active milestone
- High-level RAID counts
- Deliverables progress metrics
- Next scheduled session
- Quick-nav buttons to deeper views

---

## Mock Data Structure (for initial prototype)

Use a sample engagement: **"Digital GRC Strategy"** for client **"STC"**

**Milestones:**
- MS01: Project Kickoff & Charter (Paid, $75,000, 15%)
- MS02: GRC Design Summary (Delivered, $100,000, 20%, Delayed)
- MS03: Practice Playbook & Procedures (In Delivery, $125,000, 25%, Delayed)
- MS04: System Implementation & Deployment (In Delivery, $200,000, 40%)

**Total Contract Value:** $500,000

---

## Implementation Order

1. **Auth & RBAC** — Supabase tables, role assignment, protected routes
2. **Layout Components** — DashboardLayout, ConsoleLayout, sidebars
3. **Customer Portal** — Dashboard, ServiceDetail with all tabs
4. **Supplier Console** — Mirror structure with supplier-specific actions
5. **Entity Components** — MilestonesTab, DeliverablesList, RAIDLog, etc.
6. **Connecting to Database** — Replace mock data with Supabase queries

---

## Security Considerations

- RLS on all tables: users see only their organization's data
- Roles stored in separate table (never on profiles)
- Suppliers can upload deliverables; customers can view/accept
- Customers can upload documents; suppliers can view
- Never expose internal IDs or Supabase URLs to users

---

## Future Features (Placeholder Only)

- **Status Reporting Module** — Weekly/monthly automated reports
- **Digital Maturity Assessment** — Transformation progress tracking
- **Time & Effort Tracking** — For supplier utilization
- **Milestone Activity Log** — Full audit trail of all status changes

---

*This prompt captures the complete platform architecture, business logic, and UI patterns developed through iterative feedback sessions. The agent should implement professional B2B SaaS styling based on the brand color, using shadcn/ui components and semantic design tokens.*
