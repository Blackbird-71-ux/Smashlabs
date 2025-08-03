'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaTrophy, FaStar, FaChartLine } from 'react-icons/fa'

interface ProgressTrackerProps {
  moduleId: string
  lessonId: string
  progress: number
  onProgressUpdate?: (progress: number) => void
}

interface LearningStats {
  xp: number
  level: number
  streak: {
    current: number
    longest: number
  }
  badges: any[]
}

export default function ProgressTracker({ 
  moduleId, 
  lessonId, 
  progress,
  onProgressUpdate 
}: ProgressTrackerProps) {
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    // Fetch current learning stats
    fetchStats()
    
    // Track time spent
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000 / 60))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [startTime])

  useEffect(() => {
    // Update progress in backend
    updateProgress()
  }, [progress, moduleId, lessonId])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/learning/profile')
      if (response.ok) {
        const data = await response.json()
        setStats({
          xp: data.profile.xp,
          level: data.profile.level,
          streak: data.profile.streak,
          badges: data.profile.badges
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateProgress = async () => {
    try {
      await fetch('/api/learning/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId,
          lessonId,
          progress,
          timeSpent,
          completed: progress >= 100
        }),
      })
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (!stats) {
    return (
      <div className="animate-pulse bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4">
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-8 bg-gray-700 rounded"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 sticky top-4"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-lg font-bold text-white">{stats.level}</span>
          </div>
          <div className="text-xs text-gray-400">Level</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <FaFire className="w-4 h-4 text-orange-400 mr-1" />
            <span className="text-lg font-bold text-white">{stats.streak.current}</span>
          </div>
          <div className="text-xs text-gray-400">Day Streak</div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">XP Progress</span>
          <span className="text-gray-400">{stats.xp} XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((stats.xp % 1000) / 1000) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {1000 - (stats.xp % 1000)} XP to next level
        </div>
      </div>

      {/* Session Info */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Time Spent</span>
          <span>{timeSpent} min</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Recent Badge */}
      {stats.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 p-3 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 rounded-lg"
        >
          <div className="flex items-center">
            <FaTrophy className="w-4 h-4 text-yellow-400 mr-2" />
            <div>
              <div className="text-sm font-semibold text-yellow-300">
                Latest Badge
              </div>
              <div className="text-xs text-gray-300">
                {stats.badges[stats.badges.length - 1].title}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Motivation */}
      <div className="mt-4 text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5
          }}
          className="text-2xl mb-1"
        >
          🚀
        </motion.div>
        <div className="text-xs text-gray-400">
          {progress < 25 ? "Just getting started!" :
           progress < 50 ? "You're doing great!" :
           progress < 75 ? "Keep pushing forward!" :
           progress < 100 ? "Almost there!" :
           "Achievement unlocked!"}
        </div>
      </div>
    </motion.div>
  )
}