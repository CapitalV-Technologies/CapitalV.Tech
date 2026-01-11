import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { ReactNode }from "react";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // optional spinner

  if (!user) return <Navigate to="/" replace />; // redirect to login

  return children; // user is logged in → render the protected page
};

export default ProtectedRoute;