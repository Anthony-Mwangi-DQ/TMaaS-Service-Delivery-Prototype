import { useState } from "react";
import { Link } from "react-router-dom";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, FileStack, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Delivery {
  id: string;
  serviceName: string;
  serviceType: "Design" | "Deploy";
  clientName: string;
  clientOrg: string;
  currentMilestone: string;
  targetDate: string;
  progress: number;
  healthStatus: "on-track" | "at-risk" | "delayed";
  pendingItems: number;
}

const mockDeliveries: Delivery[] = [
  {
    id: "1",
    serviceName: "Digital GRC Strategy",
    serviceType: "Design",
    clientName: "Jane Doe",
    clientOrg: "STC",
    currentMilestone: "Milestone 2",
    targetDate: "Apr 15, 2024",
    progress: 42,
    healthStatus: "on-track",
    pendingItems: 2,
  },
  {
    id: "2",
    serviceName: "Cloud Migration Assessment",
    serviceType: "Design",
    clientName: "Ahmed Al-Hassan",
    clientOrg: "STC",
    currentMilestone: "Milestone 1",
    targetDate: "May 30, 2024",
    progress: 18,
    healthStatus: "on-track",
    pendingItems: 0,
  },
  {
    id: "3",
    serviceName: "Digital Experience Ecommerce Platform",
    serviceType: "Deploy",
    clientName: "Sarah Thompson",
    clientOrg: "DFSA",
    currentMilestone: "Milestone 3",
    targetDate: "Mar 28, 2024",
    progress: 65,
    healthStatus: "at-risk",
    pendingItems: 3,
  },
  {
    id: "4",
    serviceName: "Digital Experience Ecommerce Platform",
    serviceType: "Deploy",
    clientName: "Mohammed Al-Farsi",
    clientOrg: "Khalifa Fund",
    currentMilestone: "Milestone 2",
    targetDate: "Jun 15, 2024",
    progress: 35,
    healthStatus: "on-track",
    pendingItems: 1,
  },
];

const healthStatusConfig = {
  "on-track": { label: "On Track", color: "bg-success/10 text-success border-success/20" },
  "at-risk": { label: "At Risk", color: "bg-warning/10 text-warning border-warning/20" },
  "delayed": { label: "Delayed", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const serviceTypeConfig = {
  Design: { color: "bg-info/10 text-info border-info/20" },
  Deploy: { color: "bg-[#001035]/10 text-[#001035] border-[#001035]/20" },
};

export default function ConsoleDeliveries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique client organizations
  const clientOrgs = [...new Set(mockDeliveries.map((d) => d.clientOrg))];

  // Filter deliveries
  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = clientFilter === "all" || delivery.clientOrg === clientFilter;
    const matchesStatus = statusFilter === "all" || delivery.healthStatus === statusFilter;
    return matchesSearch && matchesClient && matchesStatus;
  });

  // Group by client organization
  const deliveriesByClient = filteredDeliveries.reduce((acc, delivery) => {
    if (!acc[delivery.clientOrg]) {
      acc[delivery.clientOrg] = [];
    }
    acc[delivery.clientOrg].push(delivery);
    return acc;
  }, {} as Record<string, Delivery[]>);

  return (
    <ConsoleLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
            <FileStack className="h-5 w-5 text-[#001035]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Active Deliveries</h1>
            <p className="text-sm text-muted-foreground">
              Manage all your active service delivery engagements
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[160px]">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clientOrgs.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="on-track">On Track</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Deliveries Table - Grouped by Client */}
      <div className="p-6 space-y-6">
        {Object.entries(deliveriesByClient).map(([clientOrg, deliveries]) => (
          <div key={clientOrg} className="card-elevated overflow-hidden">
            {/* Client Header */}
            <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{clientOrg}</span>
              <Badge variant="secondary" className="ml-2">
                {deliveries.length} {deliveries.length === 1 ? "delivery" : "deliveries"}
              </Badge>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Client Lead</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id} className="group">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{delivery.serviceName}</p>
                        <Badge
                          variant="outline"
                          className={cn("mt-1 text-xs", serviceTypeConfig[delivery.serviceType].color)}
                        >
                          {delivery.serviceType}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{delivery.clientName}</TableCell>
                    <TableCell className="text-muted-foreground">{delivery.currentMilestone}</TableCell>
                    <TableCell className="text-muted-foreground">{delivery.targetDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={delivery.progress} className="h-2 w-20 [&>div]:bg-[#001035]" />
                        <span className="text-sm text-muted-foreground">{delivery.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(healthStatusConfig[delivery.healthStatus].color)}
                      >
                        {healthStatusConfig[delivery.healthStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" className="bg-[#001035] hover:bg-[#001035]/90">
                        <Link to={`/console/deliveries/${delivery.id}`}>Manage</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        {Object.keys(deliveriesByClient).length === 0 && (
          <div className="card-elevated p-12 text-center">
            <FileStack className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No deliveries found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
