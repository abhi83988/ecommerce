"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export default function AdminNavbar() {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getSession().then((sess) => {
      if (!sess) {
        window.location.href = "/signin";
      } else if (sess.user.role !== "admin") {
        window.location.href = "/customer/dashboard";
      } else {
        setSession(sess);
      }
    });
  }, []);

  if (!session) return <p className="text-center p-6">Loading...</p>;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/admin/dashboard"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              Admin<span className="text-gray-800">Panel</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/admin/categories"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Categories
            </Link>
            <Link
              href="/admin/products"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Orders
            </Link>
          </div>

          {/* User + Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">{session.user?.name}</p>
                <p className="text-gray-500 text-xs">{session.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/admin/categories"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/admin/products"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>

            <div className="border-t pt-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{session.user?.name}</p>
                  <p className="text-gray-500 text-xs">{session.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
