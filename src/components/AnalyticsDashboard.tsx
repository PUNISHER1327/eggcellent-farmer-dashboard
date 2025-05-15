
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, LineChart, PieChart, Settings, Activity, FileSpreadsheet } from 'lucide-react';

// Import tab components
import OverviewTab from './dashboard/OverviewTab';
import TrendsTab from './dashboard/TrendsTab';
import DistributionTab from './dashboard/DistributionTab';
import PerformanceTab from './dashboard/PerformanceTab';
import ReportsTab from './dashboard/ReportsTab';
import SettingsTab from './dashboard/SettingsTab';

const AnalyticsDashboard: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <section id="analytics" className={`py-20 relative ${theme === 'light' ? 'bg-soft-blue' : 'bg-gray-900'}`}>
      {/* Simple background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-100/5 dark:to-indigo-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gradient'}`}>
          {t('advancedAnalytics')}
        </h2>
        <p className={`text-lg mb-10 ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          {t('analyticsDescription')}
        </p>
        
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className={`flex flex-nowrap gap-1 mb-6 p-1 ${
              theme === 'light' 
                ? 'bg-white/80 backdrop-blur-sm' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <TabsTrigger 
                value="overview"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'overview' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>{t('overview')}</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="trends"
                onClick={() => setActiveTab('trends')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'trends' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <LineChart className="h-4 w-4" />
                <span>{t('trends')}</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="distribution"
                onClick={() => setActiveTab('distribution')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'distribution' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <PieChart className="h-4 w-4" />
                <span>{t('distribution')}</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="performance"
                onClick={() => setActiveTab('performance')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'performance' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <Activity className="h-4 w-4" />
                <span>{t('performance')}</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reports"
                onClick={() => setActiveTab('reports')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'reports' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>{t('reports')}</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 flex-1 ${
                  activeTab === 'settings' 
                    ? theme === 'light' 
                      ? 'bg-white data-[state=active]:text-gray-800 shadow-sm' 
                      : 'bg-gray-700 data-[state=active]:text-white'
                    : theme === 'light'
                      ? 'hover:bg-white/80 text-gray-600' 
                      : 'hover:bg-gray-700/70 text-gray-300'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>{t('settings')}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="space-y-10">
            <TabsContent value="overview" className="mt-6">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="trends" className="mt-6">
              <TrendsTab />
            </TabsContent>
            
            <TabsContent value="distribution" className="mt-6">
              <DistributionTab />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <PerformanceTab />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6">
              <ReportsTab />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <SettingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
