"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import CustomerFooter from "@/components/CustomerFooter";

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});
  const userId = session?.user?.id;

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    let url = "/api/products";
    if (selectedCategory) url += `?category_id=${selectedCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, [selectedCategory]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );

  async function addToCart(productId) {
    const quantity = quantities[productId] || 1;
    if (!userId) {
      alert("Please login first");
      return;
    }
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    if (res.ok) alert(`Added ${quantity} item(s) to cart ✅`);
    else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            🛒 Shop Our Products
          </h1>
          <p className="mt-3 text-gray-500">
            Choose a category and discover our curated collection.
          </p>
          {!session && (
            <div className="mt-5">
              <button
                onClick={() => signIn()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Login to Add Products
              </button>
            </div>
          )}

          {/* Category Dropdown */}
          <div className="mt-8 flex justify-center">
            <select
              className="border border-gray-300 text-black rounded-xl p-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white shadow-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found 
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-3 flex text-black items-center justify-between">
                    <p className="text-xl  font-bold text-blue-600">
                      ₹{product.price}
                    </p>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [product.id]: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-16 border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!userId}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
                      userId
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {userId ? "Add to Cart" : "Login to Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
      <CustomerFooter />
    </div>
    
      );
}
    