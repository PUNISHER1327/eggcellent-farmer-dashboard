
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const DistributionTab: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Data for distribution chart
  const distributionData = [
    { name: 'Optimal', value: 70 },
    { name: 'Warning', value: 20 },
    { name: 'Critical', value: 10 },
  ];
  
  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];
  
  const chartConfig = {
    optimal: { label: "Optimal", theme: { light: "#4CAF50", dark: "#4CAF50" } },
    warning: { label: "Warning", theme: { light: "#FFC107", dark: "#FFC107" } },
    critical: { label: "Critical", theme: { light: "#F44336", dark: "#F44336" } },
  };
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4 bg-gray-800 border border-gray-700';
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('sensorReadingDistribution')}
        </h3>
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
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('farmPerformanceScore')}
        </h3>
        <div className={`text-6xl font-bold text-center my-12 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          86<span className={`text-xl ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>/100</span>
        </div>
        <p className={`text-center ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          {t('performingAboveAverage')}
        </p>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-farm-green font-semibold">{t('environment')}</span>
            <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>90/100</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-farm-yellow font-semibold">{t('production')}</span>
            <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>82/100</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-farm-green font-semibold">{t('health')}</span>
            <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>88/100</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-farm-yellow font-semibold">{t('efficiency')}</span>
            <span className={theme === 'light' ? 'text-gray-700' : 'text-white/70'}>84/100</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DistributionTab;
