
import React, { useEffect, useState } from 'react';
import SensorCard from './SensorCard';
import AnimatedCounter from './AnimatedCounter';
import { useSensorData, getDataStatus } from '@/hooks/useSensorData';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const LiveDataSection: React.FC = () => {
  const { data: initialData, loading: initialLoading } = useSensorData();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { t } = useLanguage();
  
  // Get the refresh interval from localStorage or default to 15 minutes (in milliseconds)
  const getRefreshInterval = (): number => {
    const storedInterval = localStorage.getItem('dataCollectionInterval');
    switch (storedInterval) {
      case '5min': return 5 * 60 * 1000;
      case '30min': return 30 * 60 * 1000;
      case '60min': return 60 * 60 * 1000;
      default: return 15 * 60 * 1000; // Default to 15 minutes
    }
  };

  // For demo purposes, use 10 seconds instead of minutes
  const getDemoRefreshInterval = (): number => {
    const storedInterval = localStorage.getItem('dataCollectionInterval');
    switch (storedInterval) {
      case '5min': return 5 * 1000;
      case '30min': return 10 * 1000;
      case '60min': return 15 * 1000;
      default: return 2 * 1000; // Default to 2 seconds for demo
    }
  };

  useEffect(() => {
    // Initial data load
    if (initialData) {
      setData(initialData);
      setLoading(initialLoading);
    }

    // Set up the interval for refreshing data
    const intervalId = setInterval(async () => {
      setLoading(true);
      try {
        const { data: newData, loading: newLoading } = await useSensorData();
        setData(newData);
        setLoading(newLoading);
        setLastUpdated(new Date());
        toast({
          title: t('dataRefreshed'),
          description: t('liveDataUpdated'),
        });
      } catch (error) {
        console.error('Failed to refresh sensor data:', error);
      } finally {
        setLoading(false);
      }
    }, getDemoRefreshInterval()); // For demo purposes, use seconds instead of minutes

    return () => clearInterval(intervalId);
  }, [initialData, initialLoading, t]);

  return (
    <section id="live-data" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Live Sensor Data</h2>
        <p className="text-lg text-white/70 mb-2">Real-time environmental conditions</p>
        <p className="text-sm text-white/50 mb-10">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[220px] w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SensorCard
                title="CO₂ Level"
                value={data.co2}
                unit="ppm"
                min={300}
                max={2000}
                status={getDataStatus(data.co2, 300, 2000)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <path d="M3 10h18"></path>
                    <path d="M10 18H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"></path>
                    <path d="M10 18a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0"></path>
                    <path d="M11 12h2"></path>
                  </svg>
                }
              />
              
              <SensorCard
                title="Ammonia Level"
                value={data.ammonia}
                unit="ppm"
                min={5}
                max={50}
                status={getDataStatus(data.ammonia, 5, 50)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.16 4.17a11.95 11.95 0 0 0 16.46 16.47"></path>
                    <path d="M19.84 19.83a11.95 11.95 0 0 0-16.47-16.46"></path>
                    <path d="M12 3v18"></path>
                    <path d="M3 12h18"></path>
                  </svg>
                }
              />
              
              <SensorCard
                title="Temperature"
                value={data.temperature}
                unit="°C"
                min={20}
                max={35}
                status={getDataStatus(data.temperature, 20, 35)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                  </svg>
                }
              />
              
              <SensorCard
                title="Humidity"
                value={data.humidity}
                unit="%"
                min={40}
                max={90}
                status={getDataStatus(data.humidity, 40, 90)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c-4.97 0-9-7-9-11a9 9 0 0 1 18 0c0 4-4.03 11-9 11Z"></path>
                  </svg>
                }
              />
            </div>

            <h3 className="text-2xl font-bold mt-16 mb-6 text-white">Farm Overview</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatedCounter
                title="Total Eggs Today"
                targetValue={data.totalEggsToday}
                unit="eggs"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c-4.97 0-9-7-9-11a9 9 0 0 1 18 0c0 4-4.03 11-9 11z" />
                  </svg>
                }
              />
              
              <AnimatedCounter
                title="Active Sensors"
                targetValue={data.activeSensors}
                unit="units"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <path d="M12 20h.01"></path>
                  </svg>
                }
              />
              
              <AnimatedCounter
                title="Chickens"
                targetValue={data.chickens}
                unit="birds"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  </svg>
                }
              />
              
              <AnimatedCounter
                title="Avg. Farm Temp"
                targetValue={25}
                unit="°C"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                  </svg>
                }
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LiveDataSection;
