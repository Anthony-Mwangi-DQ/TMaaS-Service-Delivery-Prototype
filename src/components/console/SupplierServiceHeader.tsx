import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, User, Building2, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupplierServiceHeaderProps {
  serviceName: string;
  serviceType: "Design" | "Deploy";
  clientName: string;
  clientOrg: string;
  currentMilestone: string;
  targetDate: string;
  healthStatus: "on-track" | "at-risk" | "delayed";
  progress: number;
  lastActivity?: string;
}

const healthStatusConfig = {
  "on-track": {
    label: "On Track",
    color: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2,
  },
  "at-risk": {
    label: "At Risk",
    color: "bg-warning/10 text-warning border-warning/20",
    icon: AlertTriangle,
  },
  delayed: {
    label: "Delayed",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
};

const serviceTypeConfig = {
  Design: { color: "bg-info/10 text-info border-info/20" },
  Deploy: { color: "bg-[#001035]/10 text-[#001035] border-[#001035]/20" },
};

export function SupplierServiceHeader({
  serviceName,
  serviceType,
  clientName,
  clientOrg,
  currentMilestone,
  targetDate,
  healthStatus,
  progress,
  lastActivity = "2 hours ago",
}: SupplierServiceHeaderProps) {
  const StatusIcon = healthStatusConfig[healthStatus].icon;

  return (
    <div className="bg-card border-b border-border">
      {/* Top Section */}
      <div className="px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Service Name & Type */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">{serviceName}</h1>
              <Badge variant="outline" className={cn(serviceTypeConfig[serviceType].color)}>
                {serviceType}
              </Badge>
              <Badge variant="outline" className={cn(healthStatusConfig[healthStatus].color)}>
                <StatusIcon className="h-3.5 w-3.5 mr-1" />
                {healthStatusConfig[healthStatus].label}
              </Badge>
            </div>

            {/* Client Info - Prominently Displayed */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{clientOrg}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{clientName}</span>
                <span className="text-muted-foreground">• Client Lead</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground">{currentMilestone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Target: {targetDate}
              </div>
              <div className="flex items-center gap-1.5">
                Last activity: {lastActivity}
              </div>
            </div>
          </div>

          {/* Update Status Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#001035] hover:bg-[#001035]/90">
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                Mark On Track
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                Mark At Risk
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <XCircle className="h-4 w-4 mr-2 text-destructive" />
                Mark Delayed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-4">
          <Progress value={progress} className="h-2 flex-1 [&>div]:bg-[#001035]" />
          <span className="text-sm font-medium text-foreground">{progress}% Complete</span>
        </div>
      </div>
    </div>
  );
}
