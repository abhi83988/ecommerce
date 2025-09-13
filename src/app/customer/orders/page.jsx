"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import CustomerFooter from "@/components/CustomerFooter";

export default function CustomerOrders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  async function viewOrderItems(orderId) {
    try {
      const res = await fetch(`/api/orders/items/${orderId}`);
      const data = await res.json();
      setSelectedOrderItems(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function cancelOrder(orderId) {
    try {
      const res = await fetch(`/api/orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status: "cancelled",
        }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!session)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Please login to view your orders.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-center text-gray-900 font-extrabold text-4xl mb-8">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/256/11329/11329060.png"
              alt="No orders"
              className="w-40 h-40 mb-6 opacity-80"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              You haven’t placed any orders yet. Start shopping now and enjoy
              exclusive deals!
            </p>
            <a
              href="/customer/products"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              🛍️ Browse Products
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-l-4
                    border-l-indigo-500"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Order #{order.id}
                    </p>
                    <p className="font-semibold text-gray-900 text-lg">
                      Total: ₹{order.total_amount}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={() => viewOrderItems(order.id)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition"
                    >
                      View Items
                    </button>

                    {order.status !== "shipped" &&
                      order.status !== "delivered" &&
                      order.status !== "cancelled" && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
                        >
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {/* Side Panel */}
            <div className="bg-white rounded-2xl shadow p-5 h-fit sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Order Items
              </h2>

              {selectedOrderItems.length > 0 ? (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scroll">
                  {selectedOrderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-indigo-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
                    alt="No order"
                    className="w-12 h-12 mb-3 opacity-70"
                  />
                  <p className="font-medium text-gray-700">
                    No Order Selected
                  </p>
                  <span className="text-sm text-gray-500">
                    Please choose an order to view details
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <CustomerFooter />
    </div>
  );
}
