import axios from 'axios';
import apiClient from '@/config/axiosConfig.ts';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/Forms/RegisterForm';
import type { RegisterSubmitData } from '@/schemas/register.ts';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async ( data: RegisterSubmitData ) => {
    try {
      await apiClient.post('/auth/register/', data);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        const finalError = serverMessage ?? 'No se pudo completar el registro. Por favor, intenta de nuevo';
        throw new Error(finalError, { cause: error });
      } else {
        const genericError = 'Ocurrió un error inesperado. Inténtalo más tarde.';
        throw new Error(genericError, { cause: error });
      }
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;