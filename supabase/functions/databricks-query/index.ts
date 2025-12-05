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
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: "SQL query is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const DATABRICKS_HOST = Deno.env.get('DATABRICKS_HOST');
    const DATABRICKS_TOKEN = Deno.env.get('DATABRICKS_TOKEN');
    const DATABRICKS_SQL_WAREHOUSE_ID = Deno.env.get('DATABRICKS_SQL_WAREHOUSE_ID');

    if (!DATABRICKS_HOST || !DATABRICKS_TOKEN || !DATABRICKS_SQL_WAREHOUSE_ID) {
      console.error("Missing Databricks credentials");
      return new Response(
        JSON.stringify({ success: false, error: "Databricks credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Executing SQL query:", query);

    // Call Databricks SQL Statement Execution API
    const statementUrl = `https://${DATABRICKS_HOST}/api/2.0/sql/statements`;
    
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
    console.error("Error executing query:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
