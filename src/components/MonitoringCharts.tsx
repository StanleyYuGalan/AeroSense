import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const temperatureData = [
  { segment: 1, egt: 850, baseline: 850, warning: 890 },
  { segment: 2, egt: 852, baseline: 850, warning: 890 },
  { segment: 3, egt: 855, baseline: 850, warning: 890 },
  { segment: 4, egt: 858, baseline: 850, warning: 890 },
  { segment: 5, egt: 862, baseline: 850, warning: 890 },
  { segment: 6, egt: 867, baseline: 850, warning: 890 },
  { segment: 7, egt: 873, baseline: 850, warning: 890 },
  { segment: 8, egt: 881, baseline: 850, warning: 890 },
  { segment: 9, egt: 888, baseline: 850, warning: 890 },
  { segment: 10, egt: 896, baseline: 850, warning: 890 },
];

const vibrationData = [
  { segment: 1, vibration: 1.2, advisory: 1.8 },
  { segment: 2, vibration: 1.25, advisory: 1.8 },
  { segment: 3, vibration: 1.3, advisory: 1.8 },
  { segment: 4, vibration: 1.35, advisory: 1.8 },
  { segment: 5, vibration: 1.4, advisory: 1.8 },
  { segment: 6, vibration: 1.5, advisory: 1.8 },
  { segment: 7, vibration: 1.6, advisory: 1.8 },
  { segment: 8, vibration: 1.75, advisory: 1.8 },
  { segment: 9, vibration: 1.9, advisory: 1.8 },
  { segment: 10, vibration: 2.1, advisory: 1.8 },
];

export const MonitoringCharts = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-background/40 p-4 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Exhaust Gas Temperature (°C)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="segment"
              label={{ value: "Flight Segment", position: "insideBottom", offset: -5 }}
              stroke="hsl(var(--foreground))"
            />
            <YAxis
              domain={[840, 900]}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <ReferenceLine
              y={890}
              stroke="hsl(var(--destructive))"
              strokeDasharray="5 5"
              label={{ value: "Warning", fill: "hsl(var(--destructive))" }}
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              name="Expected Baseline"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="egt"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="EGT"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-background/40 p-4 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Engine Vibration (ips)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={vibrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="segment"
              label={{ value: "Flight Segment", position: "insideBottom", offset: -5 }}
              stroke="hsl(var(--foreground))"
            />
            <YAxis
              domain={[1.0, 2.2]}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <ReferenceLine
              y={1.8}
              stroke="hsl(var(--destructive))"
              strokeDasharray="5 5"
              label={{ value: "Advisory Limit", fill: "hsl(var(--destructive))" }}
            />
            <Line
              type="monotone"
              dataKey="vibration"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Vibration"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
