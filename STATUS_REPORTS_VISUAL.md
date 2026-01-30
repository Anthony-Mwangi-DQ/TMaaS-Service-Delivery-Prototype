# Status Reports: Visual Before & After

---

## Layout: Before → After

### BEFORE
```
┌─────────────────────────────────────────────────────────┐
│ Status Report                                           │
│ Digital GRC Strategy • Generated: 26 Jan 2026           │
│                                                         │
│ [Week Selector ▼]  [Print] [Export PDF]                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Executive Summary                                       │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Progress Timeline                                       │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘

(Full width, no sidebar)
```

### AFTER
```
┌─────────────────────────────────────────┬─────────────┐
│ Weekly Status Report      [Current Week]│ Report      │
│ Digital GRC Strategy • Week 4           │ Archive     │
│ 20-26 Jan 2026                          │             │
│ ─────────────────────────────────────── │ Week 4      │
│ [Week Selector ▼]  Generated: 26 Jan    │ [Current]   │
│                                         │ 20-26 Jan   │
│ [Email] [Print] [Export PDF]            │ MS02...     │
└─────────────────────────────────────────┤             │
                                          │ Week 3      │
┌─────────────────────────────────────────┤ 13-19 Jan   │
│ Executive Summary                       │ MS02...     │
│ ...                                     │             │
└─────────────────────────────────────────┤ Week 2      │
                                          │ 06-12 Jan   │
┌─────────────────────────────────────────┤ MS02...     │
│ Progress Timeline                       │             │
│ ...                                     │ [View All]  │
└─────────────────────────────────────────┴─────────────┘

(9 cols main + 3 cols sidebar)
```

---

## Key Improvements

### 1. Report Archive Sidebar ⭐ NEW
```
┌─────────────────────┐
│ 📜 Report Archive   │
│                     │
│ ┌─────────────────┐ │
│ │ Week 4 [Current]│ │ ← Highlighted
│ │ 20-26 Jan 2026  │ │
│ │ MS02 delivered, │ │
│ │ MS03 at risk... │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ Week 3          │ │
│ │ 13-19 Jan 2026  │ │
│ │ MS02 design...  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ Week 2          │ │
│ │ 06-12 Jan 2026  │ │
│ │ MS02 delivery...│ │
│ └─────────────────┘ │
│                     │
│ [View All Reports]  │
└─────────────────────┘
```

### 2. Enhanced Header
```
BEFORE:
Status Report
Digital GRC Strategy • Generated: 26 Jan 2026

AFTER:
Weekly Status Report                    [Current Week]
Digital GRC Strategy • Week 4 • 20-26 Jan 2026
─────────────────────────────────────────────────
[Week Selector ▼]  Generated: 26 Jan 2026
                   [Email] [Print] [Export PDF]
```

### 3. Week-Focused Period Selector
```
BEFORE:                 AFTER:
Current Week            Current Week (W04)
Last Week               Last Week (W03)
Current Month           2 Weeks Ago (W02)
Last Month              Custom Range
Custom Range
```

---

## User Flows

### Compare This Week vs Last Week
```
BEFORE:
1. On Status Reports tab
2. Change period selector to "Last Week"
3. Wait for reload
4. Manually compare in memory

Steps: 2 clicks + mental comparison

AFTER:
1. On Status Reports tab (showing Week 4)
2. Click "Week 3" in sidebar
3. Report switches to Week 3
4. Visual comparison

Steps: 1 click + visual comparison
```

### Email Report to Stakeholders
```
BEFORE:
1. Export PDF
2. Open email client
3. Attach PDF
4. Write email
5. Send

Steps: 5+ actions

AFTER:
1. Click "Email" button
2. Select recipients
3. Send

Steps: 2 clicks
```

---

## Visual Hierarchy

### Archive Sidebar
- **Current Week:** Blue background, blue border, "Current" badge
- **Past Weeks:** Gray background, gray border
- **Hover:** Slightly darker background

### Header
- **Title:** Large, bold "Weekly Status Report"
- **Metadata:** Smaller, muted "Week 4 • 20-26 Jan 2026"
- **Status Badge:** Primary blue for current, gray for archived
- **Actions:** Right-aligned, clear hierarchy (Email < Print < Export PDF)

---

## Benefits Summary

### ✅ Historical Access
- Quick navigation to past weeks
- Visual timeline of project evolution
- Easy comparison between periods

### ✅ Better Distribution
- One-click email sharing
- PDF export for offline review
- Print for physical meetings

### ✅ Professional Presentation
- Clear week numbers
- Date ranges visible
- Status badges (current/archived)

### ✅ Improved Organization
- Sidebar keeps archive accessible
- Main content stays focused
- Clean separation of concerns

---

## Next: Delivery Tab Consolidation

After Status Reports, we'll tackle the big consolidation:

**Milestones + Deliverables + Documents → Delivery**

This will reduce from 9 tabs to 7 tabs (22% reduction).
