"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, X, ShoppingCart, User, Home, Package } from "lucide-react";

export default function CustomerNavbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    // { name: "Home", href: "/customer/dashboard", icon: <Home size={18} /> },
    { name: "Products", href: "/customer/products", icon: <Package size={18} /> },
    { name: "Cart", href: "/customer/carts", icon: <ShoppingCart size={18} /> },
    { name: "Orders", href: "/customer/orders", icon: <Package size={18} /> },
    { name: "Profile", href: "/customer/profile", icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Next<span className="text-yellow-300">Shop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 hover:text-yellow-300 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {session ? (
              <>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                  Hi, {session.user.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800/90 backdrop-blur-md px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 py-2 px-2 text-white rounded hover:bg-indigo-700"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="w-full mt-3 bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="block mt-3 text-center bg-yellow-400 text-gray-900 py-2 rounded-lg hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
