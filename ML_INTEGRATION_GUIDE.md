# ML Model Integration Guide

## Overview
This guide explains how to integrate your ML model for egg production and chicken health predictions with your FarmerFriendly website.

## Architecture

```
ML Model (Python/Flask/FastAPI) 
    ↓ (REST API)
Supabase Edge Function
    ↓ (Store predictions)
Supabase Database (predictions table)
    ↓ (Real-time fetch)
React Frontend (Analytics page)
```

## Step 1: Create Database Table for Predictions

First, create a table to store ML predictions. Run this SQL migration:

```sql
-- Create predictions table
CREATE TABLE public.ml_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prediction_type TEXT NOT NULL, -- 'egg_production' or 'health_status'
  predicted_value JSONB NOT NULL, -- Flexible JSON for different prediction types
  confidence_score DECIMAL(5,2), -- Model confidence 0-100
  sensor_snapshot JSONB, -- Sensor data used for prediction
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  prediction_date DATE NOT NULL -- Date this prediction is for
);

-- Enable RLS
ALTER TABLE public.ml_predictions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust based on your security needs)
CREATE POLICY "Allow public read access to predictions"
  ON public.ml_predictions
  FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_predictions_type_date 
  ON public.ml_predictions(prediction_type, prediction_date DESC);

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE ml_predictions;
```

## Step 2: Deploy Your ML Model

### Option A: Deploy on External Service (Recommended)
Deploy your ML model on:
- **Hugging Face Spaces** (Free tier available)
- **Render** (Free tier available)
- **Railway** (Free trial)
- **Google Cloud Run** (Pay as you go)

Example Flask API endpoint:
```python
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load your trained model
model = pickle.load(open('egg_production_model.pkl', 'rb'))

@app.route('/predict/egg-production', methods=['POST'])
def predict_eggs():
    data = request.json
    
    # Extract sensor data
    features = np.array([[
        data['temperature'],
        data['humidity'],
        data['co2'],
        data['ammonia']
    ]])
    
    # Make prediction
    prediction = model.predict(features)[0]
    confidence = model.predict_proba(features).max() * 100
    
    return jsonify({
        'predicted_eggs': int(prediction),
        'confidence': float(confidence),
        'recommendation': 'optimal' if prediction > 50 else 'needs_attention'
    })

@app.route('/predict/health', methods=['POST'])
def predict_health():
    data = request.json
    
    # Your health prediction logic here
    # Example response:
    return jsonify({
        'health_status': 'healthy',
        'risk_level': 'low',
        'confidence': 95.5,
        'factors': {
            'temperature_impact': 'normal',
            'humidity_impact': 'normal',
            'air_quality_impact': 'good'
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

## Step 3: Create Supabase Edge Function

Create an edge function to call your ML model and store predictions:

**File: `supabase/functions/ml-predict/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { predictionType, sensorData } = await req.json();
    
    // Get your ML API URL from environment variable
    const ML_API_URL = Deno.env.get('ML_API_URL');
    if (!ML_API_URL) {
      throw new Error('ML_API_URL not configured');
    }

    // Call your ML model
    const endpoint = predictionType === 'egg_production' 
      ? '/predict/egg-production' 
      : '/predict/health';
    
    const mlResponse = await fetch(`${ML_API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData)
    });

    if (!mlResponse.ok) {
      throw new Error(`ML API error: ${mlResponse.status}`);
    }

    const prediction = await mlResponse.json();

    // Store prediction in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabase
      .from('ml_predictions')
      .insert({
        prediction_type: predictionType,
        predicted_value: prediction,
        confidence_score: prediction.confidence,
        sensor_snapshot: sensorData,
        prediction_date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, prediction: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ml-predict:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

## Step 4: Configure Edge Function Secrets

You'll need to add your ML API URL as a secret. I can help you do this.

The edge function needs:
- `ML_API_URL` - Your deployed ML model endpoint (e.g., `https://your-ml-api.com`)

## Step 5: Create React Hook for Predictions

**File: `src/hooks/usePredictions.tsx`**

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Prediction {
  id: string;
  prediction_type: string;
  predicted_value: any;
  confidence_score: number;
  sensor_snapshot: any;
  created_at: string;
  prediction_date: string;
}

export const usePredictions = (predictionType: 'egg_production' | 'health_status') => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestPrediction, setLatestPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('ml_predictions')
          .select('*')
          .eq('prediction_type', predictionType)
          .order('created_at', { ascending: false })
          .limit(30); // Last 30 predictions

        if (error) throw error;

        if (data && data.length > 0) {
          setPredictions(data);
          setLatestPrediction(data[0]);
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('predictions-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ml_predictions',
          filter: `prediction_type=eq.${predictionType}`
        },
        (payload) => {
          setPredictions(prev => [payload.new as Prediction, ...prev]);
          setLatestPrediction(payload.new as Prediction);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [predictionType]);

  return { predictions, latestPrediction, loading };
};

// Hook to trigger new predictions
export const useRequestPrediction = () => {
  const [requesting, setRequesting] = useState(false);

  const requestPrediction = async (
    predictionType: 'egg_production' | 'health_status',
    sensorData: any
  ) => {
    setRequesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('ml-predict', {
        body: { predictionType, sensorData }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error requesting prediction:', error);
      throw error;
    } finally {
      setRequesting(false);
    }
  };

  return { requestPrediction, requesting };
};
```

## Step 6: Update Analytics Page

Update the Analytics page to display real predictions:

```typescript
import { usePredictions, useRequestPrediction } from '@/hooks/usePredictions';
import { useSensorData } from '@/hooks/useSensorData';

// Inside your component:
const { data: sensorData } = useSensorData();
const { latestPrediction: eggPrediction, loading: eggLoading } = usePredictions('egg_production');
const { latestPrediction: healthPrediction, loading: healthLoading } = usePredictions('health_status');
const { requestPrediction, requesting } = useRequestPrediction();

// Trigger prediction when you have new sensor data
const handlePredict = async () => {
  if (!sensorData) return;
  
  await requestPrediction('egg_production', {
    temperature: sensorData.temperature,
    humidity: sensorData.humidity,
    co2: sensorData.co2,
    ammonia: sensorData.ammonia
  });
};

// Display predictions in your UI
<div>
  {eggPrediction && (
    <div>
      <h3>Predicted Eggs: {eggPrediction.predicted_value.predicted_eggs}</h3>
      <p>Confidence: {eggPrediction.confidence_score}%</p>
    </div>
  )}
</div>
```

## Step 7: Automate Predictions (Optional)

Set up a cron job to run predictions automatically:

**File: `supabase/functions/cron-predict/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get latest sensor data
    const { data: sensorData } = await supabase
      .from('sensor_data')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (!sensorData) {
      return new Response(JSON.stringify({ error: 'No sensor data' }), { status: 400 });
    }

    // Trigger predictions
    await supabase.functions.invoke('ml-predict', {
      body: {
        predictionType: 'egg_production',
        sensorData: {
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          co2: sensorData.carbon_dioxide,
          ammonia: sensorData.ammonia
        }
      }
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

Configure in `supabase/config.toml`:
```toml
[functions.cron-predict]
verify_jwt = false
```

Then use a service like **cron-job.org** or **GitHub Actions** to call this endpoint every hour.

## Testing Your Integration

1. **Test ML API directly**: `curl -X POST https://your-ml-api.com/predict/egg-production -d '{"temperature":25,"humidity":60,"co2":400,"ammonia":5}'`

2. **Test Edge Function**: Use Supabase dashboard or curl to invoke the function

3. **Monitor**: Check edge function logs in Supabase dashboard

## Troubleshooting

- **CORS errors**: Ensure your ML API has CORS enabled
- **Timeout**: Edge functions have 60s timeout - optimize your ML model
- **Authentication**: Make sure edge function can access the database
- **Model errors**: Log errors in your ML API and check edge function logs

## Next Steps

Once set up, you can:
- Add prediction history charts
- Show confidence trends over time
- Alert when predictions fall outside normal ranges
- Compare predictions vs actual results
- Fine-tune your model based on accuracy
