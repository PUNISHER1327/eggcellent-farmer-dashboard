import { useState, useEffect } from 'react';
import { useSensorData } from './useSensorData';

interface PredictionRow {
  id: number;
  air_quality: number;
  temperature: number;
  humidity: number;
  predicted_egg_count: number;
}

export const usePredictionData = () => {
  const [predictions, setPredictions] = useState<PredictionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPrediction, setCurrentPrediction] = useState<{
    eggCount: number;
    health: string;
    confidence: number;
  } | null>(null);
  const { data: sensorData } = useSensorData();

  // Load CSV data
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const response = await fetch('/data/predictions.csv');
        const text = await response.text();
        const lines = text.split('\n').slice(1); // Skip header
        
        const data = lines
          .filter(line => line.trim())
          .map(line => {
            const [id, air_quality, timestamp, temperature, humidity, predicted_egg_count] = line.split(',');
            return {
              id: parseInt(id),
              air_quality: parseFloat(air_quality),
              temperature: parseFloat(temperature),
              humidity: parseFloat(humidity),
              predicted_egg_count: parseFloat(predicted_egg_count),
            };
          });
        
        setPredictions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading predictions:', error);
        setLoading(false);
      }
    };

    loadPredictions();
  }, []);

  // Smart matching algorithm - find best prediction after 45 seconds
  useEffect(() => {
    if (!sensorData || predictions.length === 0) return;

    const timer = setTimeout(() => {
      const air_quality = sensorData.airQuality;
      const temperature = sensorData.temperature;
      const humidity = sensorData.humidity;

      // Find closest match using weighted distance
      let bestMatch = predictions[0];
      let minDistance = Infinity;

      predictions.forEach(pred => {
        // Weighted distance: air_quality is most important
        const aqDiff = Math.abs(pred.air_quality - (air_quality || 0));
        const tempDiff = Math.abs(pred.temperature - (temperature || 0));
        const humDiff = Math.abs(pred.humidity - (humidity || 0));
        
        // Air quality weighted 3x more than other factors
        const distance = (aqDiff * 3) + tempDiff + humDiff;
        
        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = pred;
        }
      });

      // Adjust prediction based on air quality deviation
      let adjustedEggCount = bestMatch.predicted_egg_count;
      const aqDiff = (air_quality || 0) - bestMatch.air_quality;
      
      // If air quality is worse (higher), reduce egg count
      if (aqDiff > 50) {
        adjustedEggCount *= 0.85; // 15% reduction
      } else if (aqDiff > 20) {
        adjustedEggCount *= 0.92; // 8% reduction
      } else if (aqDiff < -20) {
        adjustedEggCount *= 1.05; // 5% boost for better air quality
      }

      // Determine health based on air quality
      let health = 'Excellent';
      let confidence = 95;
      
      if ((air_quality || 0) > 400) {
        health = 'Critical';
        confidence = 88;
      } else if ((air_quality || 0) > 300) {
        health = 'Poor';
        confidence = 90;
      } else if ((air_quality || 0) > 200) {
        health = 'Fair';
        confidence = 92;
      } else if ((air_quality || 0) > 100) {
        health = 'Good';
        confidence = 94;
      }

      setCurrentPrediction({
        eggCount: Math.round(adjustedEggCount),
        health,
        confidence,
      });
    }, 45000); // 45 seconds

    return () => clearTimeout(timer);
  }, [sensorData, predictions]);

  return { currentPrediction, loading };
};
