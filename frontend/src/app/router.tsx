import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "@/features/auth/pages/sign-in/SignIn";

const router = createBrowserRouter([
  { Component: LoginPage, path: "/sign-in" },
]);

export default function RouterApp() {
  return (
    <RouterProvider router={router} />
  );
}
