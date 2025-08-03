'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'

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

export default function TheExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <motion.div
        className="container mx-auto px-4 text-center py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          The SmashLabs Experience
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Dive deep into our unique process, from the moment you step in to the exhilarating release.
        </motion.p>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image Column */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 flex justify-center"
          >
            <Image 
              src="/smashlabs-experience-room.png" 
              alt="SmashLabs Experience Room" 
              width={600} 
              height={400} 
              className="rounded-xl shadow-2xl border border-gray-700 object-cover w-full h-auto"
            />
          </motion.div>

          {/* Content Column */}
          <div className="lg:w-1/2 text-left">
            <motion.div
              variants={containerVariants} // Stagger children for these items too
              className="space-y-8"
            >
              {/* What to Expect */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800 transition-colors duration-300 transform"
              >
                <h3 className="text-3xl font-bold mb-2 text-blue-300 flex items-center">
                  <span className="mr-3 text-3xl">💡</span> 
                  What to Expect
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  A guided journey through our state-of-the-art facility, designed specifically for corporate stress relief and team building.
                </p>
              </motion.div>

              {/* The Process */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800 transition-colors duration-300 transform"
              >
                <h3 className="text-3xl font-bold mb-2 text-purple-300 flex items-center">
                  <span className="mr-3 text-3xl">⚙️</span>
                  The Process
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Professional guidance through safe, controlled stress release activities, tailored to your team's needs.
                </p>
              </motion.div>

              {/* Team Building Elements */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800 transition-colors duration-300 transform"
              >
                <h3 className="text-3xl font-bold mb-2 text-red-300 flex items-center">
                  <span className="mr-3 text-3xl">🤝</span>
                  Team Building Elements
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Strengthen team bonds through shared experiences and collaborative activities.
                </p>
              </motion.div>

              {/* Therapeutic Benefits */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800 transition-colors duration-300 transform"
              >
                <h3 className="text-3xl font-bold mb-2 text-green-300 flex items-center">
                  <span className="mr-3 text-3xl">🧘</span>
                  Therapeutic Benefits
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Experience immediate stress relief and long-term wellness improvements.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
} 