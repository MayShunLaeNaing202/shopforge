// src/hooks/useProducts.ts
import { useState, useMemo } from "react";
import { products as allProducts } from "../data/products";
import type { Category, Product } from "../types/index";

const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );

  // useMemo — search/filter ပြောင်းမှပဲ recalculate လုပ်တယ်
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useProducts;
