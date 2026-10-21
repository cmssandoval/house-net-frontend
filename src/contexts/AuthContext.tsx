import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  exp: number;
  userId: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ token, setToken ] = useState<string | null>(null);
  const [ userRole, setUserRole ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);

  const extractRoleFromToken = (jwtToken: string): string | null => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
      
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem('auth_token');
        return null;
      }
      
      return decoded.role; 
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      const role = extractRoleFromToken(savedToken);
      if (role) {
        setToken(savedToken);
        setUserRole(role);
      } else {
        setToken(null);
        setUserRole(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    const role = extractRoleFromToken(newToken);
    if (!role) throw new Error('Token inválido o expirado');
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUserRole(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userRole, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
