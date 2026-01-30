import { MessageSquare, Search, Send, User } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  serviceName: string;
  deliveryLead: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isActive: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    serviceName: "Digital GRC Strategy",
    deliveryLead: "Sarah Mitchell",
    lastMessage: "The updated framework document is ready for your review.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    isActive: true,
  },
  {
    id: "2",
    serviceName: "Cloud Migration Assessment",
    deliveryLead: "James Chen",
    lastMessage: "Thank you for the feedback on the architecture proposal.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isActive: false,
  },
  {
    id: "3",
    serviceName: "Security Audit Program",
    deliveryLead: "Maria Garcia",
    lastMessage: "Scheduled the follow-up session for next Tuesday.",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    isActive: false,
  },
];

interface Message {
  id: string;
  sender: "client" | "dq";
  senderName: string;
  content: string;
  timestamp: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    sender: "dq",
    senderName: "Sarah Mitchell",
    content: "Good morning! I've uploaded the latest version of the GRC Strategy Framework for your review.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "client",
    senderName: "You",
    content: "Thanks Sarah. I'll review it this afternoon and get back to you with any feedback.",
    timestamp: "11:15 AM",
  },
  {
    id: "3",
    sender: "dq",
    senderName: "Sarah Mitchell",
    content: "The updated framework document is ready for your review. I've incorporated all the changes we discussed in yesterday's session.",
    timestamp: "2:45 PM",
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.deliveryLead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Communicate with your DQ delivery leads across all engagements
            </p>
          </div>
        </div>
      </div>

      {/* Messages Layout */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Conversation List */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "w-full p-4 text-left border-b border-border hover:bg-muted/50 transition-colors",
                  selectedConversation?.id === conv.id && "bg-muted/50"
                )}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{conv.serviceName}</span>
                  {conv.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {conv.unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{conv.deliveryLead}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                <p className="text-xs text-muted-foreground mt-1">{conv.lastMessageTime}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card">
                <h2 className="text-base font-semibold text-foreground">{selectedConversation.serviceName}</h2>
                <p className="text-sm text-muted-foreground">with {selectedConversation.deliveryLead}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sampleMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "client" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-3",
                        msg.sender === "client"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
