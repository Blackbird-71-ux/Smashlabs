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
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Deep Space Laboratory Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 opacity-80 z-0" />
      
      {/* Laboratory Grid Pattern */}
      <div className="absolute inset-0 opacity-10 z-0"
           style={{
             backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} />
      
      {/* Particle Accelerator Ring - CERN Style */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        {/* Outer Containment Ring */}
        <div className="absolute inset-0 rounded-full border-4 animate-pulse opacity-80" 
             style={{ 
               borderColor: 'rgba(59, 130, 246, 0.8)',
               boxShadow: '0 0 150px rgba(59, 130, 246, 0.6), 0 0 300px rgba(99, 102, 241, 0.4), inset 0 0 100px rgba(59, 130, 246, 0.2)',
               animationDuration: '4s' 
             }}>
        </div>
        
        {/* Main Accelerator Ring */}
        <div className="absolute inset-12 rounded-full border-8 animate-pulse" 
             style={{ 
               borderColor: 'rgba(147, 197, 253, 0.9)',
               background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(147, 197, 253, 0.5), rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3))',
               boxShadow: '0 0 200px rgba(59, 130, 246, 0.8), 0 0 400px rgba(147, 197, 253, 0.6), inset 0 0 150px rgba(59, 130, 246, 0.3)',
               animationDuration: '3s' 
             }}>
          
          {/* High-Energy Beam - Horizontal */}
          <div className="absolute top-1/2 left-0 right-0 h-4 animate-pulse transform -translate-y-1/2"
               style={{ 
                 background: 'linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.9), rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.9), transparent)',
                 boxShadow: '0 0 50px rgba(147, 197, 253, 1), 0 0 100px rgba(59, 130, 246, 0.8)',
                 animationDuration: '2s' 
               }}>
          </div>
          
          {/* High-Energy Beam - Vertical */}
          <div className="absolute left-1/2 top-0 bottom-0 w-4 animate-pulse transform -translate-x-1/2"
               style={{ 
                 background: 'linear-gradient(180deg, transparent, rgba(147, 197, 253, 0.9), rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.9), transparent)',
                 boxShadow: '0 0 50px rgba(147, 197, 253, 1), 0 0 100px rgba(59, 130, 246, 0.8)',
                 animationDuration: '2.5s' 
               }}>
          </div>
          
          {/* Ultra-High Energy Particles */}
          <div className="absolute inset-8 rounded-full animate-spin" style={{ animationDuration: '0.7s' }}>
            {/* Particle 1 */}
            <div className="absolute top-0 left-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 animate-pulse" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.6))',
                   boxShadow: '0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(147, 197, 253, 0.8), 0 0 120px rgba(59, 130, 246, 0.6)',
                   animationDuration: '0.5s'
                 }}>
            </div>
            {/* Particle 2 */}
            <div className="absolute right-0 top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2 animate-pulse" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(99, 102, 241, 0.9), rgba(59, 130, 246, 0.6))',
                   boxShadow: '0 0 30px rgba(147, 197, 253, 1), 0 0 60px rgba(99, 102, 241, 0.8), 0 0 90px rgba(59, 130, 246, 0.6)',
                   animationDuration: '0.7s'
                 }}>
            </div>
            {/* Particle 3 */}
            <div className="absolute bottom-0 left-1/2 w-7 h-7 rounded-full transform -translate-x-1/2 animate-pulse" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.6))',
                   boxShadow: '0 0 35px rgba(255, 255, 255, 1), 0 0 70px rgba(147, 197, 253, 0.8), 0 0 105px rgba(59, 130, 246, 0.6)',
                   animationDuration: '0.6s'
                 }}>
            </div>
            {/* Particle 4 */}
            <div className="absolute left-0 top-1/2 w-8 h-8 rounded-full transform -translate-y-1/2 animate-pulse" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(99, 102, 241, 0.9), rgba(59, 130, 246, 0.6))',
                   boxShadow: '0 0 40px rgba(147, 197, 253, 1), 0 0 80px rgba(99, 102, 241, 0.8), 0 0 120px rgba(59, 130, 246, 0.6)',
                   animationDuration: '0.8s'
                 }}>
            </div>
          </div>
          
          {/* Hyper-Speed Inner Ring */}
          <div className="absolute inset-20 rounded-full animate-spin" style={{ animationDuration: '1.3s' }}>
            {/* Hyper Particle 1 */}
            <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 animate-ping" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.8))',
                   boxShadow: '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(147, 197, 253, 0.9)',
                   animationDuration: '0.9s'
                 }}>
            </div>
            {/* Hyper Particle 2 */}
            <div className="absolute right-0 top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 animate-ping" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(99, 102, 241, 0.8))',
                   boxShadow: '0 0 25px rgba(147, 197, 253, 1), 0 0 50px rgba(99, 102, 241, 0.9)',
                   animationDuration: '1.1s'
                 }}>
            </div>
            {/* Hyper Particle 3 */}
            <div className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 animate-ping" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.8))',
                   boxShadow: '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(147, 197, 253, 0.9)',
                   animationDuration: '1.0s'
                 }}>
            </div>
            {/* Hyper Particle 4 */}
            <div className="absolute left-0 top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 animate-ping" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(99, 102, 241, 0.8))',
                   boxShadow: '0 0 25px rgba(147, 197, 253, 1), 0 0 50px rgba(99, 102, 241, 0.9)',
                   animationDuration: '1.2s'
                 }}>
            </div>
          </div>
        </div>
        
        {/* Electromagnetic Field Visualization */}
        <div className="absolute inset-24 rounded-full border-4 animate-pulse opacity-70" 
             style={{ 
               borderColor: 'rgba(147, 197, 253, 0.8)',
               background: 'radial-gradient(circle, transparent 60%, rgba(59, 130, 246, 0.2) 80%, transparent 100%)',
               boxShadow: '0 0 100px rgba(59, 130, 246, 0.7), inset 0 0 50px rgba(147, 197, 253, 0.5)',
               animationDuration: '3.5s' 
             }}>
        </div>
        
        {/* Central Collision Chamber */}
        <div className="absolute inset-36 rounded-full border-2 animate-pulse" 
             style={{ 
               borderColor: 'rgba(255, 255, 255, 0.9)',
               background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(147, 197, 253, 0.3), transparent)',
               boxShadow: '0 0 80px rgba(255, 255, 255, 0.8), 0 0 160px rgba(147, 197, 253, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.4)',
               animationDuration: '2.2s' 
             }}>
        </div>
        
        {/* Energy Discharge Effects */}
        <div className="absolute inset-0 rounded-full animate-pulse opacity-60" 
             style={{ 
               background: 'conic-gradient(from 0deg, transparent, rgba(147, 197, 253, 0.4), transparent, rgba(59, 130, 246, 0.4), transparent)',
               animationDuration: '6s' 
             }}>
        </div>
      </div>
      
      {/* Laboratory Ambient Lighting */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 z-0">
        {/* Top Laboratory Lights */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '3s' }}>
        </div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }}>
        </div>
        <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse transform -translate-x-1/2" 
             style={{ animationDuration: '5s' }}>
        </div>
      </div>

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

      {/* Content sections with enhanced z-index */}
      <div className="relative z-20">

        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-blue-500/20 rounded-full backdrop-blur-md">
                <FaAtom className="text-blue-400 text-2xl" />
                <span className="text-blue-100 font-medium">Quantum Physics Laboratory</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
                Quantum Theory
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Harness the power of quantum mechanics to obliterate your stress at the subatomic level. 
                Experience the uncertainty principle where your anxiety exists and doesn't exist simultaneously.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                href="/book"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
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
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Quantum Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience the strange and wonderful world of quantum mechanics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-30">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
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
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Quantum Mechanics of Stress Relief
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Harness the power of quantum physics to achieve unprecedented relaxation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
            {quantumConcepts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-8 rounded-xl border border-blue-500/30 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-2">
                    {item.concept}
                  </h3>
                  <p className="text-3xl font-bold text-blue-300 mb-2 font-mono">
                    {item.symbol}
                  </p>
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

      {/* Quantum Effects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Quantum Effects You'll Experience
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Witness the strange phenomena of the quantum world while you smash
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-30">
            {quantumEffects.map((effect, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-sm text-center relative z-30"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Enter the Quantum Realm?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">50</p>
                  <p className="text-gray-300 text-sm">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1-4</p>
                  <p className="text-gray-300 text-sm">People</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FaLightbulb className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹4,000</p>
                  <p className="text-gray-300 text-sm">Per Session</p>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/book"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
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
        </div>
      </section>
    </main>
  );
} 