
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">FarmerFriendly</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description') || 'Empowering farmers with smart technology solutions for sustainable poultry management.'}
            </p>
            <div className="flex gap-2 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <Shield className="w-3 h-3 inline mr-1" />
                SOC 2
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <Globe className="w-3 h-3 inline mr-1" />
                HIPAA
              </motion.div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('navigation')}</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/mission" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('mission')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/analytics" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('analytics')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground">
                info@farmerfriendly.com
              </li>
              <li className="text-muted-foreground">
                +1 (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                123 Farm Lane, Rural City
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('newsletter')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.newsletter') || 'Stay updated with our latest features.'}
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('email') || 'Your Email'}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                {t('send')}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} FarmerFriendly. {t('footer.rights') || 'All rights reserved.'}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {t('privacy') || 'Privacy'}
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {t('terms') || 'Terms'}
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                {t('cookies') || 'Cookies'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
