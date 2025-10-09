import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const RequireAuth = ({
  role,
  children,
}: {
  role: string;
  children: React.JSX.Element;
}) => {
  const { user } = useAuthContext();
  console.log(user, role);

  //   if (!user) return <Navigate to="/login" replace />;
  //   if (role && user.role !== role)
  //     return <Navigate to={`/${role}/dashboard`} replace />;

  return children;
};
