
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const scrollToLiveData = () => {
    const element = document.getElementById('live-data');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center z-10">
      <div className="container mx-auto px-4 text-center">
        <div 
          className={`py-12 px-8 rounded-xl backdrop-blur-sm ${
            theme === 'light' 
              ? 'bg-white/40 shadow-lg' 
              : 'bg-gray-900/50 shadow-lg'
          }`}
        >
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            {t('heroTitle')}
          </h1>
          
          <p 
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-100'
            }`}
          >
            {t('heroSubtitle')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={scrollToLiveData}
              className="px-6 py-3 bg-farm-green hover:bg-farm-green/90 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('liveData')}
            </button>
            <button
              className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('dashboard')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
