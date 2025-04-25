import { Navigate, useRoutes } from "react-router-dom";
import LoginPage from "../pages/authentication/loginPage";
import { RequireAuth } from "./requireAuth";
import { adminRoutes } from "./adminRoutes";
import { teacherRoutes } from "./teacherRoutes";
import AdminLayout from "../layouts/adminLayout";
import TeacherLayout from "../layouts/teacherLayout";

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },

    {
      path: "/admin",
      element: (
        <RequireAuth role="admin">
          <AdminLayout />
        </RequireAuth>
      ),
      children: adminRoutes,
    },

    {
      path: "/teacher",
      element: (
        <RequireAuth role="teacher">
          <TeacherLayout />
        </RequireAuth>
      ),
      children: teacherRoutes,
    },

    { path: "*", element: <Navigate to="/login" replace /> },
  ]);

  return routes;
};
