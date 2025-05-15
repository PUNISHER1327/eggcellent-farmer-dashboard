
import React, { useState, useEffect, useRef } from 'react';

const BackgroundVideo = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1723598489817-ecfedd9fe0c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGN1dGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1615828111625-ac4e5a89de5c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW4lMjBjdXRlfGVufDB8fDB8fHww"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Add scroll event listener to control background visibility
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        // Get the analytics section position (approximately)
        const analyticsSection = document.getElementById('analytics');
        
        if (analyticsSection) {
          const analyticsSectionTop = analyticsSection.getBoundingClientRect().top;
          
          // Start fading out when analytics section is approaching viewport
          if (analyticsSectionTop < window.innerHeight) {
            const opacity = Math.max(0, (analyticsSectionTop / window.innerHeight));
            backgroundRef.current.style.opacity = opacity.toString();
          } else {
            backgroundRef.current.style.opacity = '1';
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden transition-opacity duration-300">
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
