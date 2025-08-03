'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAtom, FaRocket, FaMicrochip, FaPlay, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const rooms = [
  {
    id: 'theory-of-relativity',
    name: 'Theory of Relativity',
    tagline: 'Time Dilates, Stress Accelerates Away',
    description: 'Step into Einstein\'s universe where the laws of physics bend to your will. In this cosmic arena, experience the relativity of stress relief as you warp space-time with every swing.',
    features: [
      'Gravity-defying smash zones',
      'Time dilation lighting effects',
      'Cosmic debris and space-themed targets',
      'Einstein quotes and physics displays',
      'Interstellar ambient soundscapes',
      'Blackhole projection mapping'
    ],
    physics: 'E=mc² - Energy equals mass times the speed of light squared. Channel your energy into pure destructive force.',
    color: 'blue',
    gradient: 'from-blue-600 to-purple-800',
    bgColor: 'bg-gradient-to-br from-blue-900/20 to-purple-900/20',
    icon: FaRocket,
    price: '₹3,500',
    duration: '45 minutes',
    image: '/images/relativity-room.jpg'
  },
  {
    id: 'quantum-theory',
    name: 'Quantum Theory',
    tagline: 'Uncertainty Principle: Destroy Everything',
    description: 'Enter the quantum realm where possibilities are infinite and destruction is probable. Watch as your stress collapses into pure satisfaction in this subatomic smashing experience.',
    features: [
      'Quantum entanglement target pairs',
      'Probability wave visualization',
      'Particle accelerator sound effects',
      'Schrödinger\'s breakable boxes',
      'Heisenberg uncertainty chamber',
      'Quantum tunneling obstacles'
    ],
    physics: 'ΔE×Δt ≥ ℏ/2 - The uncertainty principle: You can\'t simultaneously know stress and relaxation, so choose destruction.',
    color: 'green',
    gradient: 'from-green-500 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-900/20 to-emerald-900/20',
    icon: FaAtom,
    price: '₹4,000',
    duration: '50 minutes',
    image: '/images/quantum-room.jpg'
  },
  {
    id: 'cyberpunk-dystopian',
    name: 'Cyberpunk Dystopian',
    tagline: 'Hack Reality, Smash the System',
    description: 'Jack into a neon-soaked future where corporations rule and rebellion is the only escape. Break free from the digital prison in this high-tech, high-impact dystopian nightmare.',
    features: [
      'Neon-lit corporate targets',
      'Holographic advertising displays',
      'Cybernetic enhancement stations',
      'Matrix-style code rain effects',
      'Synthetic punk rock soundtracks',
      'Augmented reality destruction'
    ],
    physics: 'I = V/R - Current equals voltage over resistance. Overcome the system\'s resistance with high-voltage destruction.',
    color: 'pink',
    gradient: 'from-pink-500 to-cyan-400',
    bgColor: 'bg-gradient-to-br from-pink-900/20 to-cyan-900/20',
    icon: FaMicrochip,
    price: '₹4,500',
    duration: '60 minutes',
    image: '/images/cyberpunk-room.jpg'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-noise opacity-5" />
        
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Choose Your Reality
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Three worlds. Three experiences. One mission: <span className="text-red-400 font-semibold">Obliterate your stress through the power of physics.</span>
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30">
              <FaRocket className="text-blue-400" />
              <span className="text-blue-300">Einstein's Universe</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
              <FaAtom className="text-green-400" />
              <span className="text-green-300">Quantum Realm</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/30">
              <FaMicrochip className="text-pink-400" />
              <span className="text-pink-300">Cyberpunk Future</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -8 }}
                onHoverStart={() => setHoveredRoom(room.id)}
                onHoverEnd={() => setHoveredRoom(null)}
                onClick={() => router.push(`/rooms/${room.id}`)}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden ${room.bgColor} border border-gray-800/50 hover:border-${room.color}-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-${room.color}-500/20`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40" />
                
                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${room.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <room.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {room.name}
                      </h3>
                      <p className={`text-${room.color}-400 font-medium text-sm`}>
                        {room.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                    {room.description}
                  </p>

                  {/* Physics Quote */}
                  <div className="bg-black/30 p-4 rounded-xl mb-6 border border-gray-800/50">
                    <div className="flex items-start gap-3">
                      <FaLightbulb className={`text-${room.color}-400 mt-1 flex-shrink-0`} />
                      <p className="text-gray-300 text-sm italic">
                        {room.physics}
                      </p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-${room.color}-500`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{room.price}</p>
                      <p className="text-gray-400 text-sm">{room.duration}</p>
                    </div>
                    <Link href={`/rooms/${room.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-6 py-3 bg-gradient-to-r ${room.gradient} text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-${room.color}-500/25 transition-all duration-300`}
                      >
                        Experience Reality
                      </motion.button>
                    </Link>
                  </div>

                  {/* Call to Action */}
                  <Link
                    href={`/rooms/${room.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <span className="text-sm">Explore This Universe</span>
                    <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600/20 to-orange-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Bend Reality?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Choose your universe and experience stress relief like never before. 
              Each room offers a unique journey through the laws of physics and destruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors group"
              >
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Book Your Reality
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                View All Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 