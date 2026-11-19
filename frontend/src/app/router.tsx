import { createBrowserRouter, RouterProvider } from "react-router";

import { AuthLayout, LoginPage } from "@/features/auth/pages";
import { TaskLayout, TaskListPage } from "@/features/task/pages";

const router = createBrowserRouter([
  {
    Component: AuthLayout, children: [
      { Component: LoginPage, path: "/sign-in" }
    ]
  },
  {
    Component: TaskLayout, children: [
      { Component: TaskListPage, path: "/tasks" },
    ]
  },
]);

export default function RouterApp() {
  return (
    <RouterProvider router={router} useTransitions={true} />
  );
}
