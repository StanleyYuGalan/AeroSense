import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Bell, Wrench } from "lucide-react";
import { MonitoringCharts } from "./MonitoringCharts";
import { useToast } from "@/hooks/use-toast";

export const WarningCard = () => {
  const { toast } = useToast();

  const handleCreateWorkOrder = () => {
    toast({
      title: "Creating Work Order",
      description: "AeroSense AI is generating a comprehensive work order for Engine #2 inspection...",
    });
    // Agentic action would be triggered here
  };

  const handleNotifyTechnician = () => {
    toast({
      title: "Notifying Technician",
      description: "AeroSense AI is alerting the assigned technician and providing diagnostic details...",
    });
    // Agentic action would be triggered here
  };

  const handleScheduleInspection = () => {
    toast({
      title: "Scheduling Inspection",
      description: "AeroSense AI is coordinating with maintenance schedule and booking resources...",
    });
    // Agentic action would be triggered here
  };

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-warning/30 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-warning rounded-full p-3 animate-pulse-glow">
          <AlertTriangle className="h-8 w-8 text-warning-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Engine Warning: Abnormal Exhaust Temperature and Vibrations
        </h2>
      </div>

      <MonitoringCharts />

      <div className="mt-6 space-y-4">
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">
            The following anomalies were detected on Engine #2 (IAE V2500-A5):
          </h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning mt-1">-</span>
              <span>
                <strong>Exhaust Gas Temperature (EGT):</strong> +45°C above baseline (average 896°C vs. expected 850°C)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning mt-1">-</span>
              <span>
                <strong>Vibration Reading:</strong> 2.1 ips (inches per second), exceeding manufacturer advisory threshold of 1.8 ips.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">
            Assessment by AeroSense AI
          </h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning mt-1">-</span>
              <span>Abnormal EGT rise may indicate early signs of compressor fouling or turbine deterioration.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning mt-1">-</span>
              <span>Vibration levels suggest potential imbalance in the low-pressure rotor assembly.</span>
            </li>
          </ul>
        </div>

        <div className="bg-secondary/30 p-4 rounded-lg border border-primary/30">
          <h3 className="text-lg font-bold text-foreground mb-3">
            Recommended Actions:
          </h3>
          <ul className="space-y-2 text-foreground list-disc list-inside ml-2">
            <li>
              Schedule borescope inspection of Engine #2 within the next 25 flight hours to assess hot section and rotating components.
            </li>
            <li>
              Conduct engine vibration survey on ground run to isolate potential imbalance.
            </li>
            <li>
              If findings are confirmed, coordinate with OEM for possible shop visit / early module replacement.
            </li>
          </ul>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Agentic Actions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Request AeroSense AI to autonomously handle maintenance tasks:
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleCreateWorkOrder}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Create Work Order
            </Button>
            <Button 
              onClick={handleNotifyTechnician}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notify Technician
            </Button>
            <Button 
              onClick={handleScheduleInspection}
              variant="outline"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Schedule Inspection
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
