
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    }
    
    localStorage.setItem('theme', newTheme);
    console.log(`Theme switched to: ${newTheme}`);
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
      }
      
      console.log(`Theme restored from localStorage: ${savedTheme}`);
    } else {
      document.documentElement.classList.add('dark-mode');
    }
    
    // Add base styles for theme colors to ensure charts have proper coloring
    const style = document.createElement('style');
    style.innerHTML = `
      .light-mode {
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;
        --chart-grid: #e5e7eb;
        --chart-text: #6b7280;
      }
      
      .dark-mode {
        --text-primary: #ffffff;
        --text-secondary: rgba(255, 255, 255, 0.7);
        --chart-grid: #374151;
        --chart-text: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
