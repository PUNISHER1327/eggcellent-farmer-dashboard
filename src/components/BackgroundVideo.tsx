
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const BackgroundVideo: React.FC = () => {
  const { theme } = useTheme();
  
  // Background images for light and dark mode - poultry farming related
  const imageSrc = theme === 'light'
    ? "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070&auto=format&fit=crop"  // Light chickens in farm
    : "https://images.unsplash.com/photo-1582450880901-6c4c27a1ac51?q=80&w=2070&auto=format&fit=crop";  // Dark chickens in coop
  
  // Different overlay intensity for light and dark mode
  const overlayClass = theme === 'light'
    ? "bg-white/40 backdrop-blur-sm"
    : "bg-black/60";

  return (
    <div className="fixed inset-0 z-0">
      {/* Image overlay */}
      <div className={`absolute inset-0 ${overlayClass} z-10 transition-colors duration-700`}></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-5">
        <div className="particles-container">
          {[...Array(20)].map((_, index) => (
            <div 
              key={index}
              className={`particle ${theme === 'light' ? 'bg-farm-green/20' : 'bg-farm-yellow/20'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Background image with smooth transition */}
      <img
        src={imageSrc}
        alt="Poultry farm background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100"
      />
    </div>
  );
};

export default BackgroundVideo;
