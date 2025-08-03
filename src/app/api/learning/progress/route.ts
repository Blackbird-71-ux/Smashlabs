import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import LearningProfile from '../../../../../models/LearningProfile'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.id) {
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

    const profile = await LearningProfile.findOne({ userId: session.user.id })
    
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
        const moduleResult = profile.completeModule({
          moduleId,
          title: getModuleTitle(moduleId),
          score: score || 0,
          timeSpent,
          attempts: 1
        })

        // Update learning streak
        profile.updateStreak()

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

        await profile.save()

        return NextResponse.json({
          success: true,
          message: 'Module completed successfully!',
          xpGained: moduleResult.xpGained,
          leveledUp: moduleResult.leveledUp,
          newLevel: moduleResult.newLevel,
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
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const moduleId = searchParams.get('moduleId')

    await connectDB()

    const profile = await LearningProfile.findOne({ userId: session.user.id })
    
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