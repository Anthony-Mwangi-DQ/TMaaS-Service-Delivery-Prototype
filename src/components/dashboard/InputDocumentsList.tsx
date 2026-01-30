import { useState } from "react";
import { FileText, Download, Eye, History, MessageSquare, ChevronDown, ChevronRight, Clock, User, FolderInput, Upload } from "lucide-react";
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

interface InputDocument {
  id: string;
  name: string;
  description?: string;
  currentVersion: string;
  uploadedDate: string;
  uploadedBy: string;
  versions: DocumentVersion[];
}

const inputDocuments: InputDocument[] = [
  {
    id: "1",
    name: "Current State Analysis",
    description: "Analysis of existing systems and processes",
    currentVersion: "v1.2",
    uploadedDate: "Jan 28, 2024",
    uploadedBy: "Client",
    versions: [
      { version: "v1.2", uploadedDate: "Jan 28, 2024", uploadedBy: "Client", comment: "Added updated org chart" },
      { version: "v1.1", uploadedDate: "Jan 20, 2024", uploadedBy: "Client", comment: "Corrected department names" },
      { version: "v1.0", uploadedDate: "Jan 15, 2024", uploadedBy: "Client", comment: "Initial submission" },
    ],
  },
  {
    id: "2",
    name: "Policy Documents",
    description: "Existing organizational policies and procedures",
    currentVersion: "v1.0",
    uploadedDate: "Jan 22, 2024",
    uploadedBy: "Client",
    versions: [
      { version: "v1.0", uploadedDate: "Jan 22, 2024", uploadedBy: "Client", comment: "Existing policy documentation" },
    ],
  },
  {
    id: "3",
    name: "Brand Guidelines",
    description: "Visual identity and brand standards",
    currentVersion: "v2.0",
    uploadedDate: "Feb 5, 2024",
    uploadedBy: "Client",
    versions: [
      { version: "v2.0", uploadedDate: "Feb 5, 2024", uploadedBy: "Client", comment: "Updated with new logo variants" },
      { version: "v1.0", uploadedDate: "Jan 18, 2024", uploadedBy: "Client", comment: "Initial brand package" },
    ],
  },
  {
    id: "4",
    name: "Technical Requirements",
    description: "Integration and technical specifications",
    currentVersion: "v1.1",
    uploadedDate: "Feb 10, 2024",
    uploadedBy: "Client",
    versions: [
      { version: "v1.1", uploadedDate: "Feb 10, 2024", uploadedBy: "Client", comment: "Added API specifications" },
      { version: "v1.0", uploadedDate: "Feb 1, 2024", uploadedBy: "Client", comment: "Initial technical requirements" },
    ],
  },
];

function InputDocumentRow({ doc }: { doc: InputDocument }) {
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
              <FileText className="h-4 w-4 text-info" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{doc.name}</span>
                <span className="text-xs text-muted-foreground">{doc.currentVersion}</span>
              </div>
              {doc.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
              )}
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
                    index === 0 ? "border-info/30 bg-info/5" : "border-border bg-muted/30"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-info" : ""}>
                        {version.version}
                      </Badge>
                      {index === 0 && (
                        <span className="text-xs text-info font-medium">Current</span>
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

export function InputDocumentsList() {
  return (
    <div className="space-y-6">
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <FolderInput className="h-5 w-5 text-info" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Documents</h2>
              <p className="text-sm text-muted-foreground">
                Input materials and reference documents • {inputDocuments.length} files
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="space-y-2">
          {inputDocuments.map((doc) => (
            <InputDocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
