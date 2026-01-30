import { useState } from "react";
import { Send, Paperclip, MoreVertical, User, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  senderRole: "client" | "supplier";
  content: string;
  timestamp: string;
  date: string;
  isRead?: boolean;
  linkedTo?: {
    type: "milestone" | "deliverable" | "raid";
    id: string;
    title: string;
  };
  attachments?: {
    name: string;
    size: string;
  }[];
}

const messages: Message[] = [
  {
    id: "1",
    sender: "Sarah Mitchell",
    senderRole: "supplier",
    content: "Hi Jane, I've uploaded the latest draft of the design summary document for your review. This is for Milestone 02 acceptance.",
    timestamp: "10:30 AM",
    date: "2026-01-26",
    isRead: true,
    linkedTo: {
      type: "milestone",
      id: "MS02",
      title: "Milestone 02 - GRC Design Summary"
    },
    attachments: [
      { name: "Design_Summary_v2.1.pdf", size: "2.4 MB" }
    ]
  },
  {
    id: "2",
    sender: "Jane Doe",
    senderRole: "client",
    content: "Thanks Sarah! I'll review it by end of day tomorrow and provide feedback.",
    timestamp: "11:15 AM",
    date: "2026-01-26",
    isRead: true,
  },
  {
    id: "3",
    sender: "Sarah Mitchell",
    senderRole: "supplier",
    content: "Perfect. Also, regarding the API access credentials - do you have an update from your IT team? This is blocking our integration work for Milestone 04.",
    timestamp: "11:45 AM",
    date: "2026-01-26",
    isRead: true,
    linkedTo: {
      type: "raid",
      id: "D002",
      title: "Dependency: API Access Blocked"
    }
  },
  {
    id: "4",
    sender: "Jane Doe",
    senderRole: "client",
    content: "I've escalated this to our IT director. Should have an update by Wednesday.",
    timestamp: "2:30 PM",
    date: "2026-01-26",
    isRead: true,
  },
  {
    id: "5",
    sender: "Sarah Mitchell",
    senderRole: "supplier",
    content: "Good morning Jane! Just a friendly reminder about the Milestone 02 review. Let me know if you need any clarifications.",
    timestamp: "9:00 AM",
    date: "2026-01-27",
    isRead: false,
  },
];

export function ServiceChat() {
  const [newMessage, setNewMessage] = useState("");

  // Group messages by date
  const messagesByDate = messages.reduce((acc, message) => {
    if (!acc[message.date]) {
      acc[message.date] = [];
    }
    acc[message.date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Chat Container */}
      <div className="card-elevated flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Sarah Mitchell</h3>
              <p className="text-xs text-muted-foreground">DQ Delivery Lead • Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success mr-1.5"></span>
              Active
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(messagesByDate).map(([date, dateMessages]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border"></div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(date)}</span>
                </div>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {dateMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.senderRole === "client" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3",
                        message.senderRole === "client"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {message.senderRole === "supplier" && (
                        <p className="text-xs font-medium mb-1.5 opacity-70">{message.sender}</p>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>

                      {/* Linked Context */}
                      {message.linkedTo && (
                        <div className={cn(
                          "mt-2 pt-2 border-t flex items-center gap-2",
                          message.senderRole === "client" 
                            ? "border-primary-foreground/20" 
                            : "border-border"
                        )}>
                          <LinkIcon className="h-3 w-3 opacity-70" />
                          <span className="text-xs opacity-90">
                            {message.linkedTo.title}
                          </span>
                        </div>
                      )}

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {message.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              className={cn(
                                "flex items-center gap-2 p-2 rounded border text-xs",
                                message.senderRole === "client"
                                  ? "bg-primary-foreground/10 border-primary-foreground/20"
                                  : "bg-background border-border"
                              )}
                            >
                              <Paperclip className="h-3 w-3" />
                              <span className="flex-1 truncate">{attachment.name}</span>
                              <span className="opacity-70">{attachment.size}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className={cn(
                        "text-xs mt-2",
                        message.senderRole === "client" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="resize-none"
              />
            </div>
            <Button size="icon" className="h-9 w-9 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
