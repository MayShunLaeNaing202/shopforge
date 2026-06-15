// src/pages/HomePage.tsx
import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import ProductGrid from "../components/product/ProductGrid";
import Input from "../components/ui/Input";
import useProducts from "../hooks/useProducts";
import type { Category } from "../types/index";
import type { Product } from "../types/index";
import { useCartStore } from "../store/cartStore";

const CATEGORIES = [
  "all",
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
];

const HomePage = () => {
  const { addItem, totalItems } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar cartCount={totalItems()} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Welcome to ShopForge</h1>
          <p className="text-blue-100 text-lg">
            Discover amazing products at great prices
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category | "all")}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium capitalize
                  transition-colors duration-200
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>

        {/* Product Grid */}
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default HomePage;
