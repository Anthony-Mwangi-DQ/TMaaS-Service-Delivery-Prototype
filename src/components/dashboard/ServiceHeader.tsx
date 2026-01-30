import { MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ServiceHeaderProps {
  serviceName: string;
  serviceType: string;
  serviceOrder: string;
  requestedDate: string;
  status: string;
}

export function ServiceHeader({
  serviceName,
  serviceType,
  serviceOrder,
  requestedDate,
  status,
}: ServiceHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground mb-1">{serviceName}</h1>
          <p className="text-sm text-muted-foreground">{serviceType}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* DQ Delivery Lead */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sarah Mitchell</p>
              <p className="text-xs text-muted-foreground">DQ Delivery Lead</p>
            </div>
          </div>

          {/* Send Message Button */}
          <Button variant="outline" size="sm" asChild>
            <Link to="#messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Link>
          </Button>
        </div>
      </div>

      {/* Service Metadata */}
      <div className="flex items-center gap-6 pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Service Order</p>
          <p className="text-sm font-semibold font-mono">{serviceOrder}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Requested Date</p>
          <p className="text-sm font-semibold">{requestedDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Status</p>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
            {status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
