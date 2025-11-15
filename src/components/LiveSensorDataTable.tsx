import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { Database } from 'lucide-react';

interface SensorReading {
  id: number;
  timestamp: string;
  temperature: number;
  humidity: number;
  air_quality: number;
}

const LiveSensorDataTable: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchReadings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('sensor_data')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(10);

        if (error) throw error;
        setReadings(data || []);
      } catch (error) {
        console.error('Error fetching sensor readings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();

    // Set up real-time subscription
    const channel = supabase
      .channel('sensor_data_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data'
        },
        (payload) => {
          setReadings(prev => [payload.new as SensorReading, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const cardClass = theme === 'light' 
    ? 'p-6 bg-white border border-gray-200 shadow-md'
    : 'glass-morphism p-6';

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Card className={cardClass}>
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-6 w-6 text-farm-green" />
            <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Live Sensor Data Records
            </h3>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Timestamp</TableHead>
                    <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Temperature (°C)</TableHead>
                    <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Humidity (%)</TableHead>
                    <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Air Quality</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {readings.map((reading) => (
                    <TableRow key={reading.id}>
                      <TableCell className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                        {new Date(reading.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
                        {reading.temperature?.toFixed(1) ?? 'N/A'}
                      </TableCell>
                      <TableCell className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
                        {reading.humidity?.toFixed(1) ?? 'N/A'}
                      </TableCell>
                      <TableCell className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
                        {reading.air_quality?.toFixed(1) ?? 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default LiveSensorDataTable;
