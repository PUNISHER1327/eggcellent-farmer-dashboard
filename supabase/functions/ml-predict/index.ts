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
    const { sensorData } = await req.json();
    
    console.log("Received prediction request:", sensorData);

    // Get Hugging Face API key from environment
    const HF_API_KEY = Deno.env.get("HUGGING_FACE_API_KEY");
    if (!HF_API_KEY) {
      throw new Error("HUGGING_FACE_API_KEY not configured");
    }

    // Call your Hugging Face model
    // Replace MODEL_ID with your actual model ID from Hugging Face
    const MODEL_ID = Deno.env.get("HF_MODEL_ID") || "YOUR_MODEL_ID";
    
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [
            sensorData.temperature,
            sensorData.humidity,
            sensorData.carbon_dioxide,
            sensorData.ammonia,
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("HF API error:", error);
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const prediction = await response.json();
    console.log("Prediction result:", prediction);

    // Store prediction in Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("ml_predictions").insert({
      prediction_type: "egg_production",
      prediction_value: prediction[0]?.score || prediction,
      confidence: prediction[0]?.confidence || 0.95,
      sensor_data: sensorData,
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
