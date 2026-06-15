export type Category = "electronics" | "clothing" | "books" | "home" | "sports";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "shopper" | "admin";
  createdAt: string;
};

export type Address = {
  street: string;
  city: string;
  postcode: string;
  country: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
};
