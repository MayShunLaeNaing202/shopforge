import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30hr battery.",
    price: 99.99,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 15,
    rating: 4.5,
    reviewCount: 128,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Running Shoes",
    description: "Lightweight running shoes with superior cushioning.",
    price: 79.99,
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 30,
    rating: 4.3,
    reviewCount: 95,
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    name: "TypeScript Handbook",
    description: "Complete guide to TypeScript for modern web development.",
    price: 34.99,
    category: "books",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    stock: 50,
    rating: 4.8,
    reviewCount: 210,
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    description:
      "Soft 100% organic cotton t-shirt, available in multiple colors.",
    price: 24.99,
    category: "clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 100,
    rating: 4.1,
    reviewCount: 67,
    createdAt: "2024-01-04",
  },
  {
    id: "5",
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and USB charging port.",
    price: 49.99,
    category: "home",
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    stock: 25,
    rating: 4.6,
    reviewCount: 43,
    createdAt: "2024-01-05",
  },
];
