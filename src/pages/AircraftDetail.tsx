import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, Plane, MapPin, Clock, AlertTriangle, CheckCircle, Wrench, FileText, Calendar, XCircle, ChevronDown } from "lucide-react";
import a350Image from "@/assets/a350.jpg";
import a380Image from "@/assets/a380.jpg";
import boeing777_300Image from "@/assets/777-300er.jpeg";
import boeing777_200Image from "@/assets/777-200lr.avif";

const aircraftDatabase: Record<string, any> = {
  "A6-EDA": {
    id: "A6-EDA",
    model: "Airbus A350-900",
    status: "operational",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-02-15",
    flightHours: 8420,
    cycles: 2145,
    warnings: 0,
    image: a350Image,
    manufactured: "2019-03-15",
    deliveryDate: "2019-04-20",
    serialNumber: "MSN-342",
    engines: "2x Rolls-Royce Trent XWB-84",
    maxRange: "15,000 km",
    cruiseSpeed: "903 km/h",
    maxAltitude: "43,100 ft",
    capacity: "325 passengers (3-class)",
    lastInspection: "2024-01-05",
    nextInspection: "2024-02-15",
    certifications: ["EASA", "FAA", "GCAA"],
  },
  "A6-EDB": {
    id: "A6-EDB",
    model: "Airbus A350-900",
    status: "maintenance",
    location: "Emirates Engineering",
    nextMaintenance: "In Progress",
    flightHours: 9150,
    cycles: 2380,
    warnings: 2,
    image: a350Image,
    manufactured: "2018-11-20",
    deliveryDate: "2018-12-15",
    serialNumber: "MSN-298",
    engines: "2x Rolls-Royce Trent XWB-84",
    maxRange: "15,000 km",
    cruiseSpeed: "903 km/h",
    maxAltitude: "43,100 ft",
    capacity: "325 passengers (3-class)",
    lastInspection: "2024-01-10",
    nextInspection: "2024-01-20",
    certifications: ["EASA", "FAA", "GCAA"],
    warningDetails: [
      {
        id: "WARN-001",
        severity: "high",
        system: "Hydraulic System",
        description: "Hydraulic fluid pressure fluctuation detected in primary system",
        detectedDate: "2024-01-15 14:23 UTC",
        action: "System monitoring and fluid level check required",
        status: "Under Investigation"
      },
      {
        id: "WARN-002",
        severity: "medium",
        system: "Navigation",
        description: "GPS signal intermittent on backup navigation unit",
        detectedDate: "2024-01-16 09:45 UTC",
        action: "Backup unit replacement scheduled",
        status: "Maintenance Scheduled"
      }
    ]
  },
  "A6-EPF": {
    id: "A6-EPF",
    model: "Airbus A380-800",
    status: "operational",
    location: "Heathrow (LHR)",
    nextMaintenance: "2024-01-20",
    flightHours: 12300,
    cycles: 1876,
    warnings: 0,
    image: a380Image,
    manufactured: "2015-06-10",
    deliveryDate: "2015-07-25",
    serialNumber: "MSN-187",
    engines: "4x Engine Alliance GP7270",
    maxRange: "15,200 km",
    cruiseSpeed: "903 km/h",
    maxAltitude: "43,000 ft",
    capacity: "517 passengers (3-class)",
    lastInspection: "2023-12-20",
    nextInspection: "2024-01-20",
    certifications: ["EASA", "FAA", "GCAA"],
  },
  "A6-EUV": {
    id: "A6-EUV",
    model: "Boeing 777-300ER",
    status: "operational",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-02-01",
    flightHours: 15200,
    cycles: 3245,
    warnings: 1,
    image: boeing777_300Image,
    manufactured: "2012-08-15",
    deliveryDate: "2012-09-10",
    serialNumber: "LN-1256",
    engines: "2x GE90-115B",
    maxRange: "13,649 km",
    cruiseSpeed: "892 km/h",
    maxAltitude: "43,100 ft",
    capacity: "360 passengers (3-class)",
    lastInspection: "2023-12-15",
    nextInspection: "2024-02-01",
    certifications: ["FAA", "EASA", "GCAA"],
    warningDetails: [
      {
        id: "WARN-003",
        severity: "low",
        system: "Cabin Systems",
        description: "Entertainment system intermittent failure in row 15-18",
        detectedDate: "2024-01-14 18:30 UTC",
        action: "Component replacement during next scheduled maintenance",
        status: "Scheduled for Maintenance"
      }
    ]
  },
  "A6-EWE": {
    id: "A6-EWE",
    model: "Boeing 777-200LR",
    status: "scheduled",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-01-18",
    flightHours: 18500,
    cycles: 4120,
    warnings: 0,
    image: boeing777_200Image,
    manufactured: "2010-05-20",
    deliveryDate: "2010-06-30",
    serialNumber: "LN-892",
    engines: "2x GE90-110B1",
    maxRange: "17,370 km",
    cruiseSpeed: "892 km/h",
    maxAltitude: "43,100 ft",
    capacity: "266 passengers (3-class)",
    lastInspection: "2023-12-10",
    nextInspection: "2024-01-18",
    certifications: ["FAA", "EASA", "GCAA"],
  },
  "A6-EDC": {
    id: "A6-EDC",
    model: "Airbus A350-900",
    status: "operational",
    location: "JFK International (JFK)",
    nextMaintenance: "2024-02-10",
    flightHours: 7800,
    cycles: 1987,
    warnings: 0,
    image: a350Image,
    manufactured: "2020-01-10",
    deliveryDate: "2020-02-15",
    serialNumber: "MSN-401",
    engines: "2x Rolls-Royce Trent XWB-84",
    maxRange: "15,000 km",
    cruiseSpeed: "903 km/h",
    maxAltitude: "43,100 ft",
    capacity: "325 passengers (3-class)",
    lastInspection: "2024-01-02",
    nextInspection: "2024-02-10",
    certifications: ["EASA", "FAA", "GCAA"],
  },
  "A6-EPG": {
    id: "A6-EPG",
    model: "Airbus A380-800",
    status: "operational",
    location: "Singapore (SIN)",
    nextMaintenance: "2024-01-25",
    flightHours: 13400,
    cycles: 2034,
    warnings: 0,
    image: a380Image,
    manufactured: "2014-09-05",
    deliveryDate: "2014-10-20",
    serialNumber: "MSN-156",
    engines: "4x Engine Alliance GP7270",
    maxRange: "15,200 km",
    cruiseSpeed: "903 km/h",
    maxAltitude: "43,000 ft",
    capacity: "517 passengers (3-class)",
    lastInspection: "2023-12-18",
    nextInspection: "2024-01-25",
    certifications: ["EASA", "FAA", "GCAA"],
  },
  "A6-EUW": {
    id: "A6-EUW",
    model: "Boeing 777-300ER",
    status: "scheduled",
    location: "Emirates Engineering",
    nextMaintenance: "2024-01-17",
    flightHours: 16100,
    cycles: 3567,
    warnings: 1,
    image: boeing777_300Image,
    manufactured: "2011-11-12",
    deliveryDate: "2011-12-20",
    serialNumber: "LN-1089",
    engines: "2x GE90-115B",
    maxRange: "13,649 km",
    cruiseSpeed: "892 km/h",
    maxAltitude: "43,100 ft",
    capacity: "360 passengers (3-class)",
    lastInspection: "2023-12-12",
    nextInspection: "2024-01-17",
    certifications: ["FAA", "EASA", "GCAA"],
    warningDetails: [
      {
        id: "WARN-004",
        severity: "medium",
        system: "Landing Gear",
        description: "Tire wear indicator shows approaching replacement threshold",
        detectedDate: "2024-01-13 11:00 UTC",
        action: "Tire replacement during scheduled maintenance",
        status: "Action Planned"
      }
    ]
  },
};

