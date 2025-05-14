
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SensorData {
  temperature: number;
  humidity: number;
  ammonia: number;
  co2: number;
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
    ammonia: 0,
    co2: 0,
    eggProduction: 0,
    totalEggsToday: 0,
    activeSensors: 0,
    chickens: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the latest data from Supabase
        const { data: sensorData, error } = await supabase
          .from('hacksprint')
          .select('*')
          .order('id', { ascending: false })
          .limit(1)
          .single();
          
        if (error) {
          console.error('Error fetching sensor data:', error);
          setError('Failed to fetch sensor data');
          // Fall back to mock data if we can't fetch from Supabase
          setMockData();
          return;
        }
        
        if (sensorData) {
          setData({
            temperature: sensorData['Temperature (°C)'] || 25,
            humidity: sensorData['Humidity (%)'] || 65,
            ammonia: sensorData['Ammonia (ppm)'] || 15,
            co2: sensorData['CO2 (ppm)'] || 800,
            eggProduction: sensorData['Egg Production (eggs/hen/day)'] || 0.7,
            // Mock data for values not in the database
            totalEggsToday: Math.floor(Math.random() * 500) + 1000,
            activeSensors: Math.floor(Math.random() * 5) + 25,
            chickens: Math.floor(Math.random() * 500) + 1500,
          });
        } else {
          // No data in Supabase yet, use mock data
          setMockData();
        }
      } catch (err) {
        console.error('Error in useSensorData:', err);
        setError('An unexpected error occurred');
        // Fall back to mock data
        setMockData();
      } finally {
        setLoading(false);
      }
    };

    const setMockData = () => {
      // Generate random data within realistic ranges
      setData({
        temperature: 25 + Math.random() * 5,
        humidity: 65 + Math.random() * 15,
        ammonia: 15 + Math.random() * 10,
        co2: 800 + Math.random() * 400,
        eggProduction: 0.5 + Math.random() * 0.4,
        totalEggsToday: Math.floor(Math.random() * 500) + 1000,
        activeSensors: Math.floor(Math.random() * 5) + 25,
        chickens: Math.floor(Math.random() * 500) + 1500,
      });
    };
    
    fetchData();
    
    // Set up a polling interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};
