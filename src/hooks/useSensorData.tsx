
import { useEffect, useState } from 'react';
import { useFarmSelection } from './useFarmSelection';

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

// Farm data ranges for consistent but unique sensor values
const farmDataRanges = {
  'farm1': { // Green Valley Farm
    temperature: { min: 22, max: 28 },
    humidity: { min: 55, max: 65 },
    co2: { min: 500, max: 800 },
    ammonia: { min: 8, max: 15 },
    eggProduction: { min: 0.7, max: 0.9 },
    chickens: { min: 4500, max: 5000 }
  },
  'farm2': { // Sunrise Poultry
    temperature: { min: 19, max: 25 },
    humidity: { min: 60, max: 70 },
    co2: { min: 400, max: 600 },
    ammonia: { min: 5, max: 12 },
    eggProduction: { min: 0.6, max: 0.8 },
    chickens: { min: 3200, max: 3800 }
  },
  'farm3': { // Golden Eggs Farm
    temperature: { min: 24, max: 30 },
    humidity: { min: 50, max: 60 },
    co2: { min: 600, max: 900 },
    ammonia: { min: 10, max: 18 },
    eggProduction: { min: 0.75, max: 0.95 },
    chickens: { min: 5800, max: 6500 }
  },
  'farm4': { // River View Poultry
    temperature: { min: 20, max: 26 },
    humidity: { min: 58, max: 68 },
    co2: { min: 450, max: 700 },
    ammonia: { min: 7, max: 14 },
    eggProduction: { min: 0.65, max: 0.85 },
    chickens: { min: 4500, max: 5000 }
  },
  'farm5': { // Mountain Top Farm
    temperature: { min: 18, max: 24 },
    humidity: { min: 65, max: 75 },
    co2: { min: 500, max: 750 },
    ammonia: { min: 9, max: 16 },
    eggProduction: { min: 0.55, max: 0.75 },
    chickens: { min: 2800, max: 3500 }
  }
};

// Generate farm-specific sensor data
const generateFarmData = (farmId: string): SensorData => {
  const ranges = farmDataRanges[farmId as keyof typeof farmDataRanges] || farmDataRanges.farm1;
  
  const getRandomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const temperature = getRandomInRange(ranges.temperature.min, ranges.temperature.max);
  const humidity = getRandomInRange(ranges.humidity.min, ranges.humidity.max);
  const co2 = getRandomInRange(ranges.co2.min, ranges.co2.max);
  const ammonia = getRandomInRange(ranges.ammonia.min, ranges.ammonia.max);
  const eggProduction = parseFloat((Math.random() * (ranges.eggProduction.max - ranges.eggProduction.min) + ranges.eggProduction.min).toFixed(2));
  const chickens = getRandomInRange(ranges.chickens.min, ranges.chickens.max);
  const totalEggsToday = Math.floor(chickens * eggProduction);
  const activeSensors = Math.floor(Math.random() * 6) + 5; // 5-10 active sensors

  return {
    temperature,
    humidity,
    co2,
    ammonia,
    eggProduction,
    totalEggsToday,
    activeSensors,
    chickens
  };
};

export const useSensorData = () => {
  const { selectedFarmId } = useFarmSelection();
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
        // Mock data for demonstration based on selected farm
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        setData(generateFarmData(selectedFarmId));
      } catch (error) {
        console.error("Failed to fetch sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFarmId]);

  return { data, loading };
};
