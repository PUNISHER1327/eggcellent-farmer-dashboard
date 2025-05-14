
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
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
      
      // Authentication translations
      signIn: "Sign In",
      signUp: "Sign Up",
      password: "Password",
      signInSuccess: "Signed in successfully",
      signUpSuccess: "Account created successfully",
      confirmEmail: "Please check your email to confirm your account",
      signInError: "Sign in failed",
      signUpError: "Sign up failed",
      logout: "Logout",
      welcomeToFarmerFriendly: "Welcome to Farmer Friendly",
      signingIn: "Signing in...",
      signingUp: "Signing up...",
      profile: "Profile",
      dashboard: "Dashboard",
      
      // Home page and navigation
      home: "Home",
      mission: "Our Mission",
      aboutUs: "About Us",
      products: "Products",
      contact: "Contact",
      
      // Mission page translations
      ourMission: "Our Mission",
      vision: "Our Vision",
      visionDescription: "At Farmer Friendly, we envision a future where poultry farming is more efficient, sustainable, and profitable through innovative technology solutions.",
      visionGoal: "We aim to empower farmers with real-time data and intelligent systems that optimize farm operations while improving animal welfare.",
      whatWeDo: "What We Do",
      monitoring: "Environmental Monitoring",
      monitoringDescription: "Our advanced sensors continuously track temperature, humidity, ammonia levels, and other critical parameters to ensure optimal conditions.",
      analytics: "Data Analytics",
      analyticsDescription: "We transform complex farm data into actionable insights, helping farmers make informed decisions to improve productivity.",
      automation: "Farm Automation",
      automationDescription: "Our smart systems automate routine tasks and respond to environmental changes, reducing manual labor and increasing efficiency.",
      ourSensorKit: "Our Sensor Kit",
      completeMonitoringSolution: "Complete Monitoring Solution",
      sensorKitDescription: "Our comprehensive sensor kit includes everything needed to monitor your poultry farm environment and optimize production.",
      keyFeatures: "Key Features",
      feature1: "Real-time temperature and humidity monitoring",
      feature2: "Ammonia and CO₂ level detection",
      feature3: "Egg production tracking system",
      feature4: "Cloud-based data storage and analytics",
      feature5: "Mobile alerts and notifications",
      farmVision: "Farm Vision",
      sensorKit: "Sensor Kit",
      
      // Sensor kit activation
      activateYourKit: "Activate Your Sensor Kit",
      enterKitId: "Enter your Kit ID",
      kitIdPlaceholder: "e.g., SF-12345",
      activateKit: "Activate Kit",
      activating: "Activating...",
      kitActivated: "Sensor Kit Activated!",
      kitActivatedDescription: "Your sensor kit has been successfully activated. You now have access to the farm monitoring dashboard.",
      kitActivationFailed: "Activation Failed",
      kitActivationFailedDescription: "The kit ID you entered was not found or has already been activated. Please check and try again.",
      kitActivationError: "Activation Error",
      tryAgainLater: "Something went wrong. Please try again later.",
      kitActivationHelp: "You can find your Kit ID on the label attached to your Farmer Friendly sensor kit package.",
      
      // Dashboard access
      dashboardAccess: "Dashboard Access",
      activateToAccess: "Activate your Sensor Kit to access the dashboard",
      purchaseKit: "Purchase a Sensor Kit",
      alreadyHaveKit: "Already have a kit?",
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
      
      // Authentication translations
      signIn: "साइन इन करें",
      signUp: "साइन अप करें",
      password: "पासवर्ड",
      signInSuccess: "सफलतापूर्वक साइन इन किया गया",
      signUpSuccess: "खाता सफलतापूर्वक बनाया गया",
      confirmEmail: "कृपया अपने खाते की पुष्टि के लिए अपना ईमेल देखें",
      signInError: "साइन इन विफल",
      signUpError: "साइन अप विफल",
      logout: "लॉगआउट",
      welcomeToFarmerFriendly: "किसान मित्र में आपका स्वागत है",
      signingIn: "साइन इन हो रहा है...",
      signingUp: "साइन अप हो रहा है...",
      profile: "प्रोफाइल",
      dashboard: "डैशबोर्ड",
      
      // Home page and navigation
      home: "होम",
      mission: "हमारा मिशन",
      aboutUs: "हमारे बारे में",
      products: "उत्पाद",
      contact: "संपर्क",
      
      // Mission page translations
      ourMission: "हमारा मिशन",
      vision: "हमारी दृष्टि",
      visionDescription: "किसान मित्र में, हम एक ऐसे भविष्य की कल्पना करते हैं जहां नवीन तकनीकी समाधानों के माध्यम से पोल्ट्री फार्मिंग अधिक कुशल, टिकाऊ और लाभदायक हो।",
      visionGoal: "हम किसानों को वास्तविक समय के डेटा और बुद्धिमान प्रणालियों से सशक्त बनाना चाहते हैं जो पशु कल्याण में सुधार के साथ-साथ फार्म संचालन को अनुकूलित करते हैं।",
      whatWeDo: "हम क्या करते हैं",
      monitoring: "पर्यावरण निगरानी",
      monitoringDescription: "हमारे उन्नत सेंसर लगातार तापमान, नमी, अमोनिया स्तर और अन्य महत्वपूर्ण मापदंडों को ट्रैक करते हैं ताकि इष्टतम स्थितियों को सुनिश्चित किया जा सके।",
      analytics: "डेटा विश्लेषिकी",
      analyticsDescription: "हम जटिल फार्म डेटा को कार्रवाई योग्य अंतर्दृष्टि में बदलते हैं, जिससे किसानों को उत्पादकता में सुधार के लिए सूचित निर्णय लेने में मदद मिलती है।",
      automation: "फार्म ऑटोमेशन",
      automationDescription: "हमारी स्मार्ट प्रणालियां नियमित कार्यों को स्वचालित करती हैं और पर्यावरणीय परिवर्तनों के प्रति प्रतिक्रिया करती हैं, जिससे मैनुअल श्रम कम होता है और दक्षता बढ़ती है।",
      ourSensorKit: "हमारा सेंसर किट",
      completeMonitoringSolution: "पूर्ण निगरानी समाधान",
      sensorKitDescription: "हमारे व्यापक सेंसर किट में आपके पोल्ट्री फार्म के वातावरण की निगरानी और उत्पादन को अनुकूलित करने के लिए आवश्यक सब कुछ शामिल है।",
      keyFeatures: "प्रमुख विशेषताएं",
      feature1: "वास्तविक समय तापमान और नमी की निगरानी",
      feature2: "अमोनिया और CO₂ स्तर का पता लगाना",
      feature3: "अंडा उत्पादन ट्रैकिंग प्रणाली",
      feature4: "क्लाउड-आधारित डेटा स्टोरेज और विश्लेषिकी",
      feature5: "मोबाइल अलर्ट और सूचनाएं",
      farmVision: "फार्म विजन",
      sensorKit: "सेंसर किट",
      
      // Sensor kit activation
      activateYourKit: "अपना सेंसर किट सक्रिय करें",
      enterKitId: "अपना किट आईडी दर्ज करें",
      kitIdPlaceholder: "जैसे, SF-12345",
      activateKit: "किट सक्रिय करें",
      activating: "सक्रिय हो रहा है...",
      kitActivated: "सेंसर किट सक्रिय!",
      kitActivatedDescription: "आपका सेंसर किट सफलतापूर्वक सक्रिय कर दिया गया है। अब आपको फार्म मॉनिटरिंग डैशबोर्ड तक पहुंच प्राप्त है।",
      kitActivationFailed: "सक्रियण विफल",
      kitActivationFailedDescription: "आपके द्वारा दर्ज किट आईडी नहीं मिली या पहले से ही सक्रिय है। कृपया जांचें और पुनः प्रयास करें।",
      kitActivationError: "सक्रियण त्रुटि",
      tryAgainLater: "कुछ गलत हो गया। कृपया बाद में पुन: प्रयास करें।",
      kitActivationHelp: "आप अपने किसान मित्र सेंसर किट पैकेज पर लगे लेबल पर अपना किट आईडी पा सकते हैं।",
      
      // Dashboard access
      dashboardAccess: "डैशबोर्ड एक्सेस",
      activateToAccess: "डैशबोर्ड तक पहुंचने के लिए अपना सेंसर किट सक्रिय करें",
      purchaseKit: "एक सेंसर किट खरीदें",
      alreadyHaveKit: "पहले से ही एक किट है?",
    },
    kn: {
      farmFriendlyDashboard: "ರೈತ ಸ್ನೇಹಿ - ಕೋಳಿ ಫಾರ್ಮ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      heroTitle: "ಕೋಳಿ ಫಾರ್ಮ್ ಮೇಲ್ವಿಚಾರಣೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      heroSubtitle: "ಉತ್ತಮ ಕೋಳಿ ನಿರ್ವಹಣೆಗಾಗಿ ನೇರ ಸಮಯ ಒಳನೋಟಗಳನ್ನು.",
      liveData: "ನೇರ ಡೇಟಾ",
      temperature: "ತಾಪಮಾನ",
      humidity: "ಆರ್ದ್ರತೆ",
      ammonia: "ಅಮೋನಿಯಾ",
      eggCollectionRate: "ಮೊಟ್ಟೆ ಸಂಗ್ರಹ ದರ",
      waterConsumption: "ನೀರಿನ ಬಳಕೆ",
      feedConsumption: "ಫೀಡ್ ಬಳಕೆ",
      insights: "ಒಳನೋಟಗಳನ್ನು",
      historicalData: "ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ",
      predictiveAnalysis: "ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆ",
      optimizationTips: "ಹೊಂದುವಂತೆ ಸಲಹೆಗಳು",
      contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      message: "ಸಂದೇಶ",
      send: "ಕಳುಹಿಸು",
      footerText: "© {year} ರೈತ ಸ್ನೇಹಿ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      conveyorBeltStatus: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಸ್ಥಿತಿ",
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
      
      // Authentication translations
      signIn: "ಸೈನ್ ಇನ್",
      signUp: "ಸೈನ್ ಅಪ್",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      signInSuccess: "ಯಶಸ್ವಿಯಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಲಾಗಿದೆ",
      signUpSuccess: "ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ",
      confirmEmail: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ದೃಢೀಕರಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ",
      signInError: "ಸೈನ್ ಇನ್ ವಿಫಲವಾಗಿದೆ",
      signUpError: "ಸೈನ್ ಅಪ್ ವಿಫಲವಾಗಿದೆ",
      logout: "ಲಾಗ್ ಔಟ್",
      welcomeToFarmerFriendly: "ರೈತ ಸ್ನೇಹಿಗೆ ಸುಸ್ವಾಗತ",
      signingIn: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...",
      signingUp: "ಸೈನ್ ಅಪ್ ಆಗುತ್ತಿದೆ...",
      profile: "ಪ್ರೊಫೈಲ್",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      
      // Home page and navigation
      home: "ಮುಖಪುಟ",
      mission: "ನಮ್ಮ ಮಿಷನ್",
      aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
      products: "ಉತ್ಪನ್ನಗಳು",
      contact: "ಸಂಪರ್ಕ",
      
      // Mission page translations
      ourMission: "ನಮ್ಮ ಮಿಷನ್",
      vision: "ನಮ್ಮ ದೃಷ್ಟಿಕೋನ",
      visionDescription: "ರೈತ ಸ್ನೇಹಿಯಲ್ಲಿ, ನಾವು ನವೀನ ತಂತ್ರಜ್ಞಾನ ಪರಿಹಾರಗಳ ಮೂಲಕ ಕೋಳಿ ಸಾಕಾಣಿಕೆ ಹೆಚ್ಚು ದಕ್ಷ, ಸುಸ್ಥಿರ ಮತ್ತು ಲಾಭದಾಯಕವಾಗಿರುವ ಭವಿಷ್ಯವನ್ನು ಕಲ್ಪಿಸುತ್ತೇವೆ.",
      visionGoal: "ಪ್ರಾಣಿ ಕಲ್ಯಾಣವನ್ನು ಸುಧಾರಿಸುವ ಜೊತೆಗೆ ಫಾರ್ಮ್ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಅನುಕೂಲಿಸುವ ರಿಯಲ್-ಟೈಮ್ ಡೇಟಾ ಮತ್ತು ಬುದ್ಧಿವಂತ ವ್ಯವಸ್ಥೆಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು ನಮ್ಮ ಗುರಿಯಾಗಿದೆ.",
      whatWeDo: "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
      monitoring: "ಪರಿಸರ ಮೇಲ್ವಿಚಾರಣೆ",
      monitoringDescription: "ನಮ್ಮ ಸುಧಾರಿತ ಸೆನ್ಸರ್‌ಗಳು ನಿರಂತರವಾಗಿ ತಾಪಮಾನ, ಆರ್ದ್ರತೆ, ಅಮೋನಿಯಾ ಮಟ್ಟಗಳು ಮತ್ತು ಇತರ ನಿರ್ಣಾಯಕ ನಿಯತಾಂಕಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತವೆ ಆದರ್ಶ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಖಾತರಿಪಡಿಸಲು.",
      analytics: "ಡೇಟಾ ವಿಶ್ಲೇಷಣೆ",
      analyticsDescription: "ನಾವು ಸಂಕೀರ್ಣ ಫಾರ್ಮ್ ಡೇಟಾವನ್ನು ಕ್ರಿಯಾಶೀಲ ಒಳನೋಟಗಳಾಗಿ ಪರಿವರ್ತಿಸುತ್ತೇವೆ, ರೈತರಿಗೆ ಉತ್ಪಾದಕತೆಯನ್ನು ಸುಧಾರಿಸಲು ಮಾಹಿತಿಯುಕ್ತ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
      automation: "ಫಾರ್ಮ್ ಸ್ವಯಂಚಾಲನೆ",
      automationDescription: "ನಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸಿಸ್ಟಮ್‌ಗಳು ರೂಢಿಯ ಕಾರ್ಯಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುತ್ತವೆ ಮತ್ತು ಪರಿಸರದ ಬದಲಾವಣೆಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತವೆ, ಇದರಿಂದ ಕೈಯಿಂದ ದುಡಿಮೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ ದಕ್ಷತೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
      ourSensorKit: "ನಮ್ಮ ಸೆನ್ಸರ್ ಕಿಟ್",
      completeMonitoringSolution: "ಸಂಪೂರ್ಣ ಮೇಲ್ವಿಚಾರಣಾ ಪರಿಹಾರ",
      sensorKitDescription: "ನಮ್ಮ ಸಮಗ್ರ ಸೆನ್ಸರ್ ಕಿಟ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಕೋಳಿ ಫಾರ್ಮ್ ಪರಿಸರವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ಮತ್ತು ಉತ್ಪಾದನೆಯನ್ನು ಅನುಕೂಲಗೊಳಿಸಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲವೂ ಸೇರಿವೆ.",
      keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
      feature1: "ರಿಯಲ್-ಟೈಮ್ ತಾಪಮಾನ ಮತ್ತು ಆರ್ದ್ರತೆ ಮೇಲ್ವಿಚಾರಣೆ",
      feature2: "ಅಮೋನಿಯಾ ಮತ್ತು CO₂ ಮಟ್ಟದ ಪತ್ತೆ",
      feature3: "ಮೊಟ್ಟೆ ಉತ್ಪಾದನೆ ಟ್ರ್ಯಾಕಿಂಗ್ ವ್ಯವಸ್ಥೆ",
      feature4: "ಕ್ಲೌಡ್-ಆಧಾರಿತ ಡೇಟಾ ಸಂಗ್ರಹಣೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ",
      feature5: "ಮೊಬೈಲ್ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಅಧಿಸೂಚನೆಗಳು",
      farmVision: "ಫಾರ್ಮ್ ವಿಷನ್",
      sensorKit: "ಸೆನ್ಸರ್ ಕಿಟ್",
      
      // Sensor kit activation
      activateYourKit: "ನಿಮ್ಮ ಸೆನ್ಸರ್ ಕಿಟ್ ಸಕ್ರಿಯಗೊಳಿಸಿ",
      enterKitId: "ನಿಮ್ಮ ಕಿಟ್ ID ನಮೂದಿಸಿ",
      kitIdPlaceholder: "ಉದಾ., SF-12345",
      activateKit: "ಕಿಟ್ ಸಕ್ರಿಯಗೊಳಿಸಿ",
      activating: "ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
      kitActivated: "ಸೆನ್ಸರ್ ಕಿಟ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ!",
      kitActivatedDescription: "ನಿಮ್ಮ ಸೆನ್ಸರ್ ಕಿಟ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ನೀವು ಈಗ ಫಾರ್ಮ್ ಮಾನಿಟರಿಂಗ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶವನ್ನು ಹೊಂದಿದ್ದೀರಿ.",
      kitActivationFailed: "ಸಕ್ರಿಯಗೊಳಿಸಲು ವಿಫಲವಾಗಿದೆ",
      kitActivationFailedDescription: "ನೀವು ನಮೂದಿಸಿದ ಕಿಟ್ ID ಕಂಡುಬಂದಿಲ್ಲ ಅಥವಾ ಈಗಾಗಲೇ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      kitActivationError: "ಸಕ್ರಿಯಗೊಳಿಸುವ ದೋಷ",
      tryAgainLater: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      kitActivationHelp: "ನಿಮ್ಮ ರೈತ ಸ್ನೇಹಿ ಸೆನ್ಸರ್ ಕಿಟ್ ಪ್ಯಾಕೇಜ್‌ಗೆ ಲಗತ್ತಿಸಿದ ಲೇಬಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಕಿಟ್ ID ಕಂಡುಬರುತ್ತದೆ.",
      
      // Dashboard access
      dashboardAccess: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶ",
      activateToAccess: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ಸೆನ್ಸರ್ ಕಿಟ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
      purchaseKit: "ಸೆನ್ಸರ್ ಕಿಟ್ ಖರೀದಿಸಿ",
      alreadyHaveKit: "ಈಗಾಗಲೇ ಕಿಟ್ ಹೊಂದಿದ್ದೀರಾ?",
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
