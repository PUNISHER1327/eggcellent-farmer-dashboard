import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTheme } from '@/hooks/useTheme';

type EggProductionCardProps = {
  value: number;
  maxValue: number;
  status: 'low' | 'medium' | 'high';
};

const EggProductionCard: React.FC<EggProductionCardProps> = ({
  value,
  maxValue,
  status,
}) => {
  const { theme } = useTheme();
  const percentage = (value / maxValue) * 100;
  
  let statusColor = '';
  let statusText = '';
  
  switch (status) {
    case 'high':
      statusColor = 'bg-farm-green';
      statusText = 'High';
      break;
    case 'medium':
      statusColor = 'bg-farm-yellow';
      statusText = 'Medium';
      break;
    case 'low':
      statusColor = 'bg-farm-red';
      statusText = 'Low';
      break;
    default:
      statusColor = 'bg-farm-green';
      statusText = 'Normal';
  }

  const cardClass = theme === 'light' 
    ? 'p-6 bg-white border border-gray-200 shadow-md rounded-lg'
    : 'p-6 glass-morphism sensor-card-hover';

  const textClass = theme === 'light' ? 'text-gray-800' : 'text-white';

  return (
    <Card className={cardClass}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${textClass}`}>Egg Production</h3>
        <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-secondary/50'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={theme === 'light' ? 'text-gray-600' : 'text-white'}>
            <path d="M12 22c-4.97 0-9-7-9-11a9 9 0 0 1 18 0c0 4-4.03 11-9 11z" />
          </svg>
        </div>
      </div>
      
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold ${textClass}`}>{value.toFixed(1)}</span>
          <span className={`text-sm ml-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>eggs/hen/day</span>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColor} text-white`}>{statusText}</span>
      </div>
      
      <Progress value={percentage} className="h-2" />
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-300'}>0 eggs/hen/day</span>
        <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-300'}>{maxValue} eggs/hen/day</span>
      </div>
    </Card>
  );
};

export default EggProductionCard;
