# TMaaS Logo Update Instructions

## Step 1: Save the Logo File

Save the TMaaS logo image as:
- **Filename**: `tmaas-logo.png` or `tmaas-logo.svg`
- **Location**: `tmaas/public/`
- **Recommended**: Use SVG format for better quality at all sizes

## Step 2: Update Sidebar Logo

The logo appears in `src/components/layout/AppSidebar.tsx` at line 56-63.

### Current Code:
```tsx
<div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
    <span className="text-lg font-bold text-primary-foreground">DQ</span>
  </div>
  <div>
    <span className="text-base font-semibold text-foreground">TMaaS</span>
    <p className="text-xs text-muted-foreground">Service Delivery</p>
  </div>
</div>
```

### Updated Code (with logo):
```tsx
<div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
  <img 
    src="/tmaas-logo.png" 
    alt="TMaaS Logo" 
    className="h-8 w-auto"
  />
</div>
```

Or if you want to keep some text:
```tsx
<div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
  <img 
    src="/tmaas-logo.png" 
    alt="TMaaS Logo" 
    className="h-8 w-auto"
  />
  <div>
    <p className="text-xs text-muted-foreground">Service Delivery</p>
  </div>
</div>
```

## Step 3: Update Favicon

Replace `tmaas/public/favicon.ico` with a favicon version of the logo.

You can generate a favicon from the logo at:
- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/

## Step 4: Update Supplier Platform

Repeat the same steps for `tmaas-admin`:
1. Copy logo to `tmaas-admin/public/tmaas-logo.png`
2. Update `tmaas-admin/src/components/layout/ConsoleSidebar.tsx`

## Step 5: Commit and Push

```bash
cd tmaas
git add public/tmaas-logo.png src/components/layout/AppSidebar.tsx
git commit -m "feat: Add TMaaS logo to sidebar"
git push
```

---

## Quick Command (after saving logo to public folder)

Let me know when you've saved the logo file, and I'll update the code automatically!
