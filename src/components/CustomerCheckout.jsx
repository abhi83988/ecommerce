"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CustomerCheckout({
  userId,
  cartTotal,
  onOrderPlaced,
  onClose,
  cartItems,
}) {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!userId) return alert("User not logged in!");
    if (!details.name || !details.email || !details.address || !details.phone)
      return alert("Please fill all fields.");

    setLoading(true);

    // Test payment
    if (paymentMethod === "testpay") {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          details,
          userId,
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const { url, error } = await res.json();
      if (!res.ok) {
        alert("Stripe checkout error: " + error);
        setLoading(false);
        return;
      }

      window.location.href = url;
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, details, paymentMethod }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(
          `Order #${data.orderId} placed successfully! Total: ₹${data.totalAmount}`
        );
        onOrderPlaced?.();
        onClose?.();
      } else {
        alert("Error placing order: " + data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            🛒 Checkout
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left: Form */}
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Shipping Details
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={details.name}
              onChange={handleChange}
              className="w-full border text-black border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={details.email}
              onChange={handleChange}
              className="w-full border text-black border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={details.address}
              onChange={handleChange}
              className="w-full border text-black border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
              rows="3"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={details.phone}
              onChange={handleChange}
              className="w-full border  text-black border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <div>
              <p className="font-semibold mb-2 text-gray-800">Payment Method</p>
              <div className="flex flex-col gap-3">
                <label
                  className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer transition text-black ${
                    paymentMethod === "cod"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="hidden"
                  />
                  💵 Cash on Delivery
                </label>
                <label
                  className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer transition text-black ${
                    paymentMethod === "testpay"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="testpay"
                    checked={paymentMethod === "testpay"}
                    onChange={() => setPaymentMethod("testpay")}
                    className="hidden"
                  />
                  💳 Pay with Cards
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-gray-50 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Order Summary
              </h3>
              <div className="max-h-48 overflow-y-auto divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex justify-between items-center py-2"
                  >
                    <div>
                      <p className="text-gray-800 text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xl font-bold text-gray-800 text-right">
                Total: <span className="text-green-600">₹{cartTotal}</span>
              </p>
              <button
                onClick={placeOrder}
                disabled={loading}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold shadow-md transition transform hover:-translate-y-0.5"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
