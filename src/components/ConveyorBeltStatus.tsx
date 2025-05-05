
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card } from '@/components/ui/card';
import { AlertTriangle, ThumbsUp, ToggleLeft, ToggleRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ConveyorBeltStatus: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [ammoniaLevel, setAmmoniaLevel] = useState(30);
  const [threshold] = useState(25);
  const [isOn, setIsOn] = useState(ammoniaLevel > threshold);
  const [ammoniaHistory, setAmmoniaHistory] = useState<{ time: string, value: number }[]>([]);
  const [autoMode, setAutoMode] = useState(true);

  // Generate initial ammonia history data
  useEffect(() => {
    const now = new Date();
    const initialData = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() - 23 + i);
      return {
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: Math.floor(Math.random() * 15) + 20, // Random value between 20-35
      };
    });
    setAmmoniaHistory(initialData);
  }, []);

  // Simulate ammonia level changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newAmmonia = Math.floor(Math.random() * 20) + 15; // Random value between 15-35
      setAmmoniaLevel(newAmmonia);
      
      // Update history
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setAmmoniaHistory(prev => {
        const newHistory = [...prev, { time: timeString, value: newAmmonia }];
        // Keep only last 24 readings
        if (newHistory.length > 24) {
          return newHistory.slice(-24);
        }
        return newHistory;
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Control conveyor belt based on ammonia level (only in auto mode)
  useEffect(() => {
    if (autoMode) {
      setIsOn(ammoniaLevel > threshold);
    }
  }, [ammoniaLevel, threshold, autoMode]);

  // Handle manual control
  const handleToggleConveyor = () => {
    if (autoMode) {
      // First, switch to manual mode when user tries to toggle
      setAutoMode(false);
      toast({
        title: t('manualModeActivated'),
        description: t('conveyorControlSwitchedToManual'),
      });
    } else {
      // Toggle conveyor state
      setIsOn(prev => !prev);
      toast({
        title: isOn ? t('conveyorTurningOff') : t('conveyorTurningOn'),
        description: isOn ? t('conveyorShuttingDown') : t('conveyorStarting'),
      });
    }
  };

  // Handle toggling between auto and manual mode
  const handleToggleMode = () => {
    setAutoMode(prev => !prev);
    
    if (!autoMode) {
      // When switching back to auto, update state based on current ammonia level
      setIsOn(ammoniaLevel > threshold);
    }
    
    toast({
      title: autoMode ? t('manualModeActivated') : t('autoModeActivated'),
      description: autoMode ? t('manualModeDescription') : t('autoModeDescription'),
    });
  };

  return (
    <section id="conveyor-belt" className="py-10">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gradient'}`}>
          {t('conveyorBeltStatus')}
        </h2>
        <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
          {t('statusMessage')}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Card */}
          <Card className={`${theme === 'light' ? 'light-glass-morphism' : 'glass-morphism'} p-6`}>
            <h3 className="text-xl font-semibold mb-6">{t('currentStatus')}</h3>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${
                  isOn ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'
                }`}>
                  <span className="text-4xl font-bold">{isOn ? t('on') : t('off')}</span>
                </div>
                <p className="mt-4 text-center">
                  {autoMode 
                    ? (isOn ? t('conveyorBeltOnMessage', {ammonia: ammoniaLevel.toString(), threshold: threshold.toString()}) 
                      : t('conveyorBeltOffMessage', {ammonia: ammoniaLevel.toString(), threshold: threshold.toString()}))
                    : (isOn ? t('conveyorManuallyOn') : t('conveyorManuallyOff'))}
                </p>
                
                {/* Manual control buttons */}
                <div className="mt-6 flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{autoMode ? t('autoMode') : t('manualMode')}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleToggleMode}
                      className="flex gap-2 items-center"
                    >
                      {autoMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      {autoMode ? t('switchToManual') : t('switchToAuto')}
                    </Button>
                  </div>
                  
                  <Button 
                    variant={isOn ? "destructive" : "default"}
                    onClick={handleToggleConveyor}
                    className="mt-2"
                  >
                    {isOn ? t('turnOffConveyor') : t('turnOnConveyor')}
                  </Button>
                </div>
              </div>
              
              <div>
                {/* Ammonia Level */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm opacity-70">{t('ammoniaLevel')}</p>
                    <div className="flex items-center">
                      {ammoniaLevel > threshold && (
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className={`text-lg font-medium ${ammoniaLevel > threshold ? 'text-red-500' : ''}`}>
                        {ammoniaLevel} ppm
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${ammoniaLevel > threshold ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${(ammoniaLevel / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Threshold Value */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm opacity-70">{t('thresholdValue')}</p>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-farm-green mr-2" />
                      <span className="text-lg font-medium">{threshold} ppm</span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-farm-yellow rounded-full" 
                      style={{ width: `${(threshold / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Graph Card */}
          <Card className={`${theme === 'light' ? 'light-glass-morphism' : 'glass-morphism'} p-6 col-span-1 lg:col-span-2`}>
            <h3 className="text-xl font-semibold mb-6">{t('ammoniaLevel')} (ppm)</h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ammoniaHistory}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? "#e5e7eb" : "#374151"} />
                  <XAxis 
                    dataKey="time" 
                    stroke={theme === 'light' ? "#6b7280" : "#9ca3af"}
                    tick={{ fill: theme === 'light' ? "#6b7280" : "#9ca3af" }}
                  />
                  <YAxis 
                    stroke={theme === 'light' ? "#6b7280" : "#9ca3af"}
                    tick={{ fill: theme === 'light' ? "#6b7280" : "#9ca3af" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'light' ? 'white' : '#1f2937', 
                      borderColor: theme === 'light' ? '#e5e7eb' : '#374151',
                      color: theme === 'light' ? '#1f2937' : 'white'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={() => threshold} 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-6">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">{t('ammoniaLevel')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-farm-yellow rounded-full mr-2"></div>
                <span className="text-sm">{t('thresholdValue')}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConveyorBeltStatus;
