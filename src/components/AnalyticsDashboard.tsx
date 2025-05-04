
import React from 'react';
import ChartSection from './ChartSection';
import SensorTrendsComponent from './SensorTrendsComponent';
import EggProductionTrends from './EggProductionTrends';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '@/components/ui/card';
import { BarChart3, LineChart, PieChart, Settings, Activity, FileSpreadsheet } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section id="analytics" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gradient'}`}>
          Advanced Analytics
        </h2>
        <p className={`text-lg mb-10 ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          In-depth analysis and forecasting to optimize your farm performance
        </p>
        
        {/* Dashboard navigation tabs */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <BarChart3 className="h-5 w-5 text-farm-green" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Overview</span>
          </Card>
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <LineChart className="h-5 w-5 text-farm-yellow" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Trends</span>
          </Card>
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <PieChart className="h-5 w-5 text-farm-orange" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Distribution</span>
          </Card>
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <Activity className="h-5 w-5 text-blue-500" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Performance</span>
          </Card>
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <FileSpreadsheet className="h-5 w-5 text-purple-500" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Reports</span>
          </Card>
          <Card className={`${theme === 'light' ? 'bg-white border-gray-200' : 'glass-morphism'} p-4 flex items-center gap-2 cursor-pointer transition-all hover:scale-105`}>
            <Settings className="h-5 w-5 text-gray-500" />
            <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Settings</span>
          </Card>
        </div>
        
        <div className="space-y-10">
          <ChartSection />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SensorTrendsComponent />
            <EggProductionTrends />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
