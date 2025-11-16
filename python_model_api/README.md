# ML Model Deployment Guide

This Flask API serves your trained LSTM model for egg production predictions.

## Files Needed

Place these files in this directory:
- `purair.lstm.keras` - Your trained model
- `scaler_X.pkl` - Input feature scaler
- `scaler_y.pkl` - Output scaler

## Local Testing

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the API:
```bash
python app.py
```

3. Test the prediction endpoint:
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"temperature": 25.5, "humidity": 60.0, "air_quality": 45.0}'
```

## Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo or upload files
4. Configure:
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
5. Deploy and copy the URL

### Option 2: Railway

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select this directory
4. Railway auto-detects Python and deploys
5. Copy the public URL

### Option 3: Hugging Face Spaces

1. Create account at https://huggingface.co
2. Create new Space with Docker
3. Upload files and use this Dockerfile:

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 7860
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:7860"]
```

### Option 4: Google Cloud Run

1. Build and push Docker image
2. Deploy to Cloud Run
3. Free tier: 2M requests/month

## After Deployment

1. Copy your deployed API URL (e.g., `https://your-app.onrender.com`)
2. Update the Supabase Edge Function with this URL
3. Test the integration

## Troubleshooting

- **Model loading fails**: Ensure all three files are in the same directory
- **Shape mismatch**: Adjust the `reshape` line in app.py based on your model's expected input shape
- **Timeout errors**: Consider using a paid tier for faster response times
