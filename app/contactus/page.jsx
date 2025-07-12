'use client';

import { motion } from 'framer-motion';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
} from 'react-icons/ai';

export default function ContactUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 md:px-12 text-[#004744]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          Have questions or need help? We'd love to hear from you. Reach out to
          us using the form below or through the contact details provided.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Message sent! (Form submission not implemented)');
          }}
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#004744] focus:outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#004744] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#004744] focus:outline-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          {/* Button aligned right */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#004744] text-white px-6 py-3 rounded-md hover:bg-[#003a38] font-semibold transition"
            >
              Send Message
            </button>
          </div>
        </motion.form>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="flex items-start gap-4">
            <AiOutlinePhone className="text-2xl text-[#004744] transform scale-x-[-1]" />
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <AiOutlineMail className="text-2xl text-[#004744]" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-700">support@urbanfurn.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <AiOutlineEnvironment className="text-2xl text-[#004744]" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-700">
                123 Greenway Blvd, Suite 200<br />
                Eco City, CA 90001
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
