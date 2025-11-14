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
    const { action, query, modelEndpoint, inputData } = await req.json();
    
    let DATABRICKS_HOST_RAW = Deno.env.get('DATABRICKS_HOST') ?? '';
    const DATABRICKS_TOKEN = Deno.env.get('DATABRICKS_TOKEN');
    const DATABRICKS_SQL_WAREHOUSE_ID = Deno.env.get('DATABRICKS_SQL_WAREHOUSE_ID');

    const hostTrimmed = DATABRICKS_HOST_RAW.trim().replace(/\/+$/, '');
    if (!hostTrimmed || !DATABRICKS_TOKEN) {
      throw new Error('Databricks credentials not configured');
    }

    let DATABRICKS_HOST = hostTrimmed;
    // Ensure DATABRICKS_HOST has https:// protocol
    if (!DATABRICKS_HOST.startsWith('http://') && !DATABRICKS_HOST.startsWith('https://')) {
      DATABRICKS_HOST = `https://${DATABRICKS_HOST}`;
    }

    console.log(`Databricks action: ${action}`);

    // Handle SQL Query
    if (action === 'query') {
      if (!query) {
        throw new Error('Query is required for action: query');
      }
      
      if (!DATABRICKS_SQL_WAREHOUSE_ID) {
        throw new Error('SQL Warehouse ID not configured');
      }

      // Execute SQL statement
      const executeResponse = await fetch(
        `${DATABRICKS_HOST}/api/2.0/sql/statements`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            warehouse_id: DATABRICKS_SQL_WAREHOUSE_ID,
            statement: query,
            wait_timeout: '30s',
          }),
        }
      );

      if (!executeResponse.ok) {
        const errorText = await executeResponse.text();
        console.error('Databricks SQL error:', errorText);
        throw new Error(`Databricks SQL query failed: ${executeResponse.status}`);
      }

      const result = await executeResponse.json();
      console.log('Query executed successfully');

      return new Response(JSON.stringify({ 
        success: true, 
        data: result 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle ML Model Prediction
    if (action === 'predict') {
      if (!modelEndpoint || !inputData) {
        throw new Error('modelEndpoint and inputData are required for action: predict');
      }

      // Call ML model serving endpoint
      const endpoint = modelEndpoint.startsWith('http://') || modelEndpoint.startsWith('https://')
        ? modelEndpoint
        : `${DATABRICKS_HOST}${modelEndpoint.startsWith('/') ? modelEndpoint : '/' + modelEndpoint}`;

      const predictResponse = await fetch(
        endpoint,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        }
      );

      if (!predictResponse.ok) {
        const errorText = await predictResponse.text();
        console.error('Databricks ML prediction error:', errorText);
        throw new Error(`ML prediction failed: ${predictResponse.status}`);
      }

      const prediction = await predictResponse.json();
      console.log('Prediction completed successfully');

      return new Response(JSON.stringify({ 
        success: true, 
        prediction 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Unknown action: ${action}`);

  } catch (error) {
    console.error('Error in databricks function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
