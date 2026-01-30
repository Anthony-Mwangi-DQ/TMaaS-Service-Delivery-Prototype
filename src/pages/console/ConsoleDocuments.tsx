import { useState } from "react";
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
import { FileText, Download, Eye, Search, Upload, FolderOpen, Building2, History } from "lucide-react";

interface InputDocument {
  id: string;
  name: string;
  clientOrg: string;
  serviceName: string;
  description?: string;
  version: string;
  uploadedDate: string;
  uploadedBy: string;
}

// Client input documents across all deliveries
const mockDocuments: InputDocument[] = [
  {
    id: "1",
    name: "Current State Analysis",
    clientOrg: "DFSA",
    serviceName: "Digital Experience Ecommerce Platform",
    description: "Analysis of existing systems and processes",
    version: "v1.2",
    uploadedDate: "Jan 28, 2024",
    uploadedBy: "DFSA",
  },
  {
    id: "2",
    name: "Brand Guidelines",
    clientOrg: "DFSA",
    serviceName: "Digital Experience Ecommerce Platform",
    description: "Visual identity and brand standards",
    version: "v2.0",
    uploadedDate: "Feb 5, 2024",
    uploadedBy: "DFSA",
  },
  {
    id: "3",
    name: "Technical Requirements",
    clientOrg: "DFSA",
    serviceName: "Digital Experience Ecommerce Platform",
    description: "Integration and API specifications",
    version: "v1.1",
    uploadedDate: "Feb 10, 2024",
    uploadedBy: "DFSA",
  },
  {
    id: "4",
    name: "Product Catalog Data",
    clientOrg: "Khalifa Fund",
    serviceName: "Digital Experience Ecommerce Platform",
    description: "Existing product data for migration",
    version: "v1.0",
    uploadedDate: "Feb 12, 2024",
    uploadedBy: "Khalifa Fund",
  },
  {
    id: "5",
    name: "Business Requirements",
    clientOrg: "Khalifa Fund",
    serviceName: "Digital Experience Ecommerce Platform",
    description: "Functional and business specifications",
    version: "v1.0",
    uploadedDate: "Feb 8, 2024",
    uploadedBy: "Khalifa Fund",
  },
];

export default function ConsoleDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("all");

  const clientOrgs = [...new Set(mockDocuments.map((d) => d.clientOrg))];

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = clientFilter === "all" || doc.clientOrg === clientFilter;
    return matchesSearch && matchesClient;
  });

  return (
    <ConsoleLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <FolderOpen className="h-5 w-5 text-info" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Client Documents</h1>
              <p className="text-sm text-muted-foreground">
                Input materials from clients across active deliveries
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Request Document
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
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
        </div>
      </div>

      {/* Documents List */}
      <div className="p-6 space-y-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="card-elevated p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <FileText className="h-5 w-5 text-info" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{doc.name}</span>
                  <span className="text-xs text-muted-foreground">{doc.version}</span>
                </div>
                {doc.description && (
                  <p className="text-xs text-muted-foreground mb-1">{doc.description}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {doc.clientOrg}
                  </Badge>
                  <span>{doc.serviceName}</span>
                  <span>• {doc.uploadedBy} • {doc.uploadedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <History className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
