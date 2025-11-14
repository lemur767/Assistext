import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

interface Session {
  token: string;
  lastActivity: number;
  // add other user properties here if needed
}

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  isAuthenticated: boolean;
  subscription: any | null;
  user: any | null;
  refreshUser: () => void;
  reportActivity: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSessionState] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const setSession = (newSession: Session | null) => {
    if (newSession) {
      newSession.lastActivity = Date.now();
      AsyncStorage.setItem('session', JSON.stringify(newSession));
    } else {
      AsyncStorage.removeItem('session');
    }
    setSessionState(newSession);
  };

  const reportActivity = () => {
    if (session) {
      const newSession = { ...session, lastActivity: Date.now() };
      setSessionState(newSession);
      AsyncStorage.setItem('session', JSON.stringify(newSession));
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');
      if (storedSession) {
        const parsedSession: Session = JSON.parse(storedSession);
        if (Date.now() - parsedSession.lastActivity > SESSION_TIMEOUT) {
          setSession(null);
        } else {
          setSessionState(parsedSession);
        }
      }
    };
    loadSession();
  }, []);

  const fetchUser = async () => {
    try {
        reportActivity();
        const data = await api.get("/users/profile", { token: session?.token });
        setUser(data.user);
    } catch (err: unknown) {
        console.error((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
        try {
            reportActivity();
            const data = await api.get("/subscriptions/plans", { token: session?.token });
            setSubscription(data);
        } catch (err: unknown) {
            console.error((err as Error).message);
        }
    };

    if (session?.token) {
      fetchSubscription();
      fetchUser();
    } else {
      setSubscription(null);
      setUser(null);
    }
  }, [session?.token]);

  const isAuthenticated = !!session;

  const refreshUser = () => {
    if (session?.token) {
      fetchUser();
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSession, isAuthenticated, subscription, user, refreshUser, reportActivity }}>
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
