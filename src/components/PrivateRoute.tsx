import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface PrivateRouteProps {
  requireManager?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requireManager = false,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && !user?.venueManager) {
    return <Navigate to="/account/customer" replace />;
  }

  return <Outlet />;
};
