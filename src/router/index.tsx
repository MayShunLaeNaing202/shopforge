// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import OrdersPage from "../pages/OrdersPage";
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
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order/:id",
    element: (
      <ProtectedRoute>
        <OrderConfirmPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <OrdersPage />
      </ProtectedRoute>
    ),
  },
]);
