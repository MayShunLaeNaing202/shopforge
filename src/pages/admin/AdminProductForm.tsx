// src/pages/admin/AdminProductForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import type { Category } from "../../types/index";

const CATEGORIES: Category[] = [
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
];

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // URL မှာ id ရှိရင် Edit mode
  const { getProduct, addProduct, updateProduct } = useProductStore();
  const { totalItems } = useCartStore();

  const isEditMode = Boolean(id);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("electronics");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Edit mode ဆိုရင် — existing product data ကို form ထဲ ဖြည့်တယ်
  useEffect(() => {
    if (isEditMode && id) {
      const product = getProduct(id);
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(String(product.price));
        setCategory(product.category);
        setImageUrl(product.imageUrl);
        setStock(String(product.stock));
      }
    }
  }, [id, isEditMode, getProduct]);

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
      rating: 0,
      reviewCount: 0,
    };

    if (isEditMode && id) {
      updateProduct(id, productData); // Edit
    } else {
      addProduct(productData); // Add
    }

    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
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

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
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

          {/* Image Preview */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}

          <Button type="submit" variant="primary" size="lg" className="mt-2">
            <Save size={16} />
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
