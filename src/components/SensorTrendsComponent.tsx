
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { ChartLine } from 'lucide-react';

const SensorTrendsComponent: React.FC = () => {
  const { theme } = useTheme();
  
  // Sample historical data for the last 24 hours
  const historicalData = [
    { time: '00:00', co2: 750, ammonia: 12, temperature: 23, humidity: 62 },
    { time: '02:00', co2: 800, ammonia: 15, temperature: 23, humidity: 64 },
    { time: '04:00', co2: 830, ammonia: 17, temperature: 22, humidity: 65 },
    { time: '06:00', co2: 780, ammonia: 14, temperature: 23, humidity: 63 },
    { time: '08:00', co2: 820, ammonia: 16, temperature: 24, humidity: 62 },
    { time: '10:00', co2: 900, ammonia: 20, temperature: 26, humidity: 58 },
    { time: '12:00', co2: 950, ammonia: 22, temperature: 28, humidity: 54 },
    { time: '14:00', co2: 980, ammonia: 25, temperature: 29, humidity: 52 },
    { time: '16:00', co2: 920, ammonia: 21, temperature: 27, humidity: 56 },
    { time: '18:00', co2: 850, ammonia: 18, temperature: 25, humidity: 60 },
    { time: '20:00', co2: 800, ammonia: 15, temperature: 24, humidity: 63 },
    { time: '22:00', co2: 780, ammonia: 13, temperature: 23, humidity: 64 },
    { time: '24:00', co2: 760, ammonia: 12, temperature: 23, humidity: 63 },
  ];
  
  // Chart configuration
  const chartConfig = {
    co2: { label: "CO2 (ppm)", theme: { light: "#8884d8", dark: "#8884d8" } },
    ammonia: { label: "Ammonia (ppm)", theme: { light: "#F44336", dark: "#F44336" } },
    temperature: { label: "Temperature (°C)", theme: { light: "#FF9800", dark: "#FF9800" } },
    humidity: { label: "Humidity (%)", theme: { light: "#2196F3", dark: "#2196F3" } },
  };
  
  const cardClass = theme === 'light' 
    ? 'p-6 bg-white border border-gray-200 shadow-md rounded-lg'
    : 'glass-morphism p-6';

  return (
    <Card className={cardClass}>
      <div className="flex items-center gap-2 mb-6">
        <ChartLine className="h-6 w-6 text-farm-green" />
        <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          24-Hour Sensor Trends
        </h3>
      </div>
      
      <div className="h-[400px]">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historicalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                stroke={theme === 'light' ? '#6b7280' : '#9ca3af'}
                label={{ 
                  value: 'Time (hours)', 
                  position: 'insideBottomRight', 
                  offset: -10,
                  fill: theme === 'light' ? '#6b7280' : '#9ca3af'
                }} 
              />
              <YAxis 
                tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                stroke={theme === 'light' ? '#6b7280' : '#9ca3af'}
                label={{ 
                  value: 'Value', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: theme === 'light' ? '#6b7280' : '#9ca3af'
                }} 
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Line 
                type="monotone" 
                dataKey="co2" 
                stroke="var(--color-co2)" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="co2"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="ammonia" 
                stroke="var(--color-ammonia)" 
                strokeWidth={2} 
                activeDot={{ r: 6 }}
                name="ammonia"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="var(--color-temperature)" 
                strokeWidth={2} 
                activeDot={{ r: 6 }}
                name="temperature"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="var(--color-humidity)" 
                strokeWidth={2} 
                activeDot={{ r: 6 }}
                name="humidity"
                dot={false}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {/* Stats summary */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/20'}`}>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>Average CO2</p>
          <p className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {Math.round(historicalData.reduce((sum, item) => sum + item.co2, 0) / historicalData.length)} ppm
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'}`}>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-red-700' : 'text-red-300'}`}>Average Ammonia</p>
          <p className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {Math.round(historicalData.reduce((sum, item) => sum + item.ammonia, 0) / historicalData.length)} ppm
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-orange-700' : 'text-orange-300'}`}>Average Temp</p>
          <p className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {Math.round(historicalData.reduce((sum, item) => sum + item.temperature, 0) / historicalData.length)}°C
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>Average Humidity</p>
          <p className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {Math.round(historicalData.reduce((sum, item) => sum + item.humidity, 0) / historicalData.length)}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SensorTrendsComponent;
