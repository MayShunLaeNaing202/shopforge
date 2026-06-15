// src/components/cart/CartSummary.tsx
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import Button from "../ui/Button";

const CartSummary = () => {
  const { items, totalPrice, clearCart } = useCartStore();

  const subtotal = totalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* Price breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {shipping === 0 && (
          <p className="text-green-600 text-xs">
            🎉 You qualify for free shipping!
          </p>
        )}

        <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full mt-6"
        onClick={() => alert("Checkout — Module 6 မှာ build လုပ်မယ်!")}
      >
        <ShoppingBag size={16} />
        Proceed to Checkout
      </Button>

      {/* Clear Cart */}
      <button
        onClick={clearCart}
        className="w-full mt-3 text-sm text-red-400 hover:text-red-600 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartSummary;
