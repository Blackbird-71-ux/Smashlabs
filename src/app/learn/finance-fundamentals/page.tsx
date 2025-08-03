'use client'

import { motion } from 'framer-motion'
import { FaPlay, FaClock, FaStar, FaCheck, FaLock, FaChartLine } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

const modules = [
  {
    id: 'money-basics',
    title: 'What is Money?',
    description: 'Discover the fundamental nature of money, its history, and why it exists',
    duration: '45 min',
    xp: 250,
    difficulty: 'Beginner',
    status: 'available',
    lessons: 8,
    completion: 0,
    topics: ['History of Money', 'Functions of Money', 'Types of Currency', 'Modern Money']
  },
  {
    id: 'banking-systems',
    title: 'Banking Systems',
    description: 'How banks work, fractional reserve banking, and the modern financial system',
    duration: '60 min',
    xp: 300,
    difficulty: 'Beginner',
    status: 'locked',
    lessons: 10,
    completion: 0,
    topics: ['How Banks Work', 'Interest Rates', 'Central Banks', 'Financial Regulations']
  },
  {
    id: 'investment-basics',
    title: 'Investment Principles',
    description: 'Fundamental concepts of investing, risk vs return, and portfolio theory',
    duration: '75 min',
    xp: 350,
    difficulty: 'Intermediate',
    status: 'locked',
    lessons: 12,
    completion: 0,
    topics: ['Risk & Return', 'Asset Classes', 'Diversification', 'Market Psychology']
  },
  {
    id: 'financial-planning',
    title: 'Personal Finance',
    description: 'Budgeting, saving, debt management, and building wealth over time',
    duration: '90 min',
    xp: 400,
    difficulty: 'Intermediate',
    status: 'locked',
    lessons: 15,
    completion: 0,
    topics: ['Budgeting', 'Emergency Funds', 'Debt Management', 'Retirement Planning']
  }
]

export default function FinanceFundamentals() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

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
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <FaChartLine className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">Finance Fundamentals</h1>
              <p className="text-blue-300">Track 1 of 3 • Beginner Level</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the core concepts of finance and money. Build a solid foundation for your FinTech journey.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-gray-300">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">0%</div>
              <div className="text-gray-300">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1,300</div>
              <div className="text-gray-300">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4.5h</div>
              <div className="text-gray-300">Duration</div>
            </div>
          </div>
        </motion.div>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={module.status === 'available' ? { scale: 1.02, y: -5 } : {}}
              className={`bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 ${
                module.status === 'locked' ? 'opacity-60' : 'hover:border-white/20 cursor-pointer'
              }`}
              onClick={() => module.status === 'available' && setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              {/* Status Indicator */}
              <div className="absolute top-4 right-4">
                {module.status === 'locked' ? (
                  <FaLock className="w-5 h-5 text-gray-400" />
                ) : module.completion === 100 ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FaCheck className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <FaPlay className="w-3 h-3 text-blue-400" />
                  </div>
                )}
              </div>

              {/* Module Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-300 mb-4">{module.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <FaClock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="w-4 h-4 mr-1" />
                    {module.xp} XP
                  </div>
                  <div className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                    {module.difficulty}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {module.status === 'available' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-400">{module.completion}% ({module.lessons} lessons)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.completion}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Topics Preview */}
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Topics Covered</div>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {module.status === 'available' ? (
                <Link href={`/learn/finance-fundamentals/${module.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    {module.completion === 0 ? 'Start Module' : 'Continue Learning'}
                  </motion.button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-600 text-gray-300 py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  Complete Previous Module
                </button>
              )}

              {/* Expanded Details */}
              {selectedModule === module.id && module.status === 'available' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <h4 className="text-lg font-semibold text-white mb-3">What You'll Learn</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Understand the fundamental nature and purpose of money
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Explore the evolution from barter systems to digital currency
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Learn about different types of money and their characteristics
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Discover how money facilitates modern economic systems
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Finance?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start with "What is Money?" and build your foundation. Each module unlocks the next, 
              creating a structured path to FinTech mastery.
            </p>
            <Link href="/learn/finance-fundamentals/money-basics">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Begin Your Journey
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}