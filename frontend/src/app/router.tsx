import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "@/features/auth/pages/sign-in/SignIn";
import { TaskLayout } from "@/features/task/pages";

const router = createBrowserRouter([
  { Component: LoginPage, path: "/sign-in" },
  { Component: TaskLayout, path: "/tasks" },
]);

export default function RouterApp() {
  return (
    <RouterProvider router={router} useTransitions={true} />
  );
}
