
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

const BackgroundVideo: React.FC = () => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background images for light and dark mode - multiple poultry farming related images
  const lightModeImages = [
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518754500512-7de5fca57d6f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563699182-58425e3d686b?q=80&w=2070&auto=format&fit=crop"
  ];
  
  const darkModeImages = [
    "https://images.unsplash.com/photo-1582450880901-6c4c27a1ac51?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1569097242446-f49183ea3fac?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558929994-08cb1c32b38c?q=80&w=2070&auto=format&fit=crop"
  ];
  
  // Get the current set of images based on theme
  const images = theme === 'light' ? lightModeImages : darkModeImages;
  
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
