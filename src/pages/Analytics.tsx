import React from 'react';
import NavBar from '../components/NavBar';
import BackgroundVideo from '../components/BackgroundVideo';
import Footer from '../components/Footer';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import LiveSensorDataTable from '../components/LiveSensorDataTable';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Activity, Heart } from 'lucide-react';
import { usePredictionData } from '@/hooks/usePredictionData';

const Analytics = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { currentPrediction, loading } = usePredictionData();

  return (
    <div className={`${theme === 'light' ? 'light-mode' : 'dark-mode'} flex flex-col min-h-screen`}>
      <BackgroundVideo />
      <NavBar />
      
      <main className="relative z-10 flex-grow pt-20">
        {/* Header Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Analytics & Predictions
              </h1>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Real-time sensor data analysis with AI-powered predictions for egg production and chicken health
              </p>
            </div>

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
                        Processing sensor data (45s)
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-primary">
                        {currentPrediction.eggCount.toLocaleString()}
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
