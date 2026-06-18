// src/hooks/useProducts.ts
import { useState, useMemo } from "react";
import { useProductStore } from "../store/productStore";
import type { Category, Product } from "../types/index";

const useProducts = () => {
  const { products: allProducts } = useProductStore(); // ← ပြောင်းတဲ့နေရာ

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]); // allProducts ထည့်ဖို့ မမေ့ပါနဲ့

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useProducts;
