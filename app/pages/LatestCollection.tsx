"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export default function LatestCollection() {
  const products = [
    {
      img: "/2151892461.png",
      name: "Modern Chair",
      price: "₹5,000",
    },
    {
      img: "/4077476.png",
      name: "Designer Sofa",
      price: "₹18,500",
    },
    {
      img: "/409094547.png",
      name: "Wooden Bookshelf",
      price: "₹5,750",
    },
    // You can add more products as needed
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-start md:items-center gap-8"
      >
        {/* Left info card */}
        <div className="flex-1 max-w-md">
          <h2 className="text-3xl font-bold text-[#004744] mb-4">
            Latest Collection
          </h2>
          <p className="text-gray-700 mb-6">
            Explore our newest arrivals crafted with elegance and comfort in
            mind. Perfect pieces to elevate your home decor.
          </p>
          <Link href="/shop" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#004744] text-white px-6 py-3 rounded-md hover:bg-[#003a38] transition font-semibold inline-block cursor-pointer"
            >
              Shop Now
            </motion.a>
          </Link>
        </div>

        {/* Product cards wrapper */}
        <div className="flex-1 w-full">
          {/* Tablet and Desktop: Horizontal scroll using flex */}
          <div className="hidden sm:flex overflow-x-auto gap-6 no-scrollbar">
            {products.map(({ img, name, price }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="min-w-[200px] flex-shrink-0 cursor-pointer rounded-md p-4 flex flex-col items-center transition-shadow duration-300 hover:shadow-lg hover:bg-[#f0fdfa]"
                style={{ minHeight: "280px" }}
              >
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={img}
                  alt={name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-[#004744] font-semibold text-lg">{name}</h3>
                <p className="text-gray-600 mt-1 font-medium">{price}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile layout using grid */}
          <div className="grid grid-cols-2 gap-4 sm:hidden mt-6">
            {products.map(({ img, name, price }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer rounded-md p-3 flex flex-col items-center transition-shadow duration-300 hover:shadow-md hover:bg-[#f0fdfa]"
              >
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={img}
                  alt={name}
                  className="w-full h-32 object-contain mb-3"
                />
                <h3 className="text-[#004744] font-semibold text-sm text-center">
                  {name}
                </h3>
                <p className="text-gray-600 mt-1 text-sm font-medium">
                  {price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
