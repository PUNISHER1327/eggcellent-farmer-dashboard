
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
    "createNewScheduledReport": "Create New Scheduled Report",
    "createCustomReport": "Create Custom Report",
    "customReportDescription": "Select parameters and date ranges to generate a custom report",
    "name": "Name",
    "date": "Date",
    "type": "Type",
    "actions": "Actions",
    "frequency": "Frequency",
    "nextRun": "Next Run",
    "view": "View",
    "download": "Download",
    "edit": "Edit",
    "delete": "Delete",
    "cancel": "Cancel",
    "save": "Save Settings",
    
    // Settings Tab
    "dashboardSettings": "Dashboard Settings",
    "notifications": "Notifications",
    "dataCollection": "Data Collection",
    "userPreferences": "User Preferences",
    "languageSettings": "Language Settings",
    "selectLanguage": "Select Language",
    "pushNotifications": "Push Notifications",
    "pushNotificationsDesc": "Receive alerts for important events",
    "emailNotifications": "Email Notifications",
    "emailNotificationsDesc": "Receive daily summary reports",
    "alertThresholds": "Alert Thresholds",
    "alertThresholdsDesc": "Get notified for critical values only",
    "dataCollectionInterval": "Data Collection Interval",
    "fiveMinutes": "5 minutes",
    "fifteenMinutes": "15 minutes",
    "thirtyMinutes": "30 minutes",
    "oneHour": "1 hour",
    "extendedDataStorage": "Extended Data Storage",
    "extendedDataStorageDesc": "Store historical data for up to 1 year",
    "automaticBackup": "Automatic Backup",
    "automaticBackupDesc": "Weekly backup to cloud storage",
    "darkTheme": "Dark Theme",
    "darkThemeDesc": "Toggle between light and dark mode",
    "compactView": "Compact View",
    "compactViewDesc": "Show more information in less space",
    "uiAnimations": "UI Animations",
    "uiAnimationsDesc": "Enable smooth transitions and animations",
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
    "createNewScheduledReport": "नई निर्धारित रिपोर्ट बनाएं",
    "createCustomReport": "कस्टम रिपोर्ट बनाएं",
    "customReportDescription": "कस्टम रिपोर्ट बनाने के लिए पैरामीटर और तारीख सीमा का चयन करें",
    "name": "नाम",
    "date": "तारीख",
    "type": "प्रकार",
    "actions": "कार्यवाई",
    "frequency": "आवृत्ति",
    "nextRun": "अगली बार",
    "view": "देखें",
    "download": "डाउनलोड करें",
    "edit": "संपादित करें",
    "delete": "हटाएं",
    "cancel": "रद्द करें",
    "save": "सेटिंग्स सहेजें",
    
    // Settings Tab
    "dashboardSettings": "डैशबोर्ड सेटिंग्स",
    "notifications": "सूचनाएं",
    "dataCollection": "डेटा संग्रह",
    "userPreferences": "उपयोगकर्ता प्राथमिकताएं",
    "languageSettings": "भाषा सेटिंग्स",
    "selectLanguage": "भाषा चुनें",
    "pushNotifications": "पुश सूचनाएं",
    "pushNotificationsDesc": "महत्वपूर्ण घटनाओं के लिए अलर्ट प्राप्त करें",
    "emailNotifications": "ईमेल सूचनाएं",
    "emailNotificationsDesc": "दैनिक सारांश रिपोर्ट प्राप्त करें",
    "alertThresholds": "अलर्ट सीमाएं",
    "alertThresholdsDesc": "केवल महत्वपूर्ण मूल्यों के लिए सूचित किया जाए",
    "dataCollectionInterval": "डेटा संग्रह अंतराल",
    "fiveMinutes": "5 मिनट",
    "fifteenMinutes": "15 मिनट",
    "thirtyMinutes": "30 मिनट",
    "oneHour": "1 घंटा",
    "extendedDataStorage": "विस्तारित डेटा स्टोरेज",
    "extendedDataStorageDesc": "1 वर्ष तक का ऐतिहासिक डेटा स्टोर करें",
    "automaticBackup": "स्वचालित बैकअप",
    "automaticBackupDesc": "साप्ताहिक क्लाउड बैकअप",
    "darkTheme": "डार्क थीम",
    "darkThemeDesc": "लाइट और डार्क मोड के बीच स्विच करें",
    "compactView": "कॉम्पैक्ट व्यू",
    "compactViewDesc": "कम जगह में अधिक जानकारी दिखाएं",
    "uiAnimations": "यूआई एनिमेशन",
    "uiAnimationsDesc": "स्मूथ ट्रांजिशन और एनिमेशन सक्षम करें",
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
    "createNewScheduledReport": "ಹೊಸ ನಿಗದಿಪಡಿಸಿದ ವರದಿಯನ್ನು ರಚಿಸಿ",
    "createCustomReport": "ಕಸ್ಟಮ್ ವರದಿಯನ್ನು ರಚಿಸಿ",
    "customReportDescription": "ಕಸ್ಟಮ್ ವರದಿಯನ್ನು ರಚಿಸಲು ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು ಮತ್ತು ದಿನಾಂಕ ಶ್ರೇಣಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "name": "ಹೆಸರು",
    "date": "ದಿನಾಂಕ",
    "type": "ಪ್ರಕಾರ",
    "actions": "ಕ್ರಿಯೆಗಳು",
    "frequency": "ಆವರ್ತನ",
    "nextRun": "ಮುಂದಿನ ಬಾರಿ",
    "view": "ನೋಡಿ",
    "download": "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    "edit": "ಸಂಪಾದಿಸಿ",
    "delete": "ಅಳಿಸಿ",
    "cancel": "ರದ್ದುಮಾಡಿ",
    "save": "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
    
    // Settings Tab
    "dashboardSettings": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "notifications": "ಅಧಿಸೂಚನೆಗಳು",
    "dataCollection": "ಡೇಟಾ ಸಂಗ್ರಹಣೆ",
    "userPreferences": "ಬಳಕೆದಾರರ ಆದ್ಯತೆಗಳು",
    "languageSettings": "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "selectLanguage": "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "pushNotifications": "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು",
    "pushNotificationsDesc": "ಮಹತ್ವದ ಘಟನೆಗಳಿಗೆ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ",
    "emailNotifications": "ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳು",
    "emailNotificationsDesc": "ದೈನಂದಿನ ಸಾರಾಂಶ ವರದಿಗಳನ್ನು ಪಡೆಯಿರಿ",
    "alertThresholds": "ಎಚ್ಚರಿಕೆ ಮಿತಿಗಳು",
    "alertThresholdsDesc": "ಕೇವಲ ಮಹತ್ವದ ಮೌಲ್ಯಗಳಿಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
    "dataCollectionInterval": "ಡೇಟಾ ಸಂಗ್ರಹಣೆ ಮಧ್ಯಂತರ",
    "fiveMinutes": "5 ನಿಮಿಷಗಳು",
    "fifteenMinutes": "15 ನಿಮಿಷಗಳು",
    "thirtyMinutes": "30 ನಿಮಿಷಗಳು",
    "oneHour": "1 ಗಂಟೆ",
    "extendedDataStorage": "ವಿಸ್ತರಿತ ಡೇಟಾ ಸಂಗ್ರಹಣೆ",
    "extendedDataStorageDesc": "1 ವರ್ಷದವರೆಗೆ ಐತಿಹಾಸಿಕ ಡೇಟಾ ಸಂಗ್ರಹಿಸಿ",
    "automaticBackup": "ಸ್ವಯಂಚಾಲಿತ ಬ್ಯಾಕಪ್",
    "automaticBackupDesc": "ವಾರದ ಕ್ಲೌಡ್ ಸಂಗ್ರಹಣೆಗೆ ಬ್ಯಾಕಪ್ ಮಾಡಿ",
    "darkTheme": "ಡಾರ್ಕ್ ಥೀಮ್",
    "darkThemeDesc": "ಲೈಟ್ ಮತ್ತು ಡಾರ್ಕ್ ಮೋಡ್‌ಗಳ ನಡುವೆ ಬದಲಿಸಿ",
    "compactView": "ಕಾಂಪ್ಯಾಕ್ಟ್ ವೀಕ್ಷಣೆ",
    "compactViewDesc": "ಕಡಿಮೆ ಸ್ಥಳದಲ್ಲಿ ಹೆಚ್ಚಿನ ಮಾಹಿತಿಯನ್ನು ತೋರಿಸಿ",
    "uiAnimations": "ಯುಐ ಅನಿಮೇಷನ್‌ಗಳು",
    "uiAnimationsDesc": "ಸುಗಮ ಪರಿವರ್ತನೆಗಳು ಮತ್ತು ಅನಿಮೇಷನ್‌ಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
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
