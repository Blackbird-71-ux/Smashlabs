import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
const User = require('../../../../../models/User')
const LearningProfile = require('../../../../../models/LearningProfile')

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      isActive: true,
      metadata: {
        registrationSource: 'web',
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
      }
    })

    const savedUser = await user.save()

    // Create learning profile
    const learningProfile = new LearningProfile({
      userId: savedUser._id,
      level: 1,
      xp: 0,
      learningPath: 'finance-first',
      currentStage: 'finance-fundamentals',
      preferences: {
        learningGoal: 'skill-upgrade',
        weeklyGoal: 5,
        difficulty: 'beginner',
        notifications: {
          dailyReminder: true,
          weeklyProgress: true,
          achievements: true
        }
      }
    })

    await learningProfile.save()

    // Award welcome badge
    learningProfile.badges.push({
      badgeId: 'welcome',
      title: 'Welcome to SmashTech!',
      description: 'Started your FinTech learning journey',
      category: 'special',
      iconUrl: '/badges/welcome.png'
    })

    await learningProfile.save()

    return NextResponse.json(
      { 
        message: 'User created successfully',
        userId: savedUser._id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}