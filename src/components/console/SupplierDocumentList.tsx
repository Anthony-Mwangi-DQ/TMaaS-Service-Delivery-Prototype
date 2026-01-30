import { useState } from "react";
import { FileText, Download, Eye, History, MessageSquare, ChevronDown, ChevronRight, Clock, User, FolderOpen, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DocumentVersion {
  version: string;
  uploadedDate: string;
  uploadedBy: string;
  comment?: string;
}

interface Document {
  id: string;
  name: string;
  category: "Deliverables" | "Inputs";
  milestone?: "Kickoff" | "Milestone 1" | "Milestone 2" | "Milestone 3" | "Milestone 4" | "Closure";
  currentVersion: string;
  uploadedDate: string;
  uploadedBy: string;
  status?: "draft" | "final" | "pending-review";
  versions: DocumentVersion[];
}

const documents: Document[] = [
  // Kickoff Deliverables
  {
    id: "1",
    name: "Project Charter",
    category: "Deliverables",
    milestone: "Kickoff",
    currentVersion: "v1.0",
    uploadedDate: "Jan 15, 2024",
    uploadedBy: "DQ Lead",
    status: "final",
    versions: [
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "DQ Lead", comment: "Approved by steering committee" },
    ],
  },
  {
    id: "2",
    name: "Stakeholder Register",
    category: "Deliverables",
    milestone: "Kickoff",
    currentVersion: "v1.1",
    uploadedDate: "Jan 18, 2024",
    uploadedBy: "DQ Lead",
    status: "final",
    versions: [
      { version: "v1.1", uploadedDate: "Jan 18, 2024", uploadedBy: "DQ Lead", comment: "Added executive sponsors" },
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "DQ Lead", comment: "Initial stakeholder list" },
    ],
  },
  // Milestone 2 Deliverables
  {
    id: "3",
    name: "GRC Strategy Framework",
    category: "Deliverables",
    milestone: "Milestone 2",
    currentVersion: "v2.1",
    uploadedDate: "Feb 20, 2024",
    uploadedBy: "DQ Lead",
    status: "draft",
    versions: [
      { version: "v2.1", uploadedDate: "Feb 20, 2024", uploadedBy: "DQ Lead", comment: "Updated risk categories based on client feedback" },
      { version: "v2.0", uploadedDate: "Feb 15, 2024", uploadedBy: "DQ Lead", comment: "Major revision with new governance section" },
      { version: "v1.0", uploadedDate: "Feb 5, 2024", uploadedBy: "DQ Lead", comment: "Initial draft" },
    ],
  },
  // Client Inputs (View Only for Supplier)
  {
    id: "4",
    name: "Current State Analysis",
    category: "Inputs",
    currentVersion: "v1.2",
    uploadedDate: "Jan 28, 2024",
    uploadedBy: "STC",
    versions: [
      { version: "v1.2", uploadedDate: "Jan 28, 2024", uploadedBy: "STC", comment: "Added updated org chart" },
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "STC", comment: "Initial submission" },
    ],
  },
  {
    id: "5",
    name: "Policy Documents",
    category: "Inputs",
    currentVersion: "v1.0",
    uploadedDate: "Jan 22, 2024",
    uploadedBy: "STC",
    versions: [
      { version: "v1.0", uploadedDate: "Jan 22, 2024", uploadedBy: "STC", comment: "Existing policy documentation" },
    ],
  },
];

const milestoneConfig = {
  "Kickoff": { color: "bg-success/10 text-success border-success/20" },
  "Milestone 1": { color: "bg-info/10 text-info border-info/20" },
  "Milestone 2": { color: "bg-[#001035]/10 text-[#001035] border-[#001035]/20" },
  "Milestone 3": { color: "bg-warning/10 text-warning border-warning/20" },
  "Milestone 4": { color: "bg-accent text-accent-foreground border-border" },
  "Closure": { color: "bg-muted text-muted-foreground border-border" },
};

const statusConfig = {
  draft: { label: "Draft", color: "bg-warning/10 text-warning border-warning/20" },
  final: { label: "Final", color: "bg-success/10 text-success border-success/20" },
  "pending-review": { label: "Pending Review", color: "bg-info/10 text-info border-info/20" },
};

function SupplierDocumentRow({ doc }: { doc: Document }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
        <div className="flex items-center justify-between p-3 group">
          <div className="flex items-center gap-3">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{doc.name}</span>
                <span className="text-xs text-muted-foreground">{doc.currentVersion}</span>
                {doc.status && (
                  <Badge variant="outline" className={cn("text-xs", statusConfig[doc.status].color)}>
                    {statusConfig[doc.status].label}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">
                  {doc.uploadedBy} • {doc.uploadedDate}
                </span>
                {doc.versions.length > 1 && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <History className="h-3 w-3" />
                    {doc.versions.length} versions
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-0">
            <div className="ml-11 border-l-2 border-border pl-4 space-y-3">
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
                      <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-[#001035]" : ""}>
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

export function SupplierDocumentList() {
  // Group deliverables by milestone
  const deliverablesByMilestone = documents
    .filter((doc) => doc.category === "Deliverables")
    .reduce((acc, doc) => {
      const milestone = doc.milestone || "Uncategorized";
      if (!acc[milestone]) acc[milestone] = [];
      acc[milestone].push(doc);
      return acc;
    }, {} as Record<string, Document[]>);

  const inputDocs = documents.filter((doc) => doc.category === "Inputs");

  const milestoneOrder = ["Kickoff", "Milestone 1", "Milestone 2", "Milestone 3", "Milestone 4", "Closure"];

  return (
    <div className="space-y-6">
      {/* Deliverables - Supplier Can Upload */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001035]/10">
              <FolderOpen className="h-5 w-5 text-[#001035]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Deliverables</h2>
              <p className="text-sm text-muted-foreground">Upload and manage project deliverables</p>
            </div>
          </div>
          <Button className="bg-[#001035] hover:bg-[#001035]/90">
            <Upload className="h-4 w-4 mr-2" />
            Upload Deliverable
          </Button>
        </div>

        <div className="space-y-6">
          {milestoneOrder.map((milestone) => {
            const docs = deliverablesByMilestone[milestone];
            if (!docs || docs.length === 0) return null;

            return (
              <div key={milestone}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={cn("text-xs", milestoneConfig[milestone as keyof typeof milestoneConfig]?.color)}>
                    {milestone}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {docs.length} deliverable{docs.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-2 ml-2 pl-4 border-l-2 border-border">
                  {docs.map((doc) => (
                    <SupplierDocumentRow key={doc.id} doc={doc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inputs - View Only for Supplier */}
      {inputDocs.length > 0 && (
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <FolderOpen className="h-5 w-5 text-info" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Client Inputs</h2>
                <p className="text-sm text-muted-foreground">{inputDocs.length} files from client</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Request Input
            </Button>
          </div>

          <div className="space-y-2">
            {inputDocs.map((doc) => (
              <SupplierDocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
