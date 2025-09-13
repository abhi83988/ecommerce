"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User } from "lucide-react";
import CustomerFooter from "@/components/CustomerFooter";
import CustomerNavbar from "@/components/Navbar";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Error sending mail:", err);
      setStatus("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <CustomerNavbar />
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Connect</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We’re here to help. Drop us a message or reach out using the contact info.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/70 border border-white/40 p-8 rounded-3xl shadow-lg space-y-6"
          >
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-indigo-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-indigo-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                name="message"
                placeholder="Write your message..."
                required
                className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="text-center text-sm mt-2 text-gray-700">{status}</p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="backdrop-blur-lg bg-white/70 border border-white/40 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <Phone className="text-indigo-500 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Phone</h3>
                <p className="text-gray-600">+91 83988 27986</p>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/70 border border-white/40 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <Mail className="text-indigo-500 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Email</h3>
                <p className="text-gray-600">support@nextshop.com</p>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/70 border border-white/40 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <MapPin className="text-indigo-500 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Address</h3>
                <p className="text-gray-600">
                  NextShop, Kurukshetra, Haryana, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    <CustomerFooter />
    </div>
  );
}
