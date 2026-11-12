export type UserRole = 'user' | 'admin';
export type Role = UserRole | 'guest';

export const isUserRole = (r: unknown): r is UserRole =>
  r === 'user' || r === 'admin';

export interface UserInfo {
  userId: string;
  role: UserRole;
}

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
}

export interface AuthContextType {
  user: UserInfo | null;
  role: Role;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}
