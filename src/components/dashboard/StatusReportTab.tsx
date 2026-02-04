import { 
  FileText, 
  Download, 
  Calendar,
  Eye,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const weeklyReports = [
  {
    id: "report-w29",
    weekNumber: 29,
    dateRange: "27 Jan - 02 Feb 2026",
    generatedDate: "02 Feb 2026",
    status: "current" as const,
    keyHighlights: "MS03 at risk, MS04 progressing, API access still blocked",
    fileSize: "2.4 MB"
  },
  {
    id: "report-w28",
    weekNumber: 28,
    dateRange: "20 Jan - 26 Jan 2026",
    generatedDate: "26 Jan 2026",
    status: "archived" as const,
    keyHighlights: "MS02 delivered, MS03 at risk, ABACUS decision pending",
    fileSize: "2.1 MB"
  },
  {
    id: "report-w27",
    weekNumber: 27,
    dateRange: "13 Jan - 19 Jan 2026",
    generatedDate: "19 Jan 2026",
    status: "archived" as const,
    keyHighlights: "MS02 design finalization, scope trade discussions",
    fileSize: "1.9 MB"
  },
  {
    id: "report-w26",
    weekNumber: 26,
    dateRange: "06 Jan - 12 Jan 2026",
    generatedDate: "12 Jan 2026",
    status: "archived" as const,
    keyHighlights: "MS02 delivery, client review pending",
    fileSize: "2.0 MB"
  },
  {
    id: "report-w25",
    weekNumber: 25,
    dateRange: "30 Dec 2025 - 05 Jan 2026",
    generatedDate: "05 Jan 2026",
    status: "archived" as const,
    keyHighlights: "Holiday period, MS02 final preparations",
    fileSize: "1.7 MB"
  },
  {
    id: "report-w24",
    weekNumber: 24,
    dateRange: "23 Dec - 29 Dec 2025",
    generatedDate: "29 Dec 2025",
    status: "archived" as const,
    keyHighlights: "Year-end review, MS02 nearing completion",
    fileSize: "2.2 MB"
  }
];

export function StatusReportTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Status Reports</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Weekly project status reports • Download past reports
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Week {weeklyReports[0].weekNumber} (Current)
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Weekly Status Reports</CardTitle>
              <p className="text-sm text-muted-foreground">
                {weeklyReports.length} reports available • PDF format
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyReports.map((report) => (
              <div
                key={report.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors hover:bg-muted/30",
                  report.status === "current" 
                    ? "bg-primary/5 border-primary/30" 
                    : "bg-card border-border"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                      report.status === "current" ? "bg-primary/10" : "bg-muted"
                    )}>
                      <FileText className={cn(
                        "h-5 w-5",
                        report.status === "current" ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          Status Report: Week {report.weekNumber}
                        </span>
                        {report.status === "current" && (
                          <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Latest
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.dateRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Generated: {report.generatedDate}
                        </span>
                        <span>{report.fileSize}</span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {report.keyHighlights}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="h-4 w-4 mr-1.5" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Load Earlier Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                About Status Reports
              </p>
              <p className="text-xs text-muted-foreground">
                Weekly status reports are generated every week and include executive summary, 
                milestone progress, risks & issues, dependencies, and commercial status. 
                Reports are available in PDF format for download and archival.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
