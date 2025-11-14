import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plane, AlertTriangle, CheckCircle, Clock, TrendingUp, Wrench, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChatBot } from "@/components/ChatBot";
import a350Image from "@/assets/a350.jpg";
import a380Image from "@/assets/a380.jpg";
import boeing777_300Image from "@/assets/777-300er.jpeg";
import boeing777_200Image from "@/assets/777-200lr.avif";

// Analytics data
const fleetAgeData = [
  { year: "2019", age: 3.2 },
  { year: "2020", age: 4.1 },
  { year: "2021", age: 4.8 },
  { year: "2022", age: 5.3 },
  { year: "2023", age: 5.9 },
  { year: "2024", age: 6.2 },
];

const maintenanceCostData = [
  { month: "Jul", cost: 2.4 },
  { month: "Aug", cost: 2.8 },
  { month: "Sep", cost: 2.2 },
  { month: "Oct", cost: 3.1 },
  { month: "Nov", cost: 2.6 },
  { month: "Dec", cost: 3.4 },
  { month: "Jan", cost: 2.9 },
];

const incidentData = [
  { year: "2019", incidents: 3 },
  { year: "2020", incidents: 5 },
  { year: "2021", incidents: 2 },
  { year: "2022", incidents: 4 },
  { year: "2023", incidents: 1 },
  { year: "2024", incidents: 2 },
];

const chartConfig = {
  age: {
    label: "Avg Age (years)",
    color: "hsl(var(--chart-2))",
  },
  cost: {
    label: "Cost ($M)",
    color: "hsl(var(--chart-1))",
  },
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-3))",
  },
};

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
  // Calculate fleet statistics
  const totalAircraft = fleetData.length;
  const operationalCount = fleetData.filter(a => a.status === "operational").length;
  const maintenanceCount = fleetData.filter(a => a.status === "maintenance").length;
  const scheduledCount = fleetData.filter(a => a.status === "scheduled").length;
  const totalWarnings = fleetData.reduce((sum, a) => sum + a.warnings, 0);
  const totalFlightHours = fleetData.reduce((sum, a) => sum + a.flightHours, 0);
  const avgFlightHours = Math.round(totalFlightHours / totalAircraft);
  
  // Count by model
  const modelCounts: Record<string, number> = {};
  fleetData.forEach(aircraft => {
    modelCounts[aircraft.model] = (modelCounts[aircraft.model] || 0) + 1;
  });

  // Get all aircraft with warnings
  const aircraftWithWarnings = fleetData.filter(a => a.warnings > 0);

  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/images/background.jpeg)' }}>
      <div className="min-h-screen bg-background/50">
        <Header />
        <ChatBot pageContext={{
          pageName: "Fleet Overview Dashboard",
          data: {
            totalAircraft: fleetData.length,
            operationalAircraft: fleetData.filter(a => a.status === "operational").length,
            inMaintenance: fleetData.filter(a => a.status === "maintenance").length,
            scheduled: fleetData.filter(a => a.status === "scheduled").length,
            totalWarnings: fleetData.reduce((sum, a) => sum + a.warnings, 0),
            aircraftWithWarnings: aircraftWithWarnings.length,
            fleet: fleetData.map(a => ({
              id: a.id,
              model: a.model,
              status: a.status,
              location: a.location,
              nextMaintenance: a.nextMaintenance,
              flightHours: a.flightHours,
              warnings: a.warnings
            }))
          }
        }} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Fleet Overview Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring and analytics for your entire aircraft fleet</p>
        </div>

        {/* Active Warnings Section */}
        {aircraftWithWarnings.length > 0 && (
          <Card className="mb-8 bg-destructive/20 backdrop-blur-lg border-destructive/50 shadow-lg shadow-destructive/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-warning" />
                <CardTitle className="text-2xl">Active Warnings</CardTitle>
                <Badge variant="destructive" className="ml-2">
                  {totalWarnings} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aircraftWithWarnings.map((aircraft) => (
                  <Link key={aircraft.id} to={`/aircraft/${aircraft.id}`}>
                    <div className="flex items-center gap-4 p-4 bg-destructive/10 backdrop-blur-sm border border-destructive/40 rounded-lg hover:border-destructive/60 hover:bg-destructive/20 transition-all cursor-pointer group">
                      <div className="flex items-center justify-center w-10 h-10 bg-destructive/30 rounded-lg group-hover:bg-destructive/40 transition-colors">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-foreground">{aircraft.id}</h4>
                          <Badge variant="outline" className="text-warning border-warning">
                            {aircraft.warnings} Warning{aircraft.warnings > 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{aircraft.model}</span>
                          <span>•</span>
                          <span>{aircraft.location}</span>
                          <span>•</span>
                          <span>{aircraft.flightHours.toLocaleString()} hrs</span>
                        </div>
                      </div>
                      
                      <div>
                        {getStatusBadge(aircraft.status)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="aircraft" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="aircraft">All Aircraft</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="aircraft" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">All Aircraft</h3>
              <p className="text-muted-foreground">Click for details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {fleetData.map((aircraft) => (
                <Link key={aircraft.id} to={`/aircraft/${aircraft.id}`}>
                  <Card interactive className="overflow-hidden bg-card/30 backdrop-blur-lg border-border/30 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg h-full">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={aircraft.image} 
                        alt={`${aircraft.model} - ${aircraft.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-primary" />
                          <h3 className="font-bold text-foreground">{aircraft.id}</h3>
                        </div>
                        {getStatusIcon(aircraft.status)}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{aircraft.model}</p>
                          <p className="text-xs text-muted-foreground">{aircraft.location}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(aircraft.status)}
                          {aircraft.warnings > 0 && (
                            <Badge variant="outline" className="text-warning border-warning">
                              {aircraft.warnings} Warning{aircraft.warnings > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/50">
                          <div>
                            <span className="text-muted-foreground">Hours</span>
                            <p className="font-medium text-foreground">{aircraft.flightHours.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Maint.</span>
                            <p className="font-medium text-foreground text-xs">{aircraft.nextMaintenance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Total Aircraft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalAircraft}</div>
              <p className="text-xs text-muted-foreground mt-1">Active fleet units</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Operational Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{operationalCount}</div>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="text-muted-foreground">Maintenance: <span className="text-destructive font-semibold">{maintenanceCount}</span></span>
                <span className="text-muted-foreground">Scheduled: <span className="text-blue-500 font-semibold">{scheduledCount}</span></span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Flight Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalFlightHours.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Avg: {avgFlightHours.toLocaleString()} hrs/aircraft</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalWarnings > 0 ? 'text-warning' : 'text-green-500'}`}>
                {totalWarnings}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalWarnings === 0 ? 'All systems nominal' : 'Requires attention'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard with Tabs */}
        <Card className="bg-card/30 backdrop-blur-lg border-border/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Fleet Analytics Dashboard
            </CardTitle>
            <CardDescription>Comprehensive insights and trends analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="age">Fleet Age</TabsTrigger>
                <TabsTrigger value="costs">Maintenance Costs</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
              </TabsList>

              <TabsContent value="age" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Average Fleet Age Over Time</h4>
                  <p className="text-xs text-muted-foreground">Tracking the average age of aircraft in the fleet</p>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fleetAgeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        label={{ value: 'Years', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="age" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>

              <TabsContent value="costs" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Maintenance Cost Trends</h4>
                  <p className="text-xs text-muted-foreground">Monthly maintenance expenditure across the fleet</p>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={maintenanceCostData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        label={{ value: 'Cost ($M)', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="cost" 
                        fill="hsl(var(--chart-1))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>

              <TabsContent value="incidents" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Incidents Per Year</h4>
                  <p className="text-xs text-muted-foreground">Historical incident tracking and safety trends</p>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incidentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="incidents" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Fleet Composition and Maintenance Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Fleet Composition
              </CardTitle>
              <CardDescription>Aircraft breakdown by model type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(modelCounts).map(([model, count]) => (
                <div key={model} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{model}</span>
                    <span className="text-sm text-muted-foreground">{count} aircraft</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(count / totalAircraft) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Upcoming Maintenance
              </CardTitle>
              <CardDescription>Next scheduled maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fleetData
                  .filter(a => a.nextMaintenance !== "In Progress")
                  .sort((a, b) => new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime())
                  .slice(0, 5)
                  .map((aircraft) => (
                    <Link 
                      key={aircraft.id} 
                      to={`/aircraft/${aircraft.id}`}
                      className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Plane className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{aircraft.id}</p>
                          <p className="text-xs text-muted-foreground">{aircraft.model}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{aircraft.nextMaintenance}</p>
                        <Badge variant="outline" className="text-xs">{aircraft.location}</Badge>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/30 backdrop-blur-lg border-green-500/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Operational
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500 mb-4">{operationalCount}</div>
              <div className="space-y-1">
                {fleetData.filter(a => a.status === "operational").map(a => (
                  <Link key={a.id} to={`/aircraft/${a.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {a.id} - {a.location}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-destructive/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-destructive" />
                In Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-destructive mb-4">{maintenanceCount}</div>
              <div className="space-y-1">
                {fleetData.filter(a => a.status === "maintenance").map(a => (
                  <Link key={a.id} to={`/aircraft/${a.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {a.id} - {a.warnings} warning{a.warnings !== 1 ? 's' : ''}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-lg border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500 mb-4">{scheduledCount}</div>
              <div className="space-y-1">
                {fleetData.filter(a => a.status === "scheduled").map(a => (
                  <Link key={a.id} to={`/aircraft/${a.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {a.id} - {a.nextMaintenance}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </div>
  );
};

export default Fleet;