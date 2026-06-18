// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types/index";
import { useProductStore } from "./productStore";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => boolean;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const getAvailableStock = (productId: string, fallbackStock: number): number => {
  const live = useProductStore.getState().getProduct(productId);
  return live?.stock ?? fallbackStock;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const stock = getAvailableStock(product.id, product.stock);
        if (stock <= 0) return false;

        let added = false;
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);

          if (existing) {
            if (existing.quantity >= stock) return state;
            added = true;
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1, product }
                  : i,
              ),
            };
          }

          added = true;
          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });
        return added;
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return false;

        const item = get().items.find((i) => i.product.id === productId);
        if (!item) return false;

        const stock = getAvailableStock(productId, item.product.stock);
        if (quantity > stock) return false;

        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        }));
        return true;
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "shopforge-cart",
    },
  ),
);
