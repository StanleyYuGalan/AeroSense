import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Database, Brain, Loader2 } from "lucide-react";

const DATABRICKS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/databricks`;

export const DatabricksExample = () => {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM aircraft_maintenance LIMIT 10");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Example: Query data from Databricks SQL Warehouse
  const handleQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch(DATABRICKS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          action: "query",
          query: sqlQuery,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setQueryResult(result.data);
        toast.success("Query executed successfully!");
      } else {
        toast.error(`Query failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Query error:", error);
      toast.error("Failed to execute query");
    } finally {
      setLoading(false);
    }
  };

  // Example: Get ML model prediction
  const handlePredict = async () => {
    setLoading(true);
    try {
      // Example input data for aircraft maintenance prediction
      const inputData = {
        dataframe_records: [
          {
            flight_hours: 9150,
            cycles: 2380,
            last_maintenance_days: 15,
            temperature: 896,
            vibration: 2.1,
          },
        ],
      };

      const response = await fetch(DATABRICKS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          action: "predict",
          modelEndpoint: "/serving-endpoints/aircraft-maintenance-model/invocations",
          inputData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setPredictionResult(result.prediction);
        toast.success("Prediction completed!");
      } else {
        toast.error(`Prediction failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* SQL Query Section */}
      <Card className="bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Databricks SQL Query
          </CardTitle>
          <CardDescription>
            Query data from your Databricks SQL Warehouse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            placeholder="Enter SQL query..."
            className="font-mono text-sm"
            rows={4}
          />
          <Button onClick={handleQuery} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Execute Query
              </>
            )}
          </Button>
          {queryResult && (
            <div className="mt-4 p-4 bg-background/50 rounded-lg border">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(queryResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ML Prediction Section */}
      <Card className="bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            ML Model Prediction
          </CardTitle>
          <CardDescription>
            Get predictions from your Databricks ML model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handlePredict} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Get Prediction
              </>
            )}
          </Button>
          {predictionResult && (
            <div className="mt-4 p-4 bg-background/50 rounded-lg border">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(predictionResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
