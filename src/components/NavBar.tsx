
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Egg, Moon, Sun, Menu, X, Globe, User } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 ${
          theme === 'light' ? 'nav-light-glass' : 'glass-morphism'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Egg className={`h-7 w-7 ${theme === 'light' ? 'text-farm-orange' : 'text-farm-yellow'} transition-transform duration-300 group-hover:rotate-12`} />
                <div className="absolute -inset-2 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
              <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} tracking-tight`}>Farmer Friendly</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white/80'} hover:text-farm-green transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-farm-green after:transition-all after:duration-300`}
            >
              {t('home')}
            </Link>
            <a 
              href="#live-data"
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white/80'} hover:text-farm-green transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-farm-green after:transition-all after:duration-300`}
            >
              {t('liveData')}
            </a>
            <a 
              href="#insights"
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white/80'} hover:text-farm-green transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-farm-green after:transition-all after:duration-300`}
            >
              {t('insights')}
            </a>
            <a 
              href="#contact"
              className={`${theme === 'light' ? 'text-gray-800' : 'text-white/80'} hover:text-farm-green transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-farm-green after:transition-all after:duration-300`}
            >
              {t('contact')}
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full transition-colors duration-300 ${
                    theme === 'light' 
                      ? 'bg-white/70 border-gray-300 hover:bg-white/90' 
                      : 'bg-transparent border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')} className={language === 'hi' ? 'bg-accent' : ''}>
                  हिन्दी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('kn')} className={language === 'kn' ? 'bg-accent' : ''}>
                  ಕನ್ನಡ (Kannada)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleTheme}
                  className={`rounded-full transition-colors duration-300 ${
                    theme === 'light' 
                      ? 'bg-white/70 border-gray-300 hover:bg-white/90' 
                      : 'bg-transparent border-white/20 hover:bg-white/10'
                  }`}
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className={theme === 'light' ? 'light-glass-morphism border-gray-200 text-gray-800' : 'glass-morphism border-white/10 text-white'}>
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
              </HoverCardContent>
            </HoverCard>
            
            <Link to="/profile">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full transition-colors duration-300 ${
                  theme === 'light' 
                    ? 'bg-white/70 border-gray-300 hover:bg-white/90' 
                    : 'bg-transparent border-white/20 hover:bg-white/10'
                }`}
              >
                <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className={`hidden md:flex ${
                theme === 'light' 
                  ? 'bg-white/70 border-gray-300 text-gray-800 hover:bg-white/90' 
                  : 'bg-transparent border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {t('dashboard')}
            </Button>
            
            <button 
              className="md:hidden" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? 
                <X className={theme === 'light' ? 'text-gray-800' : 'text-white'} /> : 
                <Menu className={theme === 'light' ? 'text-gray-800' : 'text-white'} />
              }
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-30 ${theme === 'light' ? 'bg-white/95 text-gray-800' : 'bg-black/90 text-white backdrop-blur-md'} transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto h-full flex flex-col justify-center items-center space-y-8">
          <Link 
            to="/"
            className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-farm-green transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('home')}
          </Link>
          <a 
            href="#live-data"
            className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-farm-green transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('liveData')}
          </a>
          <a 
            href="#insights"
            className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-farm-green transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('insights')}
          </a>
          <a 
            href="#contact"
            className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-farm-green transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('contact')}
          </a>
          <Link
            to="/profile"
            className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-farm-green transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('profile')}
          </Link>
          <Button 
            className="mt-6 bg-farm-green hover:bg-farm-green/80 text-white"
          >
            {t('dashboard')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
