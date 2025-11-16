import React from 'react';
import NavBar from '../components/NavBar';
import BackgroundVideo from '../components/BackgroundVideo';
import Footer from '../components/Footer';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import LiveSensorDataTable from '../components/LiveSensorDataTable';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Brain, TrendingUp, Activity, Heart, AlertTriangle, Thermometer, Droplets, Wind, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useState } from 'react';

const Analytics = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { currentPrediction, loading, alerts, dismissedAlerts, lastUpdate, dismissAlert, alertPhoneNumber, updateAlertPhoneNumber } = usePredictionData();
  const [phoneInput, setPhoneInput] = useState(alertPhoneNumber);
  const [showPhoneSetup, setShowPhoneSetup] = useState(!alertPhoneNumber);

  const handleSavePhone = () => {
    updateAlertPhoneNumber(phoneInput);
    setShowPhoneSetup(false);
  };

  return (
    <div className={`${theme === 'light' ? 'light-mode' : 'dark-mode'} flex flex-col min-h-screen`}>
      <BackgroundVideo />
      <NavBar />
      
      <main className="relative z-10 flex-grow pt-20">
        {/* Header Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Analytics & Predictions
              </h1>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Real-time sensor data analysis with AI-powered predictions for egg production and chicken health
              </p>
              <p className="text-sm opacity-60 mt-2">
                Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh every 5s
              </p>
            </div>

            {/* SMS Alert Setup */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    SMS Alert Configuration
                  </CardTitle>
                  <CardDescription>
                    {alertPhoneNumber 
                      ? `SMS alerts will be sent to ${alertPhoneNumber}` 
                      : 'Configure your phone number to receive SMS alerts'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {showPhoneSetup || !alertPhoneNumber ? (
                    <div className="flex gap-2">
                      <Input
                        type="tel"
                        placeholder="+1234567890"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSavePhone}>
                        Save Number
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setShowPhoneSetup(true)}>
                      Update Phone Number
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Critical Alert Modals */}
            <AlertDialog open={alerts.temperature && !dismissedAlerts.temperature}>
              <AlertDialogContent className="border-destructive border-2">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-xl">
                    <Thermometer className="h-6 w-6 animate-pulse" />
                    CRITICAL: Temperature Alert
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    <strong>Temperature exceeds safe threshold (32°C)!</strong>
                    <br /><br />
                    Immediate action required to cool the environment. High temperatures can severely impact chicken health and egg production.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => dismissAlert('temperature')} className="bg-destructive hover:bg-destructive/90">
                    Acknowledge Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={alerts.humidity && !dismissedAlerts.humidity}>
              <AlertDialogContent className="border-destructive border-2">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-xl">
                    <Droplets className="h-6 w-6 animate-pulse" />
                    CRITICAL: Humidity Alert
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    <strong>Humidity outside safe range (40-70%)!</strong>
                    <br /><br />
                    Adjust ventilation immediately to maintain optimal conditions. Improper humidity affects chicken respiratory health and comfort.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => dismissAlert('humidity')} className="bg-destructive hover:bg-destructive/90">
                    Acknowledge Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={alerts.airQuality && !dismissedAlerts.airQuality}>
              <AlertDialogContent className="border-destructive border-2">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-xl">
                    <Wind className="h-6 w-6 animate-pulse" />
                    CRITICAL: Air Quality Alert
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    <strong>Air quality exceeds safe threshold (300 PPM)!</strong>
                    <br /><br />
                    Increase ventilation immediately to protect chicken health. Poor air quality can cause respiratory issues and reduce productivity.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => dismissAlert('airQuality')} className="bg-destructive hover:bg-destructive/90">
                    Acknowledge Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* ML Predictions Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Egg Production Forecast
                  </CardTitle>
                  <CardDescription>AI-powered production predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading || !currentPrediction ? (
                    <>
                      <div className="text-2xl font-bold text-muted-foreground animate-pulse">
                        Analyzing...
                      </div>
                      <p className="text-sm opacity-70 mt-2">
                        Analyzing sensor data...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-primary">
                        {currentPrediction.eggCount.toFixed(3)}
                      </div>
                      <p className="text-sm opacity-70 mt-2">
                        Predicted daily eggs • {currentPrediction.confidence}% confidence
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Health Status
                  </CardTitle>
                  <CardDescription>Chicken health predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading || !currentPrediction ? (
                    <>
                      <div className="text-2xl font-bold text-muted-foreground animate-pulse">
                        Analyzing...
                      </div>
                      <p className="text-sm opacity-70 mt-2">
                        ML-based health monitoring
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`text-4xl font-bold ${
                        currentPrediction.health === 'Excellent' ? 'text-green-500' :
                        currentPrediction.health === 'Good' ? 'text-blue-500' :
                        currentPrediction.health === 'Fair' ? 'text-yellow-500' :
                        currentPrediction.health === 'Poor' ? 'text-orange-500' :
                        'text-red-500'
                      }`}>
                        {currentPrediction.health}
                      </div>
                      <p className="text-sm opacity-70 mt-2">
                        Based on air quality analysis
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Trend Analysis
                  </CardTitle>
                  <CardDescription>Environmental pattern insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    Active
                  </div>
                  <p className="text-sm opacity-70 mt-2">
                    Based on real sensor data
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Live Sensor Data */}
            <div className="mb-12">
              <LiveSensorDataTable />
            </div>

            {/* Analytics Dashboard */}
            <AnalyticsDashboard />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
