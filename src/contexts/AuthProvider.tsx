import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from './AuthContext.ts';
import { isUserRole } from "@/types/auth.ts";
import type { AuthState, Role, UserInfo } from "@/types/auth.ts";

import apiClient from "@/config/axiosConfig.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

    const fetchMe = useCallback(async () => {
      try {
        const response = await apiClient.get<{ user: UserInfo | null }>('/auth/me');
        const { user } = response.data;
        setAuthState({ user, isLoading: false });
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setAuthState({ user: null, isLoading: false });
      }
    }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await apiClient.get<UserInfo>('/auth/me');
      setAuthState({ user: response.data, isLoading: false });
      await fetchMe();
    } catch (error) {
      console.error("Error en login:", error);
      setAuthState({ user: null, isLoading: false });
    }
  };

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Error al cerrar sesión en servidor:", error);
    } finally {
      setTimeout(() => {
        setAuthState({ user: null, isLoading: false });
        navigate('/', { replace: true });
      }, 500);
    }
  };

  const role: Role = isUserRole(authState.user?.role)
    ? authState.user.role
    : 'guest';

  return (
    <AuthContext.Provider value={{
        user: authState.user,
        role,
        isLoading: authState.isLoading,
        login,
        logout
      }}>
        {children}
    </AuthContext.Provider>
  );
};