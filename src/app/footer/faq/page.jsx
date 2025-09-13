import CustomerFooter from "@/components/CustomerFooter";
import CustomerNavbar from "@/components/Navbar";
import { div } from "framer-motion/client";

export default function FAQ() {
  const faqs = [
    { q: "How do I place an order?", a: "Browse products and add to cart, then checkout." },
    { q: "How can I track my order?", a: "Go to your Orders page and click Track." },
    { q: "What is the return policy?", a: "You can return within 30 days." },
  ];
  return (<div className="div">
    <CustomerNavbar />  
      <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">❓ FAQ</h1>
        <div className="divide-y divide-gray-200">
          {faqs.map((item, idx) => (
              <div key={idx} className="py-4">
              <h2 className="font-semibold text-lg text-gray-800">{item.q}</h2>
              <p className="text-gray-600 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
       <CustomerFooter />
  </div>
  );
}
