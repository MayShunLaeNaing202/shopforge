// src/pages/admin/AdminDashboard.tsx
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { useProductStore } from "../../store/productStore";
import { useOrderStore } from "../../store/orderStore";
import { useCartStore } from "../../store/cartStore";

const AdminDashboard = () => {
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  const { totalItems } = useCartStore();

  // Stats တွက်ချက်ခြင်း
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Products",
      value: products.length,
      icon: Package,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Low Stock",
      value: lowStockProducts,
      icon: Users,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mb-8">Manage your store at a glance</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/products"
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-300 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-500">
                  Add, edit, or remove products
                </p>
              </div>
            </div>
            <ArrowRight
              className="text-gray-300 group-hover:text-blue-600 transition-colors"
              size={20}
            />
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-300 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">View Orders</p>
                <p className="text-sm text-gray-500">See all customer orders</p>
              </div>
            </div>
            <ArrowRight
              className="text-gray-300 group-hover:text-blue-600 transition-colors"
              size={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
