'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function AboutUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 md:px-12 text-[#004744]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          About Urban Furn
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
          At <span className="font-semibold text-[#004744]">Urban Furn</span>, we
          believe that your home should be a sanctuary — a space that reflects
          your personality, values, and lifestyle. Our mission is to blend
          contemporary aesthetics with sustainable craftsmanship to create
          timeless furniture you’ll love for years to come.
        </p>

        {/* Our Philosophy */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
            <p className="text-gray-700">
              We design with purpose and passion. Every piece we create is built
              with a deep respect for nature and a commitment to sustainability.
              From responsibly sourced wood to eco-friendly finishes, our products
              are made to minimize environmental impact while maximizing comfort,
              function, and beauty.
            </p>
          </motion.div>

          {/* Our Process */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
            <p className="text-gray-700">
              From concept to craftsmanship, our process is rooted in quality.
              Our skilled artisans bring each design to life using traditional
              techniques blended with modern technology. The result? Durable,
              stylish pieces that elevate your home and stand the test of time.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center text-gray-700">
            <div className="bg-[#f0fdfa] p-6 rounded-md shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#004744] mb-2">
                Sustainability
              </h3>
              <p>
                We prioritize eco-conscious materials and practices, ensuring a
                better planet for generations to come.
              </p>
            </div>
            <div className="bg-[#f0fdfa] p-6 rounded-md shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#004744] mb-2">
                Comfort & Function
              </h3>
              <p>
                Every piece is designed to feel as good as it looks—blending
                comfort with functionality.
              </p>
            </div>
            <div className="bg-[#f0fdfa] p-6 rounded-md shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#004744] mb-2">
                Design That Inspires
              </h3>
              <p>
                We craft furniture that’s not just useful but beautiful, helping
                you create a space you love.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of happy customers who have trusted Urban Furn to bring
            style, comfort, and sustainability into their homes.
          </p>
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#004744] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#003a38] transition"
          >
            Explore Our Collection
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

