import { Navigate, Outlet } from "react-router";

import authStore from "@/features/auth/store/auth";

function TaskLayout() {
  const { isAuthenticated } = authStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <Outlet />
  )
}

export default TaskLayout