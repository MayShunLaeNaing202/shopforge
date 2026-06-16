// src/components/layout/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  // Login မဝင်ရသေးဘူး → /login ကို redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin လိုတဲ့ route မှာ admin မဟုတ်ဘူး → / ကို redirect
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
