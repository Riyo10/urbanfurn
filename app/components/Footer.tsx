"use client";

import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { motion, Variants } from "framer-motion";

// Framer Motion variant with custom delay
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Social icons with explicit labels
const socialIcons = [
  { Icon: AiOutlineFacebook, label: "Facebook" },
  { Icon: AiOutlineInstagram, label: "Instagram" },
  { Icon: AiOutlineTwitter, label: "Twitter" },
];

export default function Footer() {
  const quickLinks = ["Home", "Shop", "About Us", "Contact", "FAQ"];
  const supportLinks = [
    "Shipping & Returns",
    "Warranty",
    "Payment Options",
    "Order Tracking",
  ];

  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[#004744] text-white py-12 px-6 md:px-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand & Socials */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-bold mb-4">Urban Furn</h3>
          <p className="text-gray-300">
            Crafting stylish, sustainable furniture to transform your home into
            a sanctuary. Quality and comfort meet design.
          </p>
          <div className="flex gap-4 mt-6 text-xl">
            {socialIcons.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                onClick={handlePlaceholderClick}
                aria-label={label}
                className="hover:text-gray-300 focus:text-gray-300 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-gray-300">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  onClick={handlePlaceholderClick}
                  className="hover:text-white focus:text-white transition font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Support Links */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-gray-300">
            {supportLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  onClick={handlePlaceholderClick}
                  className="hover:text-white focus:text-white transition font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Contact + Newsletter */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <p className="flex items-center gap-2 text-gray-300 mb-3">
            <AiOutlinePhone style={{ transform: "scaleX(-1)" }} /> +1 (555)
            123-4567
          </p>
          <p className="flex items-center gap-2 text-gray-300 mb-6">
            <AiOutlineMail /> support@urbanfurn.com
          </p>

          <form className="w-full flex flex-col sm:flex-row sm:items-stretch gap-3">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#004744] focus:border-[#004744] placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-[#004744] font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        className="mt-12 border-t border-gray-600 pt-6 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} Urban Furn. All rights reserved.
      </motion.div>
    </footer>
  );
}
