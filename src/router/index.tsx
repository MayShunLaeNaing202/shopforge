// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <div className="p-10 text-center text-2xl font-bold">
          Checkout — Module 5 မှာ build မယ်
        </div>
      </ProtectedRoute>
    ),
  },
]);
