// src/pages/CartPage.tsx
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CartItemComponent from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/ui/Button";
import { useCartStore } from "../store/cartStore";

const CartPage = () => {
  const { items, totalItems } = useCartStore();
  const count = totalItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={count} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-900">
            Your Cart
            {count > 0 && (
              <span className="ml-2 text-lg text-gray-400 font-normal">
                ({count} items)
              </span>
            )}
          </h1>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <ShoppingCart size={64} className="text-gray-200" />
            <p className="text-gray-500 font-medium text-lg">
              Your cart is empty
            </p>
            <p className="text-gray-400 text-sm">
              Add some products to get started
            </p>
            <Link to="/">
              <Button variant="primary">
                <ArrowLeft size={16} />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2 w-fit"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>

              {items.map((item) => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
