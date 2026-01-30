import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  HelpCircle,
  AlertCircle,
  Link2,
  Plus,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  User,
  Edit2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RAIDItem {
  id: string;
  type: "Risk" | "Assumption" | "Issue" | "Dependency";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "open" | "mitigated" | "resolved" | "blocked";
  owner: string;
  ownerType: "DQ" | "Client";
  dueDate?: string;
  createdDate: string;
}

const mockRAIDItems: RAIDItem[] = [
  {
    id: "1",
    type: "Dependency",
    title: "Security policy documentation",
    description: "Waiting for STC to provide current security policy documentation for gap analysis",
    priority: "high",
    status: "blocked",
    owner: "Jane Doe",
    ownerType: "Client",
    dueDate: "Feb 20, 2024",
    createdDate: "Jan 25, 2024",
  },
  {
    id: "2",
    type: "Risk",
    title: "Resource availability during Ramadan",
    description: "Key stakeholders may have limited availability during Ramadan period affecting review cycles",
    priority: "medium",
    status: "open",
    owner: "DQ Team",
    ownerType: "DQ",
    createdDate: "Feb 1, 2024",
  },
  {
    id: "3",
    type: "Dependency",
    title: "IT infrastructure access",
    description: "Require access to STC's IT infrastructure for technical assessment",
    priority: "high",
    status: "blocked",
    owner: "Ahmed Al-Hassan",
    ownerType: "Client",
    dueDate: "Feb 15, 2024",
    createdDate: "Jan 28, 2024",
  },
  {
    id: "4",
    type: "Issue",
    title: "Data classification inconsistency",
    description: "Found inconsistencies in current data classification approach across departments",
    priority: "medium",
    status: "open",
    owner: "DQ Team",
    ownerType: "DQ",
    createdDate: "Feb 10, 2024",
  },
  {
    id: "5",
    type: "Assumption",
    title: "Existing GRC tool compatibility",
    description: "Assuming the current GRC tool can be configured for proposed governance model",
    priority: "low",
    status: "open",
    owner: "DQ Team",
    ownerType: "DQ",
    createdDate: "Jan 20, 2024",
  },
];

const typeConfig = {
  Risk: { icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10" },
  Assumption: { icon: HelpCircle, color: "text-info", bgColor: "bg-info/10" },
  Issue: { icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  Dependency: { icon: Link2, color: "text-[#001035]", bgColor: "bg-[#001035]/10" },
};

const priorityConfig = {
  high: { label: "High", color: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", color: "bg-warning/10 text-warning border-warning/20" },
  low: { label: "Low", color: "bg-muted text-muted-foreground border-border" },
};

const statusConfig = {
  open: { label: "Open", color: "bg-info/10 text-info border-info/20" },
  mitigated: { label: "Mitigated", color: "bg-warning/10 text-warning border-warning/20" },
  resolved: { label: "Resolved", color: "bg-success/10 text-success border-success/20" },
  blocked: { label: "Blocked by Client", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

function RAIDItemCard({ item }: { item: RAIDItem }) {
  const TypeIcon = typeConfig[item.type].icon;
  const isClientOwned = item.ownerType === "Client";
  const isPastDue = item.dueDate && new Date(item.dueDate) < new Date();

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-colors",
      item.status === "blocked" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card hover:bg-muted/30"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", typeConfig[item.type].bgColor)}>
            <TypeIcon className={cn("h-4 w-4", typeConfig[item.type].color)} />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground">{item.title}</span>
              <Badge variant="outline" className={cn("text-xs", priorityConfig[item.priority].color)}>
                {priorityConfig[item.priority].label}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", statusConfig[item.status].color)}>
                {statusConfig[item.status].label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {item.owner}
                {isClientOwned && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-1">
                    Client
                  </Badge>
                )}
              </span>
              {item.dueDate && (
                <span className={cn("flex items-center gap-1", isPastDue && "text-destructive")}>
                  <Clock className="h-3 w-3" />
                  Due: {item.dueDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit2 className="h-4 w-4" />
          </Button>
          {isClientOwned && item.status === "blocked" && (
            <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              Escalate
            </Button>
          )}
          {!isClientOwned && item.status === "open" && (
            <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Resolve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function SupplierRAIDLog() {
  const [activeTab, setActiveTab] = useState("all");

  const clientBlockedItems = mockRAIDItems.filter((item) => item.ownerType === "Client" && item.status === "blocked");
  const dqTasks = mockRAIDItems.filter((item) => item.ownerType === "DQ" && item.status === "open");

  const filterItems = (type?: string) => {
    if (type === "all") return mockRAIDItems;
    return mockRAIDItems.filter((item) => item.type === type);
  };

  const typeCounts = {
    Risk: mockRAIDItems.filter((i) => i.type === "Risk").length,
    Assumption: mockRAIDItems.filter((i) => i.type === "Assumption").length,
    Issue: mockRAIDItems.filter((i) => i.type === "Issue").length,
    Dependency: mockRAIDItems.filter((i) => i.type === "Dependency").length,
  };

  return (
    <div className="space-y-6">
      {/* Action Summary - Supplier Perspective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Waiting on Client */}
        <div className="card-elevated p-5 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Waiting on Client</h3>
            </div>
            <Badge variant="destructive">{clientBlockedItems.length}</Badge>
          </div>
          <div className="space-y-2">
            {clientBlockedItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-destructive hover:text-destructive">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                  Escalate
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Your Delivery Tasks */}
        <div className="card-elevated p-5 border-l-4 border-l-[#001035]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#001035]" />
              <h3 className="font-semibold text-foreground">Your Delivery Tasks</h3>
            </div>
            <Badge className="bg-[#001035]">{dqTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {dqTasks.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  {item.type === "Risk" && <AlertTriangle className="h-4 w-4 text-warning" />}
                  {item.type === "Issue" && <AlertCircle className="h-4 w-4 text-destructive" />}
                  {item.type === "Assumption" && <HelpCircle className="h-4 w-4 text-info" />}
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-success hover:text-success">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full RAID Log */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <AlertTriangle className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">RAID Log</h2>
              <p className="text-sm text-muted-foreground">
                {mockRAIDItems.length} items • {mockRAIDItems.filter((i) => i.status === "open" || i.status === "blocked").length} active
              </p>
            </div>
          </div>
          <Button className="bg-[#001035] hover:bg-[#001035]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Type Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(Object.keys(typeCounts) as Array<keyof typeof typeCounts>).map((type) => {
            const config = typeConfig[type];
            const Icon = config.icon;
            return (
              <div
                key={type}
                className={cn("flex items-center gap-3 p-3 rounded-lg border", config.bgColor)}
              >
                <Icon className={cn("h-5 w-5", config.color)} />
                <div>
                  <p className="text-lg font-semibold text-foreground">{typeCounts[type]}</p>
                  <p className="text-xs text-muted-foreground">{type}s</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-muted/50 p-1">
            <TabsTrigger value="all" className="px-4">All ({mockRAIDItems.length})</TabsTrigger>
            <TabsTrigger value="Risk" className="px-4">Risks ({typeCounts.Risk})</TabsTrigger>
            <TabsTrigger value="Assumption" className="px-4">Assumptions ({typeCounts.Assumption})</TabsTrigger>
            <TabsTrigger value="Issue" className="px-4">Issues ({typeCounts.Issue})</TabsTrigger>
            <TabsTrigger value="Dependency" className="px-4">Dependencies ({typeCounts.Dependency})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {filterItems(activeTab).map((item) => (
              <RAIDItemCard key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
