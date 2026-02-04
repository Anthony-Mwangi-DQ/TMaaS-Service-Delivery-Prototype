import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye, Hash, History, Clock, User, MessageSquare, ChevronDown, ChevronRight, CheckCircle2, AlertCircle, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ServiceRequestInfo {
  serviceOrderNo: string;
  serviceName: string;
  requestedBy: string;
  requestedDate: string;
  organization: string;
  status: string;
  contractValue: number;
}

interface MilestonePayment {
  milestoneCode: string;
  milestoneName: string;
  value: number;
  status: "paid" | "invoiced" | "approved" | "pending" | "in-delivery";
  invoiceNumber?: string;
  invoiceDate?: string;
  paymentDate?: string;
  dueDate?: string;
  approvalDate?: string;
  linkedTo?: string;
}

interface ChangeOrder {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: number; // positive or negative
  status: "approved" | "pending" | "rejected";
  approvedBy?: string;
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
  serviceOrderNo: "STC_SO_01",
  serviceName: "Digital GRC Strategy",
  requestedBy: "Sarah Chen",
  requestedDate: "January 15, 2024",
  organization: "STC",
  status: "Active",
  contractValue: 1272861.00,
};

const milestonePayments: MilestonePayment[] = [
  {
    milestoneCode: "MS01",
    milestoneName: "Project Kickoff & Charter",
    value: 318215.25,
    status: "paid",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "Mar 10, 2024",
    paymentDate: "Mar 25, 2024",
    approvalDate: "Mar 08, 2024",
    linkedTo: "Milestone 01"
  },
  {
    milestoneCode: "MS02",
    milestoneName: "GRC Design Summary",
    value: 318215.25,
    status: "approved",
    approvalDate: "Jan 06, 2026",
    linkedTo: "Milestone 02"
  },
  {
    milestoneCode: "MS03",
    milestoneName: "Practice Playbook & Procedures",
    value: 318215.25,
    status: "in-delivery",
    linkedTo: "Milestone 03"
  },
  {
    milestoneCode: "MS04",
    milestoneName: "System Implementation & Deployment",
    value: 318215.25,
    status: "in-delivery",
    linkedTo: "Milestone 04"
  }
];

