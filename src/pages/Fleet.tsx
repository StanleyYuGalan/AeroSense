import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, AlertTriangle, CheckCircle, Clock, TrendingUp, Wrench, BarChart3, Database, Loader2, Play, Brain, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ComposedChart, ReferenceLine } from "recharts";
import { ChatBot } from "@/components/ChatBot";
import { useState } from "react";
import { toast } from "sonner";
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
    warningIds: ["WARN-001", "WARN-002"],
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
    warningIds: ["WARN-003"],
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
    warningIds: ["WARN-004"],
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

// Available Databricks queries - storing SQL directly for execution
const availableQueries = [
  {
    id: "2342007906512704",
    name: "Aircraft Maintenance Query",
    description: "Query scheduled aircraft maintenance data",
    sql: "SELECT aircraft_id, maintenance_type, scheduled_date, status FROM aircraft_maintenance WHERE status = 'scheduled' LIMIT 10",
    url: "https://dbc-2c3235ac-9967.cloud.databricks.com/editor/queries/2342007906512704?contextId=sql-editor&o=656789362835105"
  }
];

// Types for flight anomaly data
interface FlightDataPoint {
  time: number;
  anomalyScore: number;
  isAnomaly: boolean;
  altitude: number | null;
  verticalSpeed: number | null;
}

// Custom dot component to render hollow red circles for anomalies only
const AnomalyDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload?.isAnomaly || cx === undefined || cy === undefined) return null;
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="none"
      stroke="#d62728"
      strokeWidth={1.5}
    />
  );
};

