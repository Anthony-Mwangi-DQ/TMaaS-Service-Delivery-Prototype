import { useState } from "react";
import { Calendar, Clock, Video, FileText, ExternalLink, CheckCircle2, Users, ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  date: string;
  time: string;
  topic: string;
  type: "video" | "workshop" | "review";
  hasNotes?: boolean;
  notesUrl?: string;
  status?: "upcoming" | "completed";
  linkedMilestone?: string;
  // New fields for preparation context
  attendees?: string[];
  agenda?: Array<{ item: string; duration: string }>;
  preReadMaterials?: Array<{ name: string; uploadedDate: string }>;
  preparationTasks?: Array<{ task: string; completed: boolean }>;
  decisions?: string[];
  // Past session fields
  recordingUrl?: string;
  sessionNotes?: string;
  actionItems?: Array<{ action: string; owner: string; status: "open" | "completed" }>;
  keyDecisions?: string[];
}

const upcomingSessions: Session[] = [
  {
    id: "1",
    date: "Feb 26, 2024",
    time: "10:00 AM EST",
    topic: "Strategy Workshop: Risk Framework Review",
    type: "workshop",
    status: "upcoming",
    linkedMilestone: "Milestone 03",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)", "Ahmed Hassan (DQ)", "Mike Chen (STC)"],
    agenda: [
      { item: "Review risk categories and definitions", duration: "15 min" },
      { item: "Validate impact scoring methodology", duration: "20 min" },
      { item: "Approve risk mitigation plan", duration: "15 min" },
      { item: "Next steps and action items", duration: "10 min" },
    ],
    preReadMaterials: [
      { name: "Risk Assessment Matrix v2.0", uploadedDate: "Jan 20, 2024" },
      { name: "Mitigation Strategies Draft", uploadedDate: "Jan 22, 2024" },
    ],
    preparationTasks: [
      { task: "Review risk matrix and categories", completed: false },
      { task: "Prepare questions on Category 3 risks", completed: false },
      { task: "Gather stakeholder feedback on mitigation strategies", completed: false },
    ],
    decisions: [
      "Approve final risk categories",
      "Sign off on impact scoring model",
      "Assign mitigation owners",
    ],
  },
  {
    id: "2",
    date: "Feb 28, 2024",
    time: "2:00 PM EST",
    topic: "Milestone 02 Checkpoint Call",
    type: "video",
    status: "upcoming",
    linkedMilestone: "Milestone 02",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)"],
    agenda: [
      { item: "MS02 deliverable status review", duration: "10 min" },
      { item: "Discuss pending acceptance items", duration: "15 min" },
      { item: "MS03 planning and timeline", duration: "10 min" },
    ],
    preReadMaterials: [
      { name: "MS02 Status Report", uploadedDate: "Feb 25, 2024" },
    ],
    preparationTasks: [
      { task: "Review MS02 deliverable", completed: true },
      { task: "Prepare feedback on design document", completed: false },
    ],
    decisions: [
      "Accept or request changes to MS02",
      "Confirm MS03 start date",
    ],
  },
];

