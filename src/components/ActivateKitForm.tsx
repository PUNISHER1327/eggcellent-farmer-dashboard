
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ActivateKitForm: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { activateSensorKit } = useAuth();
  const [kitId, setKitId] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await activateSensorKit(kitId);
      
      if (success) {
        toast({
          title: t('kitActivated'),
          description: t('kitActivatedDescription'),
        });
      } else {
        toast({
          title: t('kitActivationFailed'),
          description: t('kitActivationFailedDescription'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Kit activation error:', error);
      toast({
        title: t('kitActivationError'),
        description: t('tryAgainLater'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800/90'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        {t('activateYourKit')}
      </h2>
      
      <form onSubmit={handleActivate} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kit-id">{t('enterKitId')}</Label>
          <Input
            id="kit-id"
            value={kitId}
            onChange={(e) => setKitId(e.target.value)}
            placeholder={t('kitIdPlaceholder')}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-farm-green hover:bg-farm-green/90 text-white"
          disabled={loading}
        >
          {loading ? t('activating') : t('activateKit')}
        </Button>
        
        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          {t('kitActivationHelp')}
        </p>
      </form>
    </Card>
  );
};

export default ActivateKitForm;
