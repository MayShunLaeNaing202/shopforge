// src/store/orderStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, CartItem, Address } from "../types/index";

interface OrderStore {
  orders: Order[];
  placeOrder: (
    userId: string,
    items: CartItem[],
    total: number,
    address: Address,
  ) => Order;
  getUserOrders: (userId: string) => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: (userId, items, total, address) => {
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
    }),
    { name: "shopforge-orders" },
  ),
);
