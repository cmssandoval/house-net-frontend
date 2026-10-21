import LoginForm from "../components/LoginForm.tsx";
import type { LoginFormData } from "../schemas/login.ts";

const Login = () => {
    const handleLogin = async ( data: LoginFormData ) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default Login;