import RegisterForm from "../components/RegisterForm.tsx";
import type { RegisterFormData } from "../schemas/register.ts";

const Register = () => {
  const handleRegister = async ( data: RegisterFormData ) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;