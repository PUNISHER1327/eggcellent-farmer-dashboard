
import { useState, useEffect } from 'react';

export type SensorData = {
  co2: number;
  ammonia: number;
  temperature: number;
  humidity: number;
  eggProduction: number;
  totalEggsToday: number;
  activeSensors: number;
  chickens: number;
};

export const getDataStatus = (value: number, min: number, max: number): 'good' | 'warning' | 'danger' => {
  const range = max - min;
  const optimalMin = min + range * 0.3;
  const optimalMax = min + range * 0.7;
  
  if (value >= optimalMin && value <= optimalMax) {
    return 'good';
  } else if (value < min + range * 0.1 || value > min + range * 0.9) {
    return 'danger';
  } else {
    return 'warning';
  }
};

export const getEggProductionStatus = (value: number): 'low' | 'medium' | 'high' => {
  if (value >= 6) {
    return 'high';
  } else if (value >= 3) {
    return 'medium';
  } else {
    return 'low';
  }
};

export const useSensorData = () => {
  const [data, setData] = useState<SensorData>({
    co2: 800,
    ammonia: 15,
    temperature: 25,
    humidity: 65,
    eggProduction: 5.2,
    totalEggsToday: 1240,
    activeSensors: 24,
    chickens: 500,
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate initial data loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    // Update data every 5 seconds (simulating live data)
    const interval = setInterval(() => {
      setData({
        co2: Math.floor(Math.random() * (2000 - 300 + 1)) + 300,
        ammonia: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
        temperature: Math.floor((Math.random() * (35 - 20 + 1)) + 20),
        humidity: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
        eggProduction: Math.random() * 10,
        totalEggsToday: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
        activeSensors: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
        chickens: 500,
      });
    }, 5000);
    
    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);
  
  return { data, loading };
};
