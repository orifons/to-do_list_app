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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 sm:py-12 lg:px-8">
        <Navbar />
        <Outlet />
      </div>
    </main>
  )
}

export default TaskLayout