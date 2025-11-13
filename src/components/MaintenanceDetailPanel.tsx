import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Calendar, User, Wrench, FileText, Clock } from "lucide-react";

interface MaintenanceDetail {
  id: string;
  title: string;
  status: "open" | "resolved";
  date: string;
  reportedBy: string;
  assignedTo: string;
  priority: string;
  description: string;
  findings: string[];
  actionsPerformed: string[];
  partsReplaced?: { part: string; partNumber: string; quantity: number }[];
  laborHours: number;
  nextAction?: string;
  estimatedCompletion?: string;
  attachments: string[];
}

export const maintenanceDetails: Record<string, MaintenanceDetail> = {
  "0": {
    id: "0",
    title: "Engine Anomaly Detected",
    status: "open",
    date: "2025-09-10",
    reportedBy: "Flight Crew - Captain Sarah Mitchell",
    assignedTo: "Senior Engineer - Marcus Thompson",
    priority: "High",
    description: "During cruise phase at FL350, abnormal exhaust gas temperature (EGT) readings detected on Engine #2 (IAE V2500-A5). Concurrent elevated vibration levels observed exceeding manufacturer advisory thresholds. Automated monitoring system flagged anomaly and generated maintenance alert.",
    findings: [
      "EGT reading 45°C above expected baseline (average 896°C vs. expected 850°C)",
      "Engine vibration measured at 2.1 ips, exceeding advisory threshold of 1.8 ips",
      "No visible damage observed during pre-flight walk-around",
      "Engine performance parameters otherwise within normal ranges",
      "Trend analysis shows gradual increase over last 10 flight segments"
    ],
    actionsPerformed: [
      "Initial diagnostic scan completed - data logged to maintenance system",
      "Ground vibration test scheduled for next available maintenance window",
      "Borescope inspection requisitioned within next 25 flight hours",
      "Engine manufacturer technical support contacted for guidance",
      "Flight operations notified - aircraft cleared for continued operation with enhanced monitoring"
    ],
    laborHours: 0,
    nextAction: "Conduct borescope inspection of Engine #2 hot section and perform detailed vibration analysis on ground run",
    estimatedCompletion: "2025-09-15",
    attachments: [
      "Engine_Performance_Data_Flight_EK401.pdf",
      "Vibration_Analysis_Chart.pdf",
      "Temperature_Trend_Report.xlsx",
      "Manufacturer_Service_Bulletin_V2500-SB-001.pdf"
    ]
  },
  "1": {
    id: "1",
    title: "Unscheduled maintenance: bird strike",
    status: "resolved",
    date: "2024-06-02",
    reportedBy: "Flight Crew - Captain James Anderson",
    assignedTo: "Lead Technician - Rebecca Chen",
    priority: "High",
    description: "Bird strike reported during takeoff roll at approximately 120 knots. Impact occurred on nose radome and left engine cowling. Flight crew elected to reject takeoff per standard operating procedures. Aircraft taxied back to gate for inspection.",
    findings: [
      "Significant damage to nose radome - 8-inch crack detected",
      "Dent and paint damage on left engine cowling inlet",
      "Bird remains identified as European Starling (mass approximately 80g)",
      "Engine fan blade inspection revealed no damage",
      "Radome delamination detected during detailed ultrasonic inspection",
      "Weather radar functionality compromised"
    ],
    actionsPerformed: [
      "Complete nose radome replacement - Part# A350-53-1001",
      "Left engine cowling panel repair and re-painting",
      "Full engine borescope inspection - no internal damage found",
      "Weather radar system calibration and functionality test",
      "Composite repair to adjacent nose cone fairings",
      "Final quality assurance inspection completed"
    ],
    partsReplaced: [
      { part: "Nose Radome Assembly", partNumber: "A350-53-1001", quantity: 1 },
      { part: "Engine Cowling Inlet Panel", partNumber: "V2500-78-2344", quantity: 1 },
      { part: "Radome Mounting Hardware Kit", partNumber: "MS-9047-K12", quantity: 1 }
    ],
    laborHours: 24,
    attachments: [
      "Bird_Strike_Incident_Report.pdf",
      "Radome_Damage_Photos.zip",
      "Engine_Inspection_Report.pdf",
      "Repair_Work_Order_24-0602-A.pdf",
      "Final_QA_Signoff.pdf"
    ]
  },
  "2": {
    id: "2",
    title: "Major structural inspection (C-check)",
    status: "resolved",
    date: "2023-12-14",
    reportedBy: "Maintenance Planning - David Kumar",
    assignedTo: "Chief Inspector - Patricia O'Brien",
    priority: "Scheduled",
    description: "Comprehensive C-Check maintenance inspection performed in accordance with Airbus A350 Maintenance Planning Document. Aircraft accumulated 6,000 flight hours and 18 months since last major inspection. Detailed structural, systems, and component inspections conducted over 14-day maintenance period.",
    findings: [
      "Minor corrosion detected on wing attachment lugs - within acceptable limits",
      "Landing gear actuator seals showing early signs of wear",
      "Hydraulic fluid samples analyzed - contamination within specification",
      "Flight control surface inspections - no anomalies detected",
      "Cabin interior components showing normal wear patterns",
      "All structural integrity tests passed within tolerance"
    ],
    actionsPerformed: [
      "Complete aircraft structural inspection per MPD Tasks 53-01 through 53-99",
      "Landing gear overhaul and reassembly with new seals",
      "Flight control rigging verification and adjustment",
      "Full hydraulic system flush and filter replacement",
      "Corrosion treatment and protective coating application",
      "Cabin systems comprehensive functional testing",
      "Emergency equipment inspection and certification renewal",
      "Engine time-since-overhaul documentation review",
      "Avionics software updates to latest approved versions",
      "Weight and balance recalculation with updated equipment list"
    ],
    partsReplaced: [
      { part: "Landing Gear Actuator Seal Kit", partNumber: "LG-4421-SK", quantity: 3 },
      { part: "Hydraulic Filter Elements", partNumber: "HY-8800-F", quantity: 6 },
      { part: "Emergency Slide Pressure Cartridges", partNumber: "ES-2200-C", quantity: 8 },
      { part: "Flight Control Bearing Assemblies", partNumber: "FC-9912-B", quantity: 12 }
    ],
    laborHours: 336,
    attachments: [
      "C-Check_Work_Package_A6-XWJ.pdf",
      "Structural_Inspection_Report.pdf",
      "Landing_Gear_Overhaul_Documentation.pdf",
      "Systems_Functional_Test_Results.xlsx",
      "Airworthiness_Release_Certificate.pdf"
    ]
  },
  "3": {
    id: "3",
    title: "Altimeter / pitot-static system calibration",
    status: "resolved",
    date: "2023-04-21",
    reportedBy: "Avionics Department - Lisa Martinez",
    assignedTo: "Avionics Technician - Robert Chang",
    priority: "Medium",
    description: "Scheduled 24-month pitot-static system calibration and altimeter verification required by regulatory airworthiness directives. Precision testing conducted using certified ground support equipment to ensure accuracy of altitude and airspeed indication systems across full operational range.",
    findings: [
      "Captain's altimeter showing +30ft deviation at FL350 - outside tolerance",
      "First Officer's altimeter within specification across all test points",
      "Standby altimeter calibration acceptable",
      "Airspeed indicators showing acceptable correlation",
      "Static port leak test - no leakage detected",
      "Pitot probe heating elements functional on all three systems"
    ],
    actionsPerformed: [
      "Complete pitot-static system leak check per AMM 34-11-00",
      "Captain's altimeter removed and sent to certified repair station",
      "Serviceable altimeter installed and calibrated",
      "Static system leak test performed - passed specification",
      "Air data computer calibration verification",
      "RVSM (Reduced Vertical Separation Minimum) compliance check",
      "Flight Management System altitude crosscheck performed",
      "Documentation updated in aircraft technical log"
    ],
    partsReplaced: [
      { part: "Digital Altimeter Unit", partNumber: "AV-3350-ALT", quantity: 1 }
    ],
    laborHours: 8,
    attachments: [
      "Pitot-Static_Test_Report.pdf",
      "Altimeter_Calibration_Certificate.pdf",
      "RVSM_Compliance_Documentation.pdf",
      "Avionics_Work_Order_23-0421.pdf"
    ]
  },
  "4": {
    id: "4",
    title: "Landing gear overhaul",
    status: "resolved",
    date: "2022-11-07",
    reportedBy: "Maintenance Planning - David Kumar",
    assignedTo: "Landing Gear Specialist - Michael Stevens",
    priority: "Scheduled",
    description: "Scheduled main landing gear overhaul at 12,000 flight cycles per manufacturer maintenance requirements. Complete disassembly, inspection, refurbishment, and reassembly of main landing gear assemblies including shock struts, actuators, brakes, and associated components.",
    findings: [
      "Shock strut servicing intervals due for complete overhaul",
      "Brake wear within acceptable limits but scheduled for replacement",
      "Hydraulic actuator seals showing age-related degradation",
      "Wheel bearings showing normal wear patterns",
      "Tire condition acceptable - 6mm tread remaining",
      "No structural cracks or corrosion detected in landing gear structure"
    ],
    actionsPerformed: [
      "Complete main landing gear removal from aircraft",
      "Shock strut disassembly, inspection, and servicing",
      "Replacement of all hydraulic seals and O-rings",
      "Brake assembly replacement with new carbon brake units",
      "Landing gear actuator overhaul and testing",
      "Wheel bearing cleaning, inspection, and re-lubrication",
      "Landing gear truck beam inspection and NDT testing",
      "Reassembly with torque specifications verified",
      "Landing gear swing test and retraction cycle testing",
      "Final operational test after aircraft installation"
    ],
    partsReplaced: [
      { part: "Main Landing Gear Brake Assembly", partNumber: "BR-8844-C", quantity: 4 },
      { part: "Shock Strut Seal Kit", partNumber: "LG-3399-SK", quantity: 2 },
      { part: "Landing Gear Actuator Seal Kit", partNumber: "LG-4421-SK", quantity: 6 },
      { part: "Wheel Bearing Assembly", partNumber: "WH-7755-B", quantity: 8 },
      { part: "Hydraulic Fluid - MIL-PRF-5606", partNumber: "HF-5606", quantity: 15 }
    ],
    laborHours: 120,
    attachments: [
      "Landing_Gear_Overhaul_Work_Package.pdf",
      "Shock_Strut_Servicing_Report.pdf",
      "Brake_System_Test_Results.pdf",
      "NDT_Inspection_Report.pdf",
      "Landing_Gear_Release_Certificate.pdf"
    ]
  }
};

