
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const BackgroundVideo: React.FC = () => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Different videos for light and dark mode
  const videoSrc = theme === 'light' 
    ? "https://images.unsplash.com/video/upload/v1537022671/Splashing_Water_kzqxeo.mp4" 
    : "https://images.unsplash.com/video/upload/v1536530769/01_1_-_cropped_jqsspv.mp4";
  
  // Different overlay intensity for light and dark mode
  const overlayClass = theme === 'light'
    ? "bg-white/40 backdrop-blur-sm"
    : "bg-black/60";

  useEffect(() => {
    console.log("BackgroundVideo component mounted, theme:", theme);
    console.log("Video source:", videoSrc);
  }, [theme, videoSrc]);

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setIsLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Video failed to load:", e);
  };

  return (
    <div className="fixed inset-0 z-0">
      {/* Video overlay */}
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
      
      {/* Video element with smooth transition between sources */}
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
    </div>
  );
};

export default BackgroundVideo;
