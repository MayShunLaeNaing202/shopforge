// src/data/products.ts
import type { Product } from "../types/index";

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30hr battery life.",
    price: 79.99,
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
    description: "Lightweight and durable running shoes for all terrains.",
    price: 59.99,
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
    description: "The complete guide to TypeScript for modern developers.",
    price: 29.99,
    category: "books",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 50,
    rating: 4.8,
    reviewCount: 210,
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard with RGB backlighting.",
    price: 99.99,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    stock: 20,
    rating: 4.6,
    reviewCount: 174,
    createdAt: "2024-01-04",
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    description: "Premium soft cotton t-shirt available in multiple colors.",
    price: 19.99,
    category: "clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 100,
    rating: 4.2,
    reviewCount: 88,
    createdAt: "2024-01-05",
  },
];
