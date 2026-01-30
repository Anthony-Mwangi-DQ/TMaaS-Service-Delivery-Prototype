
# DQ Delivery Console - Separate Platform Implementation Plan

## Executive Summary

This plan outlines the creation of a dedicated **DQ Delivery Console** - a separate platform for DQ (Supplier) Delivery Leads to manage their active service deliveries. This platform will be distinctly positioned from the customer portal while maintaining the same DQ TMaaS branding and design system.

The platform focuses on **delivery operations**: uploading deliverables, updating status, managing RAID items, and tracking utilization.

---

## Architecture Approach

### Why a Separate Platform?

Rather than role-based views within a single application, we'll create a dedicated route namespace (`/console/*`) that functions as an entirely separate application experience:

```text
Customer Portal:       /            → Customer Dashboard
                       /services    → Customer's Active Engagements
                       /services/:id → Customer Service Detail

DQ Delivery Console:   /console           → Supplier Dashboard
                       /console/deliveries → Supplier's Active Deliveries
                       /console/deliveries/:id → Supplier Delivery Detail
```

**Benefits of this approach:**
- Clean URL namespace separation (`/console/*` for suppliers)
- Dedicated layouts, navigation, and components
- Role-based route protection prevents unauthorized access
- Shared codebase for easier maintenance
- Same deployment, single authentication system

---

## Phase 1: Console Foundation

### 1.1 Create Console Layout and Sidebar

**Files to Create:**
- `src/components/layout/ConsoleLayout.tsx` - Supplier platform wrapper
- `src/components/layout/ConsoleSidebar.tsx` - Supplier navigation

**Console Sidebar Navigation:**
| Label | Route | Icon | Purpose |
|-------|-------|------|---------|
| Dashboard | /console | LayoutDashboard | Overview of all deliveries |
| Active Deliveries | /console/deliveries | FileStack | List of services being delivered |
| Notifications | /console/notifications | Bell | Client awaiting items, escalations |
| Documents | /console/documents | FolderOpen | All deliverables across services |
| Messages | /console/messages | MessageSquare | Client conversations |
| Time & Effort | /console/utilization | Clock | Effort tracking and utilization |

**Key UI Differences from Customer Portal:**
- Header subtitle: "DQ Delivery Console" instead of "Service Delivery"
- Profile shows: "Supplier Delivery Lead" role label
- Sidebar accent: Subtle visual differentiation (e.g., different icon treatment)

### 1.2 Create Supplier Route Protection

**Files to Create:**
- `src/components/auth/SupplierRoute.tsx`

This component wraps console routes and:
1. Checks if user is authenticated
2. Verifies role is `supplier_delivery_lead`
3. Redirects customer users to `/` (their portal)

---

## Phase 2: Supplier Dashboard (Console Home)

### 2.1 Supplier Overview Page

**File to Create:** `src/pages/console/ConsoleIndex.tsx`

**Dashboard Structure:**
```text
+----------------------------------+
| DQ Delivery Console              |
| Manage your active service       |
| deliveries                       |
+----------------------------------+
| [Stats Row - 4 cards]            |
| Active Deliveries | Pending      |
| Approvals | Deliverables Due |   |
| Client Blocks                    |
+----------------------------------+
| [Two Column Layout]              |
| +------------------------+ +---+ |
| | Active Deliveries      | |   | |
| | Table (8 cols)         | | Q | |
| +------------------------+ | A | |
| | Supplier Daily         | |   | |
| | Briefing               | +---+ |
| +------------------------+       |
+----------------------------------+
```

### 2.2 Supplier Portfolio Stats

**File to Create:** `src/components/console/SupplierPortfolioStats.tsx`

**Metrics displayed:**
- **Active Deliveries**: Count of services being delivered
- **Pending Client Approvals**: Documents/milestones awaiting client sign-off
- **Deliverables Due This Week**: Upcoming delivery deadlines
- **Client Blockers**: Items waiting on customer input

