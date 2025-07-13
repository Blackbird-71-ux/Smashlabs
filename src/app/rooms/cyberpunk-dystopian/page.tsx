'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMicrochip, FaPlay, FaLightbulb, FaEye, FaClock, FaUsers, FaCog, FaTv, FaSignal } from 'react-icons/fa';

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

export default function CyberpunkDystopianPage() {
  const features = [
    {
      icon: FaTv,
      title: 'Holographic Displays',
      description: 'Smash through corporate advertisements and digital propaganda'
    },
    {
      icon: FaEye,
      title: 'AR Destruction Interface',
      description: 'Augmented reality overlays enhance your rebellion experience'
    },
    {
      icon: FaSignal,
      title: 'Neural Link Soundscapes',
      description: 'Immersive cyberpunk soundtrack with synthetic beats'
    },
    {
      icon: FaCog,
      title: 'Corporate Drone Targets',
      description: 'Smash the symbols of digital oppression and surveillance'
    }
  ];

  const cyberpunkLaws = [
    {
      law: 'Ohm\'s Law',
      formula: 'V = I × R',
      explanation: 'Voltage equals current times resistance',
      application: 'Overcome corporate resistance with maximum voltage destruction'
    },
    {
      law: 'Moore\'s Law',
      formula: '2^n = Progress',
      explanation: 'Computing power doubles every two years',
      application: 'Your stress relief efficiency doubles with each swing'
    },
    {
      law: 'Metcalfe\'s Law',
      formula: 'Value ∝ n²',
      explanation: 'Network value grows with connected users squared',
      application: 'Team smashing creates exponential satisfaction'
    }
  ];

  const cyberpunkElements = [
    'Neon-lit corporate logos ready for systematic destruction',
    'Matrix-style code rain that glitches when you make contact',
    'Holographic CEOs that shatter into digital fragments',
    'Surveillance cameras that spark and smoke when smashed',
    'Corporate motivational posters that burn with satisfaction',
    'Digital screens showing stock prices that crash literally',
    'Synthetic chrome targets that reflect your rebellion',
    'Cybernetic enhancement stations for maximum impact'
  ];

  const hackingQuotes = [
    '"The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion." - Albert Camus',
    '"Information wants to be free." - Stewart Brand',
    '"Your scientists were so preoccupied with whether they could, they didn\'t stop to think if they should." - Ian Malcolm'
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Blade Runner 2049 Atmospheric Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-slate-950 opacity-90 z-0" />
      
      {/* Ambient Smog and Haze */}
      <div className="absolute inset-0 opacity-20 z-0"
           style={{
             background: 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.3) 0%, rgba(239, 68, 68, 0.2) 30%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)'
           }} />
      
      {/* Massive Dystopian Cityscape */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-0">
        <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black/100 via-black/80 to-transparent">
          
          {/* Massive Corporate Towers */}
          <div className="absolute bottom-0 left-0 w-32 h-72 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-orange-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(251, 146, 60, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(251, 146, 60, 0.6), inset 0 0 50px rgba(251, 146, 60, 0.2)' 
               }}>
            {/* Corporate Windows */}
            <div className="absolute bottom-16 left-4 w-6 h-6 bg-orange-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(251, 146, 60, 0.9), 0 0 50px rgba(251, 146, 60, 0.6)' }}>
            </div>
            <div className="absolute bottom-32 left-8 w-6 h-6 bg-amber-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(245, 158, 11, 0.9), 0 0 50px rgba(245, 158, 11, 0.6)' }}>
            </div>
            <div className="absolute bottom-48 left-12 w-6 h-6 bg-orange-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(251, 146, 60, 0.9), 0 0 50px rgba(251, 146, 60, 0.6)' }}>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-28 w-40 h-80 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-blue-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(59, 130, 246, 0.6), inset 0 0 50px rgba(59, 130, 246, 0.2)' 
               }}>
            {/* Blue Corporate Windows */}
            <div className="absolute bottom-20 left-6 w-6 h-6 bg-blue-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(59, 130, 246, 0.9), 0 0 50px rgba(59, 130, 246, 0.6)' }}>
            </div>
            <div className="absolute bottom-36 left-12 w-6 h-6 bg-cyan-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(34, 211, 238, 0.9), 0 0 50px rgba(34, 211, 238, 0.6)' }}>
            </div>
            <div className="absolute bottom-52 left-8 w-6 h-6 bg-blue-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(59, 130, 246, 0.9), 0 0 50px rgba(59, 130, 246, 0.6)' }}>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-64 w-28 h-64 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-red-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(239, 68, 68, 0.6), inset 0 0 50px rgba(239, 68, 68, 0.2)' 
               }}>
            {/* Red Warning Windows */}
            <div className="absolute bottom-12 left-4 w-6 h-6 bg-red-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(239, 68, 68, 0.9), 0 0 50px rgba(239, 68, 68, 0.6)' }}>
            </div>
            <div className="absolute bottom-28 left-8 w-6 h-6 bg-red-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(239, 68, 68, 0.9), 0 0 50px rgba(239, 68, 68, 0.6)' }}>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-48 h-88 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-orange-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(251, 146, 60, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(251, 146, 60, 0.6), inset 0 0 50px rgba(251, 146, 60, 0.2)' 
               }}>
            {/* Massive Corporate Sign */}
            <div className="absolute bottom-64 left-8 w-32 h-4 bg-orange-500 animate-pulse" 
                 style={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.9), 0 0 80px rgba(251, 146, 60, 0.6)' }}>
            </div>
            <div className="absolute bottom-24 left-12 w-6 h-6 bg-amber-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(245, 158, 11, 0.9), 0 0 50px rgba(245, 158, 11, 0.6)' }}>
            </div>
            <div className="absolute bottom-40 left-16 w-6 h-6 bg-orange-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(251, 146, 60, 0.9), 0 0 50px rgba(251, 146, 60, 0.6)' }}>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-44 w-36 h-76 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-blue-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(59, 130, 246, 0.6), inset 0 0 50px rgba(59, 130, 246, 0.2)' 
               }}>
            {/* Blue Corporate Sign */}
            <div className="absolute bottom-56 left-6 w-24 h-4 bg-blue-500 animate-pulse" 
                 style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.9), 0 0 80px rgba(59, 130, 246, 0.6)' }}>
            </div>
            <div className="absolute bottom-20 left-8 w-6 h-6 bg-cyan-400 animate-pulse" 
                 style={{ boxShadow: '0 0 25px rgba(34, 211, 238, 0.9), 0 0 50px rgba(34, 211, 238, 0.6)' }}>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-76 w-32 h-68 bg-gradient-to-t from-black/90 to-black/70 border-t-8 border-red-500/80"
               style={{ 
                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.8))',
                 boxShadow: '0 -20px 100px rgba(239, 68, 68, 0.6), inset 0 0 50px rgba(239, 68, 68, 0.2)' 
               }}>
            {/* Red Warning Sign */}
            <div className="absolute bottom-48 left-4 w-24 h-4 bg-red-500 animate-pulse" 
                 style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.9), 0 0 80px rgba(239, 68, 68, 0.6)' }}>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cinematic Digital Rain - Blade Runner Style */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 w-2 h-full animate-pulse"
            style={{
              left: `${8 + i * 8}%`,
              background: `linear-gradient(180deg, transparent 0%, rgba(251, 146, 60, 0.5) ${20 + i * 5}%, rgba(251, 146, 60, 1) ${40 + i * 5}%, rgba(251, 146, 60, 0.5) ${60 + i * 5}%, transparent 100%)`,
              animationDuration: `${1.5 + i * 0.3}s`,
              boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Atmospheric Lighting Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 z-0">
        {/* Searchlight Beams */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-orange-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }}>
        </div>
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s' }}>
        </div>
        <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-red-400 rounded-full blur-3xl animate-pulse transform -translate-x-1/2" 
             style={{ animationDuration: '6s' }}>
        </div>
        <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-amber-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '3.5s' }}>
        </div>
        <div className="absolute bottom-1/4 right-1/6 w-36 h-36 bg-cyan-400 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4.5s' }}>
        </div>
      </div>
      
      {/* Holographic Interface Elements */}
      <div className="absolute inset-0 opacity-20 z-0">
        {/* Scanning Lines */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse" 
             style={{ animationDuration: '3s' }}>
        </div>
        <div className="absolute top-1/3 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }}>
        </div>
        <div className="absolute top-2/3 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse" 
             style={{ animationDuration: '5s' }}>
        </div>
        
        {/* Glitch Effects */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-orange-500/60 animate-pulse" 
             style={{ animationDuration: '2s' }}>
        </div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-blue-500/60 animate-pulse" 
             style={{ animationDuration: '2.5s' }}>
        </div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border-2 border-red-500/60 animate-pulse" 
             style={{ animationDuration: '3s' }}>
        </div>
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
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-orange-500/20 rounded-full backdrop-blur-md">
                <FaMicrochip className="text-orange-400 text-2xl" />
                <span className="text-orange-100 font-medium">Neural Rebellion Chamber</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Cyberpunk Dystopian
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Rebel against the corporate overlords in this neon-soaked dystopian nightmare. 
                Smash through the digital oppression and reclaim your humanity in spectacular style.
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
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Jack Into The Matrix
              </Link>
              <Link
                href="/rooms"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30"
              >
                Compare Realities
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
              Cyberpunk Arsenal
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              High-tech tools for maximum corporate destruction
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
                className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
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

      {/* Tech Laws Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Laws of Digital Rebellion
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Harness the power of technology to break free from corporate control
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
            {cyberpunkLaws.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-8 rounded-xl border border-orange-500/30 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-2">
                    {item.law}
                  </h3>
                  <p className="text-3xl font-bold text-cyan-300 mb-2 font-mono">
                    {item.formula}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {item.explanation}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-orange-500/20">
                  <p className="text-gray-300 text-sm italic">
                    <span className="text-orange-400 font-semibold">Hack:</span> {item.application}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyberpunk Elements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What You'll Destroy
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Take down the symbols of corporate oppression in style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-30">
            {cyberpunkElements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 rounded-xl border border-orange-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {element}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hacker Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Philosophy of Rebellion
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Words of wisdom from digital revolutionaries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
            {hackingQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-8 rounded-xl border border-orange-500/30 backdrop-blur-sm"
              >
                <div className="text-center">
                  <FaLightbulb className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    {quote}
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
            className="bg-gradient-to-r from-orange-900/40 to-red-900/40 p-8 rounded-2xl border border-orange-500/30 backdrop-blur-sm text-center relative z-30"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Resistance?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">60</p>
                  <p className="text-gray-300 text-sm">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-red-400" />
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
                  <p className="text-2xl font-bold text-white">₹4,500</p>
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
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Jack Into The Matrix
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