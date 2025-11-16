import { useState, useEffect, useRef } from 'react';
import { useSensorData } from './useSensorData';
import { supabase } from '@/integrations/supabase/client';

// Audio alert system with continuous sound
class AlertSoundPlayer {
  private audioContext: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    this.playBeep();
    this.intervalId = window.setInterval(() => this.playBeep(), 1500);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private playBeep() {
    if (!this.audioContext || !this.isPlaying) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = 900;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.4);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);

    setTimeout(() => {
      if (!this.audioContext || !this.isPlaying) return;
      
      const osc2 = this.audioContext.createOscillator();
      const gain2 = this.audioContext.createGain();
      
      osc2.connect(gain2);
      gain2.connect(this.audioContext.destination);
      
      osc2.frequency.value = 900;
      osc2.type = 'square';
      
      gain2.gain.setValueAtTime(0, this.audioContext.currentTime);
      gain2.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.1);
      gain2.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.4);
      
      osc2.start(this.audioContext.currentTime);
      osc2.stop(this.audioContext.currentTime + 0.4);
    }, 500);
  }
}

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
  const [dismissedAlerts, setDismissedAlerts] = useState<{
    temperature: boolean;
    humidity: boolean;
    airQuality: boolean;
  }>({
    temperature: false,
    humidity: false,
    airQuality: false,
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [alertPhoneNumber, setAlertPhoneNumber] = useState<string>('');
  const [smsSent, setSmsSent] = useState<{
    temperature: boolean;
    humidity: boolean;
    airQuality: boolean;
  }>({
    temperature: false,
    humidity: false,
    airQuality: false,
  });
  const { data: sensorData } = useSensorData();
  const alertSoundRef = useRef<AlertSoundPlayer | null>(null);

  useEffect(() => {
    alertSoundRef.current = new AlertSoundPlayer();
    
    // Load phone number from localStorage
    const savedPhone = localStorage.getItem('alert_phone_number');
    if (savedPhone) {
      setAlertPhoneNumber(savedPhone);
    }
    
    return () => {
      alertSoundRef.current?.stop();
    };
  }, []);

  const sendAlertSMS = async (alertType: string, message: string) => {
    if (!alertPhoneNumber) {
      console.log('No phone number configured for SMS alerts');
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-alert-sms', {
        body: {
          alertType,
          message,
          phoneNumber: alertPhoneNumber,
        },
      });

      if (error) {
        console.error('Failed to send SMS alert:', error);
      } else {
        console.log(`SMS alert sent for ${alertType}`);
      }
    } catch (error) {
      console.error('Error sending SMS alert:', error);
    }
  };

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

      // Check if alerts should be reset (values back to normal)
      if (!newAlerts.temperature && dismissedAlerts.temperature) {
        setDismissedAlerts(prev => ({ ...prev, temperature: false }));
        setSmsSent(prev => ({ ...prev, temperature: false }));
      }
      if (!newAlerts.humidity && dismissedAlerts.humidity) {
        setDismissedAlerts(prev => ({ ...prev, humidity: false }));
        setSmsSent(prev => ({ ...prev, humidity: false }));
      }
      if (!newAlerts.airQuality && dismissedAlerts.airQuality) {
        setDismissedAlerts(prev => ({ ...prev, airQuality: false }));
        setSmsSent(prev => ({ ...prev, airQuality: false }));
      }

      setAlerts(newAlerts);
      
      const hasActiveAlert = (newAlerts.temperature && !dismissedAlerts.temperature) || 
                            (newAlerts.humidity && !dismissedAlerts.humidity) || 
                            (newAlerts.airQuality && !dismissedAlerts.airQuality);
      
      // Send SMS alerts for new threshold breaches
      if (newAlerts.temperature && !dismissedAlerts.temperature && !smsSent.temperature) {
        console.warn(`Temperature alert: ${temperature}°C exceeds ${tempThreshold}°C`);
        sendAlertSMS('Temperature', `Temperature is ${temperature}°C, exceeding safe threshold of ${tempThreshold}°C. Immediate cooling required.`);
        setSmsSent(prev => ({ ...prev, temperature: true }));
      }
      if (newAlerts.humidity && !dismissedAlerts.humidity && !smsSent.humidity) {
        console.warn(`Humidity alert: ${humidity}% outside safe range (${humidityThresholdLow}-${humidityThresholdHigh}%)`);
        sendAlertSMS('Humidity', `Humidity is ${humidity}%, outside safe range of ${humidityThresholdLow}-${humidityThresholdHigh}%. Adjust ventilation immediately.`);
        setSmsSent(prev => ({ ...prev, humidity: true }));
      }
      if (newAlerts.airQuality && !dismissedAlerts.airQuality && !smsSent.airQuality) {
        console.warn(`Air Quality alert: ${air_quality} PPM exceeds ${airQualityThreshold} PPM`);
        sendAlertSMS('Air Quality', `Air quality is ${air_quality} PPM, exceeding safe threshold of ${airQualityThreshold} PPM. Increase ventilation now.`);
        setSmsSent(prev => ({ ...prev, airQuality: true }));
      }

      // Control sound based on active alerts
      if (hasActiveAlert) {
        alertSoundRef.current?.start();
      } else {
        alertSoundRef.current?.stop();
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

  const dismissAlert = (alertType: 'temperature' | 'humidity' | 'airQuality') => {
    setDismissedAlerts(prev => ({ ...prev, [alertType]: true }));
  };

  const updateAlertPhoneNumber = (phoneNumber: string) => {
    setAlertPhoneNumber(phoneNumber);
    localStorage.setItem('alert_phone_number', phoneNumber);
  };

  return { 
    currentPrediction, 
    loading, 
    alerts, 
    dismissedAlerts, 
    lastUpdate, 
    dismissAlert,
    alertPhoneNumber,
    updateAlertPhoneNumber
  };
};
