
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import ActivateKitForm from './ActivateKitForm';
import { Button } from '@/components/ui/button';

interface DashboardAccessCheckProps {
  children: React.ReactNode;
}

const DashboardAccessCheck: React.FC<DashboardAccessCheckProps> = ({ children }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user, sensorKitActivated } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          <h2 className="text-2xl font-bold mb-4">{t('dashboardAccess')}</h2>
          <p className="mb-6">{t('pleaseSignInToAccessDashboard')}</p>
          <Link to="/auth">
            <Button className="bg-farm-green hover:bg-farm-green/90 text-white">
              {t('signIn')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (!sensorKitActivated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className={`text-2xl font-bold mb-4 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('dashboardAccess')}
          </h2>
          <p className={`mb-6 text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {t('activateToAccess')}
          </p>
          
          <ActivateKitForm />
          
          <div className="mt-6 text-center">
            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              {t('alreadyHaveKit')}
            </p>
            <Link to="/mission" className="text-farm-green hover:text-farm-green/90">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default DashboardAccessCheck;
