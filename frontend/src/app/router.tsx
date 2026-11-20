import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { AuthLayout, LoginPage } from "@/features/auth/pages";
import { TaskLayout, TaskListPage } from "@/features/task/pages";
import SignupPage from "@/features/auth/pages/sign-up/SignUp";

const router = createBrowserRouter([
  {
    Component: AuthLayout, children: [
      { Component: LoginPage, path: "/sign-in" },
      { Component: SignupPage, path: "/sign-up" }
    ]
  },
  {
    Component: TaskLayout, children: [
      { Component: TaskListPage, path: "/tasks" },
    ]
  },
  { path: "*", element: <Navigate to="/tasks" replace /> },
]);

export default function RouterApp() {
  return (
    <RouterProvider router={router} useTransitions={true} />
  );
}
