import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";

export interface LogEntry {
  id: string;
  title: string;
  status: "open" | "resolved";
  date: string;
}

export const logEntries: LogEntry[] = [
  {
    id: "0",
    title: "Engine Anomaly Detected",
    status: "open",
    date: "2025-09-10",
  },
  {
    id: "1",
    title: "Unscheduled maintenance: bird strike",
    status: "resolved",
    date: "2024-06-02",
  },
  {
    id: "2",
    title: "Major structural inspection (C-check)",
    status: "resolved",
    date: "2023-12-14",
  },
  {
    id: "3",
    title: "Altimeter / pitot-static system calibration",
    status: "resolved",
    date: "2023-04-21",
  },
  {
    id: "4",
    title: "Landing gear overhaul",
    status: "resolved",
    date: "2022-11-07",
  },
];

interface MaintenanceLogProps {
  selectedId?: string;
  onSelectEntry: (id: string) => void;
}

export const MaintenanceLog = ({ selectedId, onSelectEntry }: MaintenanceLogProps) => {
  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-border shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Maintenance Log</h2>
      <div className="space-y-4">
        {logEntries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelectEntry(entry.id)}
            className={`w-full flex items-start justify-between p-4 bg-secondary/30 rounded-lg border transition-all cursor-pointer group text-left ${
              selectedId === entry.id
                ? "border-primary bg-secondary/60"
                : "border-border hover:bg-secondary/50 hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-3 flex-1">
              {entry.status === "open" ? (
                <AlertTriangle className="h-6 w-6 text-warning mt-1 animate-pulse-glow" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
              )}
              <div className="flex-1">
                <p className={`font-semibold transition-colors ${
                  selectedId === entry.id ? "text-primary" : "text-foreground group-hover:text-primary"
                }`}>
                  {entry.title}
                </p>
                <Badge
                  variant={entry.status === "open" ? "destructive" : "secondary"}
                  className="mt-2"
                >
                  {entry.status === "open" ? "Open" : "Resolved"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {entry.date}
              </span>
              <ChevronRight className={`h-5 w-5 transition-colors ${
                selectedId === entry.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              }`} />
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};
