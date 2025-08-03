'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaChartLine, FaRobot, FaLock, FaPlayCircle, FaClock, FaStar } from 'react-icons/fa'
import Link from 'next/link'

const learningTracks = [
  {
    id: 'finance-fundamentals',
    title: 'Finance Fundamentals',
    description: 'Master the core concepts of finance, investment, and money management',
    duration: '4-6 weeks',
    difficulty: 'Beginner',
    modules: 8,
    xp: 2000,
    color: 'from-blue-500 to-indigo-600',
    icon: FaChartLine,
    status: 'available',
    prerequisites: [],
    topics: ['Money & Banking', 'Investment Basics', 'Risk Management', 'Financial Planning']
  },
  {
    id: 'tech-fundamentals',
    title: 'Technology Fundamentals',
    description: 'Understand the tech infrastructure powering modern finance',
    duration: '4-6 weeks',
    difficulty: 'Beginner',
    modules: 8,
    xp: 2000,
    color: 'from-purple-500 to-pink-600',
    icon: FaRocket,
    status: 'locked',
    prerequisites: ['finance-fundamentals'],
    topics: ['Digital Infrastructure', 'APIs & Databases', 'Security', 'Emerging Tech']
  },
  {
    id: 'fintech-integration',
    title: 'FinTech Integration',
    description: 'Learn how finance and technology merge to create innovative solutions',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    modules: 12,
    xp: 3000,
    color: 'from-green-500 to-teal-600',
    icon: FaRobot,
    status: 'locked',
    prerequisites: ['finance-fundamentals', 'tech-fundamentals'],
    topics: ['Digital Payments', 'Blockchain & DeFi', 'AI in Finance', 'RegTech']
  }
]

const upcomingModules = [
  {
    id: 'money-basics',
    title: 'What is Money?',
    track: 'Finance Fundamentals',
    duration: '45 min',
    xp: 250,
    type: 'Interactive Lesson'
  },
  {
    id: 'banking-systems',
    title: 'Banking Systems',
    track: 'Finance Fundamentals',
    duration: '60 min',
    xp: 300,
    type: 'Simulation'
  },
  {
    id: 'investment-basics',
    title: 'Investment Principles',
    track: 'Finance Fundamentals',
    duration: '75 min',
    xp: 350,
    type: 'Project'
  }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Learning Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master FinTech through our structured learning paths. From finance fundamentals to cutting-edge technology integration.
          </p>
        </motion.div>

        {/* Learning Tracks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Learning Tracks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {learningTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={track.status === 'available' ? { scale: 1.02, y: -5 } : {}}
                className={`bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden ${
                  track.status === 'locked' ? 'opacity-60' : 'hover:border-white/20'
                } transition-all duration-300`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-10`} />
                
                {/* Lock Icon for locked tracks */}
                {track.status === 'locked' && (
                  <div className="absolute top-4 right-4">
                    <FaLock className="w-6 h-6 text-gray-400" />
                  </div>
                )}

                <div className="relative z-10">
                  {/* Track Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${track.color} rounded-xl flex items-center justify-center mb-6`}>
                    <track.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Track Info */}
                  <h3 className="text-2xl font-bold text-white mb-3">{track.title}</h3>
                  <p className="text-gray-300 mb-6">{track.description}</p>

                  {/* Track Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="text-white font-semibold">{track.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Difficulty</div>
                      <div className="text-white font-semibold">{track.difficulty}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Modules</div>
                      <div className="text-white font-semibold">{track.modules}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">XP Reward</div>
                      <div className="text-yellow-400 font-semibold">{track.xp.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2">Topics Covered</div>
                    <div className="flex flex-wrap gap-2">
                      {track.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {track.prerequisites.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-2">Prerequisites</div>
                      <div className="text-sm text-orange-400">
                        Complete: {track.prerequisites.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {track.status === 'available' ? (
                    <Link href={`/learn/${track.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${track.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        Start Track
                      </motion.button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-600 text-gray-300 py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Locked
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Modules Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Next Up: Finance Fundamentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FaPlayCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                    {module.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{module.track}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-300">
                    <FaClock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="w-4 h-4 mr-1" />
                    {module.xp} XP
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}