import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import LoadingScreen from '@/components/LoadingScreen';

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && (!user?.role || !allowedRoles.includes(user?.role))) {
    return <Navigate to="/tablero" replace />; 
  }


  return <Outlet />;
};

export default ProtectedRoute;