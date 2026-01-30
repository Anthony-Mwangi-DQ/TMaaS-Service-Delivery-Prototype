import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bell, Calendar, AlertTriangle, FileCheck, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Deadline {
  id: string;
  title: string;
  time: string;
  type: "milestone" | "deliverable" | "meeting";
  service: string;
}

interface Dependency {
  id: string;
  title: string;
  blockedSince: string;
  severity: "critical" | "high" | "medium";
  service: string;
}

interface Approval {
  id: string;
  title: string;
  type: string;
  submittedBy: string;
  service: string;
}

const todaysDeadlines: Deadline[] = [
  { id: "1", title: "Submit revised project timeline", time: "2:00 PM", type: "deliverable", service: "Digital GRC Strategy" },
  { id: "2", title: "Milestone 2 kickoff meeting", time: "4:30 PM", type: "meeting", service: "Digital GRC Strategy" },
  { id: "3", title: "Stakeholder review submission", time: "5:00 PM", type: "milestone", service: "Security Assessment" },
];

const blockingDependencies: Dependency[] = [
  { id: "1", title: "Awaiting IT security clearance for data access", blockedSince: "3 days", severity: "critical", service: "Digital GRC Strategy" },
  { id: "2", title: "Pending legal review of contract terms", blockedSince: "5 days", severity: "high", service: "Compliance Audit" },
  { id: "3", title: "Resource allocation confirmation needed", blockedSince: "2 days", severity: "medium", service: "Digital GRC Strategy" },
];

const pendingApprovals: Approval[] = [
  { id: "1", title: "Q1 Budget Allocation Document", type: "Commercial", submittedBy: "Finance Team", service: "Digital GRC Strategy" },
  { id: "2", title: "Technical Architecture Review", type: "Deliverable", submittedBy: "Tech Lead", service: "Security Assessment" },
  { id: "3", title: "Vendor Contract Amendment", type: "Commercial", submittedBy: "Procurement", service: "Compliance Audit" },
];

const Notifications = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Notification Centre</h1>
              <p className="text-sm text-muted-foreground">
                Your daily briefing and action items across all services
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="all" className="px-6">All Items</TabsTrigger>
            <TabsTrigger value="deadlines" className="px-6">Today's Deadlines</TabsTrigger>
            <TabsTrigger value="dependencies" className="px-6">Blocking Dependencies</TabsTrigger>
            <TabsTrigger value="approvals" className="px-6">Pending Approvals</TabsTrigger>
          </TabsList>

          {/* All Items Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-12 gap-6">
              {/* Today's Deadlines */}
              <div className="col-span-12 lg:col-span-4">
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                      <Calendar className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Today's Deadlines</h3>
                      <p className="text-sm text-muted-foreground">{todaysDeadlines.length} items due today</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {todaysDeadlines.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                        <Clock className="h-4 w-4 text-info mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                            <span className="text-xs text-muted-foreground">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blocking Dependencies */}
              <div className="col-span-12 lg:col-span-4">
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Blocking Dependencies</h3>
                      <p className="text-sm text-muted-foreground">{blockingDependencies.length} items blocking progress</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {blockingDependencies.map((item) => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow",
                          item.severity === "critical" && "border-l-2 border-l-destructive",
                          item.severity === "high" && "border-l-2 border-l-warning",
                          item.severity === "medium" && "border-l-2 border-l-info"
                        )}
                      >
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              item.severity === "critical" && "text-destructive border-destructive/30",
                              item.severity === "high" && "text-warning border-warning/30",
                              item.severity === "medium" && "text-info border-info/30"
                            )}
                          >
                            {item.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Blocked {item.blockedSince}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="col-span-12 lg:col-span-4">
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                      <FileCheck className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Pending Approvals</h3>
                      <p className="text-sm text-muted-foreground">{pendingApprovals.length} items awaiting approval</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                          <Button size="sm" className="h-7 text-xs">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Deadlines Tab */}
          <TabsContent value="deadlines">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                  <Calendar className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Today's Deadlines</h3>
                  <p className="text-sm text-muted-foreground">{todaysDeadlines.length} items due today</p>
                </div>
              </div>
              <div className="space-y-3">
                {todaysDeadlines.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                    <Clock className="h-4 w-4 text-info mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Dependencies Tab */}
          <TabsContent value="dependencies">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Blocking Dependencies</h3>
                  <p className="text-sm text-muted-foreground">{blockingDependencies.length} items blocking progress</p>
                </div>
              </div>
              <div className="space-y-3">
                {blockingDependencies.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow",
                      item.severity === "critical" && "border-l-4 border-l-destructive",
                      item.severity === "high" && "border-l-4 border-l-warning",
                      item.severity === "medium" && "border-l-4 border-l-info"
                    )}
                  >
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          item.severity === "critical" && "text-destructive border-destructive/30",
                          item.severity === "high" && "text-warning border-warning/30",
                          item.severity === "medium" && "text-info border-info/30"
                        )}
                      >
                        {item.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Blocked {item.blockedSince}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <FileCheck className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Pending Approvals</h3>
                  <p className="text-sm text-muted-foreground">{pendingApprovals.length} items awaiting approval</p>
                </div>
              </div>
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{item.service}</Badge>
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      <span className="text-xs text-muted-foreground">Submitted by {item.submittedBy}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                      <Button size="sm" className="h-7 text-xs">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
