// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/login", element: <LoginPage /> },
]);
