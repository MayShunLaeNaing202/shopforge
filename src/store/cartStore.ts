// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types/index";

// Store ရဲ့ shape သတ်မှတ်တယ်
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ① State
      items: [],

      // ② Actions
      addItem: (product) =>
        set((state) => {
          // product ရှိပြီးသားလား စစ်တယ်
          const existing = state.items.find((i) => i.product.id === product.id);

          if (existing) {
            // ရှိပြီးသားဆိုရင် quantity တိုးတယ်
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }

          // မရှိသေးဆိုရင် အသစ် ထည့်တယ်
          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        })),

      clearCart: () => set({ items: [] }),

      // ③ Computed values
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "shopforge-cart", // localStorage key
    },
  ),
);