const pastSessions: Session[] = [
  {
    id: "3",
    date: "Feb 20, 2024",
    time: "11:00 AM EST",
    topic: "Deliverable Review: Draft Documentation",
    type: "review",
    hasNotes: true,
    notesUrl: "#",
    status: "completed",
    linkedMilestone: "Milestone 02",
    recordingUrl: "#",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)", "Ahmed Hassan (DQ)"],
    sessionNotes: "Reviewed MS02 design documentation. Client provided feedback on sections 3.2 and 4.1. Overall positive reception with minor clarifications needed.",
    keyDecisions: [
      "Approved design approach for GRC framework",
      "Requested additional detail in risk assessment methodology",
      "Agreed to extend review period by 2 days for stakeholder input"
    ],
    actionItems: [
      { action: "Update section 3.2 with additional risk examples", owner: "DQ Team", status: "completed" },
      { action: "Clarify compliance mapping in section 4.1", owner: "DQ Team", status: "completed" },
      { action: "Circulate updated draft to stakeholders", owner: "Jane Doe", status: "completed" }
    ]
  },
  {
    id: "4",
    date: "Feb 15, 2024",
    time: "2:00 PM EST",
    topic: "Milestone 01 Sign-off Meeting",
    type: "video",
    hasNotes: true,
    notesUrl: "#",
    status: "completed",
    linkedMilestone: "Milestone 01",
    recordingUrl: "#",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)", "Mike Chen (STC)"],
    sessionNotes: "Formal sign-off of MS01 deliverables. Project charter approved. Discussed MS02 timeline and resource allocation.",
    keyDecisions: [
      "MS01 formally accepted and signed off",
      "Approved project charter and governance structure",
      "Confirmed MS02 delivery date of Jan 6, 2026"
    ],
    actionItems: [
      { action: "Process MS01 invoice", owner: "DQ Finance", status: "completed" },
      { action: "Schedule MS02 kickoff workshop", owner: "Sarah Mitchell", status: "completed" },
      { action: "Share project charter with extended team", owner: "Jane Doe", status: "completed" }
    ]
  },
  {
    id: "5",
    date: "Feb 10, 2024",
    time: "10:00 AM EST",
    topic: "Kickoff Workshop",
    type: "workshop",
    hasNotes: true,
    notesUrl: "#",
    status: "completed",
    linkedMilestone: "Milestone 01",
    recordingUrl: "#",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)", "Ahmed Hassan (DQ)", "Mike Chen (STC)", "Lisa Wang (STC)"],
    sessionNotes: "Project kickoff with full team. Reviewed scope, timeline, and deliverables. Established communication protocols and working cadence.",
    keyDecisions: [
      "Agreed on weekly status report cadence",
      "Established bi-weekly working sessions",
      "Confirmed primary stakeholders and decision makers"
    ],
    actionItems: [
      { action: "Set up project collaboration workspace", owner: "DQ Team", status: "completed" },
      { action: "Distribute contact list and org chart", owner: "Sarah Mitchell", status: "completed" },
      { action: "Schedule recurring status calls", owner: "Jane Doe", status: "completed" }
    ]
  },
  {
    id: "6",
    date: "Feb 5, 2024",
    time: "3:00 PM EST",
    topic: "Project Introduction Call",
    type: "video",
    hasNotes: true,
    notesUrl: "#",
    status: "completed",
    recordingUrl: "#",
    attendees: ["Jane Doe (STC)", "Sarah Mitchell (DQ)"],
    sessionNotes: "Initial introduction and project overview. Discussed objectives, constraints, and success criteria.",
    keyDecisions: [
      "Confirmed project scope and objectives",
      "Agreed on kickoff workshop date",
      "Established primary communication channels"
    ],
    actionItems: [
      { action: "Send project overview deck", owner: "Sarah Mitchell", status: "completed" },
      { action: "Prepare kickoff workshop agenda", owner: "DQ Team", status: "completed" }
    ]
  },
];

const typeConfig = {
  video: { label: "Video Call", icon: Video, color: "bg-info/10 text-info" },
  workshop: { label: "Workshop", icon: Calendar, color: "bg-primary/10 text-primary" },
  review: { label: "Review", icon: FileText, color: "bg-success/10 text-success" },
};

