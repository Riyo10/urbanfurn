"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import furnitureData from "../data/furnitureData";
import { useCartFav } from "../context/CartFavContext";

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  category: string;
};

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^\d]/g, ""), 10);
}

export default function Shop() {
  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useCartFav();

  const categories = Object.keys(furnitureData);

  const allProducts: Product[] = useMemo(
    () =>
      categories.flatMap((cat) =>
        furnitureData[cat as keyof typeof furnitureData].map((p) => ({
          ...p,
          category: cat,
          id: p.id, // ✅ Use stable ID from data
        }))
      ),
    [categories]
  );

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const price = parsePrice(p.price);
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      const matchesPrice = price >= minPrice && price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, activeCategory, minPrice, maxPrice, allProducts]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 md:px-12 text-[#004744]">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-3">Don't wait, pick up your furniture</h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          Search and filter through our hand-picked collection of elegant furniture for every corner of your home.
        </p>
      </motion.div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 bg-white border rounded-md px-4 py-2 w-full max-w-xl shadow-sm">
          <AiOutlineSearch className="text-[#004744] text-xl" />
          <input
            type="text"
            placeholder="Search furniture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow outline-none text-gray-800 placeholder-gray-400"
          />
          {search && (
            <AiOutlineClose onClick={() => setSearch("")} className="text-gray-500 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1 rounded-full border ${
              !activeCategory ? "bg-[#004744] text-white" : "bg-white text-[#004744]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 rounded-full border ${
                activeCategory === cat ? "bg-[#004744] text-white" : "bg-white text-[#004744]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Price Range:</label>
          <input
            type="number"
            min={0}
            max={50000}
            step={500}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded-md focus:ring-2 focus:ring-[#004744]"
          />
          <span>to</span>
          <input
            type="number"
            min={0}
            max={50000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded-md focus:ring-2 focus:ring-[#004744]"
          />
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        {filtered.map((product) => {
          const inCart = isInCart(product.id);
          const inFav = isFavorite(product.id);

          return (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md text-center transition flex flex-col"
            >
              <img src={product.img} alt={product.name} className="w-full h-40 object-contain mb-4" />
              <h3 className="font-semibold text-lg text-[#004744]">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.price}</p>
              <p className="text-sm text-gray-500 italic mt-1">{product.category}</p>

              <div className="mt-auto flex justify-center gap-4 pt-4">
                <button
                  onClick={() => toggleFavorite(product)}
                  className="text-2xl"
                  aria-label={inFav ? "Remove from favorites" : "Add to favorites"}
                  title={inFav ? "Remove from favorites" : "Add to favorites"}
                >
                  {inFav ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400 hover:text-red-500" />
                  )}
                </button>

                <button
                  onClick={() => toggleCart(product)}
                  className="text-2xl"
                  aria-label={inCart ? "Remove from cart" : "Add to cart"}
                  title={inCart ? "Remove from cart" : "Add to cart"}
                >
                  <AiOutlineShoppingCart
                    className={inCart ? "text-green-600" : "text-gray-400 hover:text-green-600"}
                  />
                </button>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500 italic">
            No products found within selected filters.
          </p>
        )}
      </motion.div>
    </section>
  );
}
