import { FolderOpen, Search, Filter, FileText, Download, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface InputDocument {
  id: string;
  name: string;
  service: string;
  description?: string;
  currentVersion: string;
  uploadedDate: string;
  uploadedBy: string;
}

// Input documents across all services (not deliverables)
const globalDocuments: InputDocument[] = [
  {
    id: "1",
    name: "Current State Analysis",
    service: "Digital GRC Strategy",
    description: "Analysis of existing systems and processes",
    currentVersion: "v1.2",
    uploadedDate: "Jan 28, 2024",
    uploadedBy: "Client",
  },
  {
    id: "2",
    name: "Policy Documents",
    service: "Digital GRC Strategy",
    description: "Existing organizational policies",
    currentVersion: "v1.0",
    uploadedDate: "Jan 22, 2024",
    uploadedBy: "Client",
  },
  {
    id: "3",
    name: "Brand Guidelines",
    service: "Digital GRC Strategy",
    description: "Visual identity and brand standards",
    currentVersion: "v2.0",
    uploadedDate: "Feb 5, 2024",
    uploadedBy: "Client",
  },
  {
    id: "4",
    name: "Technical Requirements",
    service: "Digital GRC Strategy",
    description: "Integration and technical specifications",
    currentVersion: "v1.1",
    uploadedDate: "Feb 10, 2024",
    uploadedBy: "Client",
  },
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  const services = [...new Set(globalDocuments.map(doc => doc.service))];

  const filteredDocs = globalDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = serviceFilter === "all" || doc.service === serviceFilter;
    return matchesSearch && matchesService;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <FolderOpen className="h-5 w-5 text-info" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Documents</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Input materials across your active engagements
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document List */}
      <div className="p-6">
        <div className="card-elevated overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Version</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Uploaded</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
                        <FileText className="h-4 w-4 text-info" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{doc.name}</span>
                        {doc.description && (
                          <p className="text-xs text-muted-foreground">{doc.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{doc.service}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{doc.currentVersion}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground">
                      <p>{doc.uploadedDate}</p>
                      <p className="text-xs">{doc.uploadedBy}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDocs.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No documents found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
