import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, CheckCircle2, AlertTriangle, FileText, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "deliverable" | "approval" | "client-response" | "escalation";
  title: string;
  description: string;
  clientOrg: string;
  serviceName: string;
  dueDate?: string;
  timestamp: string;
  isUrgent: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "deliverable",
    title: "GRC Strategy Framework Due",
    description: "Updated version with risk categories needs to be delivered",
    clientOrg: "STC",
    serviceName: "Digital GRC Strategy",
    dueDate: "Today",
    timestamp: "2 hours ago",
    isUrgent: true,
  },
  {
    id: "2",
    type: "client-response",
    title: "Security Policy Documents Received",
    description: "STC has uploaded the requested security policy documentation",
    clientOrg: "STC",
    serviceName: "Digital GRC Strategy",
    timestamp: "3 hours ago",
    isUrgent: false,
  },
  {
    id: "3",
    type: "escalation",
    title: "IT Access Pending - 3 Days Overdue",
    description: "Infrastructure access request still pending client IT approval",
    clientOrg: "STC",
    serviceName: "Digital GRC Strategy",
    dueDate: "Overdue",
    timestamp: "1 day ago",
    isUrgent: true,
  },
  {
    id: "4",
    type: "approval",
    title: "Milestone 1 Approval Pending",
    description: "Current State Assessment awaiting client sign-off",
    clientOrg: "Aramco",
    serviceName: "Cybersecurity Framework",
    dueDate: "Tomorrow",
    timestamp: "4 hours ago",
    isUrgent: false,
  },
  {
    id: "5",
    type: "deliverable",
    title: "Risk Assessment Matrix Due",
    description: "Risk matrix for Phase 2 needs to be completed",
    clientOrg: "Aramco",
    serviceName: "Cybersecurity Framework",
    dueDate: "In 2 days",
    timestamp: "5 hours ago",
    isUrgent: false,
  },
];

const typeConfig = {
  deliverable: { icon: FileText, color: "text-[#001035]", bgColor: "bg-[#001035]/10", label: "Deliverable" },
  approval: { icon: CheckCircle2, color: "text-warning", bgColor: "bg-warning/10", label: "Pending Approval" },
  "client-response": { icon: ArrowUpRight, color: "text-success", bgColor: "bg-success/10", label: "Client Response" },
  escalation: { icon: AlertTriangle, color: "text-destructive", bgColor: "bg-destructive/10", label: "Escalation" },
};

export default function ConsoleNotifications() {
  const urgentCount = mockNotifications.filter((n) => n.isUrgent).length;

  return (
    <ConsoleLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
            <Bell className="h-5 w-5 text-[#001035]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {mockNotifications.length} notifications • {urgentCount} urgent
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-4">
        {mockNotifications.map((notification) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={cn(
                "card-elevated p-4 flex items-start gap-4",
                notification.isUrgent && "border-l-4 border-l-destructive"
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg shrink-0", config.bgColor)}>
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-medium text-foreground">{notification.title}</h3>
                  <Badge variant="outline" className={cn("text-xs", config.bgColor, config.color)}>
                    {config.label}
                  </Badge>
                  {notification.isUrgent && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{notification.clientOrg} • {notification.serviceName}</span>
                  {notification.dueDate && (
                    <span className={cn(
                      "flex items-center gap-1",
                      notification.dueDate === "Overdue" && "text-destructive",
                      notification.dueDate === "Today" && "text-warning"
                    )}>
                      <Clock className="h-3 w-3" />
                      {notification.dueDate}
                    </span>
                  )}
                  <span>{notification.timestamp}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          );
        })}
      </div>
    </ConsoleLayout>
  );
}
