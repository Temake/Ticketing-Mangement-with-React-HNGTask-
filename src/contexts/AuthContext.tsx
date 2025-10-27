import React, { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User, LoginCredentials, SignupCredentials } from '../types';
import { storage } from '../utils/storage';
import { mockLogin, mockSignup, mockLogout, validateSession } from '../utils/mockAuth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = storage.getSession();
    const user = storage.getUser();
    
    if (token && validateSession(token) && user) {
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const { user, token } = await mockLogin(credentials.email, credentials.password);
      
      storage.setSession(token);
      storage.setUser(user);
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    try {
      const { user, token } = await mockSignup(
        credentials.name,
        credentials.email,
        credentials.password
      );
      
      storage.setSession(token);
      storage.setUser(user);
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    mockLogout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
