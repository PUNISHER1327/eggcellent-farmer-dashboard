
import React, { useState, useEffect, useCallback } from 'react';
import SensorCard from './SensorCard';
import { SensorData, getDataStatus } from '@/hooks/useSensorData';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/components/ui/use-toast';
import { RefreshCcw } from 'lucide-react';

const LiveDataSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [sensorData, setSensorData] = useState<SensorData>({
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
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshInterval, setRefreshInterval] = useState(300000); // Default to 5 minutes

  // Function to generate mock data
  const generateMockData = useCallback(() => {
    return {
      temperature: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
      humidity: Math.floor(Math.random() * (80 - 50 + 1)) + 50,
      co2: Math.floor(Math.random() * (1500 - 400 + 1)) + 400,
      ammonia: Math.floor(Math.random() * (20 - 2 + 1)) + 2,
      eggProduction: parseFloat((Math.random() * (0.9 - 0.6) + 0.6).toFixed(2)),
      totalEggsToday: Math.floor(Math.random() * (300 - 150 + 1)) + 150,
      activeSensors: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
      chickens: Math.floor(Math.random() * (500 - 200 + 1)) + 200,
    };
  }, []);

  // Load refresh interval from localStorage
  useEffect(() => {
    const storedInterval = localStorage.getItem('dataCollectionInterval');
    if (storedInterval) {
      switch (storedInterval) {
        case '5sec':
          setRefreshInterval(5000);
          break;
        case '5min':
          setRefreshInterval(300000);
          break;
        case '15min':
          setRefreshInterval(900000);
          break;
        case '30min':
          setRefreshInterval(1800000);
          break;
        case '60min':
          setRefreshInterval(3600000);
          break;
        default:
          setRefreshInterval(300000); // Default to 5 minutes
      }
    }
  }, []);

  // Data fetch effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        setSensorData(generateMockData());
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Set up interval for refreshing data
    const intervalId = setInterval(() => {
      fetchData();
      toast({
        title: t('dataRefreshed'),
        description: t('liveDataUpdated'),
      });
    }, refreshInterval);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [generateMockData, refreshInterval, t]);

  // Monitor localStorage for changes to refresh interval
  useEffect(() => {
    const checkSettings = () => {
      const storedInterval = localStorage.getItem('dataCollectionInterval');
      if (storedInterval) {
        switch (storedInterval) {
          case '5sec':
            setRefreshInterval(5000);
            break;
          case '5min':
            setRefreshInterval(300000);
            break;
          case '15min':
            setRefreshInterval(900000);
            break;
          case '30min':
            setRefreshInterval(1800000);
            break;
          case '60min':
            setRefreshInterval(3600000);
            break;
          default:
            setRefreshInterval(300000); // Default to 5 minutes
        }
      }
    };

    // Check for setting changes every second
    const settingsChecker = setInterval(checkSettings, 1000);
    
    return () => clearInterval(settingsChecker);
  }, []);

  const manualRefresh = async () => {
    setLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    setSensorData(generateMockData());
    setLastUpdated(new Date());
    setLoading(false);
    
    toast({
      title: t('dataRefreshed'),
      description: t('liveDataUpdated'),
    });
  };

  return (
    <section className="relative py-16 z-10" id="live-data">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            {t('liveDataTitle')}
          </h2>
          <p className="text-xl">
            {t('liveDataSubtitle')}
          </p>
          <div className="flex items-center justify-center mt-3 space-x-2">
            <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              {t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
            </span>
            <button 
              onClick={manualRefresh}
              className="inline-flex items-center justify-center rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SensorCard
            title={t('temperature')}
            value={sensorData.temperature}
            unit="°C"
            min={18}
            max={30}
            status={getDataStatus(sensorData.temperature, 18, 30)}
            icon={<span className="text-red-500">🌡️</span>}
          />
          
          <SensorCard
            title={t('humidity')}
            value={sensorData.humidity}
            unit="%"
            min={50}
            max={70}
            status={getDataStatus(sensorData.humidity, 50, 70)}
            icon={<span className="text-blue-500">💧</span>}
          />
          
          <SensorCard
            title={t('co2Level')}
            value={sensorData.co2}
            unit="ppm"
            min={350}
            max={1000}
            status={getDataStatus(sensorData.co2, 350, 1000)}
            icon={<span className="text-gray-500">☁️</span>}
          />
          
          <SensorCard
            title={t('ammoniaLevel')}
            value={sensorData.ammonia}
            unit="ppm"
            min={0}
            max={15}
            status={getDataStatus(sensorData.ammonia, 0, 15)}
            icon={<span className="text-yellow-500">⚠️</span>}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDataSection;
