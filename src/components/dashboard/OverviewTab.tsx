
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const OverviewTab: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Create data for time series chart
  const timeSeriesData = [
    { name: '00:00', temperature: 24, humidity: 65 },
    { name: '04:00', temperature: 23, humidity: 68 },
    { name: '08:00', temperature: 25, humidity: 63 },
    { name: '12:00', temperature: 28, humidity: 55 },
    { name: '16:00', temperature: 27, humidity: 58 },
    { name: '20:00', temperature: 25, humidity: 62 },
    { name: '24:00', temperature: 24, humidity: 64 },
  ];
  
  // Data for egg production trend
  const eggProductionData = [
    { day: 'Mon', production: 480 },
    { day: 'Tue', production: 520 },
    { day: 'Wed', production: 550 },
    { day: 'Thu', production: 500 },
    { day: 'Fri', production: 600 },
    { day: 'Sat', production: 450 },
    { day: 'Sun', production: 400 },
  ];
  
  // Calculate summary stats
  const averageTemp = Math.round((timeSeriesData.reduce((sum, item) => sum + item.temperature, 0) / timeSeriesData.length) * 10) / 10;
  const averageHumidity = Math.round((timeSeriesData.reduce((sum, item) => sum + item.humidity, 0) / timeSeriesData.length) * 10) / 10;
  const totalEggs = eggProductionData.reduce((sum, item) => sum + item.production, 0);
  const avgEggs = Math.round(totalEggs / eggProductionData.length);
  
  // Chart config
  const chartConfig = {
    temp: { label: "Temperature", theme: { light: "#4CAF50", dark: "#4CAF50" } },
    humidity: { label: "Humidity", theme: { light: "#0EA5E9", dark: "#33C3F0" } },
    production: { label: "Egg Production", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  };
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4 bg-gray-800 border border-gray-700';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('averageTemperature')}
          </h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{averageTemp}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>°C</span>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('averageHumidity')}
          </h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{averageHumidity}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>%</span>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('averageDailyEggs')}
          </h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{avgEggs}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>eggs</span>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('temperatureHumidityTrends')}
          </h3>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                    stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                  />
                  <YAxis 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                    stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />
                  <Line type="monotone" dataKey="temperature" stroke="var(--color-temp)" strokeWidth={2} name="temp" dot={false} />
                  <Line type="monotone" dataKey="humidity" stroke="var(--color-humidity)" strokeWidth={2} name="humidity" dot={false} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('weeklyEggProduction')}
          </h3>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eggProductionData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                    stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                  />
                  <YAxis 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                    stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />
                  <Bar dataKey="production" fill="var(--color-production)" name="production" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
