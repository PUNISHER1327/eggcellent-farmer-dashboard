
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { BarChart, Bar, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const PerformanceTab: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const performanceData = [
    { week: 'Week 1', thisWeek: 82, lastWeek: 78 },
    { week: 'Week 2', thisWeek: 85, lastWeek: 80 },
    { week: 'Week 3', thisWeek: 83, lastWeek: 84 },
    { week: 'Week 4', thisWeek: 86, lastWeek: 82 },
  ];

  const improvementData = [
    { area: 'Feed Efficiency', score: 76 },
    { area: 'Water Usage', score: 82 },
    { area: 'Energy Consumption', score: 65 },
    { area: 'Waste Management', score: 78 },
    { area: 'Health Metrics', score: 88 }
  ];

  const chartConfig = {
    thisWeek: { label: "This Week", theme: { light: "#4CAF50", dark: "#4CAF50" } },
    lastWeek: { label: "Last Week", theme: { light: "#9b87f5", dark: "#9b87f5" } },
    score: { label: "Score", theme: { light: "#F44336", dark: "#F44336" } },
  };
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4 bg-gray-800 border border-gray-700';

  return (
    <div className="space-y-8">
      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('farmPerformanceMetrics')}
        </h3>
        <div className="flex items-center justify-center py-8">
          <div className="relative inline-flex">
            <div className={`w-40 h-40 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} flex items-center justify-center`}>
              <div className="w-32 h-32 rounded-full bg-farm-green flex items-center justify-center">
                <span className={`text-4xl font-bold text-white`}>86%</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-farm-yellow text-white text-sm px-2 py-1 rounded-full">
              +4%
            </div>
          </div>
        </div>
        <p className={`text-center mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          {t('overallScore')}
        </p>
      </Card>

      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('weeklyComparison')}
        </h3>
        <div className="h-80">
          <ChartContainer config={chartConfig} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                <XAxis 
                  dataKey="week" 
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
                <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" name="thisWeek" />
                <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" name="lastWeek" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('improvementAreas')}
        </h3>
        <div className="h-80">
          <ChartContainer config={chartConfig} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={improvementData} 
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                <XAxis 
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                  stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                />
                <YAxis 
                  dataKey="area" 
                  type="category" 
                  tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af' }}
                  stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Bar dataKey="score" fill="var(--color-score)" name="score" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceTab;
