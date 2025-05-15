
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const NavBar = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
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
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);
  
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
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} focus:outline-none`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
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
              onClick={closeMenu}
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
              onClick={closeMenu}
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
              onClick={closeMenu}
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
              onClick={closeMenu}
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
