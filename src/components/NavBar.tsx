
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { egg } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 glass-morphism ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <egg className="h-6 w-6 text-farm-yellow" />
          <span className="text-xl font-bold text-gradient">Farmer Friendly</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#live-data" className="text-white/80 hover:text-white transition-colors">Live Data</a>
          <a href="#insights" className="text-white/80 hover:text-white transition-colors">Insights</a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
        </div>
        
        <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hidden md:block">
          Dashboard
        </Button>
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
