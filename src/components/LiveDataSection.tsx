import React, { useState, useCallback, useEffect } from 'react';
import SensorCard from './SensorCard';
import { SensorData, getDataStatus, useSensorData } from '@/hooks/useSensorData';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/components/ui/use-toast';
import { RefreshCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const alertAudio = typeof Audio !== "undefined" ? new Audio('/alert.mp3') : null;

const LiveDataSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { data: initialSensorData, loading: initialLoading } = useSensorData();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshInterval, setRefreshInterval] = useState(300000);
  const [loading, setLoading] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 🆕 Random feed & water quantity values
  const feedQuantity = Math.floor(Math.random() * 100) + 50;     // 50–150 kg
  const waterQuantity = Math.floor(Math.random() * 200) + 100;   // 100–300 liters

  const checkThresholds = (data: SensorData) => {
    if (data.co2 > 1000 || data.ammonia > 50) {
      let message = '';
      if (data.co2 > 1000) message += `High CO₂ detected: ${data.co2} ppm. `;
      if (data.ammonia > 50) message += `High Ammonia detected: ${data.ammonia} ppm.`;
      setAlertMessage(message);
      if (alertAudio) alertAudio.play();
      setTimeout(() => setAlertMessage(null), 10000);
    }
  };

  const fetchLatestData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: latestData, error } = await supabase
        .from('sensor_data')
        .select('temperature, humidity, carbon_dioxide, ammonia, timestamp')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (latestData && latestData.length > 0) {
        const newData = {
          ...sensorData,
          temperature: latestData[0].temperature || sensorData.temperature,
          humidity: latestData[0].humidity || sensorData.humidity,
          co2: latestData[0].carbon_dioxide || sensorData.co2,
          ammonia: latestData[0].ammonia || sensorData.ammonia,
        };
        setSensorData(newData);
        setLastUpdated(new Date());
        checkThresholds(newData);
      }
    } catch (error) {
      console.error("Failed to fetch latest sensor data:", error);
    } finally {
      setLoading(false);
    }
  }, [sensorData]);

  useEffect(() => {
    const storedInterval = localStorage.getItem('dataCollectionInterval');
    if (storedInterval) {
      switch (storedInterval) {
        case '5sec': setRefreshInterval(5000); break;
        case '5min': setRefreshInterval(300000); break;
        case '15min': setRefreshInterval(900000); break;
        case '30min': setRefreshInterval(1800000); break;
        case '60min': setRefreshInterval(3600000); break;
        default: setRefreshInterval(300000);
      }
    }
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      setSensorData(initialSensorData);
    }
  }, [initialLoading, initialSensorData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLatestData();
      toast({
        title: t('dataRefreshed'),
        description: t('liveDataUpdated'),
      });
    }, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchLatestData, refreshInterval, t]);

  useEffect(() => {
    const checkSettings = () => {
      const storedInterval = localStorage.getItem('dataCollectionInterval');
      if (storedInterval) {
        switch (storedInterval) {
          case '5sec': setRefreshInterval(5000); break;
          case '5min': setRefreshInterval(300000); break;
          case '15min': setRefreshInterval(900000); break;
          case '30min': setRefreshInterval(1800000); break;
          case '60min': setRefreshInterval(3600000); break;
          default: setRefreshInterval(300000);
        }
      }
    };
    const settingsChecker = setInterval(checkSettings, 1000);
    return () => clearInterval(settingsChecker);
  }, []);

  const manualRefresh = async () => {
    await fetchLatestData();
    toast({
      title: t('dataRefreshed'),
      description: t('liveDataUpdated'),
    });
  };

  return (
    <section className="relative py-16 z-10" id="live-data">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{t('liveDataTitle')}</h2>
          <p className="text-xl">{t('liveDataSubtitle')}</p>
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

        {alertMessage && (
          <div className="mb-6 p-4 text-red-800 bg-red-200 border border-red-300 rounded-md text-center font-semibold">
            🚨 {alertMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SensorCard
            title={t('temperature')}
            value={sensorData.temperature}
            unit="°C"
            min={20}
            max={35}
            status={getDataStatus(sensorData.temperature, 20, 35)}
            icon={<span className="text-red-500">🌡️</span>}
          />
          <SensorCard
            title={t('humidity')}
            value={sensorData.humidity}
            unit="%"
            min={40}
            max={90}
            status={getDataStatus(sensorData.humidity, 40, 90)}
            icon={<span className="text-blue-500">💧</span>}
          />
          <SensorCard
            title={t('co2Level')}
            value={sensorData.co2}
            unit="ppm"
            min={300}
            max={1000}
            status={getDataStatus(sensorData.co2, 300, 1000)}
            icon={<span className="text-gray-500">☁️</span>}
          />
          <SensorCard
            title={t('ammoniaLevel')}
            value={sensorData.ammonia}
            unit="ppm"
            min={5}
            max={50}
            status={getDataStatus(sensorData.ammonia, 5, 50)}
            icon={<span className="text-yellow-500">⚠️</span>}
          />

          {/* 🆕 Feed Quantity Card */}
          <SensorCard
            title="Feed Quantity"
            value={feedQuantity}
            unit="kg"
            min={50}
            max={150}
            status={getDataStatus(feedQuantity, 50, 150)}
            icon={<span className="text-green-500">🟩</span>}
          />

          {/* 🆕 Water Quantity Card */}
          <SensorCard
            title="Water Quantity"
            value={waterQuantity}
            unit="liters"
            min={100}
            max={300}
            status={getDataStatus(waterQuantity, 100, 300)}
            icon={<span className="text-blue-400">💧</span>}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDataSection;
