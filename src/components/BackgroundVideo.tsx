
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const BackgroundVideo: React.FC = () => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [useImage, setUseImage] = useState(true); // Toggle between video and image
  
  // Different videos for light and dark mode
  const videoSrc = theme === 'light' 
    ? "https://images.unsplash.com/video/upload/v1537022671/Splashing_Water_kzqxeo.mp4" 
    : "https://images.unsplash.com/video/upload/v1536530769/01_1_-_cropped_jqsspv.mp4";
  
  // Background images for light and dark mode
  const imageSrc = theme === 'light'
    ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=2070&auto=format&fit=crop";
  
  // Different overlay intensity for light and dark mode
  const overlayClass = theme === 'light'
    ? "bg-white/40 backdrop-blur-sm"
    : "bg-black/60";

  useEffect(() => {
    console.log("BackgroundVideo component mounted, theme:", theme);
    console.log("Using image:", useImage);
  }, [theme, useImage]);

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setIsLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Video failed to load:", e);
  };

  return (
    <div className="fixed inset-0 z-0">
      {/* Video/Image overlay */}
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
      
      {useImage ? (
        /* Background image with smooth transition */
        <img
          src={imageSrc}
          alt="Farm background"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100"
        />
      ) : (
        /* Video element with smooth transition between sources */
        <video
          key={videoSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default BackgroundVideo;
