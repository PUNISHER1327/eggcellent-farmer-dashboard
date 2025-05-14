
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

const AuthPage = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: t('signUpSuccess'),
        description: t('confirmEmail'),
      });
      
      // In development, we might want to auto-login since email verification might be disabled
      handleSignIn(e);
    } catch (error: any) {
      toast({
        title: t('signUpError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: t('signInSuccess'),
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: t('signInError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full max-w-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800/90'} p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('welcomeToFarmerFriendly')}
        </h1>
        
        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="signin">{t('signIn')}</TabsTrigger>
            <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">{t('email')}</Label>
                <Input 
                  id="email-signin" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-signin">{t('password')}</Label>
                <Input 
                  id="password-signin" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-farm-green hover:bg-farm-green/90 text-white" 
                disabled={loading}
              >
                {loading ? t('signingIn') : t('signIn')}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">{t('email')}</Label>
                <Input 
                  id="email-signup" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-signup">{t('password')}</Label>
                <Input 
                  id="password-signup" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-farm-green hover:bg-farm-green/90 text-white" 
                disabled={loading}
              >
                {loading ? t('signingUp') : t('signUp')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
