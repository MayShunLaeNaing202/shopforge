// src/components/product/ProductCard.tsx
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../types/index";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import StarRating from "../ui/StarRating";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Category အလိုက် badge color သတ်မှတ်
const categoryVariant: Record<
  string,
  "blue" | "green" | "yellow" | "red" | "gray"
> = {
  electronics: "blue",
  clothing: "green",
  books: "yellow",
  home: "gray",
  sports: "red",
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge
            label={product.category}
            variant={categoryVariant[product.category]}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="primary"
            size="sm"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
