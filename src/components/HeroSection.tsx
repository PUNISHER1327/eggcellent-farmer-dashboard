
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToLiveData = () => {
    const liveDataSection = document.getElementById('live-data');
    if (liveDataSection) {
      liveDataSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold animate-fade-in text-gradient mb-6">
          Welcome to <span className="text-farm-green">Farmer</span> <span className="text-accent">Friendly</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/70 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Monitor your poultry farm's environmental conditions and optimize egg production with real-time sensor data.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 transition-opacity"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 bg-transparent hover:bg-white/10"
            onClick={scrollToLiveData}
          >
            View Live Data
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20"
          onClick={scrollToLiveData}
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
