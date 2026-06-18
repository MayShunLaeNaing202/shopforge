// src/pages/admin/AdminProducts.tsx
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";

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

const AdminProducts = () => {
  const { products, deleteProduct } = useProductStore();
  const { totalItems } = useCartStore();

  const handleDelete = (id: string, name: string) => {
    // Confirm dialog — အမှား ဖျက်မိမှာ ကာကွယ်တယ်
    const confirmed = window.confirm(`Delete "${name}"? This can't be undone.`);
    if (confirmed) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="text-blue-600" size={28} />
              Products
            </h1>
            <p className="text-gray-500 mt-1">
              {products.length} products total
            </p>
          </div>

          <Link to="/admin/products/new">
            <Button variant="primary">
              <Plus size={16} />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Product</th>
                <th className="text-left px-6 py-3 font-medium">Category</th>
                <th className="text-left px-6 py-3 font-medium">Price</th>
                <th className="text-left px-6 py-3 font-medium">Stock</th>
                <th className="text-right px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Product Image + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <Badge
                      label={product.category}
                      variant={categoryVariant[product.category]}
                    />
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <span
                      className={
                        product.stock < 10
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }
                    >
                      {product.stock} units
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
