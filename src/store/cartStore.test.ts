import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "../store/cartStore";
import { products } from "../data/products";
import { resetStores } from "../test/helpers";

const sampleProduct = products[0];

describe("cartStore", () => {
  beforeEach(() => {
    resetStores();
  });

  it("adds a product to the cart", () => {
    const added = useCartStore.getState().addItem(sampleProduct);
    expect(added).toBe(true);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("increments quantity when adding the same product", () => {
    const { addItem } = useCartStore.getState();
    addItem(sampleProduct);
    addItem(sampleProduct);

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("does not exceed available stock", () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(sampleProduct);

    for (let i = 1; i < sampleProduct.stock; i++) {
      addItem(sampleProduct);
    }

    expect(useCartStore.getState().items[0].quantity).toBe(
      sampleProduct.stock,
    );

    const overflow = addItem(sampleProduct);
    expect(overflow).toBe(false);
    expect(updateQuantity(sampleProduct.id, sampleProduct.stock + 1)).toBe(
      false,
    );
  });

  it("computes totals correctly", () => {
    const { addItem, totalItems, totalPrice } = useCartStore.getState();
    addItem(sampleProduct);
    addItem(sampleProduct);

    expect(totalItems()).toBe(2);
    expect(totalPrice()).toBeCloseTo(sampleProduct.price * 2);
  });

  it("removes items and clears the cart", () => {
    const { addItem, removeItem, clearCart } = useCartStore.getState();
    addItem(sampleProduct);
    addItem(products[1]);

    removeItem(sampleProduct.id);
    expect(useCartStore.getState().items).toHaveLength(1);

    clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
