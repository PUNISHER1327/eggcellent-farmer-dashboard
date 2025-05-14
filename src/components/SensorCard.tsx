import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SensorCardProps = {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'good' | 'warning' | 'danger';
  icon: React.ReactNode;
};

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  min,
  max,
  status,
  icon,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  let statusColor = '';
  switch (status) {
    case 'good':
      statusColor = 'bg-farm-green';
      break;
    case 'warning':
      statusColor = 'bg-farm-yellow';
      break;
    case 'danger':
      statusColor = 'bg-farm-red';
      break;
    default:
      statusColor = 'bg-farm-green';
  }

  return (
    <Card className="p-6 glass-morphism sensor-card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="p-2 rounded-full bg-secondary/50">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
        </div>
        <span className={`h-3 w-3 rounded-full ${statusColor}`}></span>
      </div>
      
      <Progress value={percentage} className="h-2 mt-2" />
      
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </Card>
  );
};

export default SensorCard;
