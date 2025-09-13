import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function CustomerFooter() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Online Shopping */}
        <div>
          <h3 className="text-gray-900 text-base font-bold mb-3">ONLINE SHOPPING</h3>
          <ul className="space-y-2">
            <li><Link href="/customer/products" className="hover:underline">Men</Link></li>
            <li><Link href="/customer/products" className="hover:underline">Women</Link></li>
            <li><Link href="/customer/products" className="hover:underline">Kids</Link></li>
            <li><Link href="/customer/products" className="hover:underline">Home & Living</Link></li>
            <li><Link href="/customer/products" className="hover:underline">Beauty</Link></li>
            <li><Link href="/customer/products" className="hover:underline">Gift Cards</Link></li>
          </ul>
        </div>

        {/* Customer Policies */}
        <div>
          <h3 className="text-gray-900 text-base font-bold mb-3">CUSTOMER POLICIES</h3>
          <ul className="space-y-2">
            <li><Link href="/footer/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/footer/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/footer/terms" className="hover:underline">T&C</Link></li>
            <li><Link href="/footer/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/footer/return" className="hover:underline">Returns</Link></li>
            <li><Link href="/customer/orders" className="hover:underline">Track Orders</Link></li>
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h3 className="text-gray-900 text-base font-bold mb-3">EXPERIENCE OUR APP</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="inline-block">
              <img
                src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-play-store-vector-png-image_9183318.png"
                alt="Download on Play Store"
                className="h-10 w-10"
              />
            </a>
            <a href="#" className="inline-block">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyI-Uv9NetrYwskCvVQPa1BaxJUD-1XahqUg&s"
                alt="Download on App Store"
                className="h-9 w-8.5"
              />
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-900 text-base font-bold mb-3">KEEP IN TOUCH</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900"><Facebook /></a>
            <a href="#" className="hover:text-gray-900"><Instagram /></a>
            <a href="#" className="hover:text-gray-900"><Twitter /></a>
            <a href="#" className="hover:text-gray-900"><Youtube /></a>
          </div>
          <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} NextShop. All rights reserved.</p>
        </div>
      </div>

      <div className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} NextShop — India’s Fashion Destination
        </div>
      </div>
    </footer>
  );
}
