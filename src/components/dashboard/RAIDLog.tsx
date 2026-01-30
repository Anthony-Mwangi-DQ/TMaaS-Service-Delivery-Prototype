import { AlertCircle, CheckCircle2, Clock, HelpCircle, ShieldAlert, ArrowRight, MessageSquare, Filter, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface RAIDItem {
  id: string;
  type: "Risk" | "Assumption" | "Issue" | "Dependency";
  description: string;
  impact: "High" | "Medium" | "Low";
  owner: string;
  status: "Open" | "In Progress" | "Closed" | "Blocked";
  requiresCustomer?: boolean;
  actionRequired?: string;
  dueDate?: string;
  mitigation?: string;
  evidence?: string[];
  linkedMilestones?: string[];
  dateRaised?: string;
  dateResolved?: string;
}

const raidItems: RAIDItem[] = [
  // Risks
  {
    id: "R1",
    type: "Risk",
    description: "ABACUS RFQ",
    impact: "High",
    owner: "DQ",
    status: "Open",
    actionRequired: "ABACUS RFQ process to ensure the timely procurement of tool licenses",
    mitigation: "Expedite RFQ process, identify alternative vendors as backup",
    dueDate: "29 Jan",
    dateRaised: "15 Jan 2026",
    linkedMilestones: ["Milestone 04"],
    evidence: ["RFQ_Document.pdf", "Vendor_Comparison.xlsx"]
  },
  {
    id: "R2",
    type: "Risk",
    description: "Assessment Findings - Review Delays",
    impact: "Medium",
    owner: "STC Bank",
    status: "Open",
    requiresCustomer: true,
    actionRequired: "STC Bank must ensure sufficient effort is allocated to close reviews within 5 days of submission",
    mitigation: "Escalate to project sponsor, establish dedicated review team",
    dateRaised: "10 Jan 2026",
    linkedMilestones: ["Milestone 03"],
    evidence: ["Review_SLA_Agreement.pdf"]
  },
  {
    id: "R3",
    type: "Risk",
    description: "Compliance Report Format Expectation",
    impact: "Medium",
    owner: "Joint",
    status: "Open",
    actionRequired: "Compliance report formats vary using DQ standard approach and needs to be aligned on early",
    mitigation: "Schedule alignment workshop, create sample templates for approval",
    dateRaised: "08 Jan 2026",
    linkedMilestones: ["Milestone 03", "Milestone 04"],
    evidence: ["Format_Samples.pdf"]
  },
  // Dependencies
  {
    id: "D1",
    type: "Dependency",
    description: "Data Submission & Access",
    impact: "High",
    owner: "STC Bank",
    status: "Closed",
    requiresCustomer: false,
    actionRequired: "Submission of the requested Data input prior to commencement of Baseline Analysis",
    dueDate: "13th March (Due) / 20th March (Forecast)",
    dateRaised: "05 Jan 2026",
    dateResolved: "18 Jan 2026",
    linkedMilestones: ["Milestone 02"],
    evidence: ["Data_Submission_Confirmation.pdf"]
  },
  {
    id: "D2",
    type: "Dependency",
    description: "ABACUS EA Tool",
    impact: "Medium",
    owner: "DQ",
    status: "In Progress",
    actionRequired: "Provision of ABACUS EA tool for the purposes of ongoing compliance planning",
    dueDate: "29th Jan (Due) / 29+ Jan (Forecast)",
    dateRaised: "12 Jan 2026",
    linkedMilestones: ["Milestone 04"],
    evidence: ["Tool_Procurement_Status.pdf"]
  },
];

const typeConfig = {
  Risk: { icon: AlertCircle, color: "text-warning" },
  Assumption: { icon: HelpCircle, color: "text-info" },
  Issue: { icon: AlertCircle, color: "text-destructive" },
  Dependency: { icon: Clock, color: "text-primary" },
};

const impactConfig = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const statusConfig = {
  Open: "bg-info/10 text-info border-info/20",
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  Closed: "bg-success/10 text-success border-success/20",
  Blocked: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RAIDLog() {
  const [filterType, setFilterType] = useState<"all" | "Risk" | "Assumption" | "Issue" | "Dependency">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "closed">("all");

  const requiresAttention = raidItems.filter(i => i.requiresCustomer && i.status !== "Closed").length;
  const openItems = raidItems.filter(i => i.status !== "Closed");

  // Filter items
  const filteredItems = raidItems.filter(item => {
    const typeMatch = filterType === "all" || item.type === filterType;
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "open" && item.status !== "Closed") ||
      (filterStatus === "closed" && item.status === "Closed");
    return typeMatch && statusMatch;
  });

  // Count by type
  const counts = {
    risks: raidItems.filter(i => i.type === "Risk" && i.status !== "Closed").length,
    assumptions: raidItems.filter(i => i.type === "Assumption" && i.status !== "Closed").length,
    issues: raidItems.filter(i => i.type === "Issue" && i.status !== "Closed").length,
    dependencies: raidItems.filter(i => i.type === "Dependency" && i.status !== "Closed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Open</p>
                <p className="text-2xl font-bold text-foreground">{openItems.length}</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risks</p>
                <p className="text-2xl font-bold text-warning">{counts.risks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-destructive">{counts.issues}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dependencies</p>
                <p className="text-2xl font-bold text-primary">{counts.dependencies}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assumptions</p>
                <p className="text-2xl font-bold text-info">{counts.assumptions}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Summary */}
      {requiresAttention > 0 && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Action Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">{requiresAttention} items require your action</p>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                {requiresAttention} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {raidItems
                .filter(item => item.requiresCustomer && item.status !== "Closed")
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-primary/20"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={cn("text-xs", statusConfig[item.status])}>
                          {item.type}
                        </Badge>
                        {item.dueDate && (
                          <span className="text-xs text-destructive font-medium">Due: {item.dueDate}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{item.description}</p>
                      {item.actionRequired && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <ArrowRight className="inline h-3 w-3 mr-1" />
                          {item.actionRequired}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <a href="#messages">
                          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                          Discuss
                        </a>
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* RAID Items with Filters */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-base">RAID Log</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage risks, assumptions, issues, and dependencies
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter:</span>
            </div>
            
            <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="flex-1">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="text-xs">
                  All ({raidItems.length})
                </TabsTrigger>
                <TabsTrigger value="Risk" className="text-xs">
                  Risks ({raidItems.filter(i => i.type === "Risk").length})
                </TabsTrigger>
                <TabsTrigger value="Issue" className="text-xs">
                  Issues ({raidItems.filter(i => i.type === "Issue").length})
                </TabsTrigger>
                <TabsTrigger value="Dependency" className="text-xs">
                  Dependencies ({raidItems.filter(i => i.type === "Dependency").length})
                </TabsTrigger>
                <TabsTrigger value="Assumption" className="text-xs">
                  Assumptions ({raidItems.filter(i => i.type === "Assumption").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="text-sm border rounded-md px-3 py-1.5 bg-background"
            >
              <option value="all">All Status</option>
              <option value="open">Open Only</option>
              <option value="closed">Closed Only</option>
            </select>
          </div>

          {/* RAID Items List */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const TypeIcon = typeConfig[item.type].icon;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    item.requiresCustomer && item.status !== "Closed" && "bg-accent/30 border-primary/30",
                    !item.requiresCustomer && "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TypeIcon className={cn("h-5 w-5", typeConfig[item.type].color)} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs font-mono">
                            {item.id}
                          </Badge>
                          <span className="text-sm font-semibold text-foreground">{item.description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn("text-xs", impactConfig[item.impact])}>
                            {item.impact} Impact
                          </Badge>
                          <Badge variant="outline" className={cn("text-xs", statusConfig[item.status])}>
                            {item.status}
                          </Badge>
                          {item.requiresCustomer && item.status !== "Closed" && (
                            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
                              Your Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground">Owner:</span>
                      <p className="font-medium text-foreground">{item.owner}</p>
                    </div>
                    {item.dueDate && (
                      <div>
                        <span className="text-xs text-muted-foreground">Due Date:</span>
                        <p className="font-medium text-foreground">{item.dueDate}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-muted-foreground">Date Raised:</span>
                      <p className="font-medium text-foreground">{item.dateRaised}</p>
                    </div>
                    {item.dateResolved && (
                      <div>
                        <span className="text-xs text-muted-foreground">Date Resolved:</span>
                        <p className="font-medium text-success">{item.dateResolved}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Required */}
                  {item.actionRequired && (
                    <div className="mb-3 p-3 rounded-md bg-background/50 border border-border">
                      <span className="text-xs font-medium text-foreground">Action Required:</span>
                      <p className="text-sm text-muted-foreground mt-1">{item.actionRequired}</p>
                    </div>
                  )}

                  {/* Mitigation */}
                  {item.mitigation && (
                    <div className="mb-3 p-3 rounded-md bg-success/5 border border-success/20">
                      <span className="text-xs font-medium text-success">Mitigation:</span>
                      <p className="text-sm text-foreground mt-1">{item.mitigation}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    {/* Linked Milestones */}
                    {item.linkedMilestones && item.linkedMilestones.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Linked:</span>
                        {item.linkedMilestones.map((ms, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {ms}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Evidence */}
                    {item.evidence && item.evidence.length > 0 && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {item.evidence.length} document{item.evidence.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">No RAID items match the selected filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
