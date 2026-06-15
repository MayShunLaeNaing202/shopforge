// src/components/cart/CartItem.tsx
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "../../types/index";
import { useCartStore } from "../../store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5 capitalize">
          {product.category}
        </p>
        <p className="text-blue-600 font-bold mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (quantity === 1) {
              removeItem(product.id);
            } else {
              updateQuantity(product.id, quantity - 1);
            }
          }}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Minus size={12} />
        </button>

        <span className="w-8 text-center font-semibold text-sm">
          {quantity}
        </span>

        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Subtotal + Delete */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900 text-sm">
          ${(product.price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(product.id)}
          className="mt-1 text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
