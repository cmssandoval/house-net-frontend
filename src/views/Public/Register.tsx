import { useNavigate } from "react-router-dom";

import RegisterForm from "@/components/Auth/RegisterForm";
import type { RegisterSubmitData } from "@/schemas/register.ts";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async ( data: RegisterSubmitData ) => {
    const response = await fetch('http://localhost:3000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? 'Credenciales incorrectas. Por favor, intenta de nuevo.');
      }

      navigate('/login', { replace: true });
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;