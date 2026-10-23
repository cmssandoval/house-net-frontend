import { useAuth } from "@/contexts/AuthContext.ts";
import { useNavigate } from "react-router-dom";

import LoginForm from "@/components/Auth/LoginForm.tsx";
import type { LoginFormData } from "@/schemas/login.ts";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? 'Credenciales incorrectas. Por favor, intenta de nuevo.');
      }

      await login();
      navigate('/tablero', { replace: true });

  };

  return <LoginForm onSubmit={handleLogin}/>;
};

export default Login;