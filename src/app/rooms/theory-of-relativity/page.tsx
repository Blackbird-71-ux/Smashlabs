'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket, FaArrowLeft, FaPlay, FaLightbulb, FaAtom, FaClock, FaUsers, FaTools } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TheoryOfRelativityPage() {
  const features = [
    {
      icon: FaRocket,
      title: 'Gravity-Defying Zones',
      description: 'Experience weightlessness as you smash through space-time'
    },
    {
      icon: FaLightbulb,
      title: 'Time Dilation Effects',
      description: 'LED lighting that warps and bends with your movements'
    },
    {
      icon: FaAtom,
      title: 'Cosmic Debris',
      description: 'Space-themed targets including satellites and asteroids'
    },
    {
      icon: FaTools,
      title: 'Einstein Displays',
      description: 'Interactive physics equations and relativity demonstrations'
    }
  ];

  const physicsEquations = [
    {
      equation: 'E = mc²',
      explanation: 'Energy equals mass times the speed of light squared',
      application: 'Channel your energy into pure destructive force'
    },
    {
      equation: 'F = ma',
      explanation: 'Force equals mass times acceleration',
      application: 'The harder you swing, the more satisfying the impact'
    },
    {
      equation: 't = t₀/√(1-v²/c²)',
      explanation: 'Time dilation formula for objects moving at high speeds',
      application: 'Time slows down when you\'re having maximum fun'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-40" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-50" />

      {/* Back Navigation */}
      <div className="absolute top-8 left-8 z-[60]">
        <Link
          href="/rooms"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-black/60 shadow-lg"
        >
          <FaArrowLeft />
          <span>Back to Rooms</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center shadow-2xl"
          >
            <FaRocket className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          >
            Theory of Relativity
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-300 font-medium mb-8"
          >
            Time Dilates, Stress Accelerates Away
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Step into Einstein's universe where the laws of physics bend to your will. In this cosmic arena, 
            experience the relativity of stress relief as you warp space-time with every swing. Here, 
            E=mc² becomes your mantra of destruction.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
              Book This Universe
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30"
            >
              Compare Realities
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Experience Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Every element designed to immerse you in Einstein's revolutionary universe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Physics Equations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Physics of Destruction
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Learn while you smash - every swing backed by Einstein's revolutionary equations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {physicsEquations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-xl border border-blue-500/30 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-blue-300 mb-2 font-mono">
                    {item.equation}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {item.explanation}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm italic">
                    <span className="text-blue-400 font-semibold">Application:</span> {item.application}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-sm text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Warp Reality?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">45</p>
                  <p className="text-gray-300 text-sm">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1-6</p>
                  <p className="text-gray-300 text-sm">Participants</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <FaRocket className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹3,500</p>
                  <p className="text-gray-300 text-sm">Per Session</p>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/book"
                className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <FaPlay className="mr-3" />
                Book Einstein's Universe
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 