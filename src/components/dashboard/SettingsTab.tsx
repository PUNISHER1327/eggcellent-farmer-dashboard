
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Bell, Database, User } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const SettingsTab: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  // User settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [alertThresholds, setAlertThresholds] = useState(true);
  const [dataInterval, setDataInterval] = useState('15min');
  const [extendedStorage, setExtendedStorage] = useState(true);
  const [automaticBackup, setAutomaticBackup] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [animations, setAnimations] = useState(true);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      const pushNotif = localStorage.getItem('pushNotifications');
      const emailNotif = localStorage.getItem('emailNotifications');
      const alertThresh = localStorage.getItem('alertThresholds');
      const dataInterv = localStorage.getItem('dataCollectionInterval');
      const extStorage = localStorage.getItem('extendedDataStorage');
      const autoBackup = localStorage.getItem('automaticBackup');
      const compView = localStorage.getItem('compactView');
      const anims = localStorage.getItem('uiAnimations');
      
      if (pushNotif) setPushNotifications(pushNotif === 'true');
      if (emailNotif) setEmailNotifications(emailNotif === 'true');
      if (alertThresh) setAlertThresholds(alertThresh === 'true');
      if (dataInterv) setDataInterval(dataInterv);
      if (extStorage) setExtendedStorage(extStorage === 'true');
      if (autoBackup) setAutomaticBackup(autoBackup === 'true');
      if (compView) setCompactView(compView === 'true');
      if (anims) setAnimations(anims === 'true');
    };
    
    loadSettings();
  }, []);
  
  const saveSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem('pushNotifications', pushNotifications.toString());
    localStorage.setItem('emailNotifications', emailNotifications.toString());
    localStorage.setItem('alertThresholds', alertThresholds.toString());
    localStorage.setItem('dataCollectionInterval', dataInterval);
    localStorage.setItem('extendedDataStorage', extendedStorage.toString());
    localStorage.setItem('automaticBackup', automaticBackup.toString());
    localStorage.setItem('compactView', compactView.toString());
    localStorage.setItem('uiAnimations', animations.toString());
    
    toast({
      title: t('settingsSaved'),
      description: t('yourSettingsHaveBeenSaved'),
    });
  };
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4 bg-gray-800 border border-gray-700';

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'hi' | 'kn');
  };

  return (
    <div className="space-y-8">
      <Card className={cardClass}>
        <div className="flex items-center gap-2 mb-4">
          <Bell className={`h-5 w-5 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`} />
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('notifications')}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('pushNotifications')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('pushNotificationsDesc')}
              </p>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications} 
              onCheckedChange={setPushNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('emailNotifications')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('emailNotificationsDesc')}
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="alert-thresholds" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('alertThresholds')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('alertThresholdsDesc')}
              </p>
            </div>
            <Switch 
              id="alert-thresholds" 
              checked={alertThresholds}
              onCheckedChange={setAlertThresholds}
            />
          </div>
        </div>
      </Card>
      
      <Card className={cardClass}>
        <div className="flex items-center gap-2 mb-4">
          <Database className={`h-5 w-5 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`} />
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('dataCollection')}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
              {t('dataCollectionInterval')}
            </Label>
            <RadioGroup 
              value={dataInterval} 
              onValueChange={setDataInterval} 
              className="flex flex-wrap space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5min" id="r1" />
                <Label htmlFor="r1" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>{t('fiveMinutes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="15min" id="r2" />
                <Label htmlFor="r2" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>{t('fifteenMinutes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30min" id="r3" />
                <Label htmlFor="r3" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>{t('thirtyMinutes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60min" id="r4" />
                <Label htmlFor="r4" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>{t('oneHour')}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-storage" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('extendedDataStorage')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('extendedDataStorageDesc')}
              </p>
            </div>
            <Switch 
              id="data-storage" 
              checked={extendedStorage}
              onCheckedChange={setExtendedStorage}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="automatic-backup" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('automaticBackup')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('automaticBackupDesc')}
              </p>
            </div>
            <Switch 
              id="automatic-backup" 
              checked={automaticBackup}
              onCheckedChange={setAutomaticBackup}
            />
          </div>
        </div>
      </Card>

      <Card className={cardClass}>
        <div className="flex items-center gap-2 mb-4">
          <Globe className={`h-5 w-5 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`} />
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('languageSettings')}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="language-select" className={`block mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
              {t('selectLanguage')}
            </Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full" id="language-select">
                <SelectValue placeholder={t('selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      <Card className={cardClass}>
        <div className="flex items-center gap-2 mb-4">
          <User className={`h-5 w-5 ${theme === 'light' ? 'text-farm-green' : 'text-farm-green'}`} />
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('userPreferences')}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme-toggle" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('darkTheme')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('darkThemeDesc')}
              </p>
            </div>
            <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compact-view" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('compactView')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('compactViewDesc')}
              </p>
            </div>
            <Switch 
              id="compact-view" 
              checked={compactView}
              onCheckedChange={setCompactView}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                {t('uiAnimations')}
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('uiAnimationsDesc')}
              </p>
            </div>
            <Switch 
              id="animations" 
              checked={animations}
              onCheckedChange={setAnimations}
            />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <Button 
              variant="outline" 
              className={`${
                theme === 'light' 
                  ? 'bg-white hover:bg-gray-50' 
                  : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
              }`}
            >
              {t('cancel')}
            </Button>
            <Button 
              className={`${
                theme === 'light' 
                  ? 'bg-farm-green hover:bg-farm-green/90 text-white' 
                  : 'bg-farm-green hover:bg-farm-green/90 text-white'
              }`}
              onClick={saveSettings}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab;
