// src/pages/OrderConfirmPage.tsx
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { useOrderStore } from "../store/orderStore";
import { useCartStore } from "../store/cartStore";

const OrderConfirmPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderStore();
  const { totalItems } = useCartStore();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle size={72} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order is being processed.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package size={20} className="text-blue-600" />
              <span className="font-bold text-gray-900">Order Details</span>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Order ID:{" "}
            <span className="font-mono font-medium text-gray-900">
              {order.id}
            </span>
          </p>

          {/* Items */}
          <div className="flex flex-col gap-3 mb-4">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total Paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              SHIPPING TO
            </p>
            <p className="text-sm text-gray-700">
              {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postcode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Orders
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:border-blue-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;
