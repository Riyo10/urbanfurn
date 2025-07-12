'use client';

import {
  MdShoppingCart,
  MdLocalShipping,
  MdSupportAgent,
  MdVerifiedUser,
} from 'react-icons/md';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <MdShoppingCart className="text-3xl text-[#004744]" />,
    text: 'Easy for Shopping',
  },
  {
    icon: <MdLocalShipping className="text-3xl text-[#004744]" />,
    text: 'Fast & Free Shipping',
  },
  {
    icon: <MdSupportAgent className="text-3xl text-[#004744]" />,
    text: '24×7 Support',
  },
  {
    icon: <MdVerifiedUser className="text-3xl text-[#004744]" />,
    text: 'Money Back Guarantee',
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-12">
      {/* Top: Feature Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: idx * 0.15,
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#f7f7f7] rounded-xl text-center p-6 shadow-sm hover:shadow-md transition h-36 flex flex-col items-center justify-center space-y-2 cursor-default"
          >
            {feature.icon}
            <p className="text-sm font-medium text-[#004744]">{feature.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom: About Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-xl overflow-hidden shadow-sm bg-white flex items-center justify-center"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            src="/3365999c.png"
            alt="About Us"
            className="w-full max-w-full max-h-[300px] h-auto object-contain transition-transform"
          />
          <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-md">
            <p className="text-[#004744] text-sm italic">
              ~ Enjoy your tea with our furniture
            </p>
          </div>
        </motion.div>

        {/* Text Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-[#f7f7f7] rounded-xl p-8 shadow-sm flex flex-col justify-center h-full"
        >
          <h3 className="text-2xl font-bold text-[#004744] mb-3">Who We Are</h3>
          <p className="text-sm text-gray-700 mb-4">
            At Furnivo, we craft furniture that brings style, comfort, and soul
            into your space. Designed for modern living, built to last.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="self-start bg-[#004744] text-white px-5 py-2 rounded-md hover:bg-[#003a38] transition"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
