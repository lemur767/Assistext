import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface Session {
  token: string;
  // add other user properties here if needed
}

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  isAuthenticated: boolean;
  subscription: any | null;
  user: any | null;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    };
    loadSession();
  }, []);

  const fetchUser = async () => {
    try {
        const data = await api.get("/users/profile", { token: session?.token });
        setUser(data.user);
    } catch (err: unknown) {
        console.error((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const data = await api.get("/subscriptions/plans", { token: session?.token });
            setSubscription(data);
        } catch (err: unknown) {
            console.error((err as Error).message);
        }
    };

    if (session?.token) {
      AsyncStorage.setItem('session', JSON.stringify(session));
      fetchSubscription();
      fetchUser();
    } else {
      AsyncStorage.removeItem('session');
      setSubscription(null);
      setUser(null);
    }
  }, [session]);

  const isAuthenticated = !!session;

  const refreshUser = () => {
    if (session?.token) {
      fetchUser();
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSession, isAuthenticated, subscription, user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
