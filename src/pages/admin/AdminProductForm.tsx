// src/pages/admin/AdminProductForm.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import type { Category, Product } from "../../types/index";

const CATEGORIES: Category[] = [
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
];

interface ProductFormProps {
  product?: Product;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useProductStore();
  const isEditMode = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [category, setCategory] = useState<Category>(
    product?.category ?? "electronics",
  );
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [stock, setStock] = useState(product ? String(product.stock) : "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price || Number(price) <= 0) newErrors.price = "Valid price required";
    if (!imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!stock || Number(stock) < 0) newErrors.stock = "Valid stock required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      imageUrl,
      stock: Number(stock),
      rating: product?.rating ?? 0,
      reviewCount: product?.reviewCount ?? 0,
    };

    if (isEditMode && product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }

    navigate("/admin/products");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft size={14} />
        Back to Products
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4"
      >
        <Input
          label="Product Name"
          placeholder="Wireless Headphones"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Product description..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            placeholder="79.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
          />

          <Input
            label="Stock"
            type="number"
            placeholder="50"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            error={errors.stock}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Image URL"
          placeholder="https://images.unsplash.com/..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          error={errors.imageUrl}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <Button type="submit" variant="primary" size="lg" className="mt-2">
          <Save size={16} />
          {isEditMode ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </>
  );
};

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProductStore();
  const { totalItems } = useCartStore();

  const isEditMode = Boolean(id);
  const product = isEditMode && id ? getProduct(id) : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditMode && !product ? (
          <div className="text-center py-24">
            <p className="text-gray-500 font-medium">Product not found</p>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mt-4 text-blue-600 text-sm hover:underline"
            >
              Go back
            </button>
          </div>
        ) : (
          <ProductForm key={id ?? "new"} product={product} />
        )}
      </div>
    </div>
  );
};

export default AdminProductForm;
