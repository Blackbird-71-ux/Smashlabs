'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket, FaPlay, FaLightbulb, FaAtom, FaClock, FaUsers, FaTools } from 'react-icons/fa';

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
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cosmic Starfield Background */}
      <div className="absolute inset-0 bg-black">
        {/* Large Stars */}
        <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-white rounded-full animate-pulse opacity-90" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[20%] left-[15%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse opacity-80" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[8%] left-[25%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse opacity-85" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-[30%] left-[35%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-75" style={{ animationDuration: '3.5s' }}></div>
        <div className="absolute top-[15%] left-[45%] w-1 h-1 bg-blue-100 rounded-full animate-pulse opacity-90" style={{ animationDuration: '2.8s' }}></div>
        <div className="absolute top-[25%] left-[55%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-70" style={{ animationDuration: '4.2s' }}></div>
        <div className="absolute top-[35%] left-[65%] w-1 h-1 bg-yellow-200 rounded-full animate-pulse opacity-85" style={{ animationDuration: '3.2s' }}></div>
        <div className="absolute top-[5%] left-[75%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-80" style={{ animationDuration: '2.7s' }}></div>
        <div className="absolute top-[18%] left-[85%] w-1 h-1 bg-blue-200 rounded-full animate-pulse opacity-75" style={{ animationDuration: '3.8s' }}></div>
        <div className="absolute top-[28%] left-[95%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-90" style={{ animationDuration: '2.3s' }}></div>
        
        {/* Medium Stars */}
        <div className="absolute top-[45%] left-[8%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60" style={{ animationDuration: '4.5s' }}></div>
        <div className="absolute top-[55%] left-[18%] w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse opacity-70" style={{ animationDuration: '3.3s' }}></div>
        <div className="absolute top-[65%] left-[28%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse opacity-80" style={{ animationDuration: '2.9s' }}></div>
        <div className="absolute top-[75%] left-[38%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65" style={{ animationDuration: '4.1s' }}></div>
        <div className="absolute top-[85%] left-[48%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse opacity-75" style={{ animationDuration: '3.6s' }}></div>
        <div className="absolute top-[40%] left-[58%] w-1 h-1 bg-white rounded-full animate-pulse opacity-85" style={{ animationDuration: '2.4s' }}></div>
        <div className="absolute top-[60%] left-[68%] w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse opacity-70" style={{ animationDuration: '3.9s' }}></div>
        <div className="absolute top-[70%] left-[78%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-80" style={{ animationDuration: '2.6s' }}></div>
        <div className="absolute top-[80%] left-[88%] w-1 h-1 bg-blue-100 rounded-full animate-pulse opacity-75" style={{ animationDuration: '4.3s' }}></div>
        <div className="absolute top-[90%] left-[98%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-85" style={{ animationDuration: '3.1s' }}></div>
        
        {/* Small Distant Stars */}
        <div className="absolute top-[12%] left-[12%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-[22%] left-[22%] w-0.5 h-0.5 bg-blue-100 rounded-full opacity-35"></div>
        <div className="absolute top-[32%] left-[32%] w-0.5 h-0.5 bg-white rounded-full opacity-45"></div>
        <div className="absolute top-[42%] left-[42%] w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-40"></div>
        <div className="absolute top-[52%] left-[52%] w-0.5 h-0.5 bg-white rounded-full opacity-35"></div>
        <div className="absolute top-[62%] left-[62%] w-0.5 h-0.5 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute top-[72%] left-[72%] w-0.5 h-0.5 bg-white rounded-full opacity-45"></div>
        <div className="absolute top-[82%] left-[82%] w-0.5 h-0.5 bg-white rounded-full opacity-35"></div>
        <div className="absolute top-[92%] left-[92%] w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-40"></div>
        
        {/* Additional Random Stars */}
        <div className="absolute top-[3%] left-[60%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-[37%] left-[7%] w-0.5 h-0.5 bg-blue-100 rounded-full opacity-45"></div>
        <div className="absolute top-[47%] left-[93%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-[67%] left-[13%] w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-50"></div>
        <div className="absolute top-[77%] left-[43%] w-0.5 h-0.5 bg-white rounded-full opacity-35"></div>
        <div className="absolute top-[87%] left-[23%] w-0.5 h-0.5 bg-blue-200 rounded-full opacity-45"></div>
        <div className="absolute top-[97%] left-[73%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-[13%] left-[83%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-[23%] left-[53%] w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-35"></div>
        <div className="absolute top-[33%] left-[73%] w-0.5 h-0.5 bg-white rounded-full opacity-45"></div>
        
        {/* Cosmic Dust/Nebula Effect */}
        <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-gradient-to-br from-purple-900/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-[30%] left-[5%] w-40 h-40 bg-gradient-to-tr from-blue-900/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-[60%] right-[25%] w-24 h-24 bg-gradient-to-bl from-indigo-900/10 to-transparent rounded-full blur-xl"></div>
      </div>
      
      {/* Interstellar Blackhole Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-95 z-0">
        {/* Outer Gravitational Field with Golden Glow */}
        <div className="absolute inset-0 rounded-full animate-pulse"
             style={{
               background: 'radial-gradient(circle, transparent 65%, rgba(251, 146, 60, 0.3) 75%, rgba(245, 158, 11, 0.4) 85%, transparent 95%)',
               boxShadow: '0 0 300px rgba(251, 146, 60, 0.8), 0 0 500px rgba(245, 158, 11, 0.6)',
               animationDuration: '5s'
             }}>
        </div>
        
        {/* Accretion Disk - Outer Ring (Golden/Orange) */}
        <div className="absolute inset-0 rounded-full animate-spin" 
             style={{
               background: 'conic-gradient(from 0deg, transparent, rgba(251, 146, 60, 0.9), rgba(245, 158, 11, 1), rgba(217, 119, 6, 0.9), rgba(251, 191, 36, 0.8), transparent)',
               boxShadow: '0 0 150px rgba(251, 146, 60, 0.9), inset 0 0 80px rgba(245, 158, 11, 0.7)',
               animationDuration: '25s'
             }}>
        </div>
        
        {/* Accretion Disk - Middle Ring (Bright Golden) */}
        <div className="absolute inset-8 rounded-full animate-spin" 
             style={{
               background: 'conic-gradient(from 180deg, transparent, rgba(245, 158, 11, 1), rgba(251, 191, 36, 1), rgba(254, 240, 138, 0.9), rgba(217, 119, 6, 0.9), transparent)',
               boxShadow: '0 0 120px rgba(245, 158, 11, 1), inset 0 0 60px rgba(251, 191, 36, 0.8)',
               animationDuration: '18s'
             }}>
        </div>
        
        {/* Accretion Disk - Inner Ring (Brilliant White-Gold) */}
        <div className="absolute inset-16 rounded-full animate-spin" 
             style={{
               background: 'conic-gradient(from 90deg, transparent, rgba(254, 240, 138, 1), rgba(255, 255, 255, 0.9), rgba(251, 191, 36, 1), rgba(245, 158, 11, 0.9), transparent)',
               boxShadow: '0 0 100px rgba(254, 240, 138, 1), inset 0 0 50px rgba(255, 255, 255, 0.8)',
               animationDuration: '12s'
             }}>
        </div>
        
        {/* Photon Sphere (Bright Golden Ring) */}
        <div className="absolute inset-20 rounded-full animate-pulse" 
             style={{
               background: 'radial-gradient(circle, transparent 85%, rgba(255, 255, 255, 0.9) 90%, rgba(254, 240, 138, 1) 95%, transparent 100%)',
               boxShadow: '0 0 80px rgba(255, 255, 255, 0.9), 0 0 120px rgba(254, 240, 138, 0.8)',
               animationDuration: '3s'
             }}>
        </div>
        
        {/* Event Horizon with Golden Edge */}
        <div className="absolute inset-28 rounded-full" 
             style={{
               background: 'radial-gradient(circle, transparent 15%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.95) 45%, black 55%)',
               boxShadow: '0 0 120px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(0, 0, 0, 0.98), 0 0 200px rgba(245, 158, 11, 0.6)'
             }}>
        </div>
        
        {/* Inner Shadow Ring */}
        <div className="absolute inset-32 rounded-full" 
             style={{
               background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,1) 40%, transparent 60%)',
               boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 1)'
             }}>
        </div>
        
        {/* Gravitational Lensing Effects */}
        <div className="absolute inset-36 rounded-full animate-pulse"
             style={{
               background: 'radial-gradient(circle, transparent 40%, rgba(251, 191, 36, 0.4) 50%, transparent 60%)',
               boxShadow: '0 0 60px rgba(251, 191, 36, 0.5)',
               animationDuration: '4s'
             }}>
        </div>
        
        {/* Secondary Lensing Ring */}
        <div className="absolute inset-40 rounded-full animate-pulse"
             style={{
               background: 'radial-gradient(circle, transparent 30%, rgba(254, 240, 138, 0.3) 40%, transparent 50%)',
               boxShadow: '0 0 40px rgba(254, 240, 138, 0.4)',
               animationDuration: '2.5s'
             }}>
        </div>
        
        {/* Hawking Radiation (Golden Sparkles) */}
        <div className="absolute inset-44 rounded-full animate-pulse"
             style={{
               background: 'radial-gradient(circle, transparent 20%, rgba(255, 255, 255, 0.5) 30%, transparent 40%)',
               boxShadow: '0 0 30px rgba(255, 255, 255, 0.7)',
               animationDuration: '1.8s'
             }}>
        </div>
      </div>
      
      {/* Floating Space Particles */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-blue-400 rounded-full animate-pulse opacity-80 z-10" />
      <div className="absolute top-40 right-20 w-10 h-10 bg-purple-400 rounded-full animate-bounce opacity-70 z-10" />
      <div className="absolute bottom-40 left-20 w-6 h-6 bg-indigo-400 rounded-full animate-ping opacity-80 z-10" />
      <div className="absolute top-60 right-40 w-4 h-4 bg-blue-300 rounded-full animate-pulse opacity-90 z-10" />
      <div className="absolute bottom-60 left-40 w-8 h-8 bg-purple-300 rounded-full animate-bounce opacity-70 z-10" />
      



      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center shadow-2xl relative z-30"
          >
            <FaRocket className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative z-30"
          >
            Theory of Relativity
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-300 font-medium mb-8 relative z-30"
          >
            Time Dilates, Stress Accelerates Away
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed relative z-30"
          >
            Step into Einstein's universe where the laws of physics bend to your will. In this cosmic arena, 
            experience the relativity of stress relief as you warp space-time with every swing. Here, 
            E=mc² becomes your mantra of destruction.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-30"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Experience Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Every element designed to immerse you in Einstein's revolutionary universe
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
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Physics of Destruction
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Learn while you smash - every swing backed by Einstein's revolutionary equations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-sm text-center relative z-30"
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
                  <p className="text-2xl font-bold text-white">1-4</p>
                  <p className="text-gray-300 text-sm">People</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FaLightbulb className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹3,500</p>
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
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Book This Universe
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