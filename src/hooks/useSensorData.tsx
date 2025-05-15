import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SensorData {
  temperature: number;
  humidity: number;
  co2: number;
  ammonia: number;
  eggProduction: number;
  totalEggsToday: number;
  activeSensors: number;
  chickens: number;
}

export const getDataStatus = (value: number, min: number, max: number): 'good' | 'warning' | 'danger' => {
  if (value < min || value > max) {
    return value < min * 0.8 || value > max * 1.2 ? 'danger' : 'warning';
  }
  return 'good';
};

export const getEggProductionStatus = (value: number): 'low' | 'medium' | 'high' => {
  if (value < 0.4) return 'low';
  if (value > 0.8) return 'high';
  return 'medium';
};

export const useSensorData = () => {
  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    co2: 0,
    ammonia: 0,
    eggProduction: 0,
    totalEggsToday: 0,
    activeSensors: 0,
    chickens: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const mockSensorData: SensorData = {
          temperature: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
          humidity: Math.floor(Math.random() * (80 - 50 + 1)) + 50,
          co2: Math.floor(Math.random() * (1500 - 400 + 1)) + 400,
          ammonia: Math.floor(Math.random() * (20 - 2 + 1)) + 2,
          eggProduction: parseFloat((Math.random() * (0.9 - 0.6 + 1) + 0.6).toFixed(2)),
          totalEggsToday: Math.floor(Math.random() * (300 - 150 + 1)) + 150,
          activeSensors: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
          chickens: Math.floor(Math.random() * (500 - 200 + 1)) + 200,
        };
        
        setData(mockSensorData);
      } catch (error) {
        console.error("Failed to fetch sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
