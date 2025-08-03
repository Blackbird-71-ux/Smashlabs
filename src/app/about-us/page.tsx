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

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
      <motion.div
        className="container mx-auto px-4 max-w-4xl py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          About SmashLabs
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          SmashLabs is at the forefront of corporate wellness, offering a revolutionary approach to stress relief and team cohesion. 
          Our state-of-the-art facilities provide a safe, exhilarating environment for professionals to unleash tension and foster stronger connections. 
          Founded on the principle that a healthy mind leads to a thriving workplace, we are committed to delivering unique experiences that empower individuals and elevate team dynamics.
        </motion.p>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
        >
          Our Story
        </motion.button>
      </motion.div>
    </main>
  );
} 