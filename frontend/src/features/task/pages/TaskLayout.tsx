import { Navigate, Outlet } from "react-router";

import Navbar from "@/components/shared/navbar";
import authStore from "@/features/auth/store/auth";

function TaskLayout() {
  const { isAuthenticated } = authStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <main className="min-h-svh bg-muted/30">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default TaskLayout