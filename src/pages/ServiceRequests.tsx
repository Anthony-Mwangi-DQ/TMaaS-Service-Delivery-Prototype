import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Calendar,
  Building2,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ServiceRequest {
  id: string;
  name: string;
  type: "Design" | "Deploy";
  status: "active" | "completed" | "on-hold" | "pending";
  currentMilestone: string;
  progress: number;
  healthStatus: "on-track" | "at-risk" | "blocked";
  targetDate: string;
  startDate: string;
  supplier: string;
  deliveryLead: string;
  pendingActions: number;
}

const serviceRequests: ServiceRequest[] = [
  {
    id: "1",
    name: "Digital GRC Strategy",
    type: "Design",
    status: "active",
    currentMilestone: "Milestone 2",
    progress: 42,
    healthStatus: "on-track",
    targetDate: "Apr 15, 2024",
    startDate: "Jan 15, 2024",
    supplier: "DigitalQatalyst",
    deliveryLead: "Sarah Mitchell",
    pendingActions: 2,
  },
];

const statusConfig = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  completed: { label: "Completed", className: "bg-muted text-muted-foreground border-border" },
  "on-hold": { label: "On Hold", className: "bg-warning/10 text-warning border-warning/20" },
  pending: { label: "Pending", className: "bg-info/10 text-info border-info/20" },
};

const healthConfig = {
  "on-track": { label: "On Track", className: "status-on-track" },
  "at-risk": { label: "At Risk", className: "status-at-risk" },
  "blocked": { label: "Blocked", className: "status-blocked" },
};

const typeConfig = {
  Design: "bg-info/10 text-info border-info/20",
  Deploy: "bg-primary/10 text-primary border-primary/20",
};

const ServiceRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredRequests = serviceRequests.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesType = typeFilter === "all" || service.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Active Engagements</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and track all your transformation journeys
            </p>
          </div>
          <Button>
            New Service Request
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Deploy">Deploy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Service List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredRequests.map((service) => (
            <div
              key={service.id}
              className="card-elevated p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Left Section - Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className={cn("text-xs", typeConfig[service.type])}>
                      {service.type}
                    </Badge>
                    <Badge variant="outline" className={cn("text-xs", statusConfig[service.status].className)}>
                      {statusConfig[service.status].label}
                    </Badge>
                    <Badge className={cn("text-xs", healthConfig[service.healthStatus].className)}>
                      {healthConfig[service.healthStatus].label}
                    </Badge>
                    {service.pendingActions > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {service.pendingActions} action{service.pendingActions > 1 ? 's' : ''} required
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">{service.name}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" />
                      {service.supplier}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {service.startDate} - {service.targetDate}
                    </span>
                  </div>
                </div>

                {/* Middle Section - Progress */}
                <div className="w-48">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{service.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${service.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Current: {service.currentMilestone}
                  </p>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2">
                  <Button asChild>
                    <Link to={`/services/${service.id}`}>
                      View Details
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Documents</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                      <DropdownMenuItem>Export Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Delivery Lead Info */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">
                      {service.deliveryLead.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{service.deliveryLead}</p>
                    <p className="text-xs text-muted-foreground">Delivery Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <p className="text-muted-foreground">Target Delivery</p>
                    <p className="font-medium text-foreground">{service.targetDate}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="card-elevated p-12 text-center">
              <p className="text-muted-foreground">No service requests found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceRequests;