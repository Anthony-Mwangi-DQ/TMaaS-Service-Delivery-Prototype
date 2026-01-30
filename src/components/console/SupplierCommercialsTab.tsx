import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Hash, History, Clock, User, MessageSquare, ChevronDown, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ServiceRequestInfo {
  serviceOrderNo: string;
  serviceName: string;
  clientName: string;
  clientOrg: string;
  requestedDate: string;
  status: string;
  contractValue?: string;
}

interface DocumentVersion {
  version: string;
  uploadedDate: string;
  uploadedBy: string;
  comment?: string;
}

interface CommercialDocument {
  id: string;
  name: string;
  type: "Contract" | "Service Order" | "Scope of Work";
  currentVersion: string;
  uploadedDate: string;
  uploadedBy: string;
  status: "Signed" | "Pending Review" | "Draft";
  versions: DocumentVersion[];
}

const mockServiceInfo: ServiceRequestInfo = {
  serviceOrderNo: "DFSA_SO_01",
  serviceName: "Digital Experience Ecommerce Platform",
  clientName: "Sarah Thompson",
  clientOrg: "DFSA",
  requestedDate: "January 15, 2024",
  status: "Active",
  contractValue: "$185,000",
};

const mockDocuments: CommercialDocument[] = [
  {
    id: "1",
    name: "Master Services Agreement",
    type: "Contract",
    currentVersion: "v2.1",
    uploadedDate: "Jan 10, 2024",
    uploadedBy: "Legal Team",
    status: "Signed",
    versions: [
      { version: "v2.1", uploadedDate: "Jan 10, 2024", uploadedBy: "Legal Team", comment: "Final signed version with all parties" },
      { version: "v2.0", uploadedDate: "Jan 5, 2024", uploadedBy: "Legal Team", comment: "Updated terms per client feedback" },
      { version: "v1.0", uploadedDate: "Dec 20, 2023", uploadedBy: "Legal Team", comment: "Initial draft for review" },
    ],
  },
  {
    id: "2",
    name: "Service Order - Ecommerce Platform",
    type: "Service Order",
    currentVersion: "v1.0",
    uploadedDate: "Jan 15, 2024",
    uploadedBy: "DQ Lead",
    status: "Signed",
    versions: [
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "DQ Lead", comment: "Approved and signed by both parties" },
    ],
  },
  {
    id: "3",
    name: "Scope of Work - Phase 1",
    type: "Scope of Work",
    currentVersion: "v1.2",
    uploadedDate: "Jan 18, 2024",
    uploadedBy: "DQ Lead",
    status: "Signed",
    versions: [
      { version: "v1.2", uploadedDate: "Jan 18, 2024", uploadedBy: "DQ Lead", comment: "Final approved scope with timeline adjustments" },
      { version: "v1.1", uploadedDate: "Jan 16, 2024", uploadedBy: "DQ Lead", comment: "Updated deliverables list per steering committee" },
      { version: "v1.0", uploadedDate: "Jan 14, 2024", uploadedBy: "DQ Lead", comment: "Initial scope document" },
    ],
  },
];

const getStatusColor = (status: CommercialDocument["status"]) => {
  switch (status) {
    case "Signed":
      return "bg-success/10 text-success border-success/20";
    case "Pending Review":
      return "bg-warning/10 text-warning border-warning/20";
    case "Draft":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getDocTypeIcon = (type: CommercialDocument["type"]) => {
  switch (type) {
    case "Contract":
      return "📄";
    case "Service Order":
      return "📋";
    case "Scope of Work":
      return "📑";
    default:
      return "📄";
  }
};

function CommercialDocumentRow({ doc }: { doc: CommercialDocument }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
        <div className="flex items-center justify-between p-4 group">
          <div className="flex items-center gap-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <span className="text-2xl">{getDocTypeIcon(doc.type)}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{doc.name}</p>
                <span className="text-xs text-muted-foreground">{doc.currentVersion}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">{doc.type}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{doc.uploadedBy} • {doc.uploadedDate}</span>
                {doc.versions.length > 1 && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <History className="h-3 w-3" />
                      {doc.versions.length} versions
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getStatusColor(doc.status)}>
              {doc.status}
            </Badge>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-0">
            <div className="ml-14 border-l-2 border-border pl-4 space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <History className="h-3.5 w-3.5" />
                Version History
              </h4>
              {doc.versions.map((version, index) => (
                <div
                  key={version.version}
                  className={cn(
                    "flex items-start justify-between p-3 rounded-md border",
                    index === 0 ? "border-[#001035]/30 bg-[#001035]/5" : "border-border bg-muted/30"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"} className={cn("text-xs", index === 0 && "bg-[#001035]")}>
                        {version.version}
                      </Badge>
                      {index === 0 && (
                        <span className="text-xs text-[#001035] font-medium">Current</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {version.uploadedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {version.uploadedDate}
                      </span>
                    </div>
                    {version.comment && (
                      <p className="text-xs text-foreground flex items-start gap-1.5 mt-1">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                        {version.comment}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function SupplierCommercialsTab() {
  return (
    <div className="space-y-6">
      {/* Service Request Information */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
            <Hash className="h-5 w-5 text-[#001035]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Service Request Information</h2>
            <p className="text-sm text-muted-foreground">Contract and engagement details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Service Order No.</p>
            <p className="font-mono font-semibold text-foreground">{mockServiceInfo.serviceOrderNo}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Service Name</p>
            <p className="font-medium text-foreground">{mockServiceInfo.serviceName}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Status</p>
            <div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                {mockServiceInfo.status}
              </Badge>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium text-foreground">{mockServiceInfo.clientName}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Organization</p>
            <p className="font-medium text-foreground">{mockServiceInfo.clientOrg}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Requested Date</p>
            <p className="font-medium text-foreground">{mockServiceInfo.requestedDate}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Contract Value</p>
          <p className="text-xl font-semibold text-foreground">{mockServiceInfo.contractValue}</p>
        </div>
      </div>

      {/* Commercial Documents */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <FileText className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Commercial Documents</h2>
              <p className="text-sm text-muted-foreground">{mockDocuments.length} documents</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Upload Document
          </Button>
        </div>

        <div className="space-y-3">
          {mockDocuments.map((doc) => (
            <CommercialDocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
