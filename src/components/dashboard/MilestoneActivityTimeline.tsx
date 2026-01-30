import { 
  Clock, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Upload,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MilestoneActivity, MilestoneNote } from "@/types/milestone";

// Activity type configuration
const activityTypeConfig: Record<MilestoneActivity["activityType"], {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  label: string;
}> = {
  "status-change": {
    icon: ArrowRight,
    color: "text-primary",
    bgColor: "bg-primary/10",
    label: "Status Change"
  },
  "date-change": {
    icon: Calendar,
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Date Change"
  },
  "deliverable-update": {
    icon: FileText,
    color: "text-info",
    bgColor: "bg-info/10",
    label: "Deliverable Update"
  },
  "acceptance": {
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
    label: "Acceptance"
  },
  "comment": {
    icon: MessageSquare,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "Comment"
  },
  "document-upload": {
    icon: Upload,
    color: "text-info",
    bgColor: "bg-info/10",
    label: "Document"
  }
};

// Format timestamp to readable date
function formatTimestamp(timestamp: string): { date: string; time: string } {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  };
}

// Activity item component
function ActivityItem({ activity }: { activity: MilestoneActivity }) {
  const config = activityTypeConfig[activity.activityType];
  const Icon = config.icon;
  const { date, time } = formatTimestamp(activity.timestamp);

  return (
    <div className="flex gap-3 group">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
          config.bgColor,
          config.color,
          "border-border group-hover:scale-110"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="w-0.5 flex-1 bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-[10px]", config.bgColor, config.color)}>
              {config.label}
            </Badge>
            <span className="text-xs text-muted-foreground">{date} at {time}</span>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <User className="h-3 w-3" />
            {activity.actor}
          </span>
        </div>

        <p className="text-sm text-foreground mb-2">{activity.description}</p>

        {/* Metadata */}
        {activity.metadata && (
          <div className="text-xs text-muted-foreground space-y-1">
            {activity.metadata.from && activity.metadata.to && (
              <div className="flex items-center gap-2">
                <span className="font-medium">{activity.metadata.from}</span>
                <ArrowRight className="h-3 w-3" />
                <span className="font-medium">{activity.metadata.to}</span>
              </div>
            )}
            {activity.metadata.reason && (
              <div className="flex items-start gap-2 mt-2 p-2 rounded bg-muted/50">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                <span className="text-xs">{activity.metadata.reason}</span>
              </div>
            )}
            {activity.metadata.documentName && (
              <div className="flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                <span>{activity.metadata.documentName}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Note item component
function NoteItem({ note }: { note: MilestoneNote }) {
  const { date, time } = formatTimestamp(note.timestamp);

  return (
    <div className="flex gap-3 group">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
          "bg-muted border-border group-hover:scale-110"
        )}>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="w-0.5 flex-1 bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">{note.author}</span>
            {note.isInternal && (
              <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">
                Internal
              </Badge>
            )}
            {note.tags && note.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{date} at {time}</span>
        </div>

        <div className="text-sm text-foreground bg-muted/30 p-3 rounded-md border">
          {note.content}
        </div>
      </div>
    </div>
  );
}

// Add note form
function AddNoteForm({ onAdd }: { onAdd: (content: string, isInternal: boolean, tags: string[]) => void }) {
  const [content, setContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onAdd(content, isInternal, []);
      setContent("");
      setIsInternal(false);
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsExpanded(true)}
        className="w-full"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Add Note
      </Button>
    );
  }

  return (
    <Card className="border-primary/50">
      <CardContent className="pt-4 space-y-3">
        <div>
          <Label htmlFor="note-content">Note</Label>
          <Textarea
            id="note-content"
            placeholder="Add a note about this milestone..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="mt-1.5"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="internal-note"
            checked={isInternal}
            onChange={(e) => setIsInternal(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <Label htmlFor="internal-note" className="text-sm font-normal cursor-pointer">
            Internal note (not visible to client)
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleSubmit} disabled={!content.trim()}>
            Add Note
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsExpanded(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main timeline component
export function MilestoneActivityTimeline({
  activities = [],
  notes = [],
  onAddNote
}: {
  activities?: MilestoneActivity[];
  notes?: MilestoneNote[];
  onAddNote?: (content: string, isInternal: boolean, tags: string[]) => void;
}) {
  // Combine and sort by timestamp
  const allItems = [
    ...activities.map(a => ({ type: "activity" as const, item: a, timestamp: a.timestamp })),
    ...notes.map(n => ({ type: "note" as const, item: n, timestamp: n.timestamp }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity & Notes
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {allItems.length} {allItems.length === 1 ? "entry" : "entries"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add note form */}
        {onAddNote && (
          <AddNoteForm onAdd={onAddNote} />
        )}

        {/* Timeline */}
        {allItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No activity recorded yet</p>
          </div>
        ) : (
          <div className="space-y-0">
            {allItems.map((item, index) => (
              <div key={index}>
                {item.type === "activity" ? (
                  <ActivityItem activity={item.item as MilestoneActivity} />
                ) : (
                  <NoteItem note={item.item as MilestoneNote} />
                )}
              </div>
            ))}
            
            {/* End marker */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted border-2 border-border">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground pb-2">
                Milestone created
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
