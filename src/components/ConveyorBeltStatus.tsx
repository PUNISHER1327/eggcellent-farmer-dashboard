
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card } from '@/components/ui/card';
import { AlertTriangle, ThumbsUp, ToggleLeft, ToggleRight, Usb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getArduinoInstance, isWebSerialSupported } from '@/utils/arduinoSerial';

const ConveyorBeltStatus: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [ammoniaLevel, setAmmoniaLevel] = useState(30);
  const [threshold] = useState(25);
  const [isOn, setIsOn] = useState(ammoniaLevel > threshold);
  const [ammoniaHistory, setAmmoniaHistory] = useState<{ time: string, value: number }[]>([]);
  const [autoMode, setAutoMode] = useState(true);
  const [arduinoConnected, setArduinoConnected] = useState(false);
  const arduino = getArduinoInstance();

  // Fetch real ammonia data from Supabase
  useEffect(() => {
    const fetchAmmoniaData = async () => {
      try {
        // Fetch latest ammonia level
        const { data: latest, error: latestError } = await supabase
          .from('sensor_data')
          .select('ammonia')
          .order('timestamp', { ascending: false })
          .limit(1);

        if (latestError) throw latestError;
        if (latest && latest.length > 0) {
          setAmmoniaLevel(latest[0].ammonia || 30);
        }

        // Fetch historical data for the last 24 readings
        const { data: history, error: historyError } = await supabase
          .from('sensor_data')
          .select('ammonia, timestamp')
          .order('timestamp', { ascending: false })
          .limit(24);

        if (historyError) throw historyError;
        if (history && history.length > 0) {
          const formattedHistory = history.reverse().map(reading => ({
            time: new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            value: reading.ammonia || 0,
          }));
          setAmmoniaHistory(formattedHistory);
        }
      } catch (error) {
        console.error('Error fetching ammonia data:', error);
      }
    };

    fetchAmmoniaData();

    // Set up real-time subscription
    const channel = supabase
      .channel('ammonia_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data'
        },
        (payload) => {
          const newData = payload.new as any;
          const newAmmonia = newData.ammonia || 30;
          setAmmoniaLevel(newAmmonia);
          
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Control conveyor belt based on ammonia level (only in auto mode)
  useEffect(() => {
    if (autoMode) {
      const newState = ammoniaLevel > threshold;
      setIsOn(newState);
      // Send command to Arduino when state changes automatically
      if (arduinoConnected) {
        arduino.sendCommand(newState ? 'ON' : 'OFF');
      }
    }
  }, [ammoniaLevel, threshold, autoMode, arduinoConnected]);

  // Handle manual control
  const handleToggleConveyor = async () => {
    if (autoMode) {
      // First, switch to manual mode when user tries to toggle
      setAutoMode(false);
      toast({
        title: t('manualModeActivated'),
        description: t('conveyorControlSwitchedToManual'),
      });
    } else {
      // Toggle conveyor state
      const newState = !isOn;
      setIsOn(newState);
      
      // Send command to Arduino
      if (arduinoConnected) {
        const success = await arduino.sendCommand(newState ? 'ON' : 'OFF');
        if (!success) {
          toast({
            title: 'Arduino Error',
            description: 'Failed to send command to Arduino',
            variant: 'destructive',
          });
        }
      }
      
      toast({
        title: newState ? t('conveyorTurningOn') : t('conveyorTurningOff'),
        description: newState ? t('conveyorStarting') : t('conveyorShuttingDown'),
      });
    }
  };

  // Handle toggling between auto and manual mode
  const handleToggleMode = async () => {
    setAutoMode(prev => !prev);
    
    if (!autoMode) {
      // When switching back to auto, update state based on current ammonia level
      const newState = ammoniaLevel > threshold;
      setIsOn(newState);
      
      // Send command to Arduino
      if (arduinoConnected) {
        await arduino.sendCommand(newState ? 'ON' : 'OFF');
      }
    }
    
    toast({
      title: autoMode ? t('manualModeActivated') : t('autoModeActivated'),
      description: autoMode ? t('manualModeDescription') : t('autoModeDescription'),
    });
  };

  // Handle Arduino connection
  const handleConnectArduino = async () => {
    if (!isWebSerialSupported()) {
      toast({
        title: 'Not Supported',
        description: 'WebSerial API is not supported in this browser. Please use Chrome, Edge, or Opera.',
        variant: 'destructive',
      });
      return;
    }

    if (arduinoConnected) {
      await arduino.disconnect();
      setArduinoConnected(false);
      toast({
        title: 'Disconnected',
        description: 'Arduino disconnected successfully',
      });
    } else {
      const connected = await arduino.connect();
      if (connected) {
        setArduinoConnected(true);
        // Send initial state to Arduino
        await arduino.sendCommand(isOn ? 'ON' : 'OFF');
        toast({
          title: 'Connected',
          description: 'Arduino connected successfully',
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Failed to connect to Arduino',
          variant: 'destructive',
        });
      }
    }
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
                  {/* Arduino Connection Button */}
                  <Button 
                    variant={arduinoConnected ? "secondary" : "outline"}
                    size="sm"
                    onClick={handleConnectArduino}
                    className="flex gap-2 items-center"
                  >
                    <Usb className="h-4 w-4" />
                    {arduinoConnected ? 'Disconnect Arduino' : 'Connect Arduino'}
                  </Button>
                  
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
                    disabled={!arduinoConnected}
                  >
                    {isOn ? t('turnOffConveyor') : t('turnOnConveyor')}
                  </Button>
                  
                  {!arduinoConnected && (
                    <p className="text-xs text-muted-foreground text-center">
                      Connect Arduino to control the motor
                    </p>
                  )}
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