const changeOrders: ChangeOrder[] = [
  {
    id: "CO-001",
    title: "Scope Reduction - Job Descriptions",
    description: "Removed job description deliverables from MS03 scope per client request",
    date: "Jan 15, 2026",
    impact: -25000,
    status: "approved",
    approvedBy: "Jane Doe (STC)"
  }
];

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
    name: "Service Order - GRC Strategy",
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
                    index === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                        {version.version}
                      </Badge>
                      {index === 0 && (
                        <span className="text-xs text-primary font-medium">Current</span>
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

export function CommercialsTab() {
  const changeOrderImpact = changeOrders
    .filter(co => co.status === "approved")
    .reduce((sum, co) => sum + co.impact, 0);

  const adjustedContractValue = mockServiceInfo.contractValue + changeOrderImpact;
  
  // Calculate payment summary
  const totalPaid = milestonePayments.filter(m => m.status === "paid").reduce((sum, m) => sum + m.value, 0);
  const totalInvoiced = milestonePayments.filter(m => m.status === "invoiced").reduce((sum, m) => sum + m.value, 0);
  const totalApproved = milestonePayments.filter(m => m.status === "approved").reduce((sum, m) => sum + m.value, 0);
  const totalInDelivery = milestonePayments.filter(m => m.status === "in-delivery").reduce((sum, m) => sum + m.value, 0);

  return (
    <div className="space-y-6">
      {/* Payment Status Overview - HERO SECTION */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Payment Status</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Contract value and payment tracking
              </p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {mockServiceInfo.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Contract Value Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Contract</p>
              <p className="text-2xl font-bold text-foreground">
                SAR {(adjustedContractValue / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {mockServiceInfo.serviceOrderNo}
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="text-xs text-muted-foreground mb-1">Paid</p>
              <p className="text-2xl font-bold text-success">
                SAR {(totalPaid / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-success mt-1">
                {Math.round((totalPaid / adjustedContractValue) * 100)}% collected
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-xs text-muted-foreground mb-1">Approved (Ready to Invoice)</p>
              <p className="text-2xl font-bold text-warning">
                SAR {(totalApproved / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-warning mt-1">
                Awaiting invoice
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <p className="text-xs text-muted-foreground mb-1">In Delivery</p>
              <p className="text-2xl font-bold text-info">
                SAR {(totalInDelivery / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-info mt-1">
                Work in progress
              </p>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Payment Progress</span>
              <span className="text-muted-foreground">
                {Math.round((totalPaid / adjustedContractValue) * 100)}% of contract value paid
              </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden flex">
              <div 
                className="bg-success flex items-center justify-center text-[10px] font-medium text-white"
                style={{ width: `${(totalPaid / adjustedContractValue) * 100}%` }}
              >
                {totalPaid > 0 && `${Math.round((totalPaid / adjustedContractValue) * 100)}%`}
              </div>
              <div 
                className="bg-warning flex items-center justify-center text-[10px] font-medium text-white"
                style={{ width: `${(totalApproved / adjustedContractValue) * 100}%` }}
              >
                {totalApproved > 0 && `${Math.round((totalApproved / adjustedContractValue) * 100)}%`}
              </div>
              <div 
                className="bg-info flex items-center justify-center text-[10px] font-medium text-white"
                style={{ width: `${(totalInDelivery / adjustedContractValue) * 100}%` }}
              >
                {totalInDelivery > 0 && `${Math.round((totalInDelivery / adjustedContractValue) * 100)}%`}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-success"></div>
                <span className="text-muted-foreground">Paid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-warning"></div>
                <span className="text-muted-foreground">Approved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-info"></div>
                <span className="text-muted-foreground">In Delivery</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Payments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Milestone Payments</CardTitle>
                <p className="text-sm text-muted-foreground">
                  4 milestones • SAR 318K each
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="#delivery">
                View Milestones
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {milestonePayments.map((payment) => (
              <div 
                key={payment.milestoneCode}
                className={cn(
                  "p-3 rounded-lg border flex items-center justify-between",
                  payment.status === "paid" && "bg-success/5 border-success/20",
                  payment.status === "invoiced" && "bg-info/5 border-info/20",
                  payment.status === "approved" && "bg-warning/5 border-warning/20",
                  payment.status === "in-delivery" && "bg-muted/30"
                )}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant="secondary" className="text-xs font-mono shrink-0">
                    {payment.milestoneCode}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {payment.milestoneName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      SAR {(payment.value / 1000).toFixed(0)}K
                      {payment.paymentDate && ` • Paid ${payment.paymentDate}`}
                      {payment.approvalDate && !payment.paymentDate && ` • Approved ${payment.approvalDate}`}
                    </p>
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs shrink-0",
                    payment.status === "paid" && "bg-success/10 text-success border-success/20",
                    payment.status === "invoiced" && "bg-info/10 text-info border-info/20",
                    payment.status === "approved" && "bg-warning/10 text-warning border-warning/20",
                    payment.status === "in-delivery" && "bg-muted text-muted-foreground"
                  )}
                >
                  {payment.status === "paid" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {payment.status === "invoiced" && <FileText className="h-3 w-3 mr-1" />}
                  {payment.status === "approved" && <Clock className="h-3 w-3 mr-1" />}
                  {payment.status === "paid" && "Paid"}
                  {payment.status === "invoiced" && "Invoiced"}
                  {payment.status === "approved" && "Ready to Invoice"}
                  {payment.status === "in-delivery" && "In Delivery"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Change Orders */}
      {changeOrders.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <History className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Change Orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Approved scope and budget changes
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {changeOrders.map((co) => (
                <div 
                  key={co.id}
                  className={cn(
                    "p-4 rounded-lg border",
                    co.status === "approved" && "bg-muted/30 border-border",
                    co.status === "pending" && "bg-warning/5 border-warning/20"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs font-mono">
                          {co.id}
                        </Badge>
                        <span className="text-sm font-semibold">{co.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{co.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-lg font-bold",
                        co.impact > 0 ? "text-success" : "text-destructive"
                      )}>
                        {co.impact > 0 ? "+" : ""}SAR {(Math.abs(co.impact) / 1000).toFixed(0)}K
                      </p>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs mt-1",
                          co.status === "approved" && "bg-success/10 text-success border-success/20"
                        )}
                      >
                        {co.status.charAt(0).toUpperCase() + co.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    <span>{co.date}</span>
                    {co.approvedBy && (
                      <>
                        <span>•</span>
                        <span>Approved by {co.approvedBy}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Request Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Service Request Details</CardTitle>
              <p className="text-sm text-muted-foreground">Contract and engagement information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Service Order No.</p>
              <p className="font-mono font-semibold text-foreground">{mockServiceInfo.serviceOrderNo}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Service Name</p>
              <p className="font-medium text-foreground">{mockServiceInfo.serviceName}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Requested By</p>
              <p className="font-medium text-foreground">{mockServiceInfo.requestedBy}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Organization</p>
              <p className="font-medium text-foreground">{mockServiceInfo.organization}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Requested Date</p>
              <p className="font-medium text-foreground">{mockServiceInfo.requestedDate}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
              <p className="font-semibold text-foreground">
                SAR {adjustedContractValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commercial Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Commercial Documents</CardTitle>
                <p className="text-sm text-muted-foreground">{mockDocuments.length} documents</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.map((doc) => (
              <CommercialDocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
