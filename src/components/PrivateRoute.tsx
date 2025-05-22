// src/components/PrivateRoute.tsx
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

  // not logged in → send to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // logged in but lacks manager rights → send to customer dashboard
  if (requireManager && !user?.venueManager) {
    return <Navigate to="/account/customer" replace />;
  }

  // OK!
  return <Outlet />;
};
