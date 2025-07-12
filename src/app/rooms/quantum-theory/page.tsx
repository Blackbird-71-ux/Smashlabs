'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaAtom, FaArrowLeft, FaPlay, FaLightbulb, FaChartLine, FaClock, FaUsers, FaFlask } from 'react-icons/fa';

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

export default function QuantumTheoryPage() {
  const features = [
    {
      icon: FaAtom,
      title: 'Quantum Entanglement Targets',
      description: 'Paired objects that react simultaneously when destroyed'
    },
    {
      icon: FaChartLine,
      title: 'Probability Wave Effects',
      description: 'Visual representations of quantum wave functions'
    },
    {
      icon: FaLightbulb,
      title: 'Particle Accelerator Sounds',
      description: 'Authentic audio from real particle physics experiments'
    },
    {
      icon: FaFlask,
      title: 'Heisenberg Uncertainty Chamber',
      description: 'Interactive displays showing quantum uncertainty principles'
    }
  ];

  const quantumConcepts = [
    {
      concept: 'Wave-Particle Duality',
      symbol: '∿ ● ∿',
      explanation: 'Matter exhibits both wave and particle properties',
      application: 'Your stress wave collapses into destroyed particles'
    },
    {
      concept: 'Uncertainty Principle',
      symbol: 'ΔE×Δt ≥ ℏ/2',
      explanation: 'Position and momentum cannot be simultaneously measured',
      application: 'You cannot know stress and relaxation at the same time'
    },
    {
      concept: 'Quantum Superposition',
      symbol: '|ψ⟩ = α|0⟩ + β|1⟩',
      explanation: 'Particles exist in multiple states until observed',
      application: 'Your stress exists in all states until you smash it'
    }
  ];

  const quantumEffects = [
    'Schrödinger\'s breakable boxes - simultaneously broken and intact until observed',
    'Quantum tunneling obstacles that appear and disappear',
    'Double-slit projection showing wave interference patterns',
    'Particle decay animations when objects are destroyed',
    'Quantum foam bubbles that pop with subatomic satisfaction',
    'Entangled target pairs that break in mysterious correlation'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Floating Quantum Particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-50" />
      <div className="absolute top-60 right-40 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-30" />

      {/* Back Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/rooms"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 hover:border-white/20"
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
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-2xl"
          >
            <FaAtom className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text"
          >
            Quantum Theory
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-green-300 font-medium mb-8"
          >
            Uncertainty Principle: Destroy Everything
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Enter the quantum realm where possibilities are infinite and destruction is probable. 
            Watch as your stress collapses into pure satisfaction in this subatomic smashing experience. 
            Here, the act of observation changes everything - including your mood.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-700 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
              Collapse the Wave Function
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30"
            >
              Explore Other Dimensions
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
              Quantum Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience the strange and wonderful world of quantum mechanics
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
                className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
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

      {/* Quantum Concepts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Quantum Mechanics of Stress Relief
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Harness the power of quantum physics to achieve unprecedented relaxation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quantumConcepts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-8 rounded-xl border border-green-500/30 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-green-300 mb-2">
                    {item.concept}
                  </h3>
                  <p className="text-3xl font-bold text-green-300 mb-2 font-mono">
                    {item.symbol}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {item.explanation}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm italic">
                    <span className="text-green-400 font-semibold">Application:</span> {item.application}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantum Effects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Quantum Effects You'll Experience
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Witness the strange phenomena of the quantum world while you smash
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quantumEffects.map((effect, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {effect}
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
            className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 p-8 rounded-2xl border border-green-500/30 backdrop-blur-sm text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Enter the Quantum Realm?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">50</p>
                  <p className="text-gray-300 text-sm">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1-8</p>
                  <p className="text-gray-300 text-sm">Participants</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <FaAtom className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹4,000</p>
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
                className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-700 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <FaPlay className="mr-3" />
                Quantum Leap Into Relaxation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 