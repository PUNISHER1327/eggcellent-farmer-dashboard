
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const InsightsSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <section className="relative py-16 z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            {t('insights')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Historical Data */}
          <div className={`rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'light'
              ? 'bg-white shadow-lg'
              : 'bg-gray-800 shadow-lg'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              {t('historicalData')}
            </h3>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              Track temperature, humidity, and ammonia levels over time to identify patterns and optimize farm conditions.
            </p>
          </div>
          
          {/* Predictive Analysis */}
          <div className={`rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'light'
              ? 'bg-white shadow-lg'
              : 'bg-gray-800 shadow-lg'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              {t('predictiveAnalysis')}
            </h3>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              AI-powered forecasts help predict egg production and identify potential health issues before they escalate.
            </p>
          </div>
          
          {/* Optimization Tips */}
          <div className={`rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'light'
              ? 'bg-white shadow-lg'
              : 'bg-gray-800 shadow-lg'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              {t('optimizationTips')}
            </h3>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              Receive customized recommendations to improve farm efficiency, reduce costs, and enhance poultry welfare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
