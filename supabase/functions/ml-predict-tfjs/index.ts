import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { loadLayersModel } from "npm:@tensorflow/tfjs-layers@4.15.0";
import * as tf from "npm:@tensorflow/tfjs-core@4.15.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Scaling functions
function scaleInput(data: number[], mean: number[], scale: number[]): number[] {
  return data.map((val, idx) => (val - mean[idx]) / scale[idx]);
}

function inverseScaleOutput(data: number[], mean: number[], scale: number[]): number[] {
  return data.map((val, idx) => (val * scale[idx]) + mean[idx]);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Fetching latest sensor data...");
    
    // Fetch the latest sensor data
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

    // Load scalers from storage
    console.log("Loading scalers from storage...");
    const { data: scalerXFile } = await supabase.storage
      .from("models")
      .download("scaler_X.json");
    
    const { data: scalerYFile } = await supabase.storage
      .from("models")
      .download("scaler_y.json");

    if (!scalerXFile || !scalerYFile) {
      throw new Error("Failed to load scaler files from storage");
    }

    const scalerX = JSON.parse(await scalerXFile.text());
    const scalerY = JSON.parse(await scalerYFile.text());

    console.log("Scalers loaded successfully");

    // Prepare input data [temperature, humidity, air_quality]
    const inputData = [
      latestSensor.temperature,
      latestSensor.humidity,
      latestSensor.air_quality,
    ];

    // Scale input
    const scaledInput = scaleInput(inputData, scalerX.mean, scalerX.scale);
    console.log("Scaled input:", scaledInput);

    // Load TensorFlow.js model from storage
    console.log("Loading TensorFlow.js model...");
    
    // Get the model.json file URL
    const { data: modelJsonUrl } = await supabase.storage
      .from("models")
      .createSignedUrl("model.json", 60);

    if (!modelJsonUrl?.signedUrl) {
      throw new Error("Failed to get model.json signed URL");
    }

    // Load the model
    const model = await loadLayersModel(modelJsonUrl.signedUrl);
    console.log("Model loaded successfully");

    // Reshape input for LSTM: [batch_size, timesteps, features]
    // Assuming your model expects shape [1, 1, 3] - adjust if needed
    const inputTensor = tf.tensor3d([scaledInput], [1, 1, 3]);

    // Run prediction
    console.log("Running prediction...");
    const predictionTensor = model.predict(inputTensor) as tf.Tensor;
    const predictionArray = await predictionTensor.array() as number[][];
    
    // Inverse scale the prediction
    const scaledPrediction = inverseScaleOutput(
      predictionArray[0],
      scalerY.mean,
      scalerY.scale
    );

    const finalPrediction = scaledPrediction[0];
    console.log("Prediction result:", finalPrediction);

    // Clean up tensors
    inputTensor.dispose();
    predictionTensor.dispose();

    // Store prediction in database
    const { data: insertedPrediction, error: insertError } = await supabase
      .from("ml_predictions")
      .insert({
        prediction_type: "egg_production",
        prediction_value: finalPrediction,
        confidence: 0.95,
        sensor_data: latestSensor,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database error:", insertError);
      throw insertError;
    }

    console.log("Prediction stored successfully");

    return new Response(
      JSON.stringify({
        success: true,
        prediction: insertedPrediction,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ml-predict-tfjs:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
