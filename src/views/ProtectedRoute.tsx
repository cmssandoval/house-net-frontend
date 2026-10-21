import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

import Spinner from 'react-bootstrap/Spinner';

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  if (isLoading) {
    return <div><h3>Cargando...</h3><Spinner /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/tablero" replace />; 
  }


  return <Outlet />;
};

export default ProtectedRoute;