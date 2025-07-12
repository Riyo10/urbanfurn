"use client";

import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    category: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping typically takes 5-7 business days. We provide tracking info once your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within the United States. We plan to expand soon.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "You can return items within 30 days of delivery for a full refund, provided they are in original condition.",
      },
      {
        question: "How do I exchange a product?",
        answer:
          "Contact our support team to initiate an exchange. We'll guide you through the process.",
      },
    ],
  },
  {
    category: "Care Guides",
    items: [
      {
        question: "How do I care for wooden furniture?",
        answer:
          "Use a soft, damp cloth to clean. Avoid harsh chemicals. Apply wood polish every 6 months.",
      },
      {
        question: "How do I maintain upholstery?",
        answer:
          "Vacuum regularly and clean spills immediately with a clean cloth. Professional cleaning is recommended annually.",
      },
    ],
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex justify-between items-center text-left text-[#003d33] font-medium text-base md:text-lg hover:text-[#00695c] transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="ml-4 text-2xl text-[#00695c]">
          {open ? <FiX /> : <FiChevronDown />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 px-2 pb-5 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQHelpCenter() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <motion.h1
        className="text-4xl font-bold text-[#003d33] mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        FAQ / Help Center
      </motion.h1>

      {faqData.map(({ category, items }) => {
        const isOpen = openCategory === category;

        return (
          <motion.div
            key={category}
            className="mb-8 rounded-lg border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex justify-between items-center px-4 py-4 text-left text-[#004d40] font-medium text-xl md:text-2xl hover:bg-gray-100 transition-colors rounded-t-lg"
            >
              <span>{category}</span>
              <span className="text-2xl text-[#00695c]">
                {isOpen ? <FiX /> : <FiChevronDown />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="divide-y divide-gray-200 px-4 pb-4 overflow-hidden"
                >
                  {items.map(({ question, answer }, idx) => (
                    <FaqItem key={idx} question={question} answer={answer} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </section>
  );
}
