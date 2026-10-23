import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';

import Spinner from 'react-bootstrap/Spinner';

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div><h3>Cargando...</h3><Spinner /></div>;
  }

  if ( isAuthenticated ) {
    return <Navigate to="/tablero" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;