
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
  const [sensorKitActivated, setSensorKitActivated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkSensorKitStatus(session.user.id);
      }
    });
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // We use setTimeout to prevent potential supabase deadlocks
          setTimeout(() => {
            checkSensorKitStatus(session.user.id);
          }, 0);
        } else {
          setSensorKitActivated(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const checkSensorKitStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('sensor_kits')
        .select('activated')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Error checking sensor kit status:', error);
        setSensorKitActivated(false);
        return;
      }
      
      setSensorKitActivated(data?.activated || false);
    } catch (error) {
      console.error('Error in sensor kit check:', error);
      setSensorKitActivated(false);
    }
  };
  
  const activateSensorKit = async (kitId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // First, check if the kit ID exists and is not already assigned
      const { data: kitData, error: kitError } = await supabase
        .from('sensor_kits')
        .select('*')
        .eq('kit_id', kitId)
        .eq('activated', false)
        .is('user_id', null)
        .single();
        
      if (kitError || !kitData) {
        console.error('Kit not found or already activated:', kitError);
        return false;
      }
      
      // Update the kit with the user's ID
      const { error: updateError } = await supabase
        .from('sensor_kits')
        .update({ 
          user_id: user.id,
          activated: true,
          activated_at: new Date().toISOString()
        })
        .eq('kit_id', kitId);
        
      if (updateError) {
        console.error('Error activating kit:', updateError);
        return false;
      }
      
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
