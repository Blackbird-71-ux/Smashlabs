const mongoose = require('mongoose');

const learningProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Learning Progress
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 100
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  learningPath: {
    type: String,
    enum: ['finance-first', 'tech-first', 'integrated'],
    default: 'finance-first'
  },
  currentStage: {
    type: String,
    enum: ['finance-fundamentals', 'tech-fundamentals', 'fintech-integration', 'advanced'],
    default: 'finance-fundamentals'
  },
  
  // Module Progress
  completedModules: [{
    moduleId: {
      type: String,
      required: true
    },
    title: String,
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    timeSpent: {
      type: Number, // in minutes
      default: 0
    },
    attempts: {
      type: Number,
      default: 1
    }
  }],
  
  // Current Module Progress
  currentModule: {
    moduleId: String,
    lessonId: String,
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    startedAt: Date,
    lastAccessed: Date
  },
  
  // Achievements & Gamification
  badges: [{
    badgeId: {
      type: String,
      required: true
    },
    title: String,
    description: String,
    category: {
      type: String,
      enum: ['completion', 'streak', 'score', 'special', 'community']
    },
    iconUrl: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Learning Streaks
  streak: {
    current: {
      type: Number,
      default: 0
    },
    longest: {
      type: Number,
      default: 0
    },
    lastActivity: Date,
    lastStreakDate: Date
  },
  
  // Learning Preferences
  preferences: {
    learningGoal: {
      type: String,
      enum: ['career-change', 'skill-upgrade', 'business-growth', 'personal-interest'],
      default: 'skill-upgrade'
    },
    weeklyGoal: {
      type: Number,
      default: 5, // hours per week
      min: 1,
      max: 40
    },
    preferredTime: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'flexible'],
      default: 'flexible'
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    notifications: {
      dailyReminder: {
        type: Boolean,
        default: true
      },
      weeklyProgress: {
        type: Boolean,
        default: true
      },
      achievements: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Performance Analytics
  analytics: {
    totalTimeSpent: {
      type: Number, // in minutes
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    modulesCompleted: {
      type: Number,
      default: 0
    },
    skillsAssessed: [{
      skill: String,
      level: {
        type: Number,
        min: 1,
        max: 5
      },
      assessedAt: Date
    }],
    learningVelocity: {
      type: Number, // modules per week
      default: 0
    }
  },
  
  // Social Features
  community: {
    studyGroups: [{
      groupId: mongoose.Schema.Types.ObjectId,
      joinedAt: Date,
      role: {
        type: String,
        enum: ['member', 'moderator'],
        default: 'member'
      }
    }],
    mentorship: {
      isMentor: {
        type: Boolean,
        default: false
      },
      mentorId: mongoose.Schema.Types.ObjectId,
      menteeIds: [mongoose.Schema.Types.ObjectId]
    },
    forumActivity: {
      postsCount: {
        type: Number,
        default: 0
      },
      helpfulAnswers: {
        type: Number,
        default: 0
      },
      reputation: {
        type: Number,
        default: 0
      }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
learningProfileSchema.index({ userId: 1 });
learningProfileSchema.index({ level: -1 });
learningProfileSchema.index({ xp: -1 });
learningProfileSchema.index({ 'streak.current': -1 });

// Virtual for next level XP requirement
learningProfileSchema.virtual('nextLevelXP').get(function() {
  return this.level * 1000; // 1000 XP per level
});

// Virtual for progress to next level
learningProfileSchema.virtual('levelProgress').get(function() {
  const currentLevelXP = (this.level - 1) * 1000;
  const nextLevelXP = this.level * 1000;
  const progressXP = this.xp - currentLevelXP;
  return Math.round((progressXP / (nextLevelXP - currentLevelXP)) * 100);
});

// Method to add XP and handle level ups
learningProfileSchema.methods.addXP = function(points, reason = 'general') {
  const oldLevel = this.level;
  this.xp += points;
  
  // Check for level up
  const newLevel = Math.floor(this.xp / 1000) + 1;
  if (newLevel > this.level && newLevel <= 100) {
    this.level = newLevel;
    
    // Award level up badge
    this.badges.push({
      badgeId: `level-${newLevel}`,
      title: `Level ${newLevel} Achieved!`,
      description: `Reached level ${newLevel} in your learning journey`,
      category: 'completion',
      iconUrl: `/badges/level-${newLevel}.png`
    });
  }
  
  return {
    xpGained: points,
    leveledUp: newLevel > oldLevel,
    newLevel: this.level,
    totalXP: this.xp
  };
};

// Method to complete a module
learningProfileSchema.methods.completeModule = function(moduleData) {
  // Add to completed modules
  this.completedModules.push({
    moduleId: moduleData.moduleId,
    title: moduleData.title,
    score: moduleData.score,
    timeSpent: moduleData.timeSpent,
    attempts: moduleData.attempts || 1
  });
  
  // Update analytics
  this.analytics.modulesCompleted += 1;
  this.analytics.totalTimeSpent += moduleData.timeSpent;
  
  // Recalculate average score
  const totalScore = this.completedModules.reduce((sum, module) => sum + (module.score || 0), 0);
  this.analytics.averageScore = Math.round(totalScore / this.completedModules.length);
  
  // Award XP based on score and time
  const baseXP = 100;
  const scoreBonus = Math.floor((moduleData.score || 0) * 2); // up to 200 bonus XP
  const timeBonus = Math.min(50, Math.floor(moduleData.timeSpent / 2)); // up to 50 bonus XP
  
  return this.addXP(baseXP + scoreBonus + timeBonus, 'module-completion');
};

// Method to update learning streak
learningProfileSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = this.streak.lastActivity;
  if (!lastActivity) {
    // First activity
    this.streak.current = 1;
    this.streak.lastActivity = new Date();
    this.streak.lastStreakDate = today;
    return;
  }
  
  const lastStreakDate = new Date(this.streak.lastStreakDate);
  const daysDiff = Math.floor((today - lastStreakDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    // Consecutive day
    this.streak.current += 1;
    if (this.streak.current > this.streak.longest) {
      this.streak.longest = this.streak.current;
    }
  } else if (daysDiff > 1) {
    // Streak broken
    this.streak.current = 1;
  }
  // Same day - no change to streak
  
  this.streak.lastActivity = new Date();
  this.streak.lastStreakDate = today;
  
  // Award streak badges
  if ([7, 30, 100, 365].includes(this.streak.current)) {
    this.badges.push({
      badgeId: `streak-${this.streak.current}`,
      title: `${this.streak.current} Day Streak!`,
      description: `Maintained a learning streak for ${this.streak.current} consecutive days`,
      category: 'streak',
      iconUrl: `/badges/streak-${this.streak.current}.png`
    });
  }
};

// Static method to get leaderboard
learningProfileSchema.statics.getLeaderboard = function(type = 'xp', limit = 10) {
  const sortField = type === 'xp' ? { xp: -1 } : 
                   type === 'level' ? { level: -1, xp: -1 } :
                   type === 'streak' ? { 'streak.current': -1 } :
                   { xp: -1 };
  
  return this.find({})
    .populate('userId', 'name profile.avatar')
    .sort(sortField)
    .limit(limit)
    .select('userId level xp streak badges analytics');
};

module.exports = mongoose.model('LearningProfile', learningProfileSchema);