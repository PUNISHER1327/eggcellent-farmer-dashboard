
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Bell, Database, User } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsTab: React.FC = () => {
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
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
                Push Notifications
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Receive alerts for important events
              </p>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                Email Notifications
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Receive daily summary reports
              </p>
            </div>
            <Switch id="email-notifications" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="alert-thresholds" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                Alert Thresholds
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Get notified for critical values only
              </p>
            </div>
            <Switch id="alert-thresholds" defaultChecked />
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
              Data Collection Interval
            </Label>
            <RadioGroup defaultValue="15min" className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5min" id="r1" />
                <Label htmlFor="r1" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>5 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="15min" id="r2" />
                <Label htmlFor="r2" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>15 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30min" id="r3" />
                <Label htmlFor="r3" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>30 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60min" id="r4" />
                <Label htmlFor="r4" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>1 hour</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-storage" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                Extended Data Storage
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Store historical data for up to 1 year
              </p>
            </div>
            <Switch id="data-storage" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="automatic-backup" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                Automatic Backup
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Weekly backup to cloud storage
              </p>
            </div>
            <Switch id="automatic-backup" />
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
              Select Language
            </Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full" id="language-select">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button 
              variant="outline" 
              className={`${
                theme === 'light' 
                  ? 'bg-white hover:bg-gray-50' 
                  : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
              }`}
            >
              Cancel
            </Button>
            <Button 
              className={`${
                theme === 'light' 
                  ? 'bg-farm-green hover:bg-farm-green/90 text-white' 
                  : 'bg-farm-green hover:bg-farm-green/90 text-white'
              }`}
            >
              Save Settings
            </Button>
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
                Dark Theme
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Toggle between light and dark mode
              </p>
            </div>
            <Switch id="theme-toggle" checked={theme === 'dark'} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compact-view" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                Compact View
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Show more information in less space
              </p>
            </div>
            <Switch id="compact-view" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations" className={theme === 'light' ? 'text-gray-700' : 'text-white'}>
                UI Animations
              </Label>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Enable smooth transitions and animations
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab;
