
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    return `font-bold text-base transition-colors duration-200 ${
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
              <span className="text-3xl font-bold text-gradient">FarmerFriendly</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass('/')}>
              <span className="flex items-center">
                <span className="text-xl mr-1">🏠</span> {t('home')}
              </span>
            </Link>
            <Link to="/mission" className={linkClass('/mission')}>
              <span className="flex items-center">
                <span className="text-xl mr-1">🚀</span> {t('mission')}
              </span>
            </Link>
            <Link to="/contact" className={linkClass('/contact')}>
              <span className="flex items-center">
                <span className="text-xl mr-1">📞</span> {t('contact')}
              </span>
            </Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center space-x-1 p-1">
                  <Globe className="h-6 w-6" />
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
            
            {/* Profile Avatar Link - Moved to the end */}
            <Link to="/profile" className="ml-2">
              <Avatar className={`h-10 w-10 border-2 transition-all hover:scale-110 ${
                isActive('/profile') ? 'border-farm-green' : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
              }`}>
                <AvatarFallback className={`text-sm ${
                  isActive('/profile') ? 'bg-farm-green/20 text-farm-green' : ''
                }`}>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Globe className="h-6 w-6" />
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
            
            {/* Mobile Profile Link */}
            <Link to="/profile" className="mr-4">
              <Avatar className={`h-10 w-10 border-2 ${
                isActive('/profile') ? 'border-farm-green' : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
              }`}>
                <AvatarFallback className={`text-sm ${
                  isActive('/profile') ? 'bg-farm-green/20 text-farm-green' : ''
                }`}>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
            
            <button
              onClick={toggleMenu}
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} focus:outline-none`}
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
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
              className={`block px-3 py-2 rounded-md font-bold text-base ${
                isActive('/')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              <span className="flex items-center">
                <span className="text-xl mr-1">🏠</span> {t('home')}
              </span>
            </Link>
            <Link
              to="/mission"
              className={`block px-3 py-2 rounded-md font-bold text-base ${
                isActive('/mission')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              <span className="flex items-center">
                <span className="text-xl mr-1">🚀</span> {t('mission')}
              </span>
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md font-bold text-base ${
                isActive('/contact')
                  ? 'bg-farm-green/10 text-farm-green'
                  : theme === 'light'
                  ? 'text-gray-800 hover:bg-farm-green/5'
                  : 'text-gray-100 hover:bg-gray-800'
              }`}
            >
              <span className="flex items-center">
                <span className="text-xl mr-1">📞</span> {t('contact')}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
