
import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '@/translations';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, vars?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage && ['en', 'hi', 'kn'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: string, vars: { [key: string]: string | number } = {}) => {
    // Get the translated text or use the key as fallback
    let translation = translations[language][key] || key;
    
    // Replace variables in the translation
    for (const varKey in vars) {
      translation = translation.replace(
        new RegExp(`{${varKey}}`, 'g'), 
        vars[varKey].toString()
      );
    }
    
    return translation;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
