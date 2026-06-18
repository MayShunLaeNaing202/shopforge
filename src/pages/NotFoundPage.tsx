// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { Store, Home } from "lucide-react";
import Button from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Store className="text-blue-600" size={32} />
          <span className="text-2xl font-bold text-gray-900">ShopForge</span>
        </div>
        <p className="text-6xl font-bold text-gray-200 mb-2">404</p>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <Button variant="primary">
            <Home size={16} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
