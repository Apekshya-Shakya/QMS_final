
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';

// Define the user role type
type UserRole = 'patient' | 'admin' | null;

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  userRole: UserRole;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, role: UserRole) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple in-memory storage for user roles
// In a real app, you might want to use Firestore for this
const userRoles = new Map<string, UserRole>();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Get role from our in-memory map
        const role = userRoles.get(currentUser.uid) || 'patient';
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Default to patient role if not found
      const role = userRoles.get(userCredential.user.uid) || 'patient';
      setUserRole(role);
      return { error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, role: UserRole = 'patient') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store role in our in-memory map
      userRoles.set(userCredential.user.uid, role || 'patient');
      setUserRole(role);
      return { error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserRole(null);
  };

  const value = {
    user,
    isLoading,
    userRole,
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
