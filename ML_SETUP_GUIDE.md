# Running Your LSTM Model Entirely in Supabase

This guide shows you how to run your Keras LSTM model (`purair.lstm.keras`) with scalers entirely within Supabase using TensorFlow.js - no external services needed!

## Why This Works

Instead of deploying to external platforms, we convert your Keras model to TensorFlow.js format and run it directly in Supabase Edge Functions. Everything stays within Supabase infrastructure.

## Step 1: Convert Your Keras Model to TensorFlow.js

On Google Colab or your local machine:

```python
# Install tensorflowjs converter
!pip install tensorflowjs

import tensorflowjs as tfjs
from tensorflow import keras

# Load your Keras model
model = keras.models.load_model('purair.lstm.keras')

# Convert to TensorFlow.js format
tfjs.converters.save_keras_model(model, 'tfjs_model')
```

This creates a `tfjs_model` folder containing:
- `model.json` (model architecture)
- `group1-shard1of1.bin` (or multiple shard files with weights)

## Step 2: Convert Scalers to JSON

Your scalers need to be in JSON format instead of pickle:

```python
import pickle
import json

# Load your pickle scalers
with open('scaler_X.pkl', 'rb') as f:
    scaler_X = pickle.load(f)
    
with open('scaler_y.pkl', 'rb') as f:
    scaler_y = pickle.load(f)

# Extract parameters (for StandardScaler)
scaler_X_params = {
    'mean': scaler_X.mean_.tolist(),
    'scale': scaler_X.scale_.tolist()
}

scaler_y_params = {
    'mean': scaler_y.mean_.tolist(),
    'scale': scaler_y.scale_.tolist()
}

# Save as JSON
with open('scaler_X.json', 'w') as f:
    json.dump(scaler_X_params, f)
    
with open('scaler_y.json', 'w') as f:
    json.dump(scaler_y_params, f)

print("Scalers converted successfully!")
print("scaler_X:", scaler_X_params)
print("scaler_y:", scaler_y_params)
```

## Step 3: Upload Files to Supabase Storage

1. Go to your Supabase Storage: https://supabase.com/dashboard/project/ipfqxgzylmfyffeqpdrb/storage/buckets

2. You should see a `models` bucket. If not, create it (make it **private**, not public)

3. Upload these files to the `models` bucket:
   - `model.json`
   - `group1-shard1of1.bin` (all shard files if multiple)
   - `scaler_X.json`
   - `scaler_y.json`

## Step 4: How It Works

The edge function (`ml-predict-tfjs`) automatically:

1. **Fetches latest sensor data** from your `sensor_data` table (temperature, humidity, air_quality)

2. **Loads the scalers** from Supabase Storage

3. **Scales the input data** using scaler_X parameters

4. **Loads your TensorFlow.js model** from Storage

5. **Runs the LSTM prediction** with the scaled input

6. **Inverse scales the output** using scaler_y parameters

7. **Stores the prediction** in the `ml_predictions` table

All of this happens within Supabase - no external API calls!

## Step 5: Test Your Integration

### From Your Analytics Page
The Analytics page already has a button to trigger predictions. Just click "Generate New Prediction" and it will:
- Fetch the latest sensor readings
- Run your LSTM model
- Display the egg production forecast

### Manual Test
You can also trigger predictions manually:

```typescript
const { data, error } = await supabase.functions.invoke('ml-predict-tfjs');
```

Check the Edge Function logs to see the prediction process in action.

## Advantages of This Approach

✅ **No external services** - Everything runs in Supabase
✅ **No API keys needed** - Only Supabase credentials
✅ **Lower latency** - Model runs close to your data
✅ **Automatic scaling** - Supabase handles infrastructure
✅ **Cost effective** - No separate ML service costs
✅ **Simpler deployment** - Upload files once, done!

## Troubleshooting

### Model Loading Errors
- Ensure all files are uploaded to the `models` bucket
- Check that file names match exactly (case-sensitive)
- Verify the bucket is created and accessible

### Input Shape Errors
The edge function assumes your LSTM expects shape `[1, 1, 3]` (1 timestep, 3 features).

If your model expects different input shape, modify line in `ml-predict-tfjs/index.ts`:
```typescript
// Current: [batch, timesteps, features]
const inputTensor = tf.tensor3d([scaledInput], [1, 1, 3]);

// If your model needs more timesteps, adjust accordingly
// const inputTensor = tf.tensor3d([scaledInput], [1, 10, 3]); // 10 timesteps
```

### Prediction Values Seem Wrong
- Verify your scaler parameters match your training scalers
- Check that input features are in correct order: [temperature, humidity, air_quality]
- Look at the edge function logs to see scaled vs unscaled values

### View Logs
Check logs here: https://supabase.com/dashboard/project/ipfqxgzylmfyffeqpdrb/functions/ml-predict-tfjs/logs

## What About the Old Python API?

You can delete the `python_model_api` folder - it's not needed anymore! Everything runs in Supabase Edge Functions using TensorFlow.js.

## Input Data Format

Your model receives:
```
[temperature, humidity, air_quality]
```

These are the latest values from the `sensor_data` table. The edge function:
1. Scales them using scaler_X
2. Feeds to LSTM as shape [1, 1, 3]
3. Gets prediction
4. Inverse scales using scaler_y
5. Stores result

## Next Steps

Once your model files are uploaded:
1. The edge function is already deployed
2. Go to your Analytics page
3. Click "Generate New Prediction"
4. View your egg production forecast!

The predictions will appear in real-time on your dashboard.
