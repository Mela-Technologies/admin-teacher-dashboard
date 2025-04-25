import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export const RequireAuth = ({
  role,
  children,
}: {
  role: string;
  children: React.JSX.Element;
}) => {
  const { user } = useAuthContext();

  //   if (!user) return <Navigate to="/login" replace />;
  //   if (role && user.role !== role)
  //     return <Navigate to={`/${role}/dashboard`} replace />;

  return children;
};
