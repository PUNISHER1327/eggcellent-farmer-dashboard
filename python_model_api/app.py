from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from tensorflow import keras
import os

app = Flask(__name__)
CORS(app)

# Load model and scalers at startup
MODEL_PATH = os.getenv('MODEL_PATH', './purair.lstm.keras')
SCALER_X_PATH = os.getenv('SCALER_X_PATH', './scaler_X.pkl')
SCALER_Y_PATH = os.getenv('SCALER_Y_PATH', './scaler_y.pkl')

print("Loading model and scalers...")
model = keras.models.load_model(MODEL_PATH)
with open(SCALER_X_PATH, 'rb') as f:
    scaler_X = pickle.load(f)
with open(SCALER_Y_PATH, 'rb') as f:
    scaler_y = pickle.load(f)
print("Model loaded successfully!")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Model API is running"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features (adjust based on your model's expected input)
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        air_quality = data.get('air_quality')
        
        if None in [temperature, humidity, air_quality]:
            return jsonify({"error": "Missing required fields: temperature, humidity, air_quality"}), 400
        
        # Prepare input features
        features = np.array([[temperature, humidity, air_quality]])
        
        # Scale input
        features_scaled = scaler_X.transform(features)
        
        # Reshape for LSTM if needed (adjust shape based on your model)
        # If your model expects 3D input: (samples, timesteps, features)
        features_reshaped = features_scaled.reshape((1, 1, features_scaled.shape[1]))
        
        # Make prediction
        prediction_scaled = model.predict(features_reshaped, verbose=0)
        
        # Inverse transform prediction
        prediction = scaler_y.inverse_transform(prediction_scaled)
        
        # Extract predicted value
        predicted_eggs = float(prediction[0][0])
        
        return jsonify({
            "prediction": predicted_eggs,
            "confidence": 0.95,  # You can calculate actual confidence if available
            "input_features": {
                "temperature": temperature,
                "humidity": humidity,
                "air_quality": air_quality
            }
        }), 200
        
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
