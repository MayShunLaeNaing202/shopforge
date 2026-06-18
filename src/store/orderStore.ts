// src/store/orderStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, CartItem, Address, OrderStatus } from "../types/index";
import { useProductStore } from "./productStore";

interface OrderStore {
  orders: Order[];
  placeOrder: (
    userId: string,
    items: CartItem[],
    total: number,
    address: Address,
  ) => Order | null;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: (userId, items, total, address) => {
        const { getProduct, updateProduct } = useProductStore.getState();

        for (const item of items) {
          const product = getProduct(item.product.id);
          if (!product || product.stock < item.quantity) {
            return null;
          }
        }

        for (const item of items) {
          const product = getProduct(item.product.id)!;
          updateProduct(product.id, {
            stock: product.stock - item.quantity,
          });
        }

        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          userId,
          items,
          total,
          status: "pending",
          shippingAddress: address,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        return newOrder;
      },

      getUserOrders: (userId) => {
        return get().orders.filter((o) => o.userId === userId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o,
          ),
        }));
      },
    }),
    { name: "shopforge-orders" },
  ),
);
