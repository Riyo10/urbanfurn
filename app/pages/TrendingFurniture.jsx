'use client';

import { useState } from 'react';
import {
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import furnitureData from '../data/furnitureData';

import { useCartFav } from '../context/CartFavContext'; // <-- import your context

const categories = Object.keys(furnitureData);

export default function TrendingFurniture() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useCartFav();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:px-12">
      {/* Header & Category Tabs omitted for brevity */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {(furnitureData[selectedCategory] || []).map((item, index) => {
          const inCart = isInCart(item.id);
          const inFav = isFavorite(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.015 }}
              className="relative bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Favorite Icon */}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFavorite(item)}
                className={`absolute top-3 right-3 text-xl z-10 ${
                  inFav ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
                aria-label={inFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                {inFav ? <AiFillHeart /> : <AiOutlineHeart />}
              </motion.button>

              {/* Image */}
              <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center p-4">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  src={item.img}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Bottom Section */}
              <div className="bg-[#004744] text-white px-4 py-4 flex flex-col gap-2 mt-auto">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCart(item)}
                    className={`p-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition ${
                      inCart ? 'bg-green-600 text-white' : 'bg-white text-[#004744]'
                    }`}
                    aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
                  >
                    <FiShoppingCart className="text-2xl" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
