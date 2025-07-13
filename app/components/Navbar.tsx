"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiBox,
  FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/app/hooks/useAuth"; // Your custom hook to get user
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contactus" },
  ];

  const { user, loading } = useAuth();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white text-[#004744] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-[#004744]">Urban Furn</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative text-sm font-medium group transition"
              >
                {label}
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#004744] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Favorite Icon with Link */}
            <Link
              href="/favorites"
              aria-label="Favorites"
              passHref
              legacyBehavior
            >
              <motion.a
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="hover:text-[#004744] transition"
              >
                <FiHeart size={20} />
              </motion.a>
            </Link>

            {/* Cart Icon with Link */}
            <Link href="/cart" aria-label="Cart" passHref legacyBehavior>
              <motion.a
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="hover:text-[#004744] transition"
              >
                <FiShoppingCart size={20} />
              </motion.a>
            </Link>

            {/* USER AVATAR or LOGIN BUTTON */}
            {!loading &&
              (user ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.img
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    src={user.photoURL || "/profile.jpg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
                  />

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50"
                      >
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiUser className="mr-2" /> Profile
                        </Link>
                        <Link
                          href="/my-orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiBox className="mr-2" /> My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <FiLogOut className="mr-2" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <button
                    className="bg-[#004744] text-white px-4 py-2 rounded-md hover:bg-[#003737] transition"
                  >
                    Login
                  </button>
                </Link>
              ))}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="focus:outline-none"
              >
                {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 pb-4 pt-2 space-y-4 shadow-md rounded-b-lg"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium relative group transition"
              >
                {label}
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#004744] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
