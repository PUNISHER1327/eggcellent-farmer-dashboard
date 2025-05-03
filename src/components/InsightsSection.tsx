
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsightsSection: React.FC = () => {
  return (
    <section id="insights" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Insights & Recommendations</h2>
        <p className="text-lg text-white/70 mb-10">AI-powered suggestions to optimize your farm performance</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-morphism p-6 sensor-card-hover">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-farm-green/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-green">
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                </svg>
              </span>
              Temperature Optimization
            </h3>
            
            <p className="text-white/70 mb-4">
              Based on current readings, your coop temperature is in the optimal range for egg production. 
              Maintaining between 22-26°C will ensure continued productivity.
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-farm-green">Excellent</span>
              <Button variant="link" className="text-farm-green p-0">Learn more</Button>
            </div>
          </Card>
          
          <Card className="glass-morphism p-6 sensor-card-hover">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-farm-yellow/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-yellow">
                  <path d="M12 22c-4.97 0-9-7-9-11a9 9 0 0 1 18 0c0 4-4.03 11-9 11Z"></path>
                </svg>
              </span>
              Humidity Alert
            </h3>
            
            <p className="text-white/70 mb-4">
              Humidity levels are trending higher than recommended. Consider improving ventilation to 
              reduce levels to 50-60% for optimal chicken health and egg quality.
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-farm-yellow">Needs Attention</span>
              <Button variant="link" className="text-farm-yellow p-0">View action plan</Button>
            </div>
          </Card>
          
          <Card className="glass-morphism p-6 sensor-card-hover">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-farm-red/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-red">
                  <path d="M4.16 4.17a11.95 11.95 0 0 0 16.46 16.47"></path>
                  <path d="M19.84 19.83a11.95 11.95 0 0 0-16.47-16.46"></path>
                  <path d="M12 3v18"></path>
                  <path d="M3 12h18"></path>
                </svg>
              </span>
              Ammonia Levels
            </h3>
            
            <p className="text-white/70 mb-4">
              Ammonia levels have exceeded safe thresholds. Urgent action required: clean bedding, 
              improve ventilation, and consider reducing stocking density in affected areas.
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-farm-red">Critical</span>
              <Button variant="link" className="text-farm-red p-0">Take action now</Button>
            </div>
          </Card>
          
          <Card className="glass-morphism p-6 sensor-card-hover">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-farm-green/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-green">
                  <path d="M12 22c-4.97 0-9-7-9-11a9 9 0 0 1 18 0c0 4-4.03 11-9 11z" />
                </svg>
              </span>
              Egg Production Forecast
            </h3>
            
            <p className="text-white/70 mb-4">
              Based on current environmental conditions and historical data, we predict a 12% increase 
              in egg production over the next two weeks if conditions remain stable.
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-farm-green">Positive Trend</span>
              <Button variant="link" className="text-farm-green p-0">View forecast</Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
