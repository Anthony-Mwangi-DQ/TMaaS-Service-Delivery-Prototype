import { useState } from "react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  clientName: string;
  clientOrg: string;
  serviceName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    clientName: "Jane Doe",
    clientOrg: "STC",
    serviceName: "Digital GRC Strategy",
    lastMessage: "Can we schedule a working session for next week to walk through the compliance mapping section?",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    clientName: "Michael Chen",
    clientOrg: "Aramco",
    serviceName: "Cybersecurity Framework",
    lastMessage: "Thanks for the update. We'll review the risk matrix and get back to you.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    clientName: "Fatima Al-Rashid",
    clientOrg: "SABIC",
    serviceName: "Data Governance Program",
    lastMessage: "The kickoff meeting is confirmed for Monday at 10 AM.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "4",
    clientName: "Ahmed Al-Hassan",
    clientOrg: "STC",
    serviceName: "Cloud Migration Assessment",
    lastMessage: "I've shared the infrastructure documentation you requested.",
    lastMessageTime: "Feb 24",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "5",
    clientName: "Omar Khalid",
    clientOrg: "Aramco",
    serviceName: "ERP Transformation",
    lastMessage: "We need to discuss the delay in Phase 4 deliverables.",
    lastMessageTime: "Feb 23",
    unreadCount: 3,
    isOnline: false,
  },
];

export default function ConsoleMessages() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.clientOrg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = mockConversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <ConsoleLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
            <MessageSquare className="h-5 w-5 text-[#001035]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">
              {mockConversations.length} conversations • {totalUnread} unread
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-6 space-y-2">
        {filteredConversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/console/deliveries/${conversation.id}`}
            className={cn(
              "card-elevated p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors cursor-pointer block",
              conversation.unreadCount > 0 && "border-l-4 border-l-[#001035]"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-info/10 text-info font-semibold">
                  {conversation.clientName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium text-foreground",
                    conversation.unreadCount > 0 && "font-semibold"
                  )}>
                    {conversation.clientName}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    <span>{conversation.clientOrg}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{conversation.serviceName}</p>
              <p className={cn(
                "text-sm truncate",
                conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unreadCount > 0 && (
              <Badge className="bg-[#001035] shrink-0">
                {conversation.unreadCount}
              </Badge>
            )}
          </Link>
        ))}

        {filteredConversations.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
