
import React, { createContext, useContext, useState } from 'react';

type AvailableLanguage = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: AvailableLanguage;
  setLanguage: (language: AvailableLanguage) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "home": "Home",
    "liveData": "Live Data",
    "analytics": "Analytics",
    "insights": "Insights",
    "contact": "Contact",
    "dashboard": "Dashboard",
    
    // Analytics Dashboard
    "advancedAnalytics": "Advanced Analytics",
    "analyticsDescription": "In-depth analysis and forecasting to optimize your farm performance",
    "overview": "Overview",
    "trends": "Trends",
    "distribution": "Distribution",
    "performance": "Performance",
    "reports": "Reports",
    "settings": "Settings",
    
    // Overview Tab
    "averageTemperature": "Average Temperature",
    "averageHumidity": "Average Humidity",
    "averageDailyEggs": "Average Daily Eggs",
    "temperatureHumidityTrends": "Temperature & Humidity Trends",
    "weeklyEggProduction": "Weekly Egg Production",
    
    // Distribution Tab
    "sensorReadingDistribution": "Sensor Reading Distribution",
    "farmPerformanceScore": "Farm Performance Score",
    "performingAboveAverage": "Your farm is performing above the average for your region",
    "environment": "Environment",
    "production": "Production",
    "health": "Health",
    "efficiency": "Efficiency",
    
    // Trends Tab
    "hourSensorTrends": "24-Hour Sensor Trends",
    "eggProductionTrends": "Egg Production Trends",
    "averageCO2": "Average CO2",
    "averageAmmonia": "Average Ammonia",
    "averageTemp": "Average Temp",
    
    // Performance Tab
    "farmPerformanceMetrics": "Farm Performance Metrics",
    "overallScore": "Overall Score",
    "weeklyComparison": "Weekly Comparison",
    "improvementAreas": "Improvement Areas",
    
    // Reports Tab
    "monthlyReports": "Monthly Reports",
    "exportData": "Export Data",
    "scheduledReports": "Scheduled Reports",
    "customReports": "Custom Reports",
    
    // Settings Tab
    "dashboardSettings": "Dashboard Settings",
    "notifications": "Notifications",
    "dataCollection": "Data Collection",
    "userPreferences": "User Preferences",
    "languageSettings": "Language Settings",
  },
  hi: {
    // Navigation
    "home": "होम",
    "liveData": "लाइव डेटा",
    "analytics": "एनालिटिक्स",
    "insights": "इनसाइट्स",
    "contact": "संपर्क",
    "dashboard": "डैशबोर्ड",
    
    // Analytics Dashboard
    "advancedAnalytics": "उन्नत विश्लेषिकी",
    "analyticsDescription": "अपने फार्म प्रदर्शन को अनुकूलित करने के लिए गहन विश्लेषण और पूर्वानुमान",
    "overview": "अवलोकन",
    "trends": "ट्रेंड्स",
    "distribution": "वितरण",
    "performance": "प्रदर्शन",
    "reports": "रिपोर्ट्स",
    "settings": "सेटिंग्स",
    
    // Overview Tab
    "averageTemperature": "औसत तापमान",
    "averageHumidity": "औसत आर्द्रता",
    "averageDailyEggs": "औसत दैनिक अंडे",
    "temperatureHumidityTrends": "तापमान और आर्द्रता ट्रेंड्स",
    "weeklyEggProduction": "साप्ताहिक अंडा उत्पादन",
    
    // Distribution Tab
    "sensorReadingDistribution": "सेंसर रीडिंग वितरण",
    "farmPerformanceScore": "फार्म प्रदर्शन स्कोर",
    "performingAboveAverage": "आपका फार्म आपके क्षेत्र के लिए औसत से ऊपर प्रदर्शन कर रहा है",
    "environment": "पर्यावरण",
    "production": "उत्पादन",
    "health": "स्वास्थ्य",
    "efficiency": "दक्षता",
    
    // Trends Tab
    "hourSensorTrends": "24 घंटे के सेंसर ट्रेंड्स",
    "eggProductionTrends": "अंडा उत्पादन ट्रेंड्स",
    "averageCO2": "औसत CO2",
    "averageAmmonia": "औसत अमोनिया",
    "averageTemp": "औसत तापमान",
    
    // Performance Tab
    "farmPerformanceMetrics": "फार्म प्रदर्शन मेट्रिक्स",
    "overallScore": "कुल स्कोर",
    "weeklyComparison": "साप्ताहिक तुलना",
    "improvementAreas": "सुधार क्षेत्र",
    
    // Reports Tab
    "monthlyReports": "मासिक रिपोर्ट",
    "exportData": "डेटा निर्यात करें",
    "scheduledReports": "निर्धारित रिपोर्ट",
    "customReports": "कस्टम रिपोर्ट",
    
    // Settings Tab
    "dashboardSettings": "डैशबोर्ड सेटिंग्स",
    "notifications": "सूचनाएं",
    "dataCollection": "डेटा संग्रह",
    "userPreferences": "उपयोगकर्ता प्राथमिकताएं",
    "languageSettings": "भाषा सेटिंग्स",
  },
  kn: {
    // Navigation
    "home": "ಮುಖಪುಟ",
    "liveData": "ಲೈವ್ ಡೇಟಾ",
    "analytics": "ವಿಶ್ಲೇಷಣೆಗಳು",
    "insights": "ಒಳನೋಟಗಳು",
    "contact": "ಸಂಪರ್ಕ",
    "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    
    // Analytics Dashboard
    "advancedAnalytics": "ಸುಧಾರಿತ ವಿಶ್ಲೇಷಣೆಗಳು",
    "analyticsDescription": "ನಿಮ್ಮ ಕೃಷಿ ಕ್ಷೇತ್ರದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಅನುಕೂಲಿಸಲು ಆಳವಾದ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಮುನ್ಸೂಚನೆ",
    "overview": "ಅವಲೋಕನ",
    "trends": "ಪ್ರವೃತ್ತಿಗಳು",
    "distribution": "ವಿತರಣೆ",
    "performance": "ಕಾರ್ಯಕ್ಷಮತೆ",
    "reports": "ವರದಿಗಳು",
    "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    
    // Overview Tab
    "averageTemperature": "ಸರಾಸರಿ ತಾಪಮಾನ",
    "averageHumidity": "ಸರಾಸರಿ ಆರ್ದ್ರತೆ",
    "averageDailyEggs": "ಸರಾಸರಿ ದೈನಂದಿನ ಮೊಟ್ಟೆಗಳು",
    "temperatureHumidityTrends": "ತಾಪಮಾನ & ಆರ್ದ್ರತೆ ಪ್ರವೃತ್ತಿಗಳು",
    "weeklyEggProduction": "ವಾರದ ಮೊಟ್ಟೆ ಉತ್ಪಾದನೆ",
    
    // Distribution Tab
    "sensorReadingDistribution": "ಸೆನ್ಸರ್ ರೀಡಿಂಗ್ ವಿತರಣೆ",
    "farmPerformanceScore": "ಕೃಷಿ ಕ್ಷೇತ್ರದ ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್",
    "performingAboveAverage": "ನಿಮ್ಮ ಕೃಷಿ ಕ್ಷೇತ್ರವು ನಿಮ್ಮ ಪ್ರದೇಶದ ಸರಾಸರಿಗಿಂತ ಮೇಲಿದೆ",
    "environment": "ಪರಿಸರ",
    "production": "ಉತ್ಪಾದನೆ",
    "health": "ಆರೋಗ್ಯ",
    "efficiency": "ದಕ್ಷತೆ",
    
    // Trends Tab
    "hourSensorTrends": "24-ಗಂಟೆ ಸೆನ್ಸರ್ ಪ್ರವೃತ್ತಿಗಳು",
    "eggProductionTrends": "ಮೊಟ್ಟೆ ಉತ್ಪಾದನೆ ಪ್ರವೃತ್ತಿಗಳು",
    "averageCO2": "ಸರಾಸರಿ CO2",
    "averageAmmonia": "ಸರಾಸರಿ ಅಮೋನಿಯ",
    "averageTemp": "ಸರಾಸರಿ ತಾಪಮಾನ",
    
    // Performance Tab
    "farmPerformanceMetrics": "ಕೃಷಿ ಕ್ಷೇತ್ರ ಕಾರ್ಯಕ್ಷಮತೆ ಮೆಟ್ರಿಕ್ಸ್",
    "overallScore": "ಒಟ್ಟಾರೆ ಸ್ಕೋರ್",
    "weeklyComparison": "ವಾರದ ಹೋಲಿಕೆ",
    "improvementAreas": "ಸುಧಾರಣೆಯ ಕ್ಷೇತ್ರಗಳು",
    
    // Reports Tab
    "monthlyReports": "ಮಾಸಿಕ ವರದಿಗಳು",
    "exportData": "ಡೇಟಾ ರಫ್ತು ಮಾಡಿ",
    "scheduledReports": "ನಿಗದಿಪಡಿಸಿದ ವರದಿಗಳು",
    "customReports": "ಕಸ್ಟಮ್ ವರದಿಗಳು",
    
    // Settings Tab
    "dashboardSettings": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "notifications": "ಅಧಿಸೂಚನೆಗಳು",
    "dataCollection": "ಡೇಟಾ ಸಂಗ್ರಹಣೆ",
    "userPreferences": "ಬಳಕೆದಾರರ ಆದ್ಯತೆಗಳು",
    "languageSettings": "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<AvailableLanguage>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
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
