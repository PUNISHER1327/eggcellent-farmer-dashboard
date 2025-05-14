
import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import BackgroundVideo from '../components/BackgroundVideo';
import HeroSection from '../components/HeroSection';
import LiveDataSection from '../components/LiveDataSection';
import InsightsSection from '../components/InsightsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ConveyorBeltStatus from '../components/ConveyorBeltStatus';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Set document title
    document.title = "Farmer Friendly - Poultry Farm Dashboard";
    
    // Apply body class for custom cursor
    document.body.classList.add('cursor-hen');
    
    // Make sure we scroll to the top when the page loads
    window.scrollTo(0, 0);
    
    return () => {
      // Clean up
      document.body.classList.remove('cursor-hen');
    };
  }, []);

  return (
    <div className={`${theme === 'light' ? 'light-mode' : 'dark-mode'} flex flex-col min-h-screen`}>
      {/* Background Video */}
      <BackgroundVideo />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* NavBar */}
      <NavBar />
      
      {/* Main Content */}
      <main className="relative z-10 flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Live Data Section */}
        <LiveDataSection />
        
        {/* Conveyor Belt Status */}
        <ConveyorBeltStatus />
        
        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
        
        {/* Insights Section */}
        <InsightsSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