const systemsData = [
  { 
    name: "Hydraulics", 
    status: "optimal", 
    healthy: 17, 
    total: 17,
    components: [
      { name: "Primary Pump A", status: "operational" },
      { name: "Primary Pump B", status: "operational" },
      { name: "Backup Pump", status: "operational" },
      { name: "Reservoir A", status: "operational" },
      { name: "Reservoir B", status: "operational" },
      { name: "Pressure Sensor 1", status: "operational" },
      { name: "Pressure Sensor 2", status: "operational" },
      { name: "Pressure Sensor 3", status: "operational" },
      { name: "Flow Control Valve A", status: "operational" },
      { name: "Flow Control Valve B", status: "operational" },
      { name: "Accumulator A", status: "operational" },
      { name: "Accumulator B", status: "operational" },
      { name: "Filter Assembly A", status: "operational" },
      { name: "Filter Assembly B", status: "operational" },
      { name: "Pressure Relief Valve", status: "operational" },
      { name: "Temperature Sensor A", status: "operational" },
      { name: "Temperature Sensor B", status: "operational" },
    ]
  },
  { 
    name: "Electrical", 
    status: "optimal", 
    healthy: 23, 
    total: 24,
    components: [
      { name: "Main Generator 1", status: "operational" },
      { name: "Main Generator 2", status: "operational" },
      { name: "APU Generator", status: "operational" },
      { name: "Battery 1", status: "operational" },
      { name: "Battery 2", status: "operational" },
      { name: "AC Bus 1", status: "operational" },
      { name: "AC Bus 2", status: "operational" },
      { name: "DC Bus 1", status: "operational" },
      { name: "DC Bus 2", status: "operational" },
      { name: "Essential Bus", status: "operational" },
      { name: "Transformer Rectifier 1", status: "operational" },
      { name: "Transformer Rectifier 2", status: "operational" },
      { name: "Static Inverter", status: "operational" },
      { name: "External Power Receptacle", status: "operational" },
      { name: "Bus Tie Contactor 1", status: "operational" },
      { name: "Bus Tie Contactor 2", status: "operational" },
      { name: "Generator Control Unit 1", status: "operational" },
      { name: "Generator Control Unit 2", status: "operational" },
      { name: "Circuit Breaker Panel A", status: "operational" },
      { name: "Circuit Breaker Panel B", status: "operational" },
      { name: "Circuit Breaker Panel C", status: "operational" },
      { name: "Voltage Regulator 1", status: "operational" },
      { name: "Voltage Regulator 2", status: "operational" },
      { name: "Emergency Battery", status: "maintenance" },
    ]
  },
  { 
    name: "Fuel System", 
    status: "good", 
    healthy: 14, 
    total: 15,
    components: [
      { name: "Center Tank Pump 1", status: "operational" },
      { name: "Center Tank Pump 2", status: "operational" },
      { name: "Left Wing Pump 1", status: "operational" },
      { name: "Left Wing Pump 2", status: "operational" },
      { name: "Right Wing Pump 1", status: "operational" },
      { name: "Right Wing Pump 2", status: "operational" },
      { name: "Fuel Flow Sensor L", status: "operational" },
      { name: "Fuel Flow Sensor R", status: "operational" },
      { name: "Fuel Quantity Indicator 1", status: "operational" },
      { name: "Fuel Quantity Indicator 2", status: "operational" },
      { name: "Fuel Valve Center", status: "operational" },
      { name: "Fuel Valve Left", status: "operational" },
      { name: "Fuel Valve Right", status: "operational" },
      { name: "Crossfeed Valve", status: "operational" },
      { name: "Fuel Temperature Sensor", status: "maintenance" },
    ]
  },
  { 
    name: "APU", 
    status: "optimal", 
    healthy: 8, 
    total: 8,
    components: [
      { name: "APU Controller", status: "operational" },
      { name: "Starter Motor", status: "operational" },
      { name: "Fuel Pump", status: "operational" },
      { name: "Oil Pump", status: "operational" },
      { name: "Inlet Door Actuator", status: "operational" },
      { name: "Bleed Air Valve", status: "operational" },
      { name: "EGT Sensor", status: "operational" },
      { name: "Fire Detection System", status: "operational" },
    ]
  },
  { 
    name: "Landing Gear", 
    status: "good", 
    healthy: 11, 
    total: 12,
    components: [
      { name: "Nose Gear Actuator", status: "operational" },
      { name: "Left Main Gear Actuator", status: "operational" },
      { name: "Right Main Gear Actuator", status: "operational" },
      { name: "Gear Door Actuator NL", status: "operational" },
      { name: "Gear Door Actuator NR", status: "operational" },
      { name: "Gear Door Actuator LM", status: "operational" },
      { name: "Gear Door Actuator RM", status: "operational" },
      { name: "Position Sensor Nose", status: "operational" },
      { name: "Position Sensor Left", status: "operational" },
      { name: "Position Sensor Right", status: "operational" },
      { name: "Proximity Switch Nose", status: "maintenance" },
      { name: "Anti-Skid Control Unit", status: "operational" },
    ]
  },
  { 
    name: "Navigation", 
    status: "optimal", 
    healthy: 19, 
    total: 19,
    components: [
      { name: "GPS Receiver 1", status: "operational" },
      { name: "GPS Receiver 2", status: "operational" },
      { name: "GPS Receiver 3", status: "operational" },
      { name: "IRS Unit 1", status: "operational" },
      { name: "IRS Unit 2", status: "operational" },
      { name: "IRS Unit 3", status: "operational" },
      { name: "VOR/LOC Receiver 1", status: "operational" },
      { name: "VOR/LOC Receiver 2", status: "operational" },
      { name: "DME Interrogator 1", status: "operational" },
      { name: "DME Interrogator 2", status: "operational" },
      { name: "ADF Receiver 1", status: "operational" },
      { name: "ADF Receiver 2", status: "operational" },
      { name: "Radio Altimeter 1", status: "operational" },
      { name: "Radio Altimeter 2", status: "operational" },
      { name: "TCAS Computer", status: "operational" },
      { name: "Weather Radar", status: "operational" },
      { name: "FMS 1", status: "operational" },
      { name: "FMS 2", status: "operational" },
      { name: "FMS 3", status: "operational" },
    ]
  },
  { 
    name: "Communication", 
    status: "optimal", 
    healthy: 12, 
    total: 12,
    components: [
      { name: "VHF Radio 1", status: "operational" },
      { name: "VHF Radio 2", status: "operational" },
      { name: "VHF Radio 3", status: "operational" },
      { name: "HF Radio 1", status: "operational" },
      { name: "HF Radio 2", status: "operational" },
      { name: "SATCOM Transceiver", status: "operational" },
      { name: "Transponder 1", status: "operational" },
      { name: "Transponder 2", status: "operational" },
      { name: "ACARS Unit", status: "operational" },
      { name: "Audio Control Panel 1", status: "operational" },
      { name: "Audio Control Panel 2", status: "operational" },
      { name: "CVR (Cockpit Voice Recorder)", status: "operational" },
    ]
  },
  { 
    name: "Pressurization", 
    status: "good", 
    healthy: 9, 
    total: 10,
    components: [
      { name: "Outflow Valve 1", status: "operational" },
      { name: "Outflow Valve 2", status: "operational" },
      { name: "Cabin Pressure Controller", status: "operational" },
      { name: "Safety Valve Forward", status: "operational" },
      { name: "Safety Valve Aft", status: "operational" },
      { name: "Pressure Sensor Forward", status: "operational" },
      { name: "Pressure Sensor Aft", status: "operational" },
      { name: "Differential Pressure Sensor", status: "operational" },
      { name: "Cabin Altitude Sensor", status: "maintenance" },
      { name: "Manual Control", status: "operational" },
    ]
  },
];

