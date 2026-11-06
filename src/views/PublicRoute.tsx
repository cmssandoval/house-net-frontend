import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import LoadingScreen from '@/components/LoadingScreen.tsx';

const PublicRoute = () => {
  const { isLoading, role } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if ( role !== 'guest' ) return <Navigate to="/tablero" replace />;

  return <Outlet />;
};

export default PublicRoute;
