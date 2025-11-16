import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get ML API URL from environment variable
    const ML_API_URL = Deno.env.get("ML_API_URL");
    if (!ML_API_URL) {
      throw new Error("ML_API_URL not configured. Please add your deployed model API URL.");
    }

    // Fetch the latest sensor data from database
    const { data: latestSensor, error: sensorError } = await supabase
      .from("sensor_data")
      .select("temperature, humidity, air_quality")
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (sensorError || !latestSensor) {
      console.error("Error fetching sensor data:", sensorError);
      throw new Error("Failed to fetch latest sensor data");
    }

    console.log("Latest sensor data:", latestSensor);

    // Call your Python ML model API
    const response = await fetch(`${ML_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: latestSensor.temperature,
        humidity: latestSensor.humidity,
        air_quality: latestSensor.air_quality,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("ML API error:", error);
      throw new Error(`ML API error: ${response.status}`);
    }

    const predictionResult = await response.json();
    console.log("Prediction result:", predictionResult);

    // Store prediction in Supabase
    const { data, error } = await supabase.from("ml_predictions").insert({
      prediction_type: "egg_production",
      prediction_value: predictionResult.prediction,
      confidence: predictionResult.confidence || 0.95,
      sensor_data: latestSensor,
    }).select();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        prediction: data[0],
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ml-predict:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