interface MaintenanceDetailPanelProps {
  entryId: string;
}

export const MaintenanceDetailPanel = ({ entryId }: MaintenanceDetailPanelProps) => {
  const details = maintenanceDetails[entryId];

  if (!details) {
    return (
      <Card className="p-6 bg-card/60 backdrop-blur-sm border-border shadow-lg">
        <p className="text-center text-muted-foreground">Select an entry to view details</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card/60 backdrop-blur-sm border-warning/30 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          {details.status === "open" ? (
            <div className="bg-warning/20 rounded-full p-3 animate-pulse-glow">
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          ) : (
            <div className="bg-primary/20 rounded-full p-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{details.title}</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant={details.status === "open" ? "destructive" : "secondary"}>
                {details.status === "open" ? "Open" : "Resolved"}
              </Badge>
              <Badge variant="outline">Priority: {details.priority}</Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Date:</span>
            <span className="font-semibold text-foreground">{details.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Labor Hours:</span>
            <span className="font-semibold text-foreground">{details.laborHours}h</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Reported By:</span>
            <span className="font-semibold text-foreground text-xs">{details.reportedBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Assigned To:</span>
            <span className="font-semibold text-foreground text-xs">{details.assignedTo}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-foreground mb-2">Description</h3>
            <p className="text-foreground text-sm leading-relaxed">{details.description}</p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-2">Findings</h3>
            <ul className="space-y-1">
              {details.findings.slice(0, 3).map((finding, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-2">Actions Performed</h3>
            <ul className="space-y-1">
              {details.actionsPerformed.slice(0, 3).map((action, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {details.partsReplaced && details.partsReplaced.length > 0 && (
            <div>
              <h3 className="font-bold text-foreground mb-2">Parts Replaced</h3>
              <div className="space-y-1">
                {details.partsReplaced.slice(0, 2).map((part, index) => (
                  <div key={index} className="text-sm text-foreground">
                    • {part.part} ({part.partNumber}) x{part.quantity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {details.nextAction && (
            <div className="bg-warning/10 p-3 rounded-lg border border-warning/30">
              <h3 className="font-bold text-foreground mb-1 text-sm">Next Action Required</h3>
              <p className="text-foreground text-sm">{details.nextAction}</p>
            </div>
          )}

          <div>
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Attachments ({details.attachments.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {details.attachments.slice(0, 3).map((attachment, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {attachment.split('_')[0]}...
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
