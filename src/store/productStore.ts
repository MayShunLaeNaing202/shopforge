// src/store/productStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "../data/products";
import type { Product } from "../types/index";

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `p-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    { name: "shopforge-products" },
  ),
);
