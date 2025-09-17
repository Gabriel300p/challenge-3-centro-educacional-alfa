import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
   
    return <Navigate to="/login" replace />;
  }

  return children;
};