
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  sensorKitActivated: boolean;
  activateSensorKit: (kitId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sensorKitActivated, setSensorKitActivated] = useState<boolean>(true); // Default to true since we're not using real sensor kit activation
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Since there's no sensor_kits table, we'll simulate activation with a simple function
  const activateSensorKit = async (kitId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate activation success
      console.log(`Simulating activation of kit: ${kitId}`);
      setSensorKitActivated(true);
      return true;
    } catch (error) {
      console.error('Error in kit activation:', error);
      return false;
    }
  };
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <AuthContext.Provider value={{ session, user, signOut, sensorKitActivated, activateSensorKit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
