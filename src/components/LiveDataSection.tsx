
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
  const [selectedFarmId, setSelectedFarmId] = useState<string>('farm1');

  // Get selected farm from localStorage
  useEffect(() => {
    const storedFarmId = localStorage.getItem('selectedFarmId');
    if (storedFarmId) {
      setSelectedFarmId(storedFarmId);
    }
  }, []);

  // Function to generate mock data based on farm ID
  const generateMockData = useCallback((farmId: string) => {
    // Farm-specific data ranges
    const farmRanges = {
      farm1: { // Green Valley Farm
        temp: { min: 20, max: 30 },
        humidity: { min: 50, max: 80 },
        co2: { min: 400, max: 1500 },
        ammonia: { min: 2, max: 20 },
        eggProduction: { min: 0.6, max: 0.9 },
        totalEggs: { min: 150, max: 300 },
        activeSensors: { min: 5, max: 10 },
        chickens: { min: 200, max: 500 },
      },
      farm2: { // Sunrise Poultry
        temp: { min: 18, max: 25 },
        humidity: { min: 60, max: 85 },
        co2: { min: 350, max: 1000 },
        ammonia: { min: 1, max: 15 },
        eggProduction: { min: 0.5, max: 0.8 },
        totalEggs: { min: 100, max: 250 },
        activeSensors: { min: 4, max: 8 },
        chickens: { min: 150, max: 300 },
      },
      farm3: { // Golden Eggs Farm
        temp: { min: 22, max: 32 },
        humidity: { min: 45, max: 75 },
        co2: { min: 450, max: 1700 },
        ammonia: { min: 3, max: 25 },
        eggProduction: { min: 0.7, max: 0.95 },
        totalEggs: { min: 200, max: 350 },
        activeSensors: { min: 6, max: 12 },
        chickens: { min: 250, max: 550 },
      },
      farm4: { // River View Poultry
        temp: { min: 19, max: 28 },
        humidity: { min: 55, max: 78 },
        co2: { min: 380, max: 1300 },
        ammonia: { min: 2, max: 18 },
        eggProduction: { min: 0.55, max: 0.85 },
        totalEggs: { min: 130, max: 270 },
        activeSensors: { min: 5, max: 9 },
        chickens: { min: 180, max: 400 },
      },
      farm5: { // Mountain Top Farm
        temp: { min: 17, max: 26 },
        humidity: { min: 65, max: 90 },
        co2: { min: 420, max: 1600 },
        ammonia: { min: 4, max: 22 },
        eggProduction: { min: 0.65, max: 0.9 },
        totalEggs: { min: 170, max: 320 },
        activeSensors: { min: 7, max: 14 },
        chickens: { min: 220, max: 480 },
      }
    };

    // Default to farm1 if farmId doesn't match any known farm
    const range = farmRanges[farmId as keyof typeof farmRanges] || farmRanges.farm1;
    
    const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    return {
      temperature: randomInRange(range.temp.min, range.temp.max),
      humidity: randomInRange(range.humidity.min, range.humidity.max),
      co2: randomInRange(range.co2.min, range.co2.max),
      ammonia: randomInRange(range.ammonia.min, range.ammonia.max),
      eggProduction: parseFloat((Math.random() * (range.eggProduction.max - range.eggProduction.min) + range.eggProduction.min).toFixed(2)),
      totalEggsToday: randomInRange(range.totalEggs.min, range.totalEggs.max),
      activeSensors: randomInRange(range.activeSensors.min, range.activeSensors.max),
      chickens: randomInRange(range.chickens.min, range.chickens.max),
    };
  }, []);

  // Check for farm selection changes
  useEffect(() => {
    const checkFarmSelection = () => {
      const storedFarmId = localStorage.getItem('selectedFarmId');
      if (storedFarmId && storedFarmId !== selectedFarmId) {
        setSelectedFarmId(storedFarmId);
      }
    };
    
    // Check every second for farm selection changes
    const farmChecker = setInterval(checkFarmSelection, 1000);
    
    return () => clearInterval(farmChecker);
  }, [selectedFarmId]);

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
        setSensorData(generateMockData(selectedFarmId));
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    // Fetch data immediately on mount or when farmId changes
    fetchData();

    // Set up interval for refreshing data
    const intervalId = setInterval(() => {
      fetchData();
      toast({
        title: t('dataRefreshed'),
        description: t('liveDataUpdated'),
      });
    }, refreshInterval);

    // Clean up interval on unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [generateMockData, refreshInterval, t, selectedFarmId]);

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
    setSensorData(generateMockData(selectedFarmId));
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
