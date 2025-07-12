'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMicrochip, FaArrowLeft, FaPlay, FaLightbulb, FaEye, FaClock, FaUsers, FaCog, FaTv, FaSignal } from 'react-icons/fa';

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
    <main className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Floating Neon Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-400 rounded-full animate-bounce opacity-40" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-50" />
      <div className="absolute top-60 right-40 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-60 left-40 w-5 h-5 bg-cyan-300 rounded-full animate-bounce opacity-25" />

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
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-pink-500 to-cyan-400 flex items-center justify-center shadow-2xl"
          >
            <FaMicrochip className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent bg-clip-text"
          >
            Cyberpunk Dystopian
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-pink-300 font-medium mb-8"
          >
            Hack Reality, Smash the System
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Jack into a neon-soaked future where corporations rule and rebellion is the only escape. 
            Break free from the digital prison in this high-tech, high-impact dystopian nightmare. 
            Your sledgehammer is your weapon against the machine.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
              Jack Into the System
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30"
            >
              Explore Other Realities
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
              Cyberpunk Arsenal
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              High-tech tools for maximum corporate destruction
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
                className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-400 flex items-center justify-center mb-4">
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Laws of Digital Rebellion
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Harness the power of technology to break free from corporate control
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cyberpunkLaws.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-900/40 to-cyan-900/40 p-8 rounded-xl border border-pink-500/30 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-pink-300 mb-2">
                    {item.law}
                  </h3>
                  <p className="text-3xl font-bold text-cyan-300 mb-2 font-mono">
                    {item.formula}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {item.explanation}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-pink-500/20">
                  <p className="text-gray-300 text-sm italic">
                    <span className="text-pink-400 font-semibold">Hack:</span> {item.application}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What You'll Destroy
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Take down the symbols of corporate oppression in style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cyberpunkElements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-pink-900/30 to-cyan-900/30 p-6 rounded-xl border border-pink-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Philosophy of Rebellion
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Words of wisdom from digital revolutionaries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hackingQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-900/20 to-cyan-900/20 p-8 rounded-xl border border-pink-500/30 backdrop-blur-sm"
              >
                <div className="text-center">
                  <FaLightbulb className="w-8 h-8 text-pink-400 mx-auto mb-4" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-pink-900/40 to-cyan-900/40 p-8 rounded-2xl border border-pink-500/30 backdrop-blur-sm text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Resistance?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">60</p>
                  <p className="text-gray-300 text-sm">Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1-10</p>
                  <p className="text-gray-300 text-sm">Participants</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FaMicrochip className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹4,500</p>
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
                className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <FaPlay className="mr-3" />
                Hack the System
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 