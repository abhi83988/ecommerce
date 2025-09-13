"use client";

import CustomerFooter from "@/components/CustomerFooter";
import CustomerNavbar from "@/components/Navbar";
import Link from "next/link";

export default function ReturnsPage() {
  return (

    <div>
        <CustomerNavbar/>
    <div className="min-h-screen bg-gray-50 dark:bg-white-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-white-800 shadow-2xl rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-black mb-6 text-center">
          Returns & Refunds
        </h1>
        <p className="text-gray-700 dark:text-black-300 mb-6 text-center">
          We want you to be happy with your purchase. This page explains our returns
          and refunds policy.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              1. Eligibility for Returns
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Items can be returned within 14 days of delivery. To be eligible, products
              must be unused, in the original packaging, and with all tags attached.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              2. Non-Returnable Items
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Some products cannot be returned due to hygiene or safety reasons, such as
              intimate apparel, personal care products, and gift cards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              3. Refund Process
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Once your return is received and inspected, we will notify you of the
              approval or rejection of your refund. Approved refunds will be processed
              to your original payment method within 5-7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              4. Return Shipping
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Customers are responsible for return shipping costs unless the product is
              defective or incorrect. Please ensure the item is securely packaged.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              5. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              For assistance with returns or refunds, please contact our support team at
              <span className="font-medium"> support@nextshop.com</span> or call
              <span className="font-medium"> +1 (234) 567-890</span>.
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/customer/products"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
            >
              Back to Products
            </Link>
          </div>
        </section>
      </div>
    </div>

    <CustomerFooter />
    </div>
  );
}