function SessionCard({ session, isPast = false }: { session: Session; isPast?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = typeConfig[session.type];
  const TypeIcon = config.icon;
  
  const incompleteTasks = session.preparationTasks?.filter(t => !t.completed).length || 0;
  const totalTasks = session.preparationTasks?.length || 0;
  const openActions = session.actionItems?.filter(a => a.status === "open").length || 0;

  return (
    <div className="rounded-lg border border-border bg-card hover:shadow-sm transition-all">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 flex-1">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color} shrink-0`}>
              <TypeIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                  {config.label}
                </span>
                {session.linkedMilestone && (
                  <Badge variant="outline" className="text-xs">
                    {session.linkedMilestone}
                  </Badge>
                )}
                {isPast && (
                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {!isPast && incompleteTasks > 0 && (
                  <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                    {incompleteTasks} prep task{incompleteTasks > 1 ? 's' : ''} pending
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground">{session.topic}</h3>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {session.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.time}
                </span>
                {session.attendees && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {session.attendees.length} attendees
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {((!isPast && session.agenda) || (isPast && (session.keyDecisions || session.actionItems))) && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Hide" : "View"} Details
                <ChevronDown className={cn(
                  "ml-1.5 h-3.5 w-3.5 transition-transform",
                  isExpanded && "rotate-180"
                )} />
              </Button>
            )}
            {session.recordingUrl && (
              <Button variant="outline" size="sm" className="text-xs">
                <Video className="h-3.5 w-3.5 mr-1.5" />
                Recording
              </Button>
            )}
            {session.hasNotes && (
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Notes
              </Button>
            )}
            {!isPast && (
              <Button variant="default" size="sm" className="text-xs">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Join
              </Button>
            )}
          </div>
        </div>

        {/* Expanded Details - Upcoming Sessions */}
        {isExpanded && !isPast && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Attendees */}
            {session.attendees && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Attendees ({session.attendees.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {session.attendees.map((attendee, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda */}
            {session.agenda && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Agenda
                </h4>
                <div className="space-y-2">
                  {session.agenda.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-muted-foreground font-mono shrink-0">{idx + 1}.</span>
                      <span className="text-foreground flex-1">{item.item}</span>
                      <span className="text-muted-foreground shrink-0">({item.duration})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pre-read Materials */}
            {session.preReadMaterials && session.preReadMaterials.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Pre-read Materials
                </h4>
                <div className="space-y-2">
                  {session.preReadMaterials.map((material, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{material.name}</p>
                          <p className="text-[10px] text-muted-foreground">Uploaded {material.uploadedDate}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Tasks */}
            {session.preparationTasks && session.preparationTasks.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Your Preparation ({totalTasks - incompleteTasks}/{totalTasks} complete)
                </h4>
                <div className="space-y-2">
                  {session.preparationTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        className="h-4 w-4 rounded border-border"
                        readOnly
                      />
                      <span className={cn(
                        "text-xs",
                        task.completed ? "text-muted-foreground line-through" : "text-foreground"
                      )}>
                        {task.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Decisions Required */}
            {session.decisions && session.decisions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                  Decisions Required
                </h4>
                <div className="space-y-1">
                  {session.decisions.map((decision, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-warning shrink-0">•</span>
                      <span className="text-foreground">{decision}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Add to Calendar
              </Button>
              <Button size="sm" className="text-xs">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Join Meeting
              </Button>
            </div>
          </div>
        )}

        {/* Expanded Details - Past Sessions */}
        {isExpanded && isPast && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Session Notes */}
            {session.sessionNotes && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Session Summary
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {session.sessionNotes}
                </p>
              </div>
            )}

            {/* Attendees */}
            {session.attendees && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Attendees ({session.attendees.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {session.attendees.map((attendee, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Key Decisions */}
            {session.keyDecisions && session.keyDecisions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  Key Decisions ({session.keyDecisions.length})
                </h4>
                <div className="space-y-2">
                  {session.keyDecisions.map((decision, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded bg-success/5 border border-success/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                      <span className="text-xs text-foreground">{decision}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Items */}
            {session.actionItems && session.actionItems.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Action Items ({session.actionItems.filter(a => a.status === "completed").length}/{session.actionItems.length} completed)
                </h4>
                <div className="space-y-2">
                  {session.actionItems.map((action, idx) => (
                    <div key={idx} className={cn(
                      "flex items-start gap-2 p-2 rounded border",
                      action.status === "completed" 
                        ? "bg-muted/30 border-border" 
                        : "bg-warning/5 border-warning/20"
                    )}>
                      {action.status === "completed" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={cn(
                          "text-xs",
                          action.status === "completed" 
                            ? "text-muted-foreground line-through" 
                            : "text-foreground font-medium"
                        )}>
                          {action.action}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Owner: {action.owner}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function WorkingSessions() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
            <Users className="h-5 w-5 text-info" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Working Sessions</h2>
            <p className="text-sm text-muted-foreground">{upcomingSessions.length} upcoming, {pastSessions.length} past</p>
          </div>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Calendar className="h-4 w-4 mr-2" />
          Request a Session
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4 bg-muted/50 p-1">
          <TabsTrigger value="upcoming" className="text-xs px-4">
            Upcoming
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {upcomingSessions.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="text-xs px-4">
            Past Sessions
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {pastSessions.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3">
          {upcomingSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No upcoming sessions scheduled.</p>
          ) : (
            upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-3">
          {pastSessions.map((session) => (
            <SessionCard key={session.id} session={session} isPast />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
