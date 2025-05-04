
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
  historicalData?: {
    temperature: number[];
    humidity: number[];
    co2: number[];
    ammonia: number[];
  };
  eggProductionHistory?: number[];
  farmScore?: number;
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
    historicalData: {
      temperature: [24, 24.5, 25, 25.5, 26, 25.5, 25, 24.5, 24, 24, 24, 24],
      humidity: [65, 64, 63, 62, 60, 62, 64, 65, 66, 65, 65, 65],
      co2: [750, 780, 800, 820, 840, 830, 810, 800, 790, 780, 770, 760],
      ammonia: [14, 14.5, 15, 15.5, 16, 15.5, 15, 14.5, 14, 14, 14, 14],
    },
    eggProductionHistory: [450, 460, 470, 480, 490, 500, 490, 480, 470, 480, 490, 500, 510, 520],
    farmScore: 86,
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
        historicalData: {
          temperature: Array.from({length: 12}, () => Math.floor((Math.random() * (30 - 20 + 1)) + 20)),
          humidity: Array.from({length: 12}, () => Math.floor(Math.random() * (80 - 50 + 1)) + 50),
          co2: Array.from({length: 12}, () => Math.floor(Math.random() * (1000 - 600 + 1)) + 600),
          ammonia: Array.from({length: 12}, () => Math.floor(Math.random() * (25 - 10 + 1)) + 10),
        },
        eggProductionHistory: Array.from({length: 14}, () => Math.floor(Math.random() * (550 - 450 + 1)) + 450),
        farmScore: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
      });
    }, 5000);
    
    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);
  
  return { data, loading };
};
