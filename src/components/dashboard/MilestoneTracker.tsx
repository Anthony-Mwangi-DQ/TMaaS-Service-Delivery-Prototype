import { Check, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  name: string;
  status: "complete" | "current" | "upcoming";
  date?: string;
}

const milestones: Milestone[] = [
  { id: "1", name: "Kickoff", status: "complete", date: "Jan 15" },
  { id: "2", name: "Milestone 1", status: "complete", date: "Feb 1" },
  { id: "3", name: "Milestone 2", status: "current", date: "Feb 28" },
  { id: "4", name: "Milestone 3", status: "upcoming", date: "Mar 15" },
  { id: "5", name: "Milestone 4", status: "upcoming", date: "Apr 1" },
  { id: "6", name: "Closure", status: "upcoming", date: "Apr 15" },
];

export function MilestoneTracker() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Milestone Progress</h2>
          <p className="text-sm text-muted-foreground">6 milestones total</p>
        </div>
      </div>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-success transition-all"
          style={{ width: '40%' }}
        />
        
        {/* Milestones */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full z-10 transition-all",
                  milestone.status === "complete" && "milestone-complete",
                  milestone.status === "current" && "milestone-current",
                  milestone.status === "upcoming" && "milestone-upcoming"
                )}
              >
                {milestone.status === "complete" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="mt-3 text-center">
                <p className={cn(
                  "text-xs font-medium",
                  milestone.status === "current" ? "text-primary" : "text-foreground"
                )}>
                  {milestone.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{milestone.date}</p>
                {milestone.status === "current" && (
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
