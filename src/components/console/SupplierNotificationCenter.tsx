import { Calendar, Upload, FileCheck, Clock, ChevronRight, CalendarDays, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { format, startOfWeek, addDays, isToday } from "date-fns";

interface DeliverableItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  dueTime: string;
  milestone: string;
}

interface ClientBlockerItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  waitingSince: string;
  type: "approval" | "input" | "decision";
  clientName: string;
}

interface ClientInputItem {
  id: string;
  title: string;
  serviceName: string;
  serviceId: string;
  receivedAt: string;
  uploadedBy: string;
}

// Mock data - supplier perspective
const deliverablesDue: DeliverableItem[] = [
  {
    id: "1",
    title: "Risk Assessment Report v2",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    dueTime: "Tomorrow",
    milestone: "Milestone 2",
  },
  {
    id: "2",
    title: "Implementation Roadmap",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    dueTime: "Friday",
    milestone: "Milestone 2",
  },
];

const awaitingClientResponse: ClientBlockerItem[] = [
  {
    id: "1",
    title: "Draft Strategy Document v2.1",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    waitingSince: "2 days",
    type: "approval",
    clientName: "Jane Doe",
  },
  {
    id: "2",
    title: "API Credentials for Integration",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    waitingSince: "3 days",
    type: "input",
    clientName: "Jane Doe",
  },
];

const clientInputReceived: ClientInputItem[] = [
  {
    id: "1",
    title: "Organization Chart v3",
    serviceName: "Digital GRC Strategy",
    serviceId: "1",
    receivedAt: "2 hours ago",
    uploadedBy: "Jane Doe",
  },
];

const getBlockerTypeConfig = (type: ClientBlockerItem["type"]) => {
  switch (type) {
    case "approval":
      return { label: "Approval", color: "bg-warning/10 text-warning border-warning/20" };
    case "input":
      return { label: "Input", color: "bg-info/10 text-info border-info/20" };
    case "decision":
      return { label: "Decision", color: "bg-destructive/10 text-destructive border-destructive/20" };
  }
};

// Mock data for week view
const weekEvents: { [key: string]: { count: number; hasDeliverable: boolean } } = {
  "2026-01-28": { count: 1, hasDeliverable: true },
  "2026-01-30": { count: 2, hasDeliverable: true },
  "2026-01-31": { count: 1, hasDeliverable: false },
};

function ThisWeekCalendar() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex items-center gap-1">
      {days.map((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        const event = weekEvents[dateKey];
        const isTodayDate = isToday(day);
        
        return (
          <div
            key={dateKey}
            className={cn(
              "flex flex-col items-center p-1.5 rounded-md min-w-[40px] transition-colors",
              isTodayDate && "bg-[#001035]/10 ring-1 ring-[#001035]/30",
              event?.hasDeliverable && !isTodayDate && "bg-warning/10"
            )}
          >
            <span className="text-[10px] text-muted-foreground uppercase">
              {format(day, "EEE")}
            </span>
            <span className={cn(
              "text-sm font-medium",
              isTodayDate ? "text-[#001035]" : "text-foreground"
            )}>
              {format(day, "d")}
            </span>
            {event && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mt-0.5",
                event.hasDeliverable ? "bg-warning" : "bg-info"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SupplierNotificationCenter() {
  const totalItems = deliverablesDue.length + awaitingClientResponse.length + clientInputReceived.length;

  return (
    <Card className="card-elevated">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <Calendar className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Daily Briefing</h2>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", { 
                  weekday: "long", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {totalItems} items
          </Badge>
        </div>
        
        {/* This Week Calendar */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">This Week</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                Deliverable Due
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-info" />
                Event
              </span>
            </div>
          </div>
          <ThisWeekCalendar />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Your Deliverables Due */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Upload className="h-4 w-4 text-[#001035]" />
            <h3 className="text-sm font-semibold text-foreground">Your Deliverables Due</h3>
            <Badge variant="outline" className="text-xs ml-auto">
              {deliverablesDue.length}
            </Badge>
          </div>
          {deliverablesDue.length > 0 ? (
            <div className="space-y-2">
              {deliverablesDue.map((item) => (
                <Link
                  key={item.id}
                  to={`/console/deliveries/${item.serviceId}?tab=documents`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📄</span>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-[#001035] transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.serviceName} • {item.milestone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.dueTime}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#001035] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No deliverables due this week 🎉
            </p>
          )}
        </section>

        <Separator />

        {/* Awaiting Client Response */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Awaiting Client Response</h3>
            <Badge variant="outline" className="text-xs ml-auto border-warning/30 text-warning">
              {awaitingClientResponse.length}
            </Badge>
          </div>
          {awaitingClientResponse.length > 0 ? (
            <div className="space-y-2">
              {awaitingClientResponse.map((item) => {
                const typeConfig = getBlockerTypeConfig(item.type);
                return (
                  <Link
                    key={item.id}
                    to={`/console/deliveries/${item.serviceId}?tab=raid`}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={cn("text-xs", typeConfig.color)}>
                          {typeConfig.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          from {item.clientName}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-[#001035] transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.serviceName} • Waiting {item.waitingSince}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Follow Up
                      </Button>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#001035] transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pending client responses ✅
            </p>
          )}
        </section>

        <Separator />

        {/* Client Input Received */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="h-4 w-4 text-success" />
            <h3 className="text-sm font-semibold text-foreground">Client Input Received</h3>
            <Badge variant="outline" className="text-xs ml-auto border-success/30 text-success">
              {clientInputReceived.length}
            </Badge>
          </div>
          {clientInputReceived.length > 0 ? (
            <div className="space-y-2">
              {clientInputReceived.map((item) => (
                <Link
                  key={item.id}
                  to={`/console/deliveries/${item.serviceId}?tab=documents`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-success/5 hover:bg-success/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📥</span>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-[#001035] transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.serviceName} • Uploaded by {item.uploadedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                      {item.receivedAt}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#001035] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No new inputs from clients
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
