import { createContext, useContext } from 'react';

export interface UserInfo {
  userId: string;
  role: string;
}

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
}

export interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
