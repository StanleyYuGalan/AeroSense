import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action, query, modelEndpoint, inputData } = body;

    const DATABRICKS_HOST = Deno.env.get('DATABRICKS_HOST');
    const DATABRICKS_TOKEN = Deno.env.get('DATABRICKS_TOKEN');
    let DATABRICKS_SQL_WAREHOUSE_ID = Deno.env.get('DATABRICKS_SQL_WAREHOUSE_ID');

    if (!DATABRICKS_HOST || !DATABRICKS_TOKEN) {
      console.error("Missing Databricks credentials");
      return new Response(
        JSON.stringify({ success: false, error: "Databricks credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle ML Model Prediction
    if (action === 'predict') {
      if (!modelEndpoint || !inputData) {
        return new Response(
          JSON.stringify({ success: false, error: "Model endpoint and input data are required for predictions" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log("Calling ML model endpoint:", modelEndpoint);
      console.log("Input data:", JSON.stringify(inputData));

      // Clean DATABRICKS_HOST - remove protocol if present
      let cleanHost = DATABRICKS_HOST;
      if (cleanHost.startsWith('https://')) {
        cleanHost = cleanHost.replace('https://', '');
      } else if (cleanHost.startsWith('http://')) {
        cleanHost = cleanHost.replace('http://', '');
      }

      const predictionUrl = `https://${cleanHost}${modelEndpoint}`;
      console.log("Prediction URL:", predictionUrl);

      const predictionResponse = await fetch(predictionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      const predictionData = await predictionResponse.json();
      console.log("Prediction response status:", predictionResponse.status);
      console.log("Prediction data:", JSON.stringify(predictionData));

      if (!predictionResponse.ok) {
        console.error("Databricks ML API error:", JSON.stringify(predictionData));
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: predictionData.message || `Databricks ML API error: ${predictionResponse.status}`,
            details: predictionData
          }),
          { status: predictionResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          prediction: predictionData
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle SQL Query (default action)
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: "SQL query is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!DATABRICKS_SQL_WAREHOUSE_ID) {
      console.error("Missing Databricks SQL Warehouse ID");
      return new Response(
        JSON.stringify({ success: false, error: "Databricks SQL Warehouse ID not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract warehouse ID if a full URL was provided
    if (DATABRICKS_SQL_WAREHOUSE_ID.includes('/')) {
      const match = DATABRICKS_SQL_WAREHOUSE_ID.match(/warehouses\/([a-f0-9]+)/);
      if (match) {
        DATABRICKS_SQL_WAREHOUSE_ID = match[1];
        console.log("Extracted warehouse ID:", DATABRICKS_SQL_WAREHOUSE_ID);
      }
    }

    console.log("Executing SQL query:", query);

    // Clean DATABRICKS_HOST for SQL queries too
    let cleanHost = DATABRICKS_HOST;
    if (cleanHost.startsWith('https://')) {
      cleanHost = cleanHost.replace('https://', '');
    } else if (cleanHost.startsWith('http://')) {
      cleanHost = cleanHost.replace('http://', '');
    }

    // Call Databricks SQL Statement Execution API
    const statementUrl = `https://${cleanHost}/api/2.0/sql/statements`;
    
    const statementResponse = await fetch(statementUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        warehouse_id: DATABRICKS_SQL_WAREHOUSE_ID,
        statement: query,
        wait_timeout: "30s",
        disposition: "INLINE",
        format: "JSON_ARRAY",
      }),
    });

    const statementData = await statementResponse.json();
    console.log("Databricks response status:", statementResponse.status);

    if (!statementResponse.ok) {
      console.error("Databricks API error:", JSON.stringify(statementData));
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: statementData.message || `Databricks API error: ${statementResponse.status}`,
          details: statementData
        }),
        { status: statementResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check statement status
    if (statementData.status?.state === 'FAILED') {
      console.error("Query execution failed:", statementData.status?.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: statementData.status?.error?.message || "Query execution failed",
          details: statementData.status
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract results
    const columns = statementData.manifest?.schema?.columns?.map((col: any) => col.name) || [];
    const rows = statementData.result?.data_array || [];

    console.log(`Query returned ${rows.length} rows with columns:`, columns);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          columns,
          rows,
          rowCount: rows.length,
          statementId: statementData.statement_id,
          status: statementData.status?.state
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
