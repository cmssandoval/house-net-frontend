import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import LoadingScreen from '@/components/LoadingScreen.tsx';
import type { UserRole } from '@/types/auth.ts';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isLoading, role } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (role === 'guest') return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/tablero" replace />; 
  }


  return <Outlet />;
};

export default ProtectedRoute;