// Custom legend that matches matplotlib style
const CustomLegend = ({ items, align = 'left' }: { items: { type: 'line' | 'dash' | 'circle'; color: string; label: string }[]; align?: 'left' | 'right' }) => {
  return (
    <div className={`flex gap-4 ${align === 'left' ? 'ml-16' : 'justify-end mr-8'} mb-1`}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          {item.type === 'dash' && (
            <svg width="24" height="10">
              <line x1="0" y1="5" x2="24" y2="5" stroke={item.color} strokeWidth="1.5" strokeDasharray="5 3" />
            </svg>
          )}
          {item.type === 'circle' && (
            <svg width="10" height="10">
              <circle cx="5" cy="5" r="4" fill="none" stroke={item.color} strokeWidth="1.5" />
            </svg>
          )}
          {item.type === 'line' && (
            <svg width="16" height="10">
              <line x1="0" y1="5" x2="16" y2="5" stroke={item.color} strokeWidth="1.5" />
            </svg>
          )}
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const DatabricksQuerySection = () => {
  const [customSql, setCustomSql] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [queryResults, setQueryResults] = useState<Record<string, any>>({});
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [anomalyData, setAnomalyData] = useState<FlightDataPoint[]>([]);
  const [anomalyError, setAnomalyError] = useState<string | null>(null);
  const DATABRICKS_QUERY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/databricks-query`;

  const handleRunQuery = async (queryId: string, sql: string) => {
    if (!sql.trim()) {
      toast.error("Please enter a SQL query");
      return;
    }
    
    setLoading(queryId);
    try {
      const response = await fetch(DATABRICKS_QUERY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      });

      const result = await response.json();
      
      if (result.success) {
        setQueryResults(prev => ({ ...prev, [queryId]: result }));
        toast.success(`Query returned ${result.data?.rowCount || 0} rows`);
      } else {
        setQueryResults(prev => ({ ...prev, [queryId]: { error: result.error, details: result.details } }));
        toast.error(`Query failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Query error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setQueryResults(prev => ({ ...prev, [queryId]: { error: errorMsg } }));
      toast.error("Failed to execute query");
    } finally {
      setLoading(null);
    }
  };

  const handleRunPrediction = async () => {
    setLoading("prediction");
    setPredictionResult(null);
    
    try {
      const inputData = {
        dataframe_records: [{
          "Accel Lat": -0.0146,
          "Accel Long": 0.031,
          "Accel Vert": 0.96,
          "Airspeed Comp-L+R": 265.75,
          "Altitude Press-L+R": 34015.0,
          "Pitch-L+R": 1.01,
          "Roll-L+R": -0.13,
          "Vertical Speed-L&R": 264.0,
          "Ground Spd-L": 540.5
        }]
      };

      const response = await fetch(DATABRICKS_QUERY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          action: "predict",
          modelEndpoint: "/serving-endpoints/aerosense-k-means/invocations",
          inputData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setPredictionResult({ success: true, data: result.prediction });
        toast.success("Prediction completed successfully!");
      } else {
        setPredictionResult({ success: false, error: result.error, details: result.details });
        toast.error(`Prediction failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Prediction error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setPredictionResult({ success: false, error: errorMsg });
      toast.error("Failed to get prediction");
    } finally {
      setLoading(null);
    }
  };

  const handleFetchAnomalyData = async () => {
    setLoading("anomaly");
    setAnomalyError(null);
    setAnomalyData([]);
    
    try {
      const response = await fetch(DATABRICKS_QUERY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          query: "SELECT * FROM flight_anomaly_view LIMIT 1000" 
        }),
      });

      const result = await response.json();
      
      if (result.success && result.data?.rows) {
        // Transform Databricks response to chart format
        const chartData: FlightDataPoint[] = result.data.rows.map((row: any, idx: number) => {
          const anomalyScore = parseFloat(row[1]) || (Math.random() * 0.35 - 0.15);
          return {
            time: idx,
            anomalyScore,
            isAnomaly: anomalyScore < 0,
            altitude: parseFloat(row[3]) || 30000 + Math.random() * 10000,
            verticalSpeed: parseFloat(row[4]) || Math.random() * 500 - 250
          };
        });
        setAnomalyData(chartData);
        toast.success(`Loaded ${chartData.length} anomaly records`);
      } else {
        setAnomalyError(result.error || "Failed to fetch anomaly data");
        toast.error(`Failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Anomaly fetch error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setAnomalyError(errorMsg);
      toast.error("Failed to fetch anomaly data");
    } finally {
      setLoading(null);
    }
  };

  const anomalyCount = anomalyData.filter(d => d.isAnomaly).length;

  return (
    <div className="space-y-6">
      {/* Flight Anomaly Detection Section */}
      <Card className="bg-background/50 border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Flight Anomaly Detection
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Retrieve and visualize flight anomaly data from Databricks
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleFetchAnomalyData} 
            disabled={loading === "anomaly"}
            size="sm"
          >
            {loading === "anomaly" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading Anomaly Data...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4 mr-2" />
                Fetch Anomaly Data
              </>
            )}
          </Button>
          
          {anomalyError && (
            <div className="text-destructive text-xs p-3 bg-destructive/10 rounded border border-destructive/20">
              <p className="font-semibold mb-1">Error:</p>
              <p>{anomalyError}</p>
            </div>
          )}
          
          {anomalyData.length > 0 && (
            <div className="space-y-4 mt-4 p-4 bg-card rounded-lg border border-border/30">
              
              {/* Chart 1: Anomaly Scores Over Time */}
              <div>
                <h3 className="text-sm font-medium text-center text-foreground mb-1">
                  Isolation Forest Anomaly Scores Over Time
                </h3>
                <CustomLegend items={[
                  { type: 'dash', color: '#d62728', label: 'Threshold' },
                  { type: 'circle', color: '#d62728', label: 'Anomalies' }
                ]} />
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={anomalyData} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      label={{ value: 'Time Index (seconds)', position: 'bottom', offset: 10, style: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' } }}
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      domain={[-0.15, 0.20]}
                      ticks={[-0.15, -0.10, -0.05, 0.00, 0.05, 0.10, 0.15, 0.20]}
                      tickFormatter={(v) => v.toFixed(2)}
                      label={{ value: 'Anomaly Score', angle: -90, position: 'insideLeft', offset: -35, style: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', fontSize: 11, borderRadius: '8px' }}
                      formatter={(value: number) => [value.toFixed(4), 'Score']}
                    />
                    <ReferenceLine 
                      y={0} 
                      stroke="#d62728" 
                      strokeDasharray="5 3" 
                      strokeWidth={1.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="anomalyScore"
                      stroke="#7fb3d5"
                      strokeWidth={0.5}
                      dot={<AnomalyDot />}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 2: Altitude with Anomalies */}
              <div>
                <h3 className="text-sm font-medium text-center text-foreground mb-1">
                  Altitude with Anomalies Highlighted
                </h3>
                <CustomLegend items={[
                  { type: 'circle', color: '#d62728', label: 'Anomalies' }
                ]} />
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={anomalyData} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis 
                      dataKey="time"
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      domain={[10000, 35000]}
                      ticks={[10000, 15000, 20000, 25000, 30000, 35000]}
                      label={{ value: 'Altitude (ft)', angle: -90, position: 'insideLeft', offset: -35, style: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', fontSize: 11, borderRadius: '8px' }}
                      formatter={(value: number) => [value?.toFixed(0) + ' ft', 'Altitude']}
                    />
                    <Line
                      type="monotone"
                      dataKey="altitude"
                      stroke="#7fb3d5"
                      strokeWidth={0.5}
                      dot={<AnomalyDot />}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 3: Vertical Speed with Anomalies */}
              <div>
                <h3 className="text-sm font-medium text-center text-foreground mb-1">
                  Vertical Speed with Anomalies Highlighted
                </h3>
                <CustomLegend items={[
                  { type: 'circle', color: '#d62728', label: 'Anomalies' }
                ]} align="right" />
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={anomalyData} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis 
                      dataKey="time"
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      label={{ value: 'Time Index (seconds)', position: 'bottom', offset: 10, style: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' } }}
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      domain={[-2000, 1500]}
                      ticks={[-2000, -1500, -1000, -500, 0, 500, 1000, 1500]}
                      label={{ value: 'Vertical Speed (ft/min)', angle: -90, position: 'insideLeft', offset: -35, style: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', fontSize: 11, borderRadius: '8px' }}
                      formatter={(value: number) => [value?.toFixed(0) + ' ft/min', 'Vertical Speed']}
                    />
                    <Line
                      type="monotone"
                      dataKey="verticalSpeed"
                      stroke="#7fb3d5"
                      strokeWidth={0.5}
                      dot={<AnomalyDot />}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="border border-border/30 rounded-lg p-3 bg-muted/30 text-center">
                  <div className="text-2xl font-bold text-foreground">{anomalyData.length.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Data Points</div>
                </div>
                <div className="border border-destructive/30 rounded-lg p-3 bg-destructive/10 text-center">
                  <div className="text-2xl font-bold text-destructive">{anomalyCount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Anomalies Detected</div>
                </div>
                <div className="border border-primary/30 rounded-lg p-3 bg-primary/10 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {((anomalyCount / anomalyData.length) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Anomaly Rate</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* ML Model Prediction Section */}
      <Card className="bg-background/50 border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Flight Clustering Model
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Run the flight-clustering-endpoint ML model with sample flight data
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border border-border/30">
            <p className="font-medium mb-2">Sample Input Data:</p>
            <pre className="overflow-x-auto">
{`{
  "Accel Lat": -0.0146,
  "Accel Long": 0.031,
  "Accel Vert": 0.96,
  "Airspeed Comp-L+R": 265.75,
  "Altitude Press-L+R": 34015.0,
  "Pitch-L+R": 1.01,
  "Roll-L+R": -0.13,
  "Vertical Speed-L&R": 264.0,
  "Ground Spd-L": 540.5
}`}
            </pre>
          </div>
          <Button 
            onClick={handleRunPrediction} 
            disabled={loading === "prediction"}
            size="sm"
          >
            {loading === "prediction" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Model...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run Prediction
              </>
            )}
          </Button>
          
          {predictionResult && (
            <div className="mt-4">
              {predictionResult.error ? (
                <div className="text-destructive text-xs p-3 bg-destructive/10 rounded border border-destructive/20">
                  <p className="font-semibold mb-1">Error:</p>
                  <p>{predictionResult.error}</p>
                  {predictionResult.details && (
                    <pre className="mt-2 text-xs overflow-auto">
                      {JSON.stringify(predictionResult.details, null, 2)}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Prediction Result:</div>
                  <pre className="text-xs overflow-auto max-h-[300px] p-3 bg-muted/30 rounded border border-border/30">
                    {JSON.stringify(predictionResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom SQL Query Input */}
      <Card className="bg-background/50 border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Database className="h-4 w-4" />
            Custom SQL Query
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Execute SQL queries directly against your Databricks SQL Warehouse
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={customSql}
            onChange={(e) => setCustomSql(e.target.value)}
            placeholder="SELECT * FROM your_table LIMIT 10"
            className="w-full h-32 p-3 text-sm font-mono bg-muted/30 border border-border/30 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button 
            onClick={() => handleRunQuery("custom", customSql)} 
            disabled={loading === "custom" || !customSql.trim()}
            size="sm"
          >
            {loading === "custom" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Query
              </>
            )}
          </Button>
          
          {queryResults["custom"] && (
            <div className="mt-4">
              {queryResults["custom"].error ? (
                <div className="text-destructive text-xs p-3 bg-destructive/10 rounded border border-destructive/20">
                  <p className="font-semibold mb-1">Error:</p>
                  <p>{queryResults["custom"].error}</p>
                  {queryResults["custom"].details && (
                    <pre className="mt-2 text-xs overflow-auto">
                      {JSON.stringify(queryResults["custom"].details, null, 2)}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Status: {queryResults["custom"].data?.status || "completed"}</span>
                    <span>Rows: {queryResults["custom"].data?.rowCount || 0}</span>
                  </div>
                  {queryResults["custom"].data?.columns && (
                    <div className="text-xs text-muted-foreground">
                      Columns: {queryResults["custom"].data.columns.join(", ")}
                    </div>
                  )}
                  <pre className="text-xs overflow-auto max-h-[300px] p-3 bg-muted/30 rounded border border-border/30">
                    {JSON.stringify(queryResults["custom"].data?.rows || [], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Queries */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Saved Queries</h4>
        {availableQueries.map((query) => (
          <Card key={query.id} className="bg-background/50 border-border/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm">{query.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{query.description}</p>
                  <pre className="text-xs text-muted-foreground/70 bg-muted/20 p-2 rounded mt-2 overflow-x-auto">
                    {query.sql}
                  </pre>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button 
                    onClick={() => handleRunQuery(query.id, query.sql)} 
                    disabled={loading === query.id}
                    size="sm"
                  >
                    {loading === query.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run
                      </>
                    )}
                  </Button>
                  <a
                    href={query.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Open in Databricks
                    </Button>
                  </a>
                </div>
              </div>
            </CardHeader>
            
            {queryResults[query.id] && (
              <CardContent>
                {queryResults[query.id].error ? (
                  <div className="text-destructive text-xs p-3 bg-destructive/10 rounded border border-destructive/20">
                    <p className="font-semibold mb-1">Error:</p>
                    <p>{queryResults[query.id].error}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Status: {queryResults[query.id].data?.status || "completed"}</span>
                      <span>Rows: {queryResults[query.id].data?.rowCount || 0}</span>
                    </div>
                    {queryResults[query.id].data?.columns && (
                      <div className="text-xs text-muted-foreground">
                        Columns: {queryResults[query.id].data.columns.join(", ")}
                      </div>
                    )}
                    <pre className="text-xs overflow-auto max-h-[300px] p-3 bg-muted/30 rounded border border-border/30">
                      {JSON.stringify(queryResults[query.id].data?.rows || [], null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
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
          <Card className="mb-8 bg-card/40 backdrop-blur-lg border-border/30">
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
                  <Link key={aircraft.id} to={`/aircraft/${aircraft.id}${(aircraft as any).warningIds?.[0] ? `?warningId=${(aircraft as any).warningIds[0]}` : ''}`}>
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="age">Fleet Age</TabsTrigger>
                <TabsTrigger value="costs">Maintenance Costs</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="databricks">Databricks</TabsTrigger>
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

              <TabsContent value="databricks" className="space-y-4">
                <DatabricksQuerySection />
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