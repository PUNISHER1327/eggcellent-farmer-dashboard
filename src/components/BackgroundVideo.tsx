
import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Video overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Video element */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source 
          src="https://images.unsplash.com/video/upload/v1536530769/01_1_-_cropped_jqsspv.mp4" 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
