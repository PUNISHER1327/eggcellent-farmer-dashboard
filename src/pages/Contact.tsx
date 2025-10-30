import React from 'react';
import NavBar from '@/components/NavBar';
import ContactSection from "@/components/ContactSection";
import Footer from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

const Contact = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'light' ? 'light-mode' : 'dark-mode'} flex flex-col min-h-screen bg-background`}>
      <NavBar />
      <main className="relative z-10 flex-grow pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
