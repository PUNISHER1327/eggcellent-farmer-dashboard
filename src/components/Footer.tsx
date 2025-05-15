
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative z-20 ${
      theme === 'light' 
        ? 'bg-gray-100 text-gray-800' 
        : 'bg-gray-900 text-white'
    }`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FarmerFriendly</h3>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              Empowering farmers with smart technology solutions for sustainable poultry management.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`hover:underline ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/mission" className={`hover:underline ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {t('mission')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`hover:underline ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2">
              <li className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                info@farmerfriendly.com
              </li>
              <li className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                +1 (555) 123-4567
              </li>
              <li className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                123 Farm Lane, Rural City
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('message')}</h3>
            <p className={`mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Stay updated with our latest features and announcements.
            </p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className={`px-4 py-2 w-full rounded-l focus:outline-none ${
                  theme === 'light' 
                    ? 'border border-gray-300 text-gray-800' 
                    : 'bg-gray-800 border border-gray-700 text-white'
                }`} 
              />
              <button 
                className="bg-farm-green hover:bg-farm-green/90 text-white px-4 py-2 rounded-r"
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
            {t('footerText', { year: currentYear.toString() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
