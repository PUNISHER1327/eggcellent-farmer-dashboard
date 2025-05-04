
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import SensorTrendsComponent from '../SensorTrendsComponent';
import EggProductionTrends from '../EggProductionTrends';

const TrendsTab: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SensorTrendsComponent />
      <EggProductionTrends />
    </div>
  );
};

export default TrendsTab;
