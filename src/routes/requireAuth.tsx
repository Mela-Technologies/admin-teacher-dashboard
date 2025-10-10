import React from "react";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

export const RequireAuth = ({
  role,
  children,
}: {
  role: string;
  children: React.JSX.Element;
}) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    // You can customize this loader UI
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role)
    return <Navigate to={`/${user.role}/dashboard`} replace />;

  return children;
};
