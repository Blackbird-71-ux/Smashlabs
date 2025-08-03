'use client'

// Force dynamic rendering for dashboard
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaBolt, 
  FaFire, 
  FaTrophy, 
  FaChartLine, 
  FaBook, 
  FaUsers,
  FaClock,
  FaStar,
  FaArrowRight,
  FaPlayCircle
} from 'react-icons/fa'
import Link from 'next/link'

interface LearningProfile {
  level: number
  xp: number
  nextLevelXP: number
  levelProgress: number
  streak: {
    current: number
    longest: number
  }
  completedModules: any[]
  badges: any[]
  currentModule?: {
    moduleId: string
    title: string
    progress: number
  }
  analytics: {
    totalTimeSpent: number
    averageScore: number
    modulesCompleted: number
  }
}

export default function Dashboard() {
  const sessionData = useSession()
  const { data: session, status } = sessionData || { data: null, status: 'loading' }
  const router = useRouter()
  const [profile, setProfile] = useState<LearningProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/learning/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const quickActions = [
    {
      title: 'Continue Learning',
      description: profile?.currentModule?.title || 'Start your first module',
      icon: FaPlayCircle,
      href: profile?.currentModule ? `/learn/${profile.currentModule.moduleId}` : '/learn',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Browse Modules',
      description: 'Explore all available courses',
      icon: FaBook,
      href: '/learn',
      color: 'from-green-500 to-blue-500'
    },
    {
      title: 'Community',
      description: 'Connect with other learners',
      icon: FaUsers,
      href: '/community',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Achievements',
      description: 'View your badges and progress',
      icon: FaTrophy,
      href: '/dashboard/achievements',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session.user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-300 text-lg">
            Ready to continue your FinTech mastery journey?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FaBolt className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                Level {profile?.level || 1}
              </span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">XP Progress</span>
                <span className="text-gray-300">
                  {profile?.xp || 0} / {profile?.nextLevelXP || 1000}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profile?.levelProgress || 0}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <FaFire className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                {profile?.streak.current || 0} days
              </span>
            </div>
            <p className="text-gray-300 text-sm">Learning Streak</p>
            <p className="text-orange-400 text-xs">
              Best: {profile?.streak.longest || 0} days
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <FaBook className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                {profile?.analytics.modulesCompleted || 0}
              </span>
            </div>
            <p className="text-gray-300 text-sm">Modules Completed</p>
            <p className="text-green-400 text-xs">
              Avg Score: {profile?.analytics.averageScore || 0}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <FaTrophy className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                {profile?.badges.length || 0}
              </span>
            </div>
            <p className="text-gray-300 text-sm">Badges Earned</p>
            <p className="text-yellow-400 text-xs">
              Time: {Math.round((profile?.analytics.totalTimeSpent || 0) / 60)}h
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {action.description}
                  </p>
                  <div className="flex items-center mt-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-sm">Go</span>
                    <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Module Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Current Progress</h3>
            {profile?.currentModule ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{profile.currentModule.title}</span>
                  <span className="text-blue-400">{profile.currentModule.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${profile.currentModule.progress}%` }}
                  ></div>
                </div>
                <Link href={`/learn/${profile.currentModule.moduleId}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Continue Learning
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaBook className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">Ready to start learning?</p>
                <Link href="/learn">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Browse Modules
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Recent Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Recent Achievements</h3>
            {profile?.badges && profile.badges.length > 0 ? (
              <div className="space-y-3">
                {profile.badges.slice(-3).reverse().map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                      <FaTrophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{badge.title}</p>
                      <p className="text-gray-400 text-xs">{badge.description}</p>
                    </div>
                  </div>
                ))}
                <Link href="/dashboard/achievements">
                  <button className="w-full text-blue-400 hover:text-blue-300 transition-colors text-sm mt-4">
                    View all achievements →
                  </button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaTrophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300">Start learning to earn badges!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}