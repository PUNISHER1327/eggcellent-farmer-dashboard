
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SensorData {
  temperature: number;
  humidity: number;
  airQuality: number;
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
    airQuality: 0,
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
        // Fetch the most recent sensor data from Supabase
        const { data: sensorData, error } = await supabase
          .from('sensor_data')
          .select('temperature, humidity, air_quality, timestamp')
          .order('timestamp', { ascending: false })
          .limit(1);

        if (error) {
          throw error;
        }

        if (sensorData && sensorData.length > 0) {
          const latestData = sensorData[0];
          
          // Map the Supabase data to our SensorData interface
          setData({
            temperature: latestData.temperature || 25,
            humidity: latestData.humidity || 60,
            airQuality: latestData.air_quality || 50,
            eggProduction: 0.75,
            totalEggsToday: 200,
            activeSensors: 3,
            chickens: 350,
          });
        } else {
          console.log("No sensor data found in the database");
          // If no data is found, use sensible defaults
          setData({
            temperature: 25,
            humidity: 60,
            airQuality: 50,
            eggProduction: 0.75,
            totalEggsToday: 200,
            activeSensors: 3,
            chickens: 350,
          });
        }
      } catch (error) {
        console.error("Failed to fetch sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel('sensor_data_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data'
        },
        (payload) => {
          const newData = payload.new as any;
          setData(prev => ({
            ...prev,
            temperature: newData.temperature || prev.temperature,
            humidity: newData.humidity || prev.humidity,
            airQuality: newData.air_quality || prev.airQuality,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
};
