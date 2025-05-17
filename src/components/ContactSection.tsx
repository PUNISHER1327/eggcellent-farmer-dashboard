
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">{t('contactUs')}</h2>
        <p className="text-lg text-white/70 mb-10">{t('haveQuestions')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="glass-morphism p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
                  <Input id="name" placeholder={t('enterYourName')} className="bg-secondary/50 border-white/10" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
                  <Input id="email" type="email" placeholder={t('enterYourEmail')} className="bg-secondary/50 border-white/10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">{t('subject')}</label>
                <Input id="subject" placeholder={t('howCanWeHelp')} className="bg-secondary/50 border-white/10" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                <Textarea id="message" placeholder={t('tellUsWhatYouNeed')} className="bg-secondary/50 border-white/10 min-h-[120px]" />
              </div>
              
              <Button type="submit" className="w-full bg-farm-green hover:bg-farm-green/90">{t('sendMessage')}</Button>
            </form>
          </Card>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('farmSupportHours')}</h3>
              <p className="text-white/70">{t('farmExpertsAvailable')}</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                      <circle cx="12" cy="12" r="5"></circle>
                    </svg>
                  </div>
                  <span>{t('mondayToFriday')}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                      <circle cx="12" cy="12" r="5"></circle>
                    </svg>
                  </div>
                  <span>{t('saturday')}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                      <circle cx="12" cy="12" r="5"></circle>
                    </svg>
                  </div>
                  <span>{t('sunday')}</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('emergencySupport')}</h3>
              <p className="text-white/70">{t('urgentMatters')}</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-farm-red/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-farm-red">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="font-bold">+91 66056 09423-FARM</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('location')}</h3>
              <p className="text-white/70">{t('farmHeadquarters')}</p>
              <p className="text-white/70">PESCE<br />Mandya, KA 571401<br />India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
