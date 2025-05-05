import React, { createContext, useContext, useState } from 'react';

type AvailableLanguage = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: AvailableLanguage;
  setLanguage: (language: AvailableLanguage) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string, params?: Record<string, string>) => string;
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
    "profile": "Profile",
    
    // Global
    "farmFriendlyDashboard": "Farmer Friendly - Poultry Farm Dashboard",
    
    // Profile Page
    "farmerProfile": "Farmer Profile",
    "phone": "Phone",
    "email": "Email",
    "farmLocation": "Farm Location",
    "chickenCount": "Number of Chickens",
    "joiningDate": "Joining Date",
    "editProfile": "Edit Profile",
    "saveChanges": "Save Changes",
    "cancel": "Cancel",
    "healthStatus": "Health Status",
    "noHealthAlerts": "No health alerts at this time.",
    "lowFeedAlert": "Low feed level detected in Coop #3",
    "temperatureAlert": "High temperature warning in Coop #2",
    "vaccinationReminder": "Vaccination due for Batch #A12",
    
    // Conveyor Belt
    "conveyorBeltStatus": "Conveyor Belt Status",
    "currentStatus": "Current Status",
    "ammoniaLevel": "Ammonia Level",
    "thresholdValue": "Threshold Value",
    "on": "ON",
    "off": "OFF",
    "statusMessage": "Status Message",
    "conveyorBeltOnMessage": "Conveyor belt is ON because ammonia level ({ammonia} ppm) is above threshold ({threshold} ppm)",
    "conveyorBeltOffMessage": "Conveyor belt is OFF because ammonia level ({ammonia} ppm) is below threshold ({threshold} ppm)",
    
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
    "save": "Save Settings",
    "april2025PerformanceReport": "April 2025 Performance Report",
    "march2025PerformanceReport": "March 2025 Performance Report",
    "february2025PerformanceReport": "February 2025 Performance Report",
    "q12025Analysis": "Q1 2025 Analysis",
    "monthly": "Monthly",
    "quarterly": "Quarterly",
    "weeklyPerformance": "Weekly Performance",
    "monthlySummary": "Monthly Summary",
    "environmentalConditions": "Environmental Conditions",
    "everyMonday": "Every Monday",
    "firstOfMonth": "First of Month",
    "daily": "Daily",
    
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
    
    // Contact Section
    "contactUs": "Contact Us",
    "haveQuestions": "Have questions? We're here to help optimize your farm",
    "enterYourName": "Enter your name",
    "enterYourEmail": "Enter your email",
    "howCanWeHelp": "How can we help?",
    "tellUsWhatYouNeed": "Tell us what you need...",
    "sendMessage": "Send Message",
    "farmSupportHours": "Farm Support Hours",
    "farmExpertsAvailable": "Our farming experts are available to assist you with any questions or concerns:",
    "mondayToFriday": "Monday - Friday: 7:00 AM - 6:00 PM",
    "saturday": "Saturday: 8:00 AM - 2:00 PM",
    "sunday": "Sunday: Closed (Emergency support only)",
    "emergencySupport": "Emergency Support",
    "urgentMatters": "For urgent matters related to equipment failures or animal welfare:",
    "location": "Location",
    "farmHeadquarters": "Farmer Friendly Headquarters:",
    
    // Added missing translations
    "subject": "Subject",
    "message": "Message"
  },
  hi: {
    // Navigation
    "home": "होम",
    "liveData": "लाइव डेटा",
    "analytics": "एनालिटिक्स",
    "insights": "इनसाइट्स",
    "contact": "संपर्क",
    "dashboard": "डैशबोर्ड",
    "profile": "प्रोफाइल",
    
    // Global
    "farmFriendlyDashboard": "फार्मर फ्रेंडली - पोल्ट्री फार्म डैशबोर्ड",
    
    // Profile Page
    "farmerProfile": "किसान प्रोफ़ाइल",
    "phone": "फोन",
    "email": "ईमेल",
    "farmLocation": "फार्म स्थान",
    "chickenCount": "मुर्गियों की संख्या",
    "joiningDate": "शामिल होने की तारीख",
    "editProfile": "प्रोफाइल संपादित करें",
    "saveChanges": "परिवर्तन सहेजें",
    "cancel": "रद्द करें",
    "healthStatus": "स्वास्थ्य स्थिति",
    "noHealthAlerts": "इस समय कोई स्वास्थ्य अलर्ट नहीं है।",
    "lowFeedAlert": "कूप #3 में कम फ़ीड स्तर पाया गया",
    "temperatureAlert": "कूप #2 में उच्च तापमान चेतावनी",
    "vaccinationReminder": "बैच #A12 के लिए टीकाकरण देय",
    
    // Conveyor Belt
    "conveyorBeltStatus": "कन्वेयर बेल्ट की स्थिति",
    "currentStatus": "वर्तमान स्थिति",
    "ammoniaLevel": "अमोनिया स्तर",
    "thresholdValue": "सीमा मूल्य",
    "on": "चालू",
    "off": "बंद",
    "statusMessage": "स्थिति संदेश",
    "conveyorBeltOnMessage": "कन्वेयर बेल्ट चालू है क्योंकि अमोनिया स्तर ({ammonia} पीपीएम) सीमा से ऊपर है ({threshold} पीपीएम)",
    "conveyorBeltOffMessage": "कन्वेयर बेल्ट बंद है क्योंकि अमोनिया स्तर ({ammonia} पीपीएम) सीमा से नीचे है ({threshold} पीपीएम)",
    
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
    "save": "सेटिंग्स सहेजें",
    "april2025PerformanceReport": "अप्रैल 2025 प्रदर्शन रिपोर्ट",
    "march2025PerformanceReport": "मार्च 2025 प्रदर्शन रिपोर्ट",
    "february2025PerformanceReport": "फरवरी 2025 प्रदर्शन रिपोर्ट",
    "q12025Analysis": "Q1 2025 विश्लेषण",
    "monthly": "मासिक",
    "quarterly": "त्रैमासिक",
    "weeklyPerformance": "साप्ताहिक प्रदर्शन",
    "monthlySummary": "मासिक सारांश",
    "environmentalConditions": "पर्यावरणीय स्थितियां",
    "everyMonday": "हर सोमवार",
    "firstOfMonth": "महीने का पहला दिन",
    "daily": "दैनिक",
    
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
    "extendedDataStorage": "विस्तारित डेटा संग्रहण",
    "extendedDataStorageDesc": "1 वर्ष तक का ऐतिहासिक डेटा संग्रहित करें",
    "automaticBackup": "स्वचालित बैकअप",
    "automaticBackupDesc": "साप्ताहिक क्लाउड स्टोरेज पर बैकअप",
    "darkTheme": "डार्क थीम",
    "darkThemeDesc": "लाइट और डार्क मोड के बीच टॉगल करें",
    "compactView": "कॉम्पैक्ट व्यू",
    "compactViewDesc": "कम स्थान में अधिक जानकारी दिखाएं",
    "uiAnimations": "यूआई एनिमेशन",
    "uiAnimationsDesc": "सुचारू ट्रांजिशन और एनिमेशन सक्षम करें",
    
    // Contact Section
    "contactUs": "हमसे संपर्क करें",
    "haveQuestions": "कोई सवाल है? हम आपके फार्म को अनुकूलित करने में मदद करने के लिए यहां हैं",
    "enterYourName": "अपना नाम दर्ज करें",
    "enterYourEmail": "अपना ईमेल दर्ज करें",
    "howCanWeHelp": "हम कैसे मदद कर सकते हैं?",
    "tellUsWhatYouNeed": "हमें बताएं आपको क्या चाहिए...",
    "sendMessage": "संदेश भेजें",
    "farmSupportHours": "फार्म सपोर्ट के घंटे",
    "farmExpertsAvailable": "हमारे कृषि विशेषज्ञ आपके किसी भी सवाल या चिंता के साथ सहायता के लिए उपलब्ध हैं:",
    "mondayToFriday": "सोमवार - शुक्रवार: सुबह 7:00 - शाम 6:00",
    "saturday": "शनिवार: सुबह 8:00 - दोपहर 2:00",
    "sunday": "रविवार: बंद (केवल आपातकालीन सहायता)",
    "emergencySupport": "आपातकालीन सहायता",
    "urgentMatters": "उपकरण विफलताओं या पशु कल्याण से संबंधित तत्काल मामलों के लिए:",
    "location": "स्थान",
    "farmHeadquarters": "फार्मर फ्रेंडली मुख्यालय:",
    
    // Added missing translations
    "subject": "विषय",
    "message": "संदेश"
  },
  kn: {
    // Navigation
    "home": "ಮುಖಪುಟ",
    "liveData": "ಲೈವ್ ಡೇಟಾ",
    "analytics": "ವಿಶ್ಲೇಷಣೆಗಳು",
    "insights": "ಒಳನೋಟಗಳು",
    "contact": "ಸಂಪರ್ಕ",
    "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "profile": "ಪ್ರೊಫೈಲ್",
    
    // Global
    "farmFriendlyDashboard": "ಫಾರ್ಮರ್ ಫ್ರೆಂಡ್ಲಿ - ಪೋಲ್ಟ್ರಿ ಫಾರ್ಮ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
    
    // Profile Page
    "farmerProfile": "ರೈತ ಪ್ರೊಫೈಲ್",
    "phone": "ಫೋನ್",
    "email": "ಇಮೇಲ್",
    "farmLocation": "ಕೃಷಿ ಸ್ಥಳ",
    "chickenCount": "ಕೋಳಿಗಳ ಸಂಖ್ಯೆ",
    "joiningDate": "ಸೇರಿದ ದಿನಾಂಕ",
    "editProfile": "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    "saveChanges": "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    "cancel": "ರದ್ದುಮಾಡಿ",
    "healthStatus": "ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
    "noHealthAlerts": "ಈ ಸಮಯದಲ್ಲಿ ಯಾವುದೇ ಆರೋಗ್ಯ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ.",
    "lowFeedAlert": "ಕೂಪ್ #3 ರಲ್ಲಿ ಕಡಿಮೆ ಆಹಾರ ಮಟ್ಟ ಪತ್ತೆಯಾಗಿದೆ",
    "temperatureAlert": "ಕೂಪ್ #2 ರಲ್ಲಿ ಹೆಚ್ಚಿನ ತಾಪಮಾನದ ಎಚ್ಚರಿಕೆ",
    "vaccinationReminder": "ಬ್ಯಾಚ್ #A12 ಗೆ ಲಸಿಕೆ ಬಾಕಿ ಇದೆ",
    
    // Conveyor Belt
    "conveyorBeltStatus": "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಸ್ಥಿತಿ",
    "currentStatus": "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
    "ammoniaLevel": "ಅಮೋನಿಯಾ ಮಟ್ಟ",
    "thresholdValue": "ಥ್ರೆಶೋಲ್ಡ್ ಮೌಲ್ಯ",
    "on": "ಆನ್",
    "off": "ಆಫ್",
    "statusMessage": "ಸ್ಥಿತಿ ಸಂದೇಶ",
    "conveyorBeltOnMessage": "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಆನ್ ಆಗಿದೆ ಏಕೆಂದರೆ ಅಮೋನಿಯಾ ಮಟ್ಟ ({ammonia} ಪಿಪಿಎಂ) ಥ್ರೆಶೋಲ್ಡ್‌ಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ ({threshold} ಪಿಪಿಎಂ)",
    "conveyorBeltOffMessage": "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್ ಆಫ್ ಆಗಿದೆ ಏಕೆಂದರೆ ಅಮೋನಿಯಾ ಮಟ್ಟ ({ammonia} ಪಿಪಿಎಂ) ಥ್ರೆಶೋಲ್ಡ್‌ಗಿಂತ ಕಡಿಮೆ ಇದೆ ({threshold} ಪಿಪಿಎಂ)",
    
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
    "averageAmmonia": "ಸರಾಸರಿ ಅಮೋನಿಯಾ",
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
    "save": "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
    "april2025PerformanceReport": "ಏಪ್ರಿಲ್ 2025 ಕಾರ್ಯಕ್ಷಮತೆ ವರದಿ",
    "march2025PerformanceReport": "ಮಾರ್ಚ್ 2025 ಕಾರ್ಯಕ್ಷಮತೆ ವರದಿ",
    "february2025PerformanceReport": "ಫೆಬ್ರವರಿ 2025 ಕಾರ್ಯಕ್ಷಮತೆ ವರದಿ",
    "q12025Analysis": "Q1 2025 ವಿಶ್ಲೇಷಣೆ",
    "monthly": "ಮಾಸಿಕ",
    "quarterly": "ತ್ರೈಮಾಸಿಕ",
    "weeklyPerformance": "ವಾರದ ಕಾರ್ಯಕ್ಷಮತೆ",
    "monthlySummary": "ಮಾಸಿಕ ಸಾರಾಂಶ",
    "environmentalConditions": "ಪರಿಸರದ ಸ್ಥಿತಿಗಳು",
    "everyMonday": "ಪ್ರತಿ ಸೋಮವಾರ",
    "firstOfMonth": "ತಿಂಗಳ ಮೊದಲ ದಿನ",
    "daily": "ದೈನಂದಿನ",
    
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
    
    // Contact Section
    "contactUs": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "haveQuestions": "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಅನುಕೂಲಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ",
    "enterYourName": "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    "enterYourEmail": "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
    "howCanWeHelp": "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    "tellUsWhatYouNeed": "ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ನಮಗೆ ಹೇಳಿ...",
    "sendMessage": "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    "farmSupportHours": "ಕೃಷಿ ಬೆಂಬಲದ ಸಮಯಗಳು",
    "farmExpertsAvailable": "ನಮ್ಮ ಕೃಷಿ ತಜ್ಞರು ನಿಮ್ಮ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಕಾಳಜಿಗಳೊಂದಿಗೆ ಸಹಾಯ ಮಾಡಲು ಲಭ್ಯವಿದ್ದಾರೆ:",
    "mondayToFriday": "ಸೋಮವಾರ - ಶುಕ್ರವಾರ: 7:00 AM - 6:00 PM",
    "saturday": "ಶನಿವಾರ: 8:00 AM - 2:00 PM",
    "sunday": "ಭಾನುವಾರ: ಮುಚ್ಚಲಾಗಿದೆ (ತುರ್ತು ಬೆಂಬಲ ಮಾತ್ರ)",
    "emergencySupport": "ತುರ್ತು ಬೆಂಬಲ",
    "urgentMatters": "ಉಪಕರಣ ವೈಫಲ್ಯಗಳು ಅಥವಾ ಪ್ರಾಣಿ ಕಲ್ಯಾಣಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ತುರ್ತು ವಿಷಯಗಳಿಗೆ:",
    "location": "ಸ್ಥಳ",
    "farmHeadquarters": "ಫಾರ್ಮರ್ ಫ್ರೆಂಡ್ಲಿ ಮುಖ್ಯ ಕಚೇರಿ:",
    
    // Added missing translations
    "subject": "ವಿಷಯ",
    "message": "ಸಂದೇಶ"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<AvailableLanguage>('en');

  const t = (key: string, params?: Record<string, string>): string => {
    let text = translations[language][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value);
      });
    }
    
    return text;
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
