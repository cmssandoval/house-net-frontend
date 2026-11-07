import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import LoadingScreen from '@/components/LoadingScreen.tsx';
import type { Role } from '@/types/auth.ts';

const RoleGuard = ({ roles, children }: { roles: Role[]; children: ReactElement }) => {
  const { isLoading, role } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (roles.includes(role)) return children;

  return <Navigate to={role === 'guest' ? '/' : '/tablero'} replace />;
};

export default RoleGuard;
