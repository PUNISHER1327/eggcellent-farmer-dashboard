
import React from 'react';
import ChartSection from './ChartSection';
import SensorTrendsComponent from './SensorTrendsComponent';
import EggProductionTrends from './EggProductionTrends';
import { useTheme } from '@/hooks/useTheme';

const AnalyticsDashboard: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section id="analytics" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Advanced Analytics</h2>
        <p className={`text-lg mb-10 ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          In-depth analysis and forecasting to optimize your farm performance
        </p>
        
        <div className="space-y-10">
          <ChartSection />
          
          <div className="grid grid-cols-1 gap-8">
            <SensorTrendsComponent />
            <EggProductionTrends />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
