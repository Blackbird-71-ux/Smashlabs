import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
const LearningProfile = require('../../../../../models/LearningProfile')
const User = require('../../../../../models/User')

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      moduleId, 
      lessonId, 
      progress,
      completed = false,
      timeSpent = 0,
      score,
      quizAnswers 
    } = await request.json()

    await connectDB()

    // Find user by email first
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const profile = await LearningProfile.findOne({ userId: user._id })
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Learning profile not found' },
        { status: 404 }
      )
    }

    // Update current module progress
    profile.currentModule = {
      moduleId,
      lessonId,
      progress,
      startedAt: profile.currentModule?.startedAt || new Date(),
      lastAccessed: new Date()
    }

    // If lesson is completed, add to completed modules
    if (completed) {
      const existingModule = profile.completedModules.find(
        (module: any) => module.moduleId === moduleId
      )

      if (!existingModule) {
        // Add to completed modules
        profile.completedModules.push({
          moduleId,
          title: getModuleTitle(moduleId),
          completedAt: new Date(),
          score: score || 0,
          timeSpent,
          attempts: 1
        })
        
        // Update analytics safely
        if (profile.analytics) {
          profile.analytics.modulesCompleted = (profile.analytics.modulesCompleted || 0) + 1
          profile.analytics.totalTimeSpent = (profile.analytics.totalTimeSpent || 0) + timeSpent
          
          // Recalculate average score
          const totalScore = profile.completedModules.reduce((sum: number, module: any) => sum + (module.score || 0), 0)
          profile.analytics.averageScore = Math.round(totalScore / profile.completedModules.length)
        }
        
        // Award XP based on score and time
        const baseXP = 100
        const scoreBonus = Math.floor((score || 0) * 2) // up to 200 bonus XP
        const timeBonus = Math.min(50, Math.floor(timeSpent / 2)) // up to 50 bonus XP
        const xpGained = baseXP + scoreBonus + timeBonus
        
        const oldLevel = profile.level
        profile.xp += xpGained
        
        // Check for level up
        const newLevel = Math.floor(profile.xp / 1000) + 1
        const leveledUp = newLevel > oldLevel && newLevel <= 100
        if (leveledUp) {
          profile.level = newLevel
          
          // Award level up badge
          profile.badges.push({
            badgeId: `level-${newLevel}`,
            title: `Level ${newLevel} Achieved!`,
            description: `Reached level ${newLevel} in your learning journey`,
            category: 'completion',
            iconUrl: `/badges/level-${newLevel}.png`
          })
        }

        // Award badges based on performance
        if (score >= 90) {
          profile.badges.push({
            badgeId: `perfect-${moduleId}`,
            title: 'Perfect Score!',
            description: `Scored ${score}% on ${getModuleTitle(moduleId)}`,
            category: 'score',
            iconUrl: `/badges/perfect-score.png`
          })
        }

        // Update learning streak safely
        if (profile.streak) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          const lastActivity = profile.streak.lastActivity
          if (!lastActivity) {
            // First activity
            profile.streak.current = 1
            profile.streak.lastActivity = new Date()
            profile.streak.lastStreakDate = today
          } else {
            const lastStreakDate = new Date(profile.streak.lastStreakDate || new Date())
            const daysDiff = Math.floor((today.getTime() - lastStreakDate.getTime()) / (1000 * 60 * 60 * 24))
            
            if (daysDiff === 1) {
              // Consecutive day
              profile.streak.current = (profile.streak.current || 0) + 1
              if (profile.streak.current > (profile.streak.longest || 0)) {
                profile.streak.longest = profile.streak.current
              }
            } else if (daysDiff > 1) {
              // Streak broken
              profile.streak.current = 1
            }
            // Same day - no change to streak
            
            profile.streak.lastActivity = new Date()
            profile.streak.lastStreakDate = today
          }
        }

        await profile.save()

        return NextResponse.json({
          success: true,
          message: 'Module completed successfully!',
          xpGained,
          leveledUp,
          newLevel: profile.level,
          badges: profile.badges.slice(-2) // Return latest badges
        })
      }
    }

    await profile.save()

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      currentProgress: profile.currentModule
    })

  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const moduleId = searchParams.get('moduleId')

    await connectDB()

    // Find user by email first
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const profile = await LearningProfile.findOne({ userId: user._id })
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Learning profile not found' },
        { status: 404 }
      )
    }

    if (moduleId) {
      // Return progress for specific module
      const moduleProgress = profile.completedModules.find(
        (module: any) => module.moduleId === moduleId
      )

      const currentProgress = profile.currentModule?.moduleId === moduleId 
        ? profile.currentModule 
        : null

      return NextResponse.json({
        success: true,
        moduleProgress,
        currentProgress,
        isCompleted: !!moduleProgress
      })
    }

    // Return all progress
    return NextResponse.json({
      success: true,
      completedModules: profile.completedModules,
      currentModule: profile.currentModule,
      totalXP: profile.xp,
      level: profile.level,
      streak: profile.streak
    })

  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get module titles
function getModuleTitle(moduleId: string): string {
  const titles: { [key: string]: string } = {
    'money-basics': 'What is Money?',
    'banking-systems': 'Banking Systems',
    'investment-basics': 'Investment Principles',
    'financial-planning': 'Personal Finance'
  }
  
  return titles[moduleId] || moduleId
}