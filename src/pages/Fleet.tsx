import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plane, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import a350Image from "@/assets/a350.jpg";
import a380Image from "@/assets/a380.jpg";
import boeing777_300Image from "@/assets/777-300er.jpeg";
import boeing777_200Image from "@/assets/777-200lr.avif";

const fleetData = [
  {
    id: "A6-EDA",
    model: "Airbus A350-900",
    status: "operational",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-02-15",
    flightHours: 8420,
    warnings: 0,
    image: a350Image,
  },
  {
    id: "A6-EDB",
    model: "Airbus A350-900",
    status: "maintenance",
    location: "Emirates Engineering",
    nextMaintenance: "In Progress",
    flightHours: 9150,
    warnings: 2,
    image: a350Image,
  },
  {
    id: "A6-EPF",
    model: "Airbus A380-800",
    status: "operational",
    location: "Heathrow (LHR)",
    nextMaintenance: "2024-01-20",
    flightHours: 12300,
    warnings: 0,
    image: a380Image,
  },
  {
    id: "A6-EUV",
    model: "Boeing 777-300ER",
    status: "operational",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-02-01",
    flightHours: 15200,
    warnings: 1,
    image: boeing777_300Image,
  },
  {
    id: "A6-EWE",
    model: "Boeing 777-200LR",
    status: "scheduled",
    location: "Dubai International (DXB)",
    nextMaintenance: "2024-01-18",
    flightHours: 18500,
    warnings: 0,
    image: boeing777_200Image,
  },
  {
    id: "A6-EDC",
    model: "Airbus A350-900",
    status: "operational",
    location: "JFK International (JFK)",
    nextMaintenance: "2024-02-10",
    flightHours: 7800,
    warnings: 0,
    image: a350Image,
  },
  {
    id: "A6-EPG",
    model: "Airbus A380-800",
    status: "operational",
    location: "Singapore (SIN)",
    nextMaintenance: "2024-01-25",
    flightHours: 13400,
    warnings: 0,
    image: a380Image,
  },
  {
    id: "A6-EUW",
    model: "Boeing 777-300ER",
    status: "scheduled",
    location: "Emirates Engineering",
    nextMaintenance: "2024-01-17",
    flightHours: 16100,
    warnings: 1,
    image: boeing777_300Image,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "maintenance":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "scheduled":
      return <Clock className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    operational: "default",
    maintenance: "destructive",
    scheduled: "secondary",
  };
  return (
    <Badge variant={variants[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
};

const Fleet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Fleet Overview</h2>
          <p className="text-muted-foreground">Monitor and manage your entire aircraft fleet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fleetData.map((aircraft) => (
            <Link key={aircraft.id} to={`/aircraft/${aircraft.id}`}>
              <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={aircraft.image} 
                    alt={`${aircraft.model} - ${aircraft.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Plane className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-lg text-foreground">{aircraft.id}</h3>
                    </div>
                    {getStatusIcon(aircraft.status)}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{aircraft.model}</p>
                      <p className="text-xs text-muted-foreground">{aircraft.location}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {getStatusBadge(aircraft.status)}
                      {aircraft.warnings > 0 && (
                        <Badge variant="outline" className="text-warning border-warning">
                          {aircraft.warnings} Warning{aircraft.warnings > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border/50">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Flight Hours</span>
                        <span className="font-medium text-foreground">{aircraft.flightHours.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Next Maintenance</span>
                        <span className="font-medium text-foreground">{aircraft.nextMaintenance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Fleet;