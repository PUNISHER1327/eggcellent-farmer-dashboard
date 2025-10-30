import React from 'react';
import NavBar from '@/components/NavBar';
import MissionPage from "@/components/MissionPage";
import Footer from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

const Mission = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'light' ? 'light-mode' : 'dark-mode'} flex flex-col min-h-screen`}>
      <NavBar />
      <main className="relative z-10 flex-grow">
        <MissionPage />
      </main>
      <Footer />
    </div>
  );
};

export default Mission;
