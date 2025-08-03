'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <motion.div
        className="container mx-auto px-4 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={cardVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          What Our Clients Say
        </motion.h1>
        <motion.p
          variants={cardVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Hear directly from corporate leaders and teams who have experienced the transformative power of SmashLabs.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Testimonial 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300"
          >
            <div className="text-center mb-4">
              <span className="text-5xl text-yellow-400">“</span>
            </div>
            <p className="text-gray-300 italic text-lg mb-4 leading-relaxed text-center">
              "SmashLabs transformed our team's dynamics. The stress relief experience
              was exactly what we needed and exceeded our expectations."
            </p>
            <p className="font-bold text-lg bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
              - Sarah M., HR Director
            </p>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300"
          >
            <div className="text-center mb-4">
              <span className="text-5xl text-blue-400">“</span>
            </div>
            <p className="text-gray-300 italic text-lg mb-4 leading-relaxed text-center">
              "An innovative approach to corporate wellness. Our
              team left feeling refreshed, reconnected, and highly motivated."
            </p>
            <p className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              - Michael R., CEO
            </p>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300"
          >
            <div className="text-center mb-4">
              <span className="text-5xl text-purple-400">“</span>
            </div>
            <p className="text-gray-300 italic text-lg mb-4 leading-relaxed text-center">
              "The perfect blend of stress relief and team
              building. Highly recommended for any
              corporate team looking for something truly unique."
            </p>
            <p className="font-bold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              - Lian K., Team Lead
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
} 