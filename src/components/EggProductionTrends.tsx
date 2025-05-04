
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { ChartBarBig } from 'lucide-react';

const EggProductionTrends: React.FC = () => {
  const { theme } = useTheme();

  // Sample data for egg production over the last 30 days
  const eggData = [
    { day: '1', actual: 420, predicted: null, optimal: 500 },
    { day: '2', actual: 450, predicted: null, optimal: 500 },
    { day: '3', actual: 480, predicted: null, optimal: 500 },
    { day: '4', actual: 460, predicted: null, optimal: 500 },
    { day: '5', actual: 500, predicted: null, optimal: 500 },
    { day: '6', actual: 520, predicted: null, optimal: 500 },
    { day: '7', actual: 490, predicted: null, optimal: 500 },
    { day: '8', actual: 510, predicted: null, optimal: 500 },
    { day: '9', actual: 530, predicted: null, optimal: 500 },
    { day: '10', actual: 525, predicted: null, optimal: 500 },
    { day: '11', actual: 540, predicted: null, optimal: 500 },
    { day: '12', actual: 535, predicted: null, optimal: 500 },
    { day: '13', actual: 550, predicted: null, optimal: 500 },
    { day: '14', actual: 560, predicted: null, optimal: 500 },
    { day: '15', actual: 570, predicted: null, optimal: 500 },
    { day: '16', actual: 550, predicted: null, optimal: 500 },
    { day: '17', actual: 560, predicted: null, optimal: 500 },
    { day: '18', actual: 540, predicted: null, optimal: 500 },
    { day: '19', actual: 530, predicted: null, optimal: 500 },
    { day: '20', actual: 550, predicted: null, optimal: 500 },
    { day: '21', actual: 540, predicted: null, optimal: 500 },
    { day: '22', actual: 530, predicted: 535, optimal: 500 },
    { day: '23', actual: 550, predicted: 545, optimal: 500 },
    { day: '24', actual: null, predicted: 555, optimal: 500 },
    { day: '25', actual: null, predicted: 560, optimal: 500 },
    { day: '26', actual: null, predicted: 570, optimal: 500 },
    { day: '27', actual: null, predicted: 575, optimal: 500 },
    { day: '28', actual: null, predicted: 580, optimal: 500 },
    { day: '29', actual: null, predicted: 590, optimal: 500 },
    { day: '30', actual: null, predicted: 600, optimal: 500 },
  ];

  const chartConfig = {
    actual: { label: "Actual Production", theme: { light: "#4CAF50", dark: "#4CAF50" } },
    predicted: { label: "Predicted Production", theme: { light: "#9b87f5", dark: "#9b87f5" } },
    optimal: { label: "Optimal Target", theme: { light: "#888888", dark: "#999999" } }
  };

  // Calculate average and trend
  const actualProduction = eggData.filter(item => item.actual).map(item => item.actual);
  const avg = Math.round(actualProduction.reduce((a, b) => (a as number) + (b as number), 0) / actualProduction.length);
  
  // Calculate trend (positive or negative)
  const recentDays = 7;
  const recentProduction = eggData.filter(item => item.actual).slice(-recentDays);
  const firstValue = recentProduction[0]?.actual as number;
  const lastValue = recentProduction[recentProduction.length - 1]?.actual as number;
  const trend = lastValue - firstValue;
  const trendPercent = Math.round((trend / firstValue) * 100);

  return (
    <Card className="glass-morphism p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChartBarBig className="h-6 w-6 text-farm-green" />
          <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Egg Production Trends
          </h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Average</p>
            <p className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{avg} eggs/day</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">7-Day Trend</p>
            <div className="flex items-center gap-1">
              <span className={`font-semibold ${trend >= 0 ? 'text-farm-green' : 'text-farm-red'}`}>
                {trend >= 0 ? '+' : ''}{trendPercent}%
              </span>
              {trend >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-green">
                  <path d="m6 9 6-6 6 6"/>
                  <path d="M6 12h12"/>
                  <path d="M6 15h12"/>
                  <path d="M6 18h12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-red">
                  <path d="m6 15 6 6 6-6"/>
                  <path d="M6 12h12"/>
                  <path d="M6 9h12"/>
                  <path d="M6 6h12"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={eggData}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
              <XAxis 
                dataKey="day" 
                stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                label={{ 
                  value: 'Day', 
                  position: 'insideBottomRight', 
                  offset: -10,
                  fill: theme === 'light' ? '#6b7280' : '#9ca3af'
                }}
              />
              <YAxis stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <ReferenceLine 
                y={500} 
                stroke="var(--color-optimal)" 
                strokeDasharray="3 3" 
                name="optimal"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--color-actual)" 
                fillOpacity={1} 
                fill="url(#colorActual)" 
                name="actual"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="var(--color-predicted)" 
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorPredicted)" 
                name="predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Data Collected</p>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>21 days</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Forecast Range</p>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>9 days</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">Accuracy</p>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>94.2%</p>
        </div>
      </div>
    </Card>
  );
};

export default EggProductionTrends;
