
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

const BackgroundVideo: React.FC = () => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background images - chicken images
  const images = [
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1723598489817-ecfedd9fe0c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGN1dGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1615828111625-ac4e5a89de5c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW4lMjBjdXRlfGVufDB8fDB8fHww"
  ];
  
  // Different overlay intensity for light and dark mode - removed blur from light mode
  const overlayClass = theme === 'light'
    ? "bg-white/40" // Removed blur and adjusted opacity for better readability in light mode
    : "bg-black/60 backdrop-blur-[2px]"; // Keep backdrop blur only for dark mode

  // Shuffle through images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background image with smooth transition */}
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Poultry farm background ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
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
    </div>
  );
};

export default BackgroundVideo;
