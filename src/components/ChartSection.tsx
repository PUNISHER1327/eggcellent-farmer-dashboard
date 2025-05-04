
import React from 'react';
import { Card } from '@/components/ui/card';
import { useSensorData } from '@/hooks/useSensorData';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useTheme } from '@/hooks/useTheme';

const ChartSection: React.FC = () => {
  const { data } = useSensorData();
  const { theme } = useTheme();
  
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
  
  // Data for distribution chart
  const distributionData = [
    { name: 'Optimal', value: 70 },
    { name: 'Warning', value: 20 },
    { name: 'Critical', value: 10 },
  ];
  
  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];
  
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
    optimal: { label: "Optimal", theme: { light: "#4CAF50", dark: "#4CAF50" } },
    warning: { label: "Warning", theme: { light: "#FFC107", dark: "#FFC107" } },
    critical: { label: "Critical", theme: { light: "#F44336", dark: "#F44336" } },
  };
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4';
    
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Average Temperature</h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{averageTemp}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>°C</span>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Average Humidity</h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{averageHumidity}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>%</span>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Average Daily Eggs</h3>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{avgEggs}</span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>eggs</span>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Temperature & Humidity Trends</h3>
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
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Weekly Egg Production</h3>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Sensor Reading Distribution</h3>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name.toLowerCase()} />
                    ))}
                  </Pie>
                  <Legend />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
        
        <Card className={cardClass}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Farm Performance Score</h3>
          <div className={`text-6xl font-bold text-center my-12 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            86<span className={`text-xl ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>/100</span>
          </div>
          <p className={`text-center ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>Your farm is performing above the average for your region</p>
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-farm-green font-semibold">Environment</span>
              <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>90/100</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-farm-yellow font-semibold">Production</span>
              <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>82/100</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-farm-green font-semibold">Health</span>
              <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>88/100</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-farm-yellow font-semibold">Efficiency</span>
              <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>84/100</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChartSection;
