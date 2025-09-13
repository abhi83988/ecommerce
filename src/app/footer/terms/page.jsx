"use client";

import CustomerFooter from "@/components/CustomerFooter";
import CustomerNavbar from "@/components/Navbar";
import Link from "next/link";

export default function TermsPage() {
  return ( <div>

    <CustomerNavbar />
    <div className="min-h-screen bg-gray-50 dark:bg-white-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-white-800 shadow-2xl rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-black mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 dark:text-black-300 mb-6 text-center">
          Please read these terms and conditions carefully before using our website.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Welcome to NextShop. By accessing or using our website, you agree to comply with
              and be bound by the following terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              2. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Users must provide accurate information and are responsible for maintaining the
              confidentiality of their accounts. You agree not to use the website for any
              unlawful purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              3. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              All content on this website, including images, text, logos, and graphics, is the
              property of NextShop and protected by copyright and intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              NextShop shall not be held liable for any damages or losses arising from the
              use of our website, including but not limited to direct, indirect, incidental,
              or consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              5. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              These terms and conditions are governed by and construed in accordance with the
              laws of India. Any disputes shall be subject to the exclusive jurisdiction of
              courts in India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              6. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              We reserve the right to update or modify these terms at any time. Users are
              encouraged to review the terms regularly. Continued use of the website
              constitutes acceptance of the updated terms.
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
