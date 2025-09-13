"use client";

import CustomerFooter from "@/components/CustomerFooter";
import CustomerNavbar from "@/components/Navbar";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div>

        <CustomerNavbar />
    <div className="min-h-screen bg-gray-50 dark:bg-white-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-white-800 shadow-2xl rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-black mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-700 dark:text-black-300 mb-6 text-center">
          Your privacy is important to us. This Privacy Policy explains how we collect,
          use, and protect your information.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              1. Information Collection
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              We collect information when you use our services, including your name, email
              address, payment details, and browsing activity. This information helps us
              improve our services and provide a better shopping experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              2. Use of Information
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              Your information may be used to process transactions, send order updates,
              personalize your experience, and send promotional emails. We do not sell or
              rent your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              3. Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              We use cookies and similar technologies to enhance website functionality,
              analyze trends, and track user behavior. You can manage cookies through
              your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              4. Data Security
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              We implement appropriate technical and organizational measures to protect
              your data against unauthorized access, disclosure, or alteration. However,
              no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              5. Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              We may use third-party services for payment processing, analytics, and
              marketing. These third parties are bound to protect your data according to
              their privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black-100 mb-2">
              6. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-black-300">
              You have the right to access, update, or delete your personal data. You can
              also opt out of promotional emails at any time by following the instructions
              provided in the email.
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
