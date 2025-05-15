
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavBar = () => {
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navbarClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? `${theme === 'light' ? 'bg-white/90' : 'bg-gray-900/90'} backdrop-blur-md shadow-md`
      : 'bg-transparent'
  }`;

  const linkClass = (path: string) => {
    return `font-medium text-sm transition-colors duration-200 ${
      isActive(path)
        ? theme === 'light'
          ? 'text-farm-green'
          : 'text-farm-green'
        : theme === 'light'
        ? 'text-gray-800 hover:text-farm-green'
        : 'text-gray-100 hover:text-farm-green'
    }`;
  };

  const handleLanguageChange = (newLanguage: 'en' | 'hi' | 'kn') => {
    setLanguage(newLanguage);
  };

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">FarmerFriendly</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass('/')}>
              {t('home')}
            </Link>
            <Link to="/mission" className={linkClass('/mission')}>
              {t('mission')}
            </Link>
            <Link to="/profile" className={linkClass('/profile')}>
              {t('profile')}
            </Link>
            <Link to="/contact" className={linkClass('/contact')}>
              {t('contact')}
            </Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center space-x-1">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? 'bg-accent' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('hi')}
                  className={language === 'hi' ? 'bg-accent' : ''}
                >
                  हिन्दी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('kn')}
                  className={language === 'kn' ? 'bg-accent' : ''}
                >
                  ಕನ್ನಡ (Kannada)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} focus:outline-none`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className={`md:hidden ${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          } shadow-lg rounded-b-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md ${
                isActive('/')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/mission"
              className={`block px-3 py-2 rounded-md ${
                isActive('/mission')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              {t('mission')}
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md ${
                isActive('/profile')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              {t('profile')}
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              {t('contact')}
            </Link>
            
            {/* Mobile Language Selector */}
            <div className="mt-3 px-3 py-2">
              <div className="text-sm font-medium mb-2">
                {t('selectLanguage')}:
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-1 rounded text-sm ${
                    language === 'en'
                      ? 'bg-farm-green text-white'
                      : theme === 'light'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-2 py-1 rounded text-sm ${
                    language === 'hi'
                      ? 'bg-farm-green text-white'
                      : theme === 'light'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  HI
                </button>
                <button
                  onClick={() => handleLanguageChange('kn')}
                  className={`px-2 py-1 rounded text-sm ${
                    language === 'kn'
                      ? 'bg-farm-green text-white'
                      : theme === 'light'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  KN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
