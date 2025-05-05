
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void; // Changed from changeLanguage to setLanguage
  t: (key: string, vars?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    localStorage.setItem('language', language);
  };

  const translations = {
    en: {
      farmFriendlyDashboard: "Farmer Friendly - Poultry Farm Dashboard",
      heroTitle: "Poultry Farm Monitoring Dashboard",
      heroSubtitle: "Real-time insights for optimal poultry management.",
      liveData: "Live Data",
      temperature: "Temperature",
      humidity: "Humidity",
      ammonia: "Ammonia",
      eggCollectionRate: "Egg Collection Rate",
      waterConsumption: "Water Consumption",
      feedConsumption: "Feed Consumption",
      insights: "Insights",
      historicalData: "Historical Data",
      predictiveAnalysis: "Predictive Analysis",
      optimizationTips: "Optimization Tips",
      contactUs: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      footerText: "© {year} Farmer Friendly. All rights reserved.",
      conveyorBeltStatus: "Conveyor Belt Status",
      statusMessage: "Real-time monitoring of the conveyor belt system for efficient egg collection.",
      currentStatus: "Current Status",
      on: "ON",
      off: "OFF",
      ammoniaLevel: "Ammonia Level",
      thresholdValue: "Threshold Value",
      conveyorBeltOnMessage: "Conveyor belt is running smoothly. Ammonia level is {ammonia} ppm, below the threshold of {threshold} ppm.",
      conveyorBeltOffMessage: "Conveyor belt is currently OFF. Ammonia level is {ammonia} ppm, exceeding the threshold of {threshold} ppm.",
      
      // Manual conveyor control translations
      manualMode: "Manual Mode",
      autoMode: "Auto Mode",
      switchToManual: "Switch to Manual",
      switchToAuto: "Switch to Auto",
      turnOnConveyor: "Turn On Conveyor",
      turnOffConveyor: "Turn Off Conveyor",
      conveyorManuallyOn: "Conveyor belt is manually turned ON",
      conveyorManuallyOff: "Conveyor belt is manually turned OFF",
      manualModeActivated: "Manual Mode Activated",
      autoModeActivated: "Auto Mode Activated",
      conveyorControlSwitchedToManual: "Conveyor belt control switched to manual mode",
      manualModeDescription: "You can now control the conveyor belt manually",
      autoModeDescription: "Conveyor belt is now controlled automatically based on ammonia levels",
      conveyorTurningOn: "Conveyor Belt Starting",
      conveyorTurningOff: "Conveyor Belt Shutting Down",
      conveyorStarting: "The conveyor belt system is now starting up",
      conveyorShuttingDown: "The conveyor belt system is now shutting down",
    },
    hi: {
      farmFriendlyDashboard: "किसान मित्र - पोल्ट्री फार्म डैशबोर्ड",
      heroTitle: "पोल्ट्री फार्म मॉनिटरिंग डैशबोर्ड",
      heroSubtitle: "इष्टतम पोल्ट्री प्रबंधन के लिए वास्तविक समय में जानकारी।",
      liveData: "लाइव डेटा",
      temperature: "तापमान",
      humidity: "नमी",
      ammonia: "अमोनिया",
      eggCollectionRate: "अंडा संग्रह दर",
      waterConsumption: "पानी की खपत",
      feedConsumption: "फ़ीड खपत",
      insights: "जानकारी",
      historicalData: "ऐतिहासिक डेटा",
      predictiveAnalysis: "भविष्य कहनेवाला विश्लेषण",
      optimizationTips: "अनुकूलन युक्तियाँ",
      contactUs: "संपर्क करें",
      name: "नाम",
      email: "ईमेल",
      message: "संदेश",
      send: "भेजें",
      footerText: "© {year} किसान मित्र। सर्वाधिकार सुरक्षित।",
      conveyorBeltStatus: "कन्वेयर बेल्ट स्थिति",
      statusMessage: "कुशल अंडा संग्रह के लिए कन्वेयर बेल्ट प्रणाली की वास्तविक समय निगरानी।",
      currentStatus: "वर्तमान स्थिति",
      on: "चालू",
      off: "बंद",
      ammoniaLevel: "अमोनिया स्तर",
      thresholdValue: "सीमा मान",
      conveyorBeltOnMessage: "कन्वेयर बेल्ट सुचारू रूप से चल रही है। अमोनिया का स्तर {ammonia} पीपीएम है, जो {threshold} पीपीएम की सीमा से नीचे है।",
      conveyorBeltOffMessage: "कन्वेयर बेल्ट वर्तमान में बंद है। अमोनिया का स्तर {ammonia} पीपीएम है, जो {threshold} पीपीएम की सीमा से अधिक है।",
      
      // Manual conveyor control translations for Hindi
      manualMode: "मैनुअल मोड",
      autoMode: "स्वचालित मोड",
      switchToManual: "मैनुअल पर स्विच करें",
      switchToAuto: "स्वचालित पर स्विच करें",
      turnOnConveyor: "कन्वेयर चालू करें",
      turnOffConveyor: "कन्वेयर बंद करें",
      conveyorManuallyOn: "कन्वेयर बेल्ट मैन्युअल रूप से चालू है",
      conveyorManuallyOff: "कन्वेयर बेल्ट मैन्युअल रूप से बंद है",
      manualModeActivated: "मैनुअल मोड सक्रिय",
      autoModeActivated: "स्वचालित मोड सक्रिय",
      conveyorControlSwitchedToManual: "कन्वेयर बेल्ट नियंत्रण मैनुअल मोड में स्विच किया गया",
      manualModeDescription: "अब आप कन्वेयर बेल्ट को मैन्युअल रूप से नियंत्रित कर सकते हैं",
      autoModeDescription: "कन्वेयर बेल्ट अब अमोनिया स्तरों के आधार पर स्वचालित रूप से नियंत्रित है",
      conveyorTurningOn: "कन्वेयर बेल्ट शुरू हो रही है",
      conveyorTurningOff: "कन्वेयर बेल्ट बंद हो रही है",
      conveyorStarting: "कन्वेयर बेल्ट सिस्टम अब शुरू हो रहा है",
      conveyorShuttingDown: "कन्वेयर बेल्ट सिस्टम अब बंद हो रहा है",
    },
    kn: {
      farmFriendlyDashboard: "ರೈತ ಸ್ನೇಹಿ - ಕೋಳಿ ಫಾರ್ಮ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      heroTitle: "ಕೋಳಿ ಫಾರ್ಮ್ ಮೇಲ್ವಿಚಾರಣೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      heroSubtitle: "ಉತ್ತಮ ಕೋಳಿ ನಿರ್ವಹಣೆಗಾಗಿ ನೇರ ಸಮಯ ಒಳನೋಟಗಳನ್ನು.",
      liveData: "ನೇರ ಡೇಟಾ",
      temperature: "ತಾಪಮಾನ",
      humidity: "ಆರ್ದ್ರತೆ",
      ammonia: "ಅಮೋನಿಯಾ",
      eggCollectionRate: "ಮೊಟ್ಟೆ ಸಂಗ್ರಹ ದರ",
      waterConsumption: "ನೀರಿನ ಬಳಕೆ",
      feedConsumption: "ಫೀಡ್ ಬಳಕೆ",
      insights: "ಒಳನೋಟಗಳನ್ನು",
      historicalData: "ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ",
      predictiveAnalysis: "ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆ",
      optimizationTips: "ಹೊಂದುವಂತೆ ಸಲಹೆಗಳು",
      contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      message: "ಸಂದೇಶ",
      send: "ಕಳುಹಿಸು",
      footerText: "© {year} ರೈತ ಸ್ನೇಹಿ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      conveyorBeltStatus: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಸ್ಥಿತಿ",
      statusMessage: "ಸಮರ್ಥ ಮೊಟ್ಟೆ ಸಂಗ್ರಹಕ್ಕಾಗಿ ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ವ್ಯವಸ್ಥೆಯ ನೈಜ-ಸಮಯದ ಮೇಲ್ವಿಚಾರಣೆ.",
      currentStatus: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
      on: "ಚಾಲ್ತಿಯಲ್ಲಿದೆ",
      off: "ಆಫ್",
      ammoniaLevel: "ಅಮೋನಿಯಾ ಮಟ್ಟ",
      thresholdValue: "ಮಿತಿ ಮೌಲ್ಯ",
      conveyorBeltOnMessage: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಸರಾಗವಾಗಿ ಚಾಲನೆಯಲ್ಲಿದೆ. ಅಮೋನಿಯಾ ಮಟ್ಟವು {ammonia} ಪಿಪಿಎಂ ಆಗಿದೆ, ಇದು {threshold} ಪಿಪಿಎಂ ಮಿತಿಗಿಂತ ಕಡಿಮೆಯಾಗಿದೆ.",
      conveyorBeltOffMessage: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಪ್ರಸ್ತುತ ಆಫ್ ಆಗಿದೆ. ಅಮೋನಿಯಾ ಮಟ್ಟವು {ammonia} ಪಿಪಿಎಂ ಆಗಿದೆ, ಇದು {threshold} ಪಿಪಿಎಂ ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
      
      // Manual conveyor control translations for Kannada
      manualMode: "ಕೈಯಿಂದ ನಿಯಂತ್ರಣ",
      autoMode: "ಸ್ವಯಂಚಾಲಿತ ನಿಯಂತ್ರಣ",
      switchToManual: "ಕೈಯಿಂದ ನಿಯಂತ್ರಣಕ್ಕೆ ಬದಲಿಸಿ",
      switchToAuto: "ಸ್ವಯಂಚಾಲಿತಕ್ಕೆ ಬದಲಿಸಿ",
      turnOnConveyor: "ಕನ್ವೇಯರ್ ಆನ್ ಮಾಡಿ",
      turnOffConveyor: "ಕನ್ವೇಯರ್ ಆಫ್ ಮಾಡಿ",
      conveyorManuallyOn: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಕೈಯಿಂದ ಆನ್ ಮಾಡಲಾಗಿದೆ",
      conveyorManuallyOff: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಕೈಯಿಂದ ಆಫ್ ಮಾಡಲಾಗಿದೆ",
      manualModeActivated: "ಕೈಯಿಂದ ನಿಯಂತ್ರಣ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
      autoModeActivated: "ಸ್ವಯಂಚಾಲಿತ ನಿಯಂತ್ರಣ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
      conveyorControlSwitchedToManual: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ನಿಯಂತ್ರಣವನ್ನು ಕೈಯಿಂದ ನಿಯಂತ್ರಣಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ",
      manualModeDescription: "ಈಗ ನೀವು ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಅನ್ನು ಕೈಯಿಂದ ನಿಯಂತ್ರಿಸಬಹುದು",
      autoModeDescription: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಈಗ ಅಮೋನಿಯಾ ಮಟ್ಟಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಯಂತ್ರಿಸಲ್ಪಡುತ್ತಿದೆ",
      conveyorTurningOn: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ",
      conveyorTurningOff: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಶಟ್ ಡೌನ್ ಆಗುತ್ತಿದೆ",
      conveyorStarting: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ವ್ಯವಸ್ಥೆ ಈಗ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ",
      conveyorShuttingDown: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ವ್ಯವಸ್ಥೆ ಈಗ ಶಟ್ ಡೌನ್ ಆಗುತ್ತಿದೆ",
    },
  };

  const t = (key: string, vars: { [key: string]: string } = {}) => {
    let translation = translations[language][key] || key;
    
    for (const varKey in vars) {
      translation = translation.replace(`{${varKey}}`, vars[varKey]);
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
