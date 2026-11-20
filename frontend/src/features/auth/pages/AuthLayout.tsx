import { Navigate, Outlet } from "react-router";

import authStore from "@/features/auth/store/auth";

function AuthLayout() {
  const { isAuthenticated } = authStore();

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <Outlet />
  );
}

export default AuthLayout