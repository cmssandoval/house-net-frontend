import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type UserInfo, type AuthState } from './AuthContext.ts';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData: UserInfo = await response.json();
          setAuthState({ user: userData, isLoading: false });
        } else {
          setAuthState({ user: null, isLoading: false });
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setAuthState({ user: null, isLoading: false });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch('http://localhost:3000/api/auth/me',{
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setAuthState({ user: userData, isLoading: false });
      }
    } catch {
      setAuthState({ user: null, isLoading: false });
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error al cerrar sesión en servidor:", error);
    } finally {
      setAuthState({ user: null, isLoading: false });
    }
  };

  return (
    <AuthContext.Provider value={{
        user: authState.user,
        isLoading: authState.isLoading,
        isAuthenticated: !!authState.user,
        login,
        logout }}>
      {children}
    </AuthContext.Provider>
  );
};