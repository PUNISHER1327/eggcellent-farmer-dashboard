
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import NavBar from './NavBar';
import Footer from './Footer';

const MissionPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div className={theme === 'light' ? 'light-mode min-h-screen' : 'dark-mode min-h-screen'}>
      <NavBar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('ourMission')}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
                {t('vision')}
              </h2>
              <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                {t('visionDescription')}
              </p>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                {t('visionGoal')}
              </p>
            </div>
            
            <div className={`rounded-lg overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} h-64 md:h-auto`}>
              <img 
                src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1000" 
                alt={t('farmVision')} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className={`p-8 rounded-lg mb-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'}`}>
            <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
              {t('whatWeDo')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-4 rounded ${theme === 'light' ? 'bg-white' : 'bg-gray-700/50'}`}>
                <h3 className={`text-xl font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
                  {t('monitoring')}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {t('monitoringDescription')}
                </p>
              </div>
              
              <div className={`p-4 rounded ${theme === 'light' ? 'bg-white' : 'bg-gray-700/50'}`}>
                <h3 className={`text-xl font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
                  {t('analytics')}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {t('analyticsDescription')}
                </p>
              </div>
              
              <div className={`p-4 rounded ${theme === 'light' ? 'bg-white' : 'bg-gray-700/50'}`}>
                <h3 className={`text-xl font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
                  {t('automation')}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {t('automationDescription')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
              {t('ourSensorKit')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000" 
                  alt={t('sensorKit')} 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className={`text-xl font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-100'}`}>
                  {t('completeMonitoringSolution')}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {t('sensorKitDescription')}
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-farm-green/10' : 'bg-farm-green/20'}`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  {t('keyFeatures')}
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`}>✓</span>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{t('feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`}>✓</span>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{t('feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`}>✓</span>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{t('feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`}>✓</span>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{t('feature4')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`}>✓</span>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{t('feature5')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MissionPage;
