'use client';

import { useState, useRef } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

const reviewsData = [
  {
    id: 1,
    name: 'Emily R.',
    rating: 5,
    date: '2025-06-20',
    comment:
      'Absolutely love this sofa! Comfortable and looks amazing in my living room.',
    photos: [],
  },
  {
    id: 2,
    name: 'Michael T.',
    rating: 4,
    date: '2025-06-15',
    comment:
      'Great quality for the price. The color matched perfectly with my decor.',
    photos: [],
  },
  {
    id: 3,
    name: 'Sophie L.',
    rating: 5,
    date: '2025-06-10',
    comment:
      'Delivery was quick and the customer service was fantastic. Highly recommend!',
    photos: [],
  },
  {
    id: 4,
    name: 'James K.',
    rating: 4,
    date: '2025-06-12',
    comment:
      'Solid build, stylish look, and exactly as shown. Happy with the purchase.',
    photos: [],
  },
  {
    id: 5,
    name: 'Nina A.',
    rating: 5,
    date: '2025-06-05',
    comment:
      'Premium quality materials used. It really feels like a luxury product!',
    photos: [],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-[#004744]">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <AiFillStar key={i} className="text-lg" />
        ) : (
          <AiOutlineStar key={i} className="text-lg" />
        )
      )}
    </div>
  );
}

function ReviewComment({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 150;

  return (
    <p className="text-gray-700 text-sm">
      {expanded || !isLong ? text : `${text.slice(0, 150)}...`}
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="ml-1 text-[#004744] font-medium"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </p>
  );
}

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:px-12 relative">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-[#004744] mb-8"
      >
        Customer Reviews & Testimonials
      </motion.h1>

      {/* Scroll Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 scroll-smooth scrollbar-hide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {reviewsData.map(({ id, name, rating, date, comment, photos }) => (
          <motion.div
            key={id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-4 transition hover:bg-gray-50 min-w-[240px] max-w-[280px] snap-start flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <StarRating rating={rating} />
            <ReviewComment text={comment} />
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString('en-GB')}
            </p>

            {photos.length > 0 && (
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {photos.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Review photo ${idx + 1} by ${name}`}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0 snap-start"
                  />
                ))}
              </div>
            )}

            <p className="font-semibold text-[#004744] mt-auto text-sm">
              {name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Arrows */}
      <motion.div
        className="flex justify-center gap-4 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={() => scroll('left')}
          className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll Left"
        >
          <IoIosArrowBack size={24} className="text-[#004744]" />
        </motion.button>

        <motion.button
          onClick={() => scroll('right')}
          className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll Right"
        >
          <IoIosArrowForward size={24} className="text-[#004744]" />
        </motion.button>
      </motion.div>
    </section>
  );
}

