import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import LearningProfile from '../../../../../models/LearningProfile'
import User from '../../../../../models/User'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Find or create learning profile
    let profile = await LearningProfile.findOne({ userId: session.user.id })
    
    if (!profile) {
      // Create default profile if doesn't exist
      profile = new LearningProfile({
        userId: session.user.id,
        level: 1,
        xp: 0,
        learningPath: 'finance-first',
        currentStage: 'finance-fundamentals',
        preferences: {
          learningGoal: 'skill-upgrade',
          weeklyGoal: 5,
          difficulty: 'beginner'
        },
        badges: [{
          badgeId: 'welcome',
          title: 'Welcome to SmashTech!',
          description: 'Started your FinTech learning journey',
          category: 'special'
        }]
      })
      
      await profile.save()
    }

    // Calculate virtual fields
    const nextLevelXP = profile.level * 1000
    const currentLevelXP = (profile.level - 1) * 1000
    const progressXP = profile.xp - currentLevelXP
    const levelProgress = Math.round((progressXP / (nextLevelXP - currentLevelXP)) * 100)

    const profileData = {
      ...profile.toObject(),
      nextLevelXP,
      levelProgress
    }

    return NextResponse.json({
      success: true,
      profile: profileData
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()
    
    await connectDB()

    const profile = await LearningProfile.findOneAndUpdate(
      { userId: session.user.id },
      updates,
      { new: true, runValidators: true }
    )

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}