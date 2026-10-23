import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';

import Spinner from 'react-bootstrap/Spinner';

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div><h3>Cargando...</h3><Spinner /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user?.role || !allowedRoles.includes(user?.role))) {
    return <Navigate to="/tablero" replace />; 
  }


  return <Outlet />;
};

export default ProtectedRoute;