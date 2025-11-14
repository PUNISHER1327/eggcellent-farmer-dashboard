# ML Model Integration Guide

## Step 1: Create ML Predictions Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
-- Create ml_predictions table
CREATE TABLE ml_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_type TEXT NOT NULL,
  prediction_value NUMERIC NOT NULL,
  confidence NUMERIC DEFAULT 0.95,
  sensor_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ml_predictions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to ml_predictions"
ON ml_predictions FOR SELECT
USING (true);

-- Enable realtime
ALTER TABLE ml_predictions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE ml_predictions;
```

## Step 2: Add Hugging Face API Key

1. Go to https://huggingface.co/settings/tokens
2. Create a new token with read access
3. In Lovable, I'll add it as a secret for you

## Step 3: Configure Your Model

In the Supabase edge function `ml-predict/index.ts`, update:

```typescript
const MODEL_ID = "YOUR_MODEL_ID"; // e.g., "username/model-name"
```

Replace `YOUR_MODEL_ID` with your actual Hugging Face model ID.

## Step 4: Model Input Format

Your Hugging Face model should accept an array of 4 values:
- `[temperature, humidity, carbon_dioxide, ammonia]`

If your model expects different input format, modify the edge function accordingly.

## Step 5: Display Predictions in Analytics

Add this to your Analytics page:

```tsx
import { usePredictions, useRequestPrediction } from '@/hooks/usePredictions';
import { useSensorData } from '@/hooks/useSensorData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { toast } from 'sonner';

// Inside your component:
const { predictions, loading } = usePredictions();
const { requestPrediction, requesting } = useRequestPrediction();
const { data: sensorData } = useSensorData();

const handlePredict = async () => {
  try {
    await requestPrediction({
      temperature: sensorData.temperature,
      humidity: sensorData.humidity,
      carbon_dioxide: sensorData.co2,
      ammonia: sensorData.ammonia,
    });
    toast.success('Prediction generated!');
  } catch (error) {
    toast.error('Failed to generate prediction');
  }
};

// In your JSX:
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Brain className="w-5 h-5" />
      ML Predictions
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Button onClick={handlePredict} disabled={requesting}>
      {requesting ? 'Generating...' : 'Generate Prediction'}
    </Button>
    
    <div className="mt-4 space-y-2">
      {predictions.map((pred) => (
        <div key={pred.id} className="p-3 bg-secondary rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium">{pred.prediction_type}</span>
            <span className="text-primary">{pred.prediction_value.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Confidence: {(pred.confidence * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

## Step 6: Test Your Setup

1. Make sure your Arduino is sending data to Supabase
2. Click "Generate Prediction" button
3. Check the console for any errors
4. View predictions in real-time

## Troubleshooting

- **401 Error**: Check your Hugging Face API key
- **Model Loading**: Some models need warm-up time on first request
- **No Predictions**: Check edge function logs in Supabase dashboard
- **Wrong Format**: Verify your model's expected input format

## Optional: Auto-Generate Predictions

To automatically generate predictions when new sensor data arrives, create a database trigger or use a cron job.
