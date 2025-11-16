import { useState, useEffect } from 'react';
import { useSensorData } from './useSensorData';

// Audio alert function
const playAlertSound = () => {
  // Create an audio context
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create oscillator for alert sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Configure alert sound - urgent beeping pattern
  oscillator.frequency.value = 800; // Hz
  oscillator.type = 'sine';
  
  // Fade in and out
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
  
  // Second beep
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.frequency.value = 800;
    oscillator2.type = 'sine';
    
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator2.start(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime + 0.3);
  }, 400);
};

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
  const [alerts, setAlerts] = useState<{
    temperature: boolean;
    humidity: boolean;
    airQuality: boolean;
  }>({
    temperature: false,
    humidity: false,
    airQuality: false,
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
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

  // Smart matching algorithm - update prediction every 5 seconds
  useEffect(() => {
    if (!sensorData || predictions.length === 0) return;

    const updatePrediction = () => {
      const air_quality = sensorData.airQuality;
      const temperature = sensorData.temperature;
      const humidity = sensorData.humidity;

      // Check thresholds and play alert sound
      const tempThreshold = 32; // °C
      const humidityThresholdLow = 40; // %
      const humidityThresholdHigh = 70; // %
      const airQualityThreshold = 300; // PPM

      const newAlerts = {
        temperature: (temperature || 0) > tempThreshold,
        humidity: (humidity || 0) < humidityThresholdLow || (humidity || 0) > humidityThresholdHigh,
        airQuality: (air_quality || 0) > airQualityThreshold,
      };

      setAlerts(newAlerts);
      
      const alertTriggered = newAlerts.temperature || newAlerts.humidity || newAlerts.airQuality;
      
      if (newAlerts.temperature) {
        console.warn(`Temperature alert: ${temperature}°C exceeds ${tempThreshold}°C`);
      }
      if (newAlerts.humidity) {
        console.warn(`Humidity alert: ${humidity}% outside safe range (${humidityThresholdLow}-${humidityThresholdHigh}%)`);
      }
      if (newAlerts.airQuality) {
        console.warn(`Air Quality alert: ${air_quality} PPM exceeds ${airQualityThreshold} PPM`);
      }

      // Play alert sound if threshold exceeded
      if (alertTriggered) {
        playAlertSound();
      }

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

      // Adjust prediction based on air quality deviation (keep decimal precision)
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
        eggCount: adjustedEggCount, // Keep decimal values
        health,
        confidence,
      });
      
      setLastUpdate(new Date());
    };

    // Initial update immediately
    updatePrediction();
    
    // Then update every 5 seconds
    const interval = setInterval(updatePrediction, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [sensorData, predictions]);

  return { currentPrediction, loading, alerts, lastUpdate };
};
