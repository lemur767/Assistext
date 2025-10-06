import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(() => {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  });
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const response = await api.get("/api/v1/subscriptions/plan");
            const data = await response.json();
            if (response.ok) {
                setSubscription(data);
            }
        } catch (err: unknown) {
            console.error((err as Error).message);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await api.get("/api/v1/users/profile");
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
            }
        } catch (err: unknown) {
            console.error((err as Error).message);
        }
    };

    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
      fetchSubscription();
      fetchUser();
    } else {
      localStorage.removeItem('session');
      setSubscription(null);
      setUser(null);
    }
  }, [session]);

  const isAuthenticated = !!session;

  return (
    <AuthContext.Provider value={{ session, setSession, isAuthenticated, subscription, user }}>
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
