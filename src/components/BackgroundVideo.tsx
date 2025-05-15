
import React, { useState, useEffect } from 'react';

const BackgroundVideo: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1723598489817-ecfedd9fe0c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGN1dGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1615828111625-ac4e5a89de5c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW4lMjBjdXRlfGVufDB8fDB8fHww"
  ];

  // Rotate through background images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
  );
};

export default BackgroundVideo;