const recentFlights = [
  { flightNo: "EK001", from: "DXB", to: "LHR", date: "2024-01-12", duration: "7h 15m", status: "Completed" },
  { flightNo: "EK002", from: "LHR", to: "DXB", date: "2024-01-13", duration: "6h 55m", status: "Completed" },
  { flightNo: "EK015", from: "DXB", to: "JFK", date: "2024-01-14", duration: "14h 20m", status: "Completed" },
  { flightNo: "EK016", from: "JFK", to: "DXB", date: "2024-01-15", duration: "13h 45m", status: "Completed" },
];

const maintenanceHistory = [
  { date: "2024-01-05", type: "A-Check", description: "Routine inspection and servicing", technician: "John Smith", duration: "8 hours" },
  { date: "2023-12-10", type: "Component Replacement", description: "Replaced navigation sensor unit", technician: "Sarah Johnson", duration: "4 hours" },
  { date: "2023-11-20", type: "Software Update", description: "FMS software upgrade v8.2.1", technician: "Mike Chen", duration: "2 hours" },
  { date: "2023-10-15", type: "B-Check", description: "Extended inspection and maintenance", technician: "John Smith", duration: "48 hours" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "bg-green-500";
    case "maintenance":
      return "bg-destructive";
    case "scheduled":
      return "bg-blue-500";
    default:
      return "bg-muted";
  }
};

