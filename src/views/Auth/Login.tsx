import axios from 'axios';
import apiClient from '@/config/axiosConfig.ts';
import { useAuth } from '@/contexts/AuthContext.ts';
import LoginForm from '@/components/Auth/LoginForm';
import type { LoginFormData } from '@/schemas/login.ts';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await apiClient.post<LoginFormData>('/auth/login/', data);
      await login();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        const finalError = serverMessage ?? 'Credenciales incorrectas. Por favor, intenta de nuevo.';
        throw new Error(finalError, { cause: error });        
      } else {
        const genericError = 'Ocurrió un error inesperado. Inténtalo más tarde.';
        throw new Error(genericError, { cause: error });
      }
    }
  };

  return <LoginForm onSubmit={handleLogin}/>;
};

export default Login;