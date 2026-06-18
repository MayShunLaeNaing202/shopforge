import { describe, it, expect, beforeEach } from "vitest";
import { useOrderStore } from "../store/orderStore";
import { useCartStore } from "../store/cartStore";
import { products } from "../data/products";
import { resetStores } from "../test/helpers";

describe("orderStore", () => {
  beforeEach(() => {
    resetStores();
  });

  it("places an order and decrements stock", () => {
    const product = products[0];
    useCartStore.getState().addItem(product);

    const order = useOrderStore.getState().placeOrder(
      "user-1",
      useCartStore.getState().items,
      product.price,
      {
        street: "123 Main St",
        city: "Yangon",
        postcode: "11181",
        country: "Myanmar",
      },
    );

    expect(order).not.toBeNull();
    expect(useOrderStore.getState().orders).toHaveLength(1);

    const updated = useOrderStore.getState().getUserOrders("user-1");
    expect(updated[0].id).toBe(order!.id);
  });

  it("rejects orders when stock is insufficient", () => {
    const product = products[0];
    useCartStore.setState({
      items: [{ product, quantity: product.stock + 1 }],
    });

    const order = useOrderStore.getState().placeOrder(
      "user-1",
      useCartStore.getState().items,
      product.price,
      {
        street: "123 Main St",
        city: "Yangon",
        postcode: "11181",
        country: "Myanmar",
      },
    );

    expect(order).toBeNull();
    expect(useOrderStore.getState().orders).toHaveLength(0);
  });

  it("updates order status", () => {
    const product = products[1];
    useCartStore.getState().addItem(product);

    const order = useOrderStore.getState().placeOrder(
      "user-1",
      useCartStore.getState().items,
      product.price,
      {
        street: "123 Main St",
        city: "Yangon",
        postcode: "11181",
        country: "Myanmar",
      },
    );

    useOrderStore.getState().updateOrderStatus(order!.id, "shipped");

    const updated = useOrderStore.getState().orders.find((o) => o.id === order!.id);
    expect(updated?.status).toBe("shipped");
  });
});
