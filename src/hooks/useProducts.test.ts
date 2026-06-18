import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useProducts from "../hooks/useProducts";
import { resetStores } from "../test/helpers";

describe("useProducts", () => {
  beforeEach(() => {
    resetStores();
  });

  it("returns all products by default", () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.products.length).toBeGreaterThan(0);
  });

  it("filters products by search query", () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.setSearchQuery("headphones");
    });

    expect(result.current.products.every((p) =>
      p.name.toLowerCase().includes("headphones"),
    )).toBe(true);
  });

  it("filters products by category", () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.setSelectedCategory("electronics");
    });

    expect(result.current.products.every((p) => p.category === "electronics")).toBe(
      true,
    );
  });

  it("returns empty when search has no matches", () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.setSearchQuery("zzzznonexistent");
    });

    expect(result.current.products).toHaveLength(0);
  });
});
