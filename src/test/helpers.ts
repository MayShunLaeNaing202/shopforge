import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/productStore";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";
import { products as seedProducts } from "../data/products";

export const resetStores = () => {
  useCartStore.setState({ items: [] });
  useProductStore.setState({ products: seedProducts });
  useOrderStore.setState({ orders: [] });
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    registeredUsers: [],
  });
};
