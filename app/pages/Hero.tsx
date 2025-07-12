'use client'; // If you're using App Router (Next.js 13+)

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full bg-white flex items-center justify-center py-12">
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 text-center">

        {/* Heading and Paragraph with framer-motion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 text-[#002c2a]"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md mt-2">
            Timeless Furniture, Redefined
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90 drop-shadow-sm mt-2 text-[#013330]">
            Crafted with care. Designed for life.
          </p>
        </motion.div>

        {/* Aspect Ratio Wrapper - 16:9 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-lg group"
        >
          {/* Background image with hover zoom and lazy loading */}
          <img
            src="/bgsectionimg.jpg"
            alt="Furniture showcase"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            aria-hidden="true"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />

          {/* Optional button (still commented out) */}
          {/* <div className="absolute inset-0 z-10 flex items-end justify-center pb-6">
            <button className="bg-[#004744] hover:bg-[#003734] text-white font-light py-2 px-5 sm:px-6 text-sm sm:text-base rounded-lg shadow-md transition">
              Shop Now
            </button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
