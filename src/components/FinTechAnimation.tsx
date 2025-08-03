'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBitcoin, 
  FaChartLine, 
  FaCode, 
  FaCreditCard, 
  FaRobot,
  FaDatabase,
  FaShieldAlt,
  FaMicrochip,
  FaChartBar,
  FaCoins
} from 'react-icons/fa';

const FinTechAnimation = () => {
  // Floating icons data
  const floatingIcons = [
    { Icon: FaBitcoin, color: 'text-yellow-400', delay: 0, x: '10%', y: '20%' },
    { Icon: FaChartLine, color: 'text-green-400', delay: 0.5, x: '80%', y: '15%' },
    { Icon: FaCode, color: 'text-blue-400', delay: 1, x: '15%', y: '70%' },
    { Icon: FaCreditCard, color: 'text-purple-400', delay: 1.5, x: '85%', y: '75%' },
    { Icon: FaRobot, color: 'text-cyan-400', delay: 2, x: '60%', y: '25%' },
    { Icon: FaDatabase, color: 'text-indigo-400', delay: 2.5, x: '25%', y: '45%' },
    { Icon: FaShieldAlt, color: 'text-emerald-400', delay: 3, x: '75%', y: '50%' },
    { Icon: FaMicrochip, color: 'text-orange-400', delay: 3.5, x: '40%', y: '80%' },
    { Icon: FaChartBar, color: 'text-pink-400', delay: 4, x: '90%', y: '35%' },
    { Icon: FaCoins, color: 'text-amber-400', delay: 4.5, x: '5%', y: '60%' },
  ];

  // Matrix-style code rain
  const codeElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5) % 100,
    text: ['const', 'function', 'async', 'await', 'blockchain', 'fintech', '{}', '[]', '=>', 'API'][i % 10],
    delay: (i * 0.3) % 5,
    duration: 8 + (i % 4)
  }));

  // Animated chart lines
  const chartLines = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    width: 60 + (i * 10),
    height: 2,
    x: (i * 15) % 90,
    y: 30 + (i * 10),
    delay: i * 0.5
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Matrix Code Rain */}
      {codeElements.map((code) => (
        <motion.div
          key={code.id}
          className="absolute text-green-400/30 font-mono text-sm"
          style={{
            left: `${code.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: code.duration,
            repeat: Infinity,
            delay: code.delay,
            ease: 'linear',
          }}
        >
          {code.text}
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute w-4 h-4 ${
            i % 3 === 0 ? 'bg-blue-500/20' : i % 3 === 1 ? 'bg-purple-500/20' : 'bg-cyan-500/20'
          } ${
            i % 2 === 0 ? 'rounded-full' : 'rotate-45'
          }`}
          style={{
            left: `${(i * 12) % 90}%`,
            top: `${(i * 15) % 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated Chart Lines */}
      {chartLines.map((line) => (
        <motion.div
          key={`line-${line.id}`}
          className="absolute bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.width}px`,
            height: `${line.height}px`,
          }}
          animate={{
            scaleX: [0, 1, 0.8, 1],
            opacity: [0, 1, 0.6, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: line.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Financial Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: item.x,
            top: item.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0, 1, 1.1, 1],
            y: [0, -15, 0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          <item.Icon className={`w-8 h-8 ${item.color} drop-shadow-lg`} />
        </motion.div>
      ))}

      {/* Pulsing Network Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.line
            key={`connection-${i}`}
            x1={`${20 + i * 15}%`}
            y1={`${30 + i * 10}%`}
            x2={`${60 + i * 5}%`}
            y2={`${50 + i * 8}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Binary Code */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-blue-400/20 font-mono text-xs"
          style={{
            left: `${(i * 7) % 95}%`,
            top: `${(i * 11) % 90}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}

      {/* Central Pulsing Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30" />
      </motion.div>
    </div>
  );
};

export default FinTechAnimation;