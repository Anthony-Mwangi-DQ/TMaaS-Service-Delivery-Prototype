import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  senderOrg: string;
  senderRole: "DQ" | "Client";
  content: string;
  timestamp: string;
  avatar?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Jane Doe",
    senderOrg: "STC",
    senderRole: "Client",
    content: "Hi team, I wanted to follow up on the GRC framework draft. When can we expect the updated version?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "Sarah Mitchell",
    senderOrg: "DQ",
    senderRole: "DQ",
    content: "Good morning Jane! We're finalizing the updated risk categories based on last week's feedback. You should have the new version by end of day tomorrow.",
    timestamp: "10:45 AM",
  },
  {
    id: "3",
    sender: "Jane Doe",
    senderOrg: "STC",
    senderRole: "Client",
    content: "That works. Also, I've uploaded the additional policy documents you requested to the Inputs folder. Please confirm once you've reviewed them.",
    timestamp: "11:00 AM",
  },
  {
    id: "4",
    sender: "Sarah Mitchell",
    senderOrg: "DQ",
    senderRole: "DQ",
    content: "Perfect, I can see them now. We'll review and incorporate any relevant findings into the framework. Thanks for the quick turnaround!",
    timestamp: "11:15 AM",
  },
  {
    id: "5",
    sender: "Jane Doe",
    senderOrg: "STC",
    senderRole: "Client",
    content: "One more thing - can we schedule a working session for next week to walk through the compliance mapping section? I have some questions from our legal team.",
    timestamp: "2:30 PM",
  },
];

export function SupplierServiceChat() {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card-elevated flex flex-col h-[600px]">
      {/* Chat Header - Shows Client Info */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-info/10 text-info font-semibold">JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">Jane Doe</h3>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span>STC</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Customer Delivery Lead</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-xs text-muted-foreground">Online</span>
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => {
          const isDQ = message.senderRole === "DQ";
          return (
            <div
              key={message.id}
              className={cn("flex items-start gap-3", isDQ && "flex-row-reverse")}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={message.avatar} />
                <AvatarFallback
                  className={cn(
                    "text-xs font-semibold",
                    isDQ ? "bg-[#001035] text-white" : "bg-info/10 text-info"
                  )}
                >
                  {message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className={cn("max-w-[70%] space-y-1", isDQ && "items-end")}>
                <div className={cn("flex items-center gap-2", isDQ && "flex-row-reverse")}>
                  <span className="text-sm font-medium text-foreground">{message.sender}</span>
                  <span className="text-xs text-muted-foreground">{message.senderOrg}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm",
                    isDQ
                      ? "bg-[#001035] text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end gap-3">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="shrink-0 bg-[#001035] hover:bg-[#001035]/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
