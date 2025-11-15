import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HistoricalReading {
  time: string;
  tempHumidity: number;
  airQuality: number;
}

export const useSensorHistory = (hours: number = 24) => {
  const [data, setData] = useState<HistoricalReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const hoursAgo = new Date();
        hoursAgo.setHours(hoursAgo.getHours() - hours);

        const { data: sensorData, error } = await supabase
          .from('sensor_data')
          .select('timestamp, temp_humidity, air_quality')
          .gte('timestamp', hoursAgo.toISOString())
          .order('timestamp', { ascending: true });

        if (error) throw error;

        if (sensorData && sensorData.length > 0) {
          const formattedData = sensorData.map(reading => ({
            time: new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tempHumidity: reading.temp_humidity || 0,
            airQuality: reading.air_quality || 0,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching sensor history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // Refresh every 5 minutes
    const interval = setInterval(fetchHistory, 300000);
    return () => clearInterval(interval);
  }, [hours]);

  return { data, loading };
};
