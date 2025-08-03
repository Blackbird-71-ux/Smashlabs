'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaStar, FaFire, FaGift } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
}

interface CompletionCelebrationProps {
  moduleTitle: string
  xpGained: number
  leveledUp?: boolean
  newLevel?: number
  badges?: Achievement[]
  onContinue: () => void
}

export default function CompletionCelebration({
  moduleTitle,
  xpGained,
  leveledUp = false,
  newLevel,
  badges = [],
  onContinue
}: CompletionCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      setShowConfetti(true)
      
      // Multiple confetti bursts
      const duration = 3000
      const end = Date.now() + duration

      const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']

      const frame = () => {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.6, x: 0.1 },
          colors
        })
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.6, x: 0.9 },
          colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      
      frame()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Trophy Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaTrophy className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Module Complete! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gray-300 mb-8"
          >
            {moduleTitle}
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* XP Gained */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-black/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FaStar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">+{xpGained}</div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </motion.div>

            {/* Level Up or Streak */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className={`bg-black/20 backdrop-blur-sm border rounded-xl p-4 ${
                leveledUp ? 'border-yellow-500/30' : 'border-orange-500/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                leveledUp ? 'bg-yellow-500/20' : 'bg-orange-500/20'
              }`}>
                {leveledUp ? (
                  <FaGift className="w-6 h-6 text-yellow-400" />
                ) : (
                  <FaFire className="w-6 h-6 text-orange-400" />
                )}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {leveledUp ? `Level ${newLevel}!` : 'Streak +1'}
              </div>
              <div className="text-sm text-gray-400">
                {leveledUp ? 'Level Up!' : 'Keep Going!'}
              </div>
            </motion.div>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">New Badges Earned!</h3>
              <div className="flex justify-center space-x-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      bounce: 0.4
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.color}`}
                  >
                    <badge.icon className="w-8 h-8 text-white" />
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 space-y-1">
                {badges.map((badge) => (
                  <div key={badge.id} className="text-sm text-gray-300">
                    <span className="font-semibold text-white">{badge.title}</span>
                    <div className="text-xs text-gray-400">{badge.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {leveledUp 
                ? "🚀 You're leveling up fast! Your dedication is paying off."
                : "🎯 Another step closer to FinTech mastery! Keep building your knowledge."
              }
            </p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Continue Learning Journey
            </motion.button>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Share Achievement
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View Progress
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 right-4 text-2xl"
        >
          ⭐
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-4 left-4 text-2xl"
        >
          🚀
        </motion.div>
      </motion.div>
    </div>
  )
}