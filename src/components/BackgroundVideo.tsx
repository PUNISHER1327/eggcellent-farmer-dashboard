
import React, { useState, useEffect } from 'react';

const BackgroundVideo = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://media.istockphoto.com/id/2178456042/photo/abstract-background-dark-pattern-gradient-red-yellow-green-rough-texture-noise-grain.jpg?s=612x612&w=0&k=20&c=DfZlmSDfxJg6Q4aaI8UmkxuvVn9fi1kseZXwljHWYlM="
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 bg-cover bg-center ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundVideo;
