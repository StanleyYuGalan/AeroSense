import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { MonitoringCharts } from "./MonitoringCharts";

export const WarningCard = () => {
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
      </div>
    </Card>
  );
};
