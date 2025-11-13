import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plane, MapPin, Clock, AlertTriangle, CheckCircle, Wrench, FileText, Calendar, XCircle, ChevronDown, User, ClipboardCheck, Settings, Shield, Lock, Users, Package, Fuel, Gauge, CloudRain } from "lucide-react";
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
    certifications: ["EASA", "FAA", "GCAA"]
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
    warningDetails: [{
      id: "WARN-001",
      severity: "high",
      system: "Hydraulic System",
      description: "Hydraulic fluid pressure fluctuation detected in primary system",
      detectedDate: "2024-01-15 14:23 UTC",
      action: "System monitoring and fluid level check required",
      status: "Under Investigation"
    }, {
      id: "WARN-002",
      severity: "medium",
      system: "Navigation",
      description: "GPS signal intermittent on backup navigation unit",
      detectedDate: "2024-01-16 09:45 UTC",
      action: "Backup unit replacement scheduled",
      status: "Maintenance Scheduled"
    }]
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
    certifications: ["EASA", "FAA", "GCAA"]
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
    warningDetails: [{
      id: "WARN-003",
      severity: "low",
      system: "Cabin Systems",
      description: "Entertainment system intermittent failure in row 15-18",
      detectedDate: "2024-01-14 18:30 UTC",
      action: "Component replacement during next scheduled maintenance",
      status: "Scheduled for Maintenance"
    }]
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
    certifications: ["FAA", "EASA", "GCAA"]
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
    certifications: ["EASA", "FAA", "GCAA"]
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
    certifications: ["EASA", "FAA", "GCAA"]
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
    warningDetails: [{
      id: "WARN-004",
      severity: "medium",
      system: "Landing Gear",
      description: "Tire wear indicator shows approaching replacement threshold",
      detectedDate: "2024-01-13 11:00 UTC",
      action: "Tire replacement during scheduled maintenance",
      status: "Action Planned"
    }]
  }
};
const systemsData = [{
  name: "Hydraulics",
  status: "optimal",
  healthy: 17,
  total: 17,
  components: [{
    name: "Primary Pump A",
    status: "operational"
  }, {
    name: "Primary Pump B",
    status: "operational"
  }, {
    name: "Backup Pump",
    status: "operational"
  }, {
    name: "Reservoir A",
    status: "operational"
  }, {
    name: "Reservoir B",
    status: "operational"
  }, {
    name: "Pressure Sensor 1",
    status: "operational"
  }, {
    name: "Pressure Sensor 2",
    status: "operational"
  }, {
    name: "Pressure Sensor 3",
    status: "operational"
  }, {
    name: "Flow Control Valve A",
    status: "operational"
  }, {
    name: "Flow Control Valve B",
    status: "operational"
  }, {
    name: "Accumulator A",
    status: "operational"
  }, {
    name: "Accumulator B",
    status: "operational"
  }, {
    name: "Filter Assembly A",
    status: "operational"
  }, {
    name: "Filter Assembly B",
    status: "operational"
  }, {
    name: "Pressure Relief Valve",
    status: "operational"
  }, {
    name: "Temperature Sensor A",
    status: "operational"
  }, {
    name: "Temperature Sensor B",
    status: "operational"
  }]
}, {
  name: "Electrical",
  status: "optimal",
  healthy: 23,
  total: 24,
  components: [{
    name: "Main Generator 1",
    status: "operational"
  }, {
    name: "Main Generator 2",
    status: "operational"
  }, {
    name: "APU Generator",
    status: "operational"
  }, {
    name: "Battery 1",
    status: "operational"
  }, {
    name: "Battery 2",
    status: "operational"
  }, {
    name: "AC Bus 1",
    status: "operational"
  }, {
    name: "AC Bus 2",
    status: "operational"
  }, {
    name: "DC Bus 1",
    status: "operational"
  }, {
    name: "DC Bus 2",
    status: "operational"
  }, {
    name: "Essential Bus",
    status: "operational"
  }, {
    name: "Transformer Rectifier 1",
    status: "operational"
  }, {
    name: "Transformer Rectifier 2",
    status: "operational"
  }, {
    name: "Static Inverter",
    status: "operational"
  }, {
    name: "External Power Receptacle",
    status: "operational"
  }, {
    name: "Bus Tie Contactor 1",
    status: "operational"
  }, {
    name: "Bus Tie Contactor 2",
    status: "operational"
  }, {
    name: "Generator Control Unit 1",
    status: "operational"
  }, {
    name: "Generator Control Unit 2",
    status: "operational"
  }, {
    name: "Circuit Breaker Panel A",
    status: "operational"
  }, {
    name: "Circuit Breaker Panel B",
    status: "operational"
  }, {
    name: "Circuit Breaker Panel C",
    status: "operational"
  }, {
    name: "Voltage Regulator 1",
    status: "operational"
  }, {
    name: "Voltage Regulator 2",
    status: "operational"
  }, {
    name: "Emergency Battery",
    status: "maintenance"
  }]
}, {
  name: "Fuel System",
  status: "good",
  healthy: 14,
  total: 15,
  components: [{
    name: "Center Tank Pump 1",
    status: "operational"
  }, {
    name: "Center Tank Pump 2",
    status: "operational"
  }, {
    name: "Left Wing Pump 1",
    status: "operational"
  }, {
    name: "Left Wing Pump 2",
    status: "operational"
  }, {
    name: "Right Wing Pump 1",
    status: "operational"
  }, {
    name: "Right Wing Pump 2",
    status: "operational"
  }, {
    name: "Fuel Flow Sensor L",
    status: "operational"
  }, {
    name: "Fuel Flow Sensor R",
    status: "operational"
  }, {
    name: "Fuel Quantity Indicator 1",
    status: "operational"
  }, {
    name: "Fuel Quantity Indicator 2",
    status: "operational"
  }, {
    name: "Fuel Valve Center",
    status: "operational"
  }, {
    name: "Fuel Valve Left",
    status: "operational"
  }, {
    name: "Fuel Valve Right",
    status: "operational"
  }, {
    name: "Crossfeed Valve",
    status: "operational"
  }, {
    name: "Fuel Temperature Sensor",
    status: "maintenance"
  }]
}, {
  name: "APU",
  status: "optimal",
  healthy: 8,
  total: 8,
  components: [{
    name: "APU Controller",
    status: "operational"
  }, {
    name: "Starter Motor",
    status: "operational"
  }, {
    name: "Fuel Pump",
    status: "operational"
  }, {
    name: "Oil Pump",
    status: "operational"
  }, {
    name: "Inlet Door Actuator",
    status: "operational"
  }, {
    name: "Bleed Air Valve",
    status: "operational"
  }, {
    name: "EGT Sensor",
    status: "operational"
  }, {
    name: "Fire Detection System",
    status: "operational"
  }]
}, {
  name: "Landing Gear",
  status: "good",
  healthy: 11,
  total: 12,
  components: [{
    name: "Nose Gear Actuator",
    status: "operational"
  }, {
    name: "Left Main Gear Actuator",
    status: "operational"
  }, {
    name: "Right Main Gear Actuator",
    status: "operational"
  }, {
    name: "Gear Door Actuator NL",
    status: "operational"
  }, {
    name: "Gear Door Actuator NR",
    status: "operational"
  }, {
    name: "Gear Door Actuator LM",
    status: "operational"
  }, {
    name: "Gear Door Actuator RM",
    status: "operational"
  }, {
    name: "Position Sensor Nose",
    status: "operational"
  }, {
    name: "Position Sensor Left",
    status: "operational"
  }, {
    name: "Position Sensor Right",
    status: "operational"
  }, {
    name: "Proximity Switch Nose",
    status: "maintenance"
  }, {
    name: "Anti-Skid Control Unit",
    status: "operational"
  }]
}, {
  name: "Navigation",
  status: "optimal",
  healthy: 19,
  total: 19,
  components: [{
    name: "GPS Receiver 1",
    status: "operational"
  }, {
    name: "GPS Receiver 2",
    status: "operational"
  }, {
    name: "GPS Receiver 3",
    status: "operational"
  }, {
    name: "IRS Unit 1",
    status: "operational"
  }, {
    name: "IRS Unit 2",
    status: "operational"
  }, {
    name: "IRS Unit 3",
    status: "operational"
  }, {
    name: "VOR/LOC Receiver 1",
    status: "operational"
  }, {
    name: "VOR/LOC Receiver 2",
    status: "operational"
  }, {
    name: "DME Interrogator 1",
    status: "operational"
  }, {
    name: "DME Interrogator 2",
    status: "operational"
  }, {
    name: "ADF Receiver 1",
    status: "operational"
  }, {
    name: "ADF Receiver 2",
    status: "operational"
  }, {
    name: "Radio Altimeter 1",
    status: "operational"
  }, {
    name: "Radio Altimeter 2",
    status: "operational"
  }, {
    name: "TCAS Computer",
    status: "operational"
  }, {
    name: "Weather Radar",
    status: "operational"
  }, {
    name: "FMS 1",
    status: "operational"
  }, {
    name: "FMS 2",
    status: "operational"
  }, {
    name: "FMS 3",
    status: "operational"
  }]
}, {
  name: "Communication",
  status: "optimal",
  healthy: 12,
  total: 12,
  components: [{
    name: "VHF Radio 1",
    status: "operational"
  }, {
    name: "VHF Radio 2",
    status: "operational"
  }, {
    name: "VHF Radio 3",
    status: "operational"
  }, {
    name: "HF Radio 1",
    status: "operational"
  }, {
    name: "HF Radio 2",
    status: "operational"
  }, {
    name: "SATCOM Transceiver",
    status: "operational"
  }, {
    name: "Transponder 1",
    status: "operational"
  }, {
    name: "Transponder 2",
    status: "operational"
  }, {
    name: "ACARS Unit",
    status: "operational"
  }, {
    name: "Audio Control Panel 1",
    status: "operational"
  }, {
    name: "Audio Control Panel 2",
    status: "operational"
  }, {
    name: "CVR (Cockpit Voice Recorder)",
    status: "operational"
  }]
}, {
  name: "Pressurization",
  status: "good",
  healthy: 9,
  total: 10,
  components: [{
    name: "Outflow Valve 1",
    status: "operational"
  }, {
    name: "Outflow Valve 2",
    status: "operational"
  }, {
    name: "Cabin Pressure Controller",
    status: "operational"
  }, {
    name: "Safety Valve Forward",
    status: "operational"
  }, {
    name: "Safety Valve Aft",
    status: "operational"
  }, {
    name: "Pressure Sensor Forward",
    status: "operational"
  }, {
    name: "Pressure Sensor Aft",
    status: "operational"
  }, {
    name: "Differential Pressure Sensor",
    status: "operational"
  }, {
    name: "Cabin Altitude Sensor",
    status: "maintenance"
  }, {
    name: "Manual Control",
    status: "operational"
  }]
}];
const recentFlights = [{
  flightNo: "EK001",
  from: "DXB",
  fromFull: "Dubai International Airport",
  to: "LHR",
  toFull: "London Heathrow Airport",
  date: "2024-01-12",
  departureTime: "03:45 UTC",
  arrivalTime: "07:30 UTC",
  duration: "7h 15m",
  status: "Completed",
  distance: "5,476 km",
  passengers: 312,
  crew: 18,
  cargoWeight: "12,500 kg",
  fuelUsed: "48,200 L",
  maxAltitude: "41,000 ft",
  avgSpeed: "865 km/h",
  captain: "Capt. Ahmed Al-Farsi",
  firstOfficer: "F/O Sarah Mitchell",
  weather: "Clear skies, Light winds",
  delayReason: null,
  incidents: "None reported",
  remarks: "Smooth flight, on-time performance"
}, {
  flightNo: "EK002",
  from: "LHR",
  fromFull: "London Heathrow Airport",
  to: "DXB",
  toFull: "Dubai International Airport",
  date: "2024-01-13",
  departureTime: "20:15 UTC",
  arrivalTime: "06:40 UTC+1",
  duration: "6h 55m",
  status: "Completed",
  distance: "5,476 km",
  passengers: 298,
  crew: 18,
  cargoWeight: "14,800 kg",
  fuelUsed: "45,800 L",
  maxAltitude: "43,000 ft",
  avgSpeed: "892 km/h",
  captain: "Capt. James Wilson",
  firstOfficer: "F/O Fatima Hassan",
  weather: "Partly cloudy, Moderate turbulence over Alps",
  delayReason: null,
  incidents: "Minor turbulence at FL350, no injuries",
  remarks: "Tailwind advantage, arrived 10 minutes early"
}, {
  flightNo: "EK015",
  from: "DXB",
  fromFull: "Dubai International Airport",
  to: "JFK",
  toFull: "John F. Kennedy International Airport",
  date: "2024-01-14",
  departureTime: "09:20 UTC",
  arrivalTime: "14:40 EST",
  duration: "14h 20m",
  status: "Completed",
  distance: "11,020 km",
  passengers: 315,
  crew: 20,
  cargoWeight: "18,200 kg",
  fuelUsed: "92,500 L",
  maxAltitude: "42,000 ft",
  avgSpeed: "881 km/h",
  captain: "Capt. Mohammad Rashid",
  firstOfficer: "F/O Emily Chen",
  weather: "Clear departure, Snow at destination",
  delayReason: "15 min - Ground de-icing at JFK",
  incidents: "None reported",
  remarks: "De-icing performed upon arrival due to winter storm"
}, {
  flightNo: "EK016",
  from: "JFK",
  fromFull: "John F. Kennedy International Airport",
  to: "DXB",
  toFull: "Dubai International Airport",
  date: "2024-01-15",
  departureTime: "23:30 EST",
  arrivalTime: "20:15 UTC+1",
  duration: "13h 45m",
  status: "Completed",
  distance: "11,020 km",
  passengers: 287,
  crew: 20,
  cargoWeight: "16,900 kg",
  fuelUsed: "88,300 L",
  maxAltitude: "41,500 ft",
  avgSpeed: "895 km/h",
  captain: "Capt. David Thompson",
  firstOfficer: "F/O Layla Ahmed",
  weather: "Clear skies throughout",
  delayReason: null,
  incidents: "None reported",
  remarks: "Excellent flight conditions, optimal routing"
}];
const maintenanceHistory = [{
  id: "MX-001",
  date: "2024-01-05",
  type: "A-Check",
  description: "Routine inspection and servicing",
  technician: "John Smith",
  duration: "8 hours",
  location: "Emirates Engineering - Dubai",
  workOrders: ["WO-2024-0105", "WO-2024-0106"],
  partsReplaced: ["Oil Filter", "Hydraulic Fluid"],
  findings: "All systems within normal parameters. Minor hydraulic fluid leak detected and repaired.",
  status: "Completed",
  signOffBy: "Chief Engineer Michael Brown",
  certification: "EASA Part-145 Certified",
  blockchainHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
  blockNumber: "15,901,456",
  timestamp: "2024-01-05 18:45:22 UTC"
}, {
  id: "MX-002",
  date: "2023-12-10",
  type: "Component Replacement",
  description: "Replaced navigation sensor unit",
  technician: "Sarah Johnson",
  duration: "4 hours",
  location: "Emirates Engineering - Dubai",
  workOrders: ["WO-2023-1210"],
  partsReplaced: ["Navigation Sensor Unit (NSU-200)", "Mounting Bracket"],
  findings: "Navigation sensor showing intermittent signal loss. Unit replaced with new certified part.",
  status: "Completed",
  signOffBy: "Senior Technician David Lee",
  certification: "EASA Part-145 Certified",
  blockchainHash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
  blockNumber: "15,678,234",
  timestamp: "2023-12-10 14:30:15 UTC"
}, {
  id: "MX-003",
  date: "2023-11-20",
  type: "Software Update",
  description: "FMS software upgrade v8.2.1",
  technician: "Mike Chen",
  duration: "2 hours",
  location: "Emirates Engineering - Dubai",
  workOrders: ["WO-2023-1120"],
  partsReplaced: [],
  findings: "Software upgrade completed successfully. All post-update tests passed.",
  status: "Completed",
  signOffBy: "Avionics Specialist Robert Taylor",
  certification: "OEM Authorized",
  blockchainHash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
  blockNumber: "15,456,789",
  timestamp: "2023-11-20 16:20:08 UTC"
}, {
  id: "MX-004",
  date: "2023-10-15",
  type: "B-Check",
  description: "Extended inspection and maintenance",
  technician: "John Smith",
  duration: "48 hours",
  location: "Emirates Engineering - Dubai",
  workOrders: ["WO-2023-1015", "WO-2023-1016", "WO-2023-1017"],
  partsReplaced: ["Landing Gear Tires (x6)", "Brake Pads (x12)", "APU Filter", "Cabin Air Filters"],
  findings: "Comprehensive inspection completed. Landing gear tires at 75% wear - replaced as preventive maintenance. All structural inspections passed.",
  status: "Completed",
  signOffBy: "Chief Engineer Michael Brown",
  certification: "EASA Part-145 Certified",
  blockchainHash: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
  blockNumber: "15,234,567",
  timestamp: "2023-10-17 20:15:45 UTC"
}];
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
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const aircraft = id ? aircraftDatabase[id] : null;
  const [selectedMaintenance, setSelectedMaintenance] = useState<typeof maintenanceHistory[0] | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedFlight, setSelectedFlight] = useState<typeof recentFlights[0] | null>(null);
  const aircraftDocuments = [{
    name: "Airworthiness Certificate",
    date: "Valid until 2025-12-31",
    type: "Certification",
    issuedBy: "GCAA - General Civil Aviation Authority",
    certificateNumber: "AWC-2024-A350-342",
    content: "This is to certify that the aircraft Airbus A350-900, registration A6-EDA, serial number MSN-342, has been inspected and found to be airworthy in accordance with the applicable airworthiness requirements.",
    blockchainHash: "0x7f9a8b3c4d5e6f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
    blockNumber: "15,847,923",
    timestamp: "2024-01-15 14:32:18 UTC"
  }, {
    name: "Certificate of Registration",
    date: "Issued 2019-04-20",
    type: "Legal",
    issuedBy: "UAE Civil Aviation Authority",
    certificateNumber: "REG-UAE-A6-EDA",
    content: "This certificate confirms that the aircraft Airbus A350-900, manufacturer serial number MSN-342, is duly registered in the name of Emirates Airline in the UAE Aircraft Register under registration mark A6-EDA.",
    blockchainHash: "0x3c8d9e2f1a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
    blockNumber: "12,456,789",
    timestamp: "2019-04-20 09:15:42 UTC"
  }, {
    name: "Noise Certificate",
    date: "Valid until 2025-04-20",
    type: "Compliance",
    issuedBy: "EASA - European Aviation Safety Agency",
    certificateNumber: "NC-2024-A350-342",
    content: "This certificate verifies that the aircraft meets the noise standards specified in ICAO Annex 16, Volume I, Chapter 14. Maximum noise levels: Takeoff 89.3 EPNdB, Approach 97.1 EPNdB, Lateral 94.8 EPNdB.",
    blockchainHash: "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    blockNumber: "15,234,567",
    timestamp: "2024-01-10 11:23:45 UTC"
  }, {
    name: "Radio License",
    date: "Valid until 2026-04-20",
    type: "Operational",
    issuedBy: "UAE Telecommunications Regulatory Authority",
    certificateNumber: "RL-2024-A6-EDA",
    content: "Authorization is granted for the operation of radio equipment on aircraft A6-EDA. Authorized frequencies: VHF 118.0-136.975 MHz, HF 2.85-22.0 MHz, Satellite Communication authorized.",
    blockchainHash: "0x9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e",
    blockNumber: "15,678,901",
    timestamp: "2024-01-08 16:45:22 UTC"
  }, {
    name: "Insurance Certificate",
    date: "Valid until 2024-12-31",
    type: "Insurance",
    issuedBy: "Global Aviation Insurance Ltd.",
    certificateNumber: "INS-2024-EDA-001",
    content: "This certificate provides evidence of insurance coverage for aircraft A6-EDA. Hull Value: $300,000,000 USD. Liability Coverage: $2,000,000,000 USD per occurrence. Coverage includes: Hull All Risks, Third Party Liability, War & Allied Perils.",
    blockchainHash: "0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c",
    blockNumber: "15,901,234",
    timestamp: "2024-01-01 00:00:00 UTC"
  }, {
    name: "Maintenance Program Manual",
    date: "Rev 5.2 - 2024-01-01",
    type: "Technical",
    issuedBy: "Emirates Engineering",
    certificateNumber: "MPM-A350-Rev5.2",
    content: "This manual outlines the approved maintenance program for A6-EDA. Includes: A-Check intervals (600 FH), B-Check intervals (6000 FH), C-Check intervals (24 months), Major structural inspections, Component life limits, and special inspections.",
    blockchainHash: "0x2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    blockNumber: "15,789,012",
    timestamp: "2024-01-01 10:30:15 UTC"
  }, {
    name: "Flight Operations Manual",
    date: "Rev 12.1 - 2024-01-01",
    type: "Operational",
    issuedBy: "Emirates Flight Operations",
    certificateNumber: "FOM-A350-Rev12.1",
    content: "Standard Operating Procedures for A350-900 operations. Covers: Normal procedures, Non-normal procedures, Performance data, Weight & Balance, Route-specific procedures, MEL/CDL procedures, and Emergency procedures.",
    blockchainHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    blockNumber: "15,823,456",
    timestamp: "2024-01-01 12:00:00 UTC"
  }];
  if (!aircraft) {
    return <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{
      backgroundImage: 'url(/images/background.jpeg)'
    }}>
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
    </div>;
  }
  return <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{
    backgroundImage: 'url(/images/background.jpeg)'
  }}>
      <div className="min-h-screen bg-background/50">
        <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/fleet" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Fleet
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Aircraft Image */}
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
            <img src={aircraft.image} alt={`${aircraft.model} - ${aircraft.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>

          {/* Aircraft Info */}
          <div className="flex flex-col justify-center space-y-6 p-6 bg-card/40 backdrop-blur-lg border border-border/30 rounded-lg">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Plane className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold text-foreground">{aircraft.id}</h1>
                <Badge className={getStatusColor(aircraft.status)}>{aircraft.status}</Badge>
              </div>
              <p className="text-xl text-foreground/90">{aircraft.model}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{aircraft.location}</p>
              </div>

              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Flight Hours</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{aircraft.flightHours.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Next Maintenance</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{aircraft.nextMaintenance}</p>
              </div>

              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Total Cycles</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{aircraft.cycles.toLocaleString()}</p>
              </div>
            </div>

            {/* Warnings */}
            {aircraft.warnings > 0 && <Badge variant="outline" className="text-warning border-warning w-fit">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {aircraft.warnings} Active Warning{aircraft.warnings > 1 ? "s" : ""}
              </Badge>}
          </div>
        </div>

        {/* Warning Messages - Front and Center */}
        {aircraft.warnings > 0 && aircraft.warningDetails && <Alert variant="destructive" className="mb-8 border-2 border-warning/30 bg-warning/10 backdrop-blur-md backdrop-saturate-150">
            <AlertTriangle className="h-6 w-6" />
            <AlertTitle className="text-xl font-bold mb-4">
              {aircraft.warnings} Active Warning{aircraft.warnings > 1 ? "s" : ""} - Immediate Attention Required
            </AlertTitle>
            <AlertDescription>
              <div className="space-y-4">
                {aircraft.warningDetails.map((warning: any) => <Card key={warning.id} className="border-warning/30 bg-background/60 backdrop-blur-md">
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
                  </Card>)}
              </div>
            </AlertDescription>
          </Alert>}

        {/* Quick Stats */}
        

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
                      {aircraft.certifications.map((cert: string) => <Badge key={cert} variant="secondary">{cert}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Maintenance Log */}
              <Card className="bg-card/60 backdrop-blur-lg border-border/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Recent Maintenance Log
                      </CardTitle>
                      <CardDescription>Latest maintenance activities (Click for details)</CardDescription>
                    </div>
                    <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500 text-xs">
                      <Lock className="h-2.5 w-2.5" />
                      Secured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceHistory.slice(0, 3).map((entry, index) => <div key={index} onClick={() => setSelectedMaintenance(entry)} className="p-3 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-foreground text-sm">{entry.type}</span>
                            <Badge variant="outline" className="text-[10px] gap-1 text-green-500 border-green-500/50 px-1.5 py-0">
                              <Shield className="h-2 w-2" />
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{entry.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{entry.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Tech: {entry.technician}</span>
                          <span>{entry.duration}</span>
                        </div>
                      </div>)}
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
                  {aircraft.warnings > 0 && aircraft.warningDetails ? <div className="space-y-4">
                      {aircraft.warningDetails.map((warning: any) => <div key={warning.id} className="p-4 border-2 border-warning/30 rounded-lg bg-warning/5">
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
                        </div>)}
                    </div> : <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-foreground mb-1">All Systems Nominal</p>
                      <p className="text-sm text-muted-foreground">No active warnings or critical issues detected</p>
                    </div>}
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
                  {systemsData.map(system => <Collapsible key={system.name} className="border border-border/50 rounded-lg">
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
                          <Progress value={system.healthy / system.total * 100} className="h-2" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 pb-4 pt-2 space-y-2 bg-muted/20">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">COMPONENT DETAILS</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {system.components.map((component: any, idx: number) => <div key={idx} className={`flex items-center justify-between p-2 rounded border ${component.status === 'operational' ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                                <span className="text-xs text-foreground">{component.name}</span>
                                <Badge variant={component.status === 'operational' ? 'outline' : 'secondary'} className={`text-xs ${component.status === 'operational' ? 'text-green-500 border-green-500' : 'text-yellow-500 border-yellow-500'}`}>
                                  {component.status === 'operational' ? 'OK' : 'MAINT'}
                                </Badge>
                              </div>)}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>)}
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
                  {recentFlights.map((flight, index) => <div 
                      key={index} 
                      onClick={() => setSelectedFlight(flight)}
                      className="p-4 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
                    >
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
                        <span>Distance: {flight.distance}</span>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flight Detail Modal */}
          <Dialog open={!!selectedFlight} onOpenChange={() => setSelectedFlight(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Plane className="h-6 w-6 text-primary" />
                  Flight Details
                </DialogTitle>
                <DialogDescription>
                  Complete flight record and operational data
                </DialogDescription>
              </DialogHeader>

              {selectedFlight && <div className="space-y-6 mt-4">
                  {/* Flight Header */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Flight Number</p>
                      <p className="font-bold text-foreground text-lg">{selectedFlight.flightNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge variant="outline" className="text-green-500 border-green-500">{selectedFlight.status}</Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Route</p>
                      <p className="font-semibold text-foreground">
                        {selectedFlight.fromFull} ({selectedFlight.from}) → {selectedFlight.toFull} ({selectedFlight.to})
                      </p>
                    </div>
                  </div>

                  {/* Flight Times */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Schedule & Timing
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p className="font-semibold text-foreground">{selectedFlight.date}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="font-semibold text-foreground">{selectedFlight.duration}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Departure</p>
                        <p className="font-semibold text-foreground">{selectedFlight.departureTime}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Arrival</p>
                        <p className="font-semibold text-foreground">{selectedFlight.arrivalTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Performance */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-primary" />
                      Flight Performance
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="font-semibold text-foreground">{selectedFlight.distance}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Max Altitude</p>
                        <p className="font-semibold text-foreground">{selectedFlight.maxAltitude}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Avg Speed</p>
                        <p className="font-semibold text-foreground">{selectedFlight.avgSpeed}</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">Fuel Used</p>
                        <p className="font-semibold text-foreground">{selectedFlight.fuelUsed}</p>
                      </div>
                    </div>
                  </div>

                  {/* Crew & Passengers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Flight Crew
                      </h4>
                      <div className="space-y-2 p-3 bg-muted/20 rounded border border-border/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Captain:</span>
                          <span className="font-medium text-foreground">{selectedFlight.captain}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">First Officer:</span>
                          <span className="font-medium text-foreground">{selectedFlight.firstOfficer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Crew:</span>
                          <span className="font-medium text-foreground">{selectedFlight.crew} members</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Passengers & Cargo
                      </h4>
                      <div className="space-y-2 p-3 bg-muted/20 rounded border border-border/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Passengers:</span>
                          <span className="font-medium text-foreground">{selectedFlight.passengers} pax</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cargo Weight:</span>
                          <span className="font-medium text-foreground">{selectedFlight.cargoWeight}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather & Conditions */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CloudRain className="h-4 w-4 text-primary" />
                      Weather & Conditions
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/20 rounded border border-border/30">
                      {selectedFlight.weather}
                    </p>
                  </div>

                  {/* Delays */}
                  {selectedFlight.delayReason && <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        Delay Information
                      </h4>
                      <p className="text-sm text-muted-foreground p-3 bg-warning/10 rounded border border-warning/30">
                        {selectedFlight.delayReason}
                      </p>
                    </div>}

                  {/* Incidents */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Incidents & Reports
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/20 rounded border border-border/30">
                      {selectedFlight.incidents}
                    </p>
                  </div>

                  {/* Remarks */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-primary" />
                      Flight Remarks
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/20 rounded border border-border/30">
                      {selectedFlight.remarks}
                    </p>
                  </div>
                </div>}
            </DialogContent>
          </Dialog>

          <TabsContent value="maintenance">
            <Card className="bg-card/40 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Maintenance History
                    </CardTitle>
                    <CardDescription>Blockchain-secured maintenance activities and checks (Click for details)</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-2 text-green-500 border-green-500">
                    <Lock className="h-3 w-3" />
                    Blockchain Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceHistory.map((entry, index) => <div key={index} onClick={() => setSelectedMaintenance(entry)} className="p-4 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Wrench className="h-4 w-4 text-primary" />
                            <span className="font-bold text-foreground">{entry.type}</span>
                            <Badge variant="outline" className="text-xs">{entry.id}</Badge>
                            <Badge variant="outline" className="text-xs gap-1 text-green-500 border-green-500/50">
                              <Shield className="h-2.5 w-2.5" />
                              Secured
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{entry.description}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground mt-2">
                        <span>Technician: {entry.technician}</span>
                        <span>Duration: {entry.duration}</span>
                      </div>
                    </div>)}
                </div>
                
                {/* Blockchain Security Notice */}
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Blockchain Security Enabled</p>
                      <p className="text-xs text-muted-foreground">
                        All maintenance records are cryptographically secured on the blockchain, ensuring 
                        complete traceability, immutability, and tamper-proof verification of all maintenance 
                        activities performed on this aircraft.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Detail Modal */}
          <Dialog open={!!selectedMaintenance} onOpenChange={() => setSelectedMaintenance(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  Maintenance Log Details
                  <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500 ml-auto">
                    <Shield className="h-3 w-3" />
                    Blockchain Verified
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Complete maintenance record and documentation • Secured on blockchain
                </DialogDescription>
              </DialogHeader>

              {selectedMaintenance && <div className="space-y-6 mt-4">
                  {/* Blockchain Verification Badge */}
                  <div className="border-2 border-green-500/30 bg-green-500/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-full">
                        <Lock className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground flex items-center gap-2 mb-1">
                          Blockchain Security Verification
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          This maintenance record has been cryptographically secured and verified on the blockchain. 
                          The immutable record ensures complete traceability and authenticity of all maintenance activities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Blockchain Hash</p>
                        <p className="font-mono text-foreground text-[10px] break-all">{selectedMaintenance.blockchainHash}</p>
                      </div>
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Block Number</p>
                        <p className="font-semibold text-foreground">{selectedMaintenance.blockNumber}</p>
                      </div>
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Timestamp</p>
                        <p className="font-semibold text-foreground">{selectedMaintenance.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Header Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Maintenance ID</p>
                      <p className="font-semibold text-foreground">{selectedMaintenance.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <Badge variant="secondary" className="font-semibold">{selectedMaintenance.type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-semibold text-foreground">{selectedMaintenance.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge variant="outline" className="text-green-500 border-green-500">{selectedMaintenance.status}</Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Description
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/20 rounded border border-border/30">
                      {selectedMaintenance.description}
                    </p>
                  </div>

                  {/* Findings */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      Findings & Actions
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/20 rounded border border-border/30">
                      {selectedMaintenance.findings}
                    </p>
                  </div>

                  {/* Personnel & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Personnel
                      </h4>
                      <div className="space-y-2 p-3 bg-muted/20 rounded border border-border/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lead Technician:</span>
                          <span className="font-medium text-foreground">{selectedMaintenance.technician}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sign-off By:</span>
                          <span className="font-medium text-foreground">{selectedMaintenance.signOffBy}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Certification:</span>
                          <Badge variant="outline" className="text-xs">{selectedMaintenance.certification}</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Location & Duration
                      </h4>
                      <div className="space-y-2 p-3 bg-muted/20 rounded border border-border/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium text-foreground">{selectedMaintenance.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium text-foreground">{selectedMaintenance.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Work Orders */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Work Orders
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMaintenance.workOrders.map((wo, idx) => <Badge key={idx} variant="secondary">{wo}</Badge>)}
                    </div>
                  </div>

                  {/* Parts Replaced */}
                  {selectedMaintenance.partsReplaced.length > 0 && <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Settings className="h-4 w-4 text-primary" />
                        Parts Replaced
                      </h4>
                      <div className="space-y-2">
                        {selectedMaintenance.partsReplaced.map((part, idx) => <div key={idx} className="p-2 bg-muted/20 rounded border border-border/30 text-sm text-foreground">
                            • {part}
                          </div>)}
                      </div>
                    </div>}
                </div>}
            </DialogContent>
          </Dialog>

          <TabsContent value="documents">
            <Card className="bg-card/40 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Aircraft Documentation
                    </CardTitle>
                    <CardDescription>Blockchain-secured certifications, manuals, and compliance documents</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-2 text-green-500 border-green-500">
                    <Lock className="h-3 w-3" />
                    Blockchain Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aircraftDocuments.map((doc, index) => <div key={index} onClick={() => setSelectedDocument(doc)} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-colors cursor-pointer hover:bg-muted/30 relative">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <Badge variant="outline" className="text-xs gap-1 text-green-500 border-green-500/50">
                              <Shield className="h-2.5 w-2.5" />
                              Secured
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.type}</Badge>
                    </div>)}
                </div>
                
                {/* Blockchain Security Notice */}
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Blockchain Security Enabled</p>
                      <p className="text-xs text-muted-foreground">
                        All documents are cryptographically secured on the blockchain, ensuring immutability, 
                        tamper-proof verification, and complete audit trail. Each document has a unique hash 
                        stored on-chain for authenticity verification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Viewer Modal */}
          <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  {selectedDocument?.name}
                  <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500 ml-auto">
                    <Shield className="h-3 w-3" />
                    Blockchain Verified
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Official aircraft documentation • Secured on blockchain
                </DialogDescription>
              </DialogHeader>

              {selectedDocument && <div className="space-y-6 mt-4">
                  {/* Blockchain Verification Badge */}
                  <div className="border-2 border-green-500/30 bg-green-500/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-full">
                        <Lock className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground flex items-center gap-2 mb-1">
                          Blockchain Security Verification
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          This document has been cryptographically secured and verified on the blockchain. 
                          The document hash ensures complete immutability and authenticity.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Blockchain Hash</p>
                        <p className="font-mono text-foreground text-[10px] break-all">{selectedDocument.blockchainHash}</p>
                      </div>
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Block Number</p>
                        <p className="font-semibold text-foreground">{selectedDocument.blockNumber}</p>
                      </div>
                      <div className="p-2 bg-background/50 rounded border border-border/30">
                        <p className="text-muted-foreground mb-1">Timestamp</p>
                        <p className="font-semibold text-foreground">{selectedDocument.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Header */}
                  <div className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Document Type</p>
                        <Badge variant="secondary" className="text-sm">{selectedDocument.type}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Certificate Number</p>
                        <p className="font-mono text-sm font-semibold text-foreground">{selectedDocument.certificateNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Issued By</p>
                        <p className="text-sm font-medium text-foreground">{selectedDocument.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Validity</p>
                        <p className="text-sm font-medium text-foreground">{selectedDocument.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="bg-white text-gray-900 p-8 rounded-lg shadow-inner border-2 border-border/30 min-h-[400px]">
                    {/* Document Header */}
                    <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
                      <div className="mb-2">
                        <Plane className="h-12 w-12 mx-auto text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDocument.name}</h2>
                      <p className="text-sm text-gray-600">{selectedDocument.issuedBy}</p>
                      <p className="text-xs text-gray-500 mt-1">Certificate No: {selectedDocument.certificateNumber}</p>
                    </div>

                    {/* Aircraft Information */}
                    <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Aircraft Information</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Registration:</span>
                          <span className="font-semibold text-gray-900 ml-2">{aircraft.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="font-semibold text-gray-900 ml-2">{aircraft.model}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Serial Number:</span>
                          <span className="font-semibold text-gray-900 ml-2">{aircraft.serialNumber}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Operator:</span>
                          <span className="font-semibold text-gray-900 ml-2">Emirates Airline</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Body */}
                    <div className="mb-8">
                      <p className="text-gray-800 leading-relaxed text-justify">
                        {selectedDocument.content}
                      </p>
                    </div>

                    {/* Signature Section */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-300">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-xs text-gray-600 mb-3">Issue Date</p>
                          <p className="font-semibold text-gray-900">{selectedDocument.date.split(' ')[1] || selectedDocument.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-3">Authorized Signature</p>
                          <div className="border-b-2 border-gray-400 pb-1 mb-1">
                            <p className="font-signature text-2xl text-gray-700 italic">Authorized Officer</p>
                          </div>
                          <p className="text-xs text-gray-600">{selectedDocument.issuedBy}</p>
                        </div>
                      </div>
                    </div>

                    {/* Document Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <p className="text-xs font-semibold text-green-600">BLOCKCHAIN VERIFIED DOCUMENT</p>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        This is an official document secured on the blockchain. Any alteration or unauthorized reproduction is prohibited.
                      </p>
                      <p className="text-xs text-gray-400 mt-2 text-center">
                        Document ID: {selectedDocument.certificateNumber} | Blockchain Hash: {selectedDocument.blockchainHash.slice(0, 20)}...
                      </p>
                      <p className="text-xs text-gray-400 text-center">
                        Block: {selectedDocument.blockNumber} | Verified: {selectedDocument.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Document Actions */}
                  <div className="flex gap-3 justify-between items-center">
                    <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500">
                      <CheckCircle className="h-3 w-3" />
                      Verified on Blockchain
                    </Badge>
                    <div className="flex gap-3">
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <FileText className="h-3 w-3 mr-1" />
                        Download PDF
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        Print Document
                      </Badge>
                    </div>
                  </div>
                </div>}
            </DialogContent>
          </Dialog>

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
    </div>;
};
export default AircraftDetail;