// src/pages/OrdersPage.tsx
import { Link } from "react-router-dom";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrdersPage = () => {
  const { user } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  const { totalItems } = useCartStore();

  const orders = user ? getUserOrders(user.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Package className="text-blue-600" size={28} />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <ShoppingBag size={64} className="text-gray-200" />
            <p className="text-gray-500 font-medium text-lg">No orders yet</p>
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {[...orders].reverse().map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-sm text-gray-500">
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex items-center gap-2 mb-4">
                  {order.items.slice(0, 3).map((item) => (
                    <img
                      key={item.product.id}
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                  <Link
                    to={`/order/${order.id}`}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