### 2.3 Supplier Quick Actions

**File to Create:** `src/components/console/SupplierQuickActions.tsx`

**Actions (delivery-focused):**
| Action | Icon | Variant |
|--------|------|---------|
| Upload Deliverable | Upload | Primary |
| Update Status | RefreshCw | Outline |
| Request Client Input | MessageSquare | Outline |
| Log Time | Clock | Outline |
| Schedule Session | Calendar | Outline |

---

## Phase 3: Supplier Daily Briefing (Notifications)

### 3.1 Supplier Notification Center

**File to Create:** `src/components/console/SupplierNotificationCenter.tsx`

**Inverted perspective from customer briefing:**

**Sections:**
1. **Your Deliverables Due** - What DQ needs to deliver this week
2. **Awaiting Client Response** - Items blocked on customer (approvals, inputs, decisions)
3. **Client Input Received** - New documents/feedback from clients to process
4. **Escalations** - RAID items that need supplier attention

**Key difference:** Customer notifications say "Your action items"; Supplier notifications say "Waiting on client" and "Your delivery commitments"

---

## Phase 4: Delivery Detail Page

### 4.1 Supplier Service Detail Page

**File to Create:** `src/pages/console/DeliveryDetail.tsx`

**Same tab structure as customer, but with supplier-focused content:**

| Tab | Supplier Perspective |
|-----|---------------------|
| Overview | Progress with "Update Status" button, Client contact info prominently displayed |
| Commercials | Add "Utilization Tracker" section showing budgeted vs actual effort |
| RAID Log | Inverted action summary - highlight items waiting on client |
| Working Sessions | Add "Schedule Session" capability |
| Chat | Messages TO client (shows Jane Doe from STC as recipient) |
| Documents | Upload to Deliverables, view-only Inputs |

### 4.2 Supplier Service Header

**File to Create:** `src/components/console/SupplierServiceHeader.tsx`

**Differences from customer header:**
- Shows **Client Name & Organization** prominently (e.g., "Jane Doe - STC")
- Adds **"Update Status"** dropdown button
- Shows **assigned DQ team members**
- Same health status and progress indicators

---

## Phase 5: Supplier-Specific Components

### 5.1 Supplier Document List

**File to Create:** `src/components/console/SupplierDocumentList.tsx`

**Inverted permissions:**
- **Deliverables**: Full upload capability with milestone tagging, version upload
- **Inputs**: View-only (uploaded by client)
- Add "Request Input" button for missing client documents

### 5.2 Supplier RAID Log

**File to Create:** `src/components/console/SupplierRAIDLog.tsx`

**Key differences:**
- **Action Summary** shows "Waiting on Client" items (blocked by customer)
- **Your Delivery Tasks** shows DQ-owned action items
- Add ability to **Create/Edit RAID items** (customers can only view)
- Add "Escalate to Client" button for critical blockers
- Add "Mark Resolved" action for completed items

### 5.3 Supplier Chat (Perspective Flip)

**File to Create:** `src/components/console/SupplierServiceChat.tsx`

**Differences:**
- Header shows client name: "Jane Doe (STC)" instead of "Sarah Mitchell (DQ Lead)"
- Message alignment: DQ messages on right (sender), client messages on left
- Shows client as the conversation partner

### 5.4 Utilization Tracker (New)

**File to Create:** `src/components/console/UtilizationTracker.tsx`

**New component for Commercials tab:**
- Budgeted hours vs. Actual hours logged
- Progress bar visualization
- Burn rate indicator
- "Log Time" button

---

## Phase 6: Routing & Integration

### 6.1 Update App.tsx with Console Routes

**Modifications to:** `src/App.tsx`

```text
New Routes:
/console                  → ConsoleIndex (Supplier Dashboard)
/console/deliveries       → ConsoleServiceRequests (Supplier list)
/console/deliveries/:id   → DeliveryDetail (Supplier detail)
/console/notifications    → ConsoleNotifications
/console/documents        → ConsoleDocuments
/console/messages         → ConsoleMessages
/console/utilization      → ConsoleUtilization
```

