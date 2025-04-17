
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

// Define the user role type
type UserRole = 'patient' | 'admin' | null;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userRole: UserRole;
  configError: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, role: UserRole) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [configError, setConfigError] = useState(!isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true);
      setIsLoading(false);
      toast({
        title: "Configuration Error",
        description: "Supabase connection is not properly configured. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }

    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            // Get user's role from user_roles table
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .single();

            if (roleError) {
              console.error("Error fetching user role:", roleError);
              setUserRole('patient'); // Default role if not found
            } else {
              setUserRole(roleData?.role as UserRole || 'patient');
            }
          } catch (err) {
            console.error("Error fetching role:", err);
            setUserRole('patient'); // Default to patient role on error
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error setting up auth:", err);
        setIsLoading(false);
      }
    };

    setData();

    try {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          try {
            // Get user's role from user_roles table
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', newSession.user.id)
              .single();

            if (roleError) {
              console.error("Error fetching user role:", roleError);
              setUserRole('patient'); // Default role if not found
            } else {
              setUserRole(roleData?.role as UserRole || 'patient');
            }
          } catch (err) {
            console.error("Error fetching role:", err);
            setUserRole('patient'); // Default to patient role on error
          }
        } else {
          setUserRole(null);
        }

        setIsLoading(false);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    } catch (err) {
      console.error("Error setting up auth listener:", err);
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase is not properly configured") };
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, role: UserRole = 'patient') => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase is not properly configured") };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (!error && data.user) {
        try {
          // Insert user role into user_roles table
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role: role || 'patient'
            });
            
          if (roleError) {
            console.error("Error setting user role:", roleError);
          }
        } catch (err) {
          console.error("Error setting user role:", err);
        }
      }

      return { error };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUserRole(null);
  };

  const value = {
    user,
    session,
    isLoading,
    userRole,
    configError,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
