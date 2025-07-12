'use client';

import { motion } from 'framer-motion';

export default function ProductsHighlight() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="grid grid-rows-[3fr_2fr] gap-6">
          {/* 1st Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#f7f7f7] rounded-xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="/409106540.png"
              alt="Modern Table"
              className="h-full w-1/2 object-contain rounded-lg"
            />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-[#004744]">
                Modern Wooden Table
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Minimal design with premium finish. Perfect for your living space.
              </p>
            </div>
          </motion.div>

          {/* Row 2 - 2nd & 3rd cards */}
          <div className="flex gap-6">
            {/* 2nd Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#f7f7f7] flex-1 rounded-xl overflow-hidden relative shadow-sm hover:shadow-md transition"
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
                src="/11060311.png"
                alt="Minimal Product"
                className="w-full h-full object-contain p-4"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-2 left-2 px-3 py-1 rounded text-xs text-[#004744] font-medium"
              >
                New Arrival · Minimal Finish
              </motion.div>
            </motion.div>

            {/* 3rd Card - Discount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#004744] flex-1 rounded-xl flex flex-col items-center justify-center text-white text-center px-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-2xl font-bold mb-1 text-[#D3AF37]">25% OFF</p>
              <p className="text-sm font-medium leading-tight">
                Special offer just for you. <br /> Limited-time discounts.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Tall Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          className="bg-[#f7f7f7] rounded-xl relative shadow-sm hover:shadow-md transition overflow-hidden flex items-center justify-center p-6"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src="/409090847.png"
            alt="Modern Chair"
            className="w-full h-full object-contain"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            className="absolute bottom-4 left-4 px-4 py-3 rounded-md max-w-xs bg-white/80 backdrop-blur-md"
          >
            <h3 className="text-[#004744] font-bold text-base mb-1">Signature Lounge Chair</h3>
            <p className="text-xs text-gray-700 mb-2">
              Relax in elegance. Our top-selling comfort-first chair.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