const getHealthColor = (health: number) => {
  if (health >= 95) return "text-green-500";
  if (health >= 85) return "text-blue-500";
  if (health >= 75) return "text-yellow-500";
  return "text-destructive";
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "high":
      return <XCircle className="h-5 w-5" />;
    case "medium":
      return <AlertTriangle className="h-5 w-5" />;
    case "low":
      return <AlertTriangle className="h-5 w-5" />;
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
};

const AircraftDetail = () => {
  const { id } = useParams<{ id: string }>();
  const aircraft = id ? aircraftDatabase[id] : null;

  if (!aircraft) {
  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/images/background.jpeg)' }}>
      <div className="min-h-screen bg-background/50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <Card className="p-12 text-center">
            <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Aircraft Not Found</h2>
            <p className="text-muted-foreground mb-6">The aircraft ID you're looking for doesn't exist.</p>
            <Link to="/fleet" className="text-primary hover:underline">Return to Fleet</Link>
          </Card>
        </main>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/images/background.jpeg)' }}>
      <div className="min-h-screen bg-background/50">
        <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/fleet" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Fleet
        </Link>

        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8 shadow-xl">
          <img 
            src={aircraft.image} 
            alt={`${aircraft.model} - ${aircraft.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Plane className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold text-foreground">{aircraft.id}</h1>
                  <Badge className={getStatusColor(aircraft.status)}>{aircraft.status}</Badge>
                </div>
                <p className="text-xl text-foreground/90">{aircraft.model}</p>
              </div>
              {aircraft.warnings > 0 && (
                <Badge variant="outline" className="text-warning border-warning">
                  {aircraft.warnings} Active Warning{aircraft.warnings > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Warning Messages - Front and Center */}
        {aircraft.warnings > 0 && aircraft.warningDetails && (
          <Alert variant="destructive" className="mb-8 border-2 border-warning/30 bg-warning/10 backdrop-blur-md backdrop-saturate-150">
            <AlertTriangle className="h-6 w-6" />
            <AlertTitle className="text-xl font-bold mb-4">
              {aircraft.warnings} Active Warning{aircraft.warnings > 1 ? "s" : ""} - Immediate Attention Required
            </AlertTitle>
            <AlertDescription>
              <div className="space-y-4">
                {aircraft.warningDetails.map((warning: any) => (
                  <Card key={warning.id} className="border-warning/30 bg-background/60 backdrop-blur-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(warning.severity)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-foreground text-lg">{warning.system}</h4>
                              <Badge variant={getSeverityColor(warning.severity) as any} className="uppercase text-xs">
                                {warning.severity} Priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">ID: {warning.id}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-2">{warning.status}</Badge>
                      </div>
                      <div className="space-y-2 pl-8">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Description:</p>
                          <p className="text-sm text-muted-foreground">{warning.description}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Required Action:</p>
                          <p className="text-sm text-muted-foreground">{warning.action}</p>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">Detected: {warning.detectedDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Location</p>
                  <p className="font-semibold text-foreground">{aircraft.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Flight Hours</p>
                  <p className="font-semibold text-foreground">{aircraft.flightHours.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Next Maintenance</p>
                  <p className="font-semibold text-foreground">{aircraft.nextMaintenance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Cycles</p>
                  <p className="font-semibold text-foreground">{aircraft.cycles.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="systems">Systems</TabsTrigger>
            <TabsTrigger value="flights">Flight History</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service History */}
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Service History</CardTitle>
                  <CardDescription>Manufacturing and delivery information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufactured</span>
                    <span className="font-medium text-foreground">{aircraft.manufactured}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Date</span>
                    <span className="font-medium text-foreground">{aircraft.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serial Number</span>
                    <span className="font-medium text-foreground">{aircraft.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Inspection</span>
                    <span className="font-medium text-foreground">{aircraft.lastInspection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Inspection</span>
                    <span className="font-medium text-foreground">{aircraft.nextInspection}</span>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                    <div className="flex gap-2">
                      {aircraft.certifications.map((cert: string) => (
                        <Badge key={cert} variant="secondary">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Maintenance Log */}
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Maintenance Log</CardTitle>
                  <CardDescription>Latest maintenance activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceHistory.slice(0, 3).map((entry, index) => (
                      <div key={index} className="p-3 border border-border/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-foreground text-sm">{entry.type}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{entry.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{entry.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Tech: {entry.technician}</span>
                          <span>{entry.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Critical Issues */}
              <Card className="bg-card/60 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Critical Issues & Active Warnings
                  </CardTitle>
                  <CardDescription>Real-time alerts and system anomalies</CardDescription>
                </CardHeader>
                <CardContent>
                  {aircraft.warnings > 0 && aircraft.warningDetails ? (
                    <div className="space-y-4">
                      {aircraft.warningDetails.map((warning: any) => (
                        <div key={warning.id} className="p-4 border-2 border-warning/30 rounded-lg bg-warning/5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              {getSeverityIcon(warning.severity)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-foreground">{warning.system}</h4>
                                  <Badge variant={getSeverityColor(warning.severity) as any} className="uppercase text-xs">
                                    {warning.severity}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Warning ID: {warning.id}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{warning.status}</Badge>
                          </div>
                          <div className="space-y-2 pl-8">
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">Issue Description:</p>
                              <p className="text-sm text-muted-foreground">{warning.description}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">Required Action:</p>
                              <p className="text-sm text-warning">{warning.action}</p>
                            </div>
                            <div className="pt-2 border-t border-border/30">
                              <p className="text-xs text-muted-foreground">Detected: {warning.detectedDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-foreground mb-1">All Systems Nominal</p>
                      <p className="text-sm text-muted-foreground">No active warnings or critical issues detected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="systems">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
                <CardDescription>Component-level monitoring of aircraft systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemsData.map((system) => (
                    <Collapsible key={system.name} className="border border-border/50 rounded-lg">
                      <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle className={`h-5 w-5 ${system.healthy === system.total ? 'text-green-500' : 'text-yellow-500'}`} />
                            <span className="font-semibold text-foreground">{system.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium ${system.healthy === system.total ? 'text-green-500' : 'text-yellow-500'}`}>
                              {system.healthy}/{system.total}
                            </span>
                            <Badge variant="outline" className="capitalize">{system.status}</Badge>
                            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={(system.healthy / system.total) * 100} className="h-2" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 pb-4 pt-2 space-y-2 bg-muted/20">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">COMPONENT DETAILS</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {system.components.map((component: any, idx: number) => (
                              <div 
                                key={idx} 
                                className={`flex items-center justify-between p-2 rounded border ${
                                  component.status === 'operational' 
                                    ? 'border-green-500/30 bg-green-500/5' 
                                    : 'border-yellow-500/30 bg-yellow-500/5'
                                }`}
                              >
                                <span className="text-xs text-foreground">{component.name}</span>
                                <Badge 
                                  variant={component.status === 'operational' ? 'outline' : 'secondary'} 
                                  className={`text-xs ${
                                    component.status === 'operational' 
                                      ? 'text-green-500 border-green-500' 
                                      : 'text-yellow-500 border-yellow-500'
                                  }`}
                                >
                                  {component.status === 'operational' ? 'OK' : 'MAINT'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Flight History</CardTitle>
                <CardDescription>Last 4 completed flights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFlights.map((flight, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Plane className="h-5 w-5 text-primary" />
                          <span className="font-bold text-foreground">{flight.flightNo}</span>
                          <span className="text-muted-foreground">{flight.from} → {flight.to}</span>
                        </div>
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          {flight.status}
                        </Badge>
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span>Date: {flight.date}</span>
                        <span>Duration: {flight.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>Recent maintenance activities and checks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceHistory.map((entry, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Wrench className="h-4 w-4 text-primary" />
                            <span className="font-bold text-foreground">{entry.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{entry.description}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground mt-2">
                        <span>Technician: {entry.technician}</span>
                        <span>Duration: {entry.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Aircraft Documentation</CardTitle>
                <CardDescription>Certifications, manuals, and compliance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Airworthiness Certificate", date: "Valid until 2025-12-31", type: "Certification" },
                    { name: "Certificate of Registration", date: "Issued 2019-04-20", type: "Legal" },
                    { name: "Noise Certificate", date: "Valid until 2025-04-20", type: "Compliance" },
                    { name: "Radio License", date: "Valid until 2026-04-20", type: "Operational" },
                    { name: "Insurance Certificate", date: "Valid until 2024-12-31", type: "Insurance" },
                    { name: "Maintenance Program Manual", date: "Rev 5.2 - 2024-01-01", type: "Technical" },
                    { name: "Flight Operations Manual", date: "Rev 12.1 - 2024-01-01", type: "Operational" },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Aircraft Specifications</CardTitle>
                <CardDescription>Technical details and capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm mb-3">General Information</h4>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serial Number</span>
                      <span className="font-medium text-foreground">{aircraft.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engine Type</span>
                      <span className="font-medium text-foreground">{aircraft.engines}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passenger Capacity</span>
                      <span className="font-medium text-foreground">{aircraft.capacity}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm mb-3">Performance</h4>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maximum Range</span>
                      <span className="font-medium text-foreground">{aircraft.maxRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cruise Speed</span>
                      <span className="font-medium text-foreground">{aircraft.cruiseSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Ceiling</span>
                      <span className="font-medium text-foreground">{aircraft.maxAltitude}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </div>
  );
};

export default AircraftDetail;
