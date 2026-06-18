// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ShoppingBag, MapPin, CreditCard } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
import type { Address } from "../types/index";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { placeOrder } = useOrderStore();

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    postcode: "",
    country: "",
  });

  const [cardNumber, setCardNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!address.street) newErrors.street = "Street is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.postcode) newErrors.postcode = "Postcode is required";
    if (!address.country) newErrors.country = "Country is required";
    if (!cardNumber || cardNumber.length < 16)
      newErrors.cardNumber = "Valid card number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const order = placeOrder(
      user!.id,
      items,
      totalPrice() + (totalPrice() > 50 ? 0 : 5.99),
      address,
    );

    if (!order) {
      setErrors({ form: "Some items are no longer in stock. Please review your cart." });
      setIsLoading(false);
      return;
    }

    clearCart();
    navigate(`/order/${order.id}`);
    setIsLoading(false);
  };

  const subtotal = totalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems()} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" size={28} />
          Checkout
        </h1>

        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Shipping Address
              </h2>

              <div className="flex flex-col gap-4">
                <Input
                  label="Street Address"
                  placeholder="123 Main Street"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  error={errors.street}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Yangon"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    error={errors.city}
                  />
                  <Input
                    label="Postcode"
                    placeholder="11181"
                    value={address.postcode}
                    onChange={(e) =>
                      setAddress({ ...address, postcode: e.target.value })
                    }
                    error={errors.postcode}
                  />
                </div>

                <Input
                  label="Country"
                  placeholder="Myanmar"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  error={errors.country}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                Payment Details
              </h2>

              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                maxLength={16}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/g, ""))
                }
                error={errors.cardNumber}
              />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input label="Expiry Date" placeholder="MM/YY" />
                <Input label="CVV" placeholder="123" maxLength={3} />
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">
                  Demo mode — use any 16-digit number
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2 mt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-6"
                isLoading={isLoading}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