All `/console/*` routes wrapped in `SupplierRoute` component.

### 6.2 Smart Authentication Redirect

**Modify:** `src/pages/Auth.tsx`

After successful login, redirect based on role:
- `supplier_delivery_lead` → `/console`
- `customer_delivery_lead` → `/`

---

## File Structure Summary

```text
src/
├── components/
│   ├── console/                           # NEW - All supplier components
│   │   ├── SupplierPortfolioStats.tsx
│   │   ├── SupplierQuickActions.tsx
│   │   ├── SupplierNotificationCenter.tsx
│   │   ├── SupplierServiceHeader.tsx
│   │   ├── SupplierDocumentList.tsx
│   │   ├── SupplierRAIDLog.tsx
│   │   ├── SupplierServiceChat.tsx
│   │   ├── UtilizationTracker.tsx
│   │   └── SupplierActiveDeliveriesTable.tsx
│   ├── layout/
│   │   ├── ConsoleLayout.tsx              # NEW
│   │   └── ConsoleSidebar.tsx             # NEW
│   └── auth/
│       └── SupplierRoute.tsx              # NEW
├── pages/
│   └── console/                           # NEW - All supplier pages
│       ├── ConsoleIndex.tsx
│       ├── DeliveryDetail.tsx
│       ├── ConsoleNotifications.tsx
│       ├── ConsoleDocuments.tsx
│       ├── ConsoleMessages.tsx
│       └── ConsoleUtilization.tsx
└── App.tsx                                # MODIFY - Add console routes
```

---

## Implementation Order

| Step | Description | Files |
|------|-------------|-------|
| 1 | Create SupplierRoute guard | SupplierRoute.tsx |
| 2 | Create Console layout & sidebar | ConsoleLayout.tsx, ConsoleSidebar.tsx |
| 3 | Create Supplier dashboard | ConsoleIndex.tsx, SupplierPortfolioStats.tsx, SupplierQuickActions.tsx |
| 4 | Add console routes to App.tsx | App.tsx |
| 5 | Create Supplier notifications | SupplierNotificationCenter.tsx |
| 6 | Create Delivery detail page | DeliveryDetail.tsx, SupplierServiceHeader.tsx |
| 7 | Create supplier document/RAID components | SupplierDocumentList.tsx, SupplierRAIDLog.tsx |
| 8 | Create supplier chat component | SupplierServiceChat.tsx |
| 9 | Create utilization tracker | UtilizationTracker.tsx |
| 10 | Implement role-based redirect after login | Auth.tsx modification |

---

## Key Differentiators Summary

| Aspect | Customer Portal | DQ Delivery Console |
|--------|-----------------|---------------------|
| **URL Prefix** | `/` | `/console` |
| **Header Subtitle** | "Service Delivery" | "DQ Delivery Console" |
| **Service List Label** | "Active Engagements" | "Active Deliveries" |
| **Primary Actions** | Request Service, Upload Input | Upload Deliverable, Update Status |
| **Notifications Focus** | "My action items" | "Waiting on client" + "My commitments" |
| **Document Permissions** | View deliverables, upload inputs | Upload deliverables, view inputs |
| **RAID Perspective** | "Items requiring my input" | "Items blocked by client" |
| **Chat Shows** | DQ Lead as partner | Client as partner |
| **Unique Features** | - | Utilization Tracker, Create RAID items |

---

## Technical Notes

### No Database Changes Required
The existing RBAC system (`user_roles` table with `app_role` enum) already supports `supplier_delivery_lead`. The `handle_new_user` trigger automatically assigns this role when organization is "DQ".

### Shared Components
Many UI components will be reused:
- All shadcn/ui components
- Progress cards, badges, buttons
- Calendar, date formatting utilities
- Basic table structures

### Branding Consistency
Same primary color (`#fb5535`), typography (Inter), and design patterns - just different content and perspective.
