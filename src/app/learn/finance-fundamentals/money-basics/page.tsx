'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheck, 
  FaPlay, 
  FaPause,
  FaBook,
  FaLightbulb,
  FaQuestionCircle,
  FaTrophy,
  FaClock,
  FaStar
} from 'react-icons/fa'
import Link from 'next/link'

interface Lesson {
  id: number
  title: string
  type: 'video' | 'reading' | 'interactive' | 'quiz'
  duration: string
  content: {
    title: string
    text: string
    points?: string[]
    interactive?: {
      question: string
      options: string[]
      correct: number
      explanation: string
    }
  }
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Introduction to Money',
    type: 'reading',
    duration: '5 min',
    content: {
      title: 'What is Money, Really?',
      text: 'Money is one of humanity\'s greatest inventions. But what exactly IS money? At its core, money is a tool that solves fundamental problems in human cooperation and exchange.',
      points: [
        'Money is a medium of exchange that eliminates the need for barter',
        'It serves as a unit of account for measuring value',
        'Money acts as a store of value over time',
        'It enables complex economic systems and specialization'
      ]
    }
  },
  {
    id: 2,
    title: 'The Barter Problem',
    type: 'interactive',
    duration: '7 min',
    content: {
      title: 'Why Barter Systems Failed',
      text: 'Imagine you\'re a wheat farmer who needs shoes. You find a shoemaker, but they don\'t want wheat - they want fish. Now you need to find someone who has fish and wants wheat...',
      interactive: {
        question: 'What is the main problem with barter systems?',
        options: [
          'Too expensive to trade',
          'Double coincidence of wants problem',
          'Items spoil too quickly',
          'Government regulations'
        ],
        correct: 1,
        explanation: 'The "double coincidence of wants" means both parties must want what the other has. This makes trading extremely difficult and limits economic growth.'
      }
    }
  },
  {
    id: 3,
    title: 'Functions of Money',
    type: 'reading',
    duration: '6 min',
    content: {
      title: 'The Three Core Functions',
      text: 'Economists identify three primary functions that define money. Understanding these helps us recognize what makes good money versus bad money.',
      points: [
        '🔄 Medium of Exchange: Facilitates trade between parties',
        '📏 Unit of Account: Provides a common measure of value',
        '💰 Store of Value: Preserves purchasing power over time',
        '💡 Some add: Standard of Deferred Payment (for loans/contracts)'
      ]
    }
  },
  {
    id: 4,
    title: 'Evolution Quiz',
    type: 'quiz',
    duration: '3 min',
    content: {
      title: 'Test Your Understanding',
      text: 'Let\'s see how well you understand money\'s evolution and functions.',
      interactive: {
        question: 'Which came first in the evolution of money?',
        options: [
          'Paper currency',
          'Commodity money (gold, silver)',
          'Digital currency',
          'Credit cards'
        ],
        correct: 1,
        explanation: 'Commodity money like gold and silver came first because they had intrinsic value and met money\'s core functions naturally.'
      }
    }
  },
  {
    id: 5,
    title: 'Modern Money Systems',
    type: 'reading',
    duration: '8 min',
    content: {
      title: 'From Gold to Digital',
      text: 'Today\'s money is fundamentally different from historical money. We\'ve moved from commodity-backed currency to fiat money - currency backed by government decree rather than physical commodities.',
      points: [
        '1971: Nixon ended the gold standard',
        'Fiat money: Value from government backing and public trust',
        'Central banks control money supply',
        'Digital money: Most money exists as computer entries, not physical cash'
      ]
    }
  },
  {
    id: 6,
    title: 'Money Properties',
    type: 'interactive',
    duration: '6 min',
    content: {
      title: 'What Makes Good Money?',
      text: 'Throughout history, successful money has shared certain characteristics. Understanding these properties helps explain why some forms of money succeed while others fail.',
      interactive: {
        question: 'Which property is MOST important for money?',
        options: [
          'Durability (doesn\'t wear out easily)',
          'Portability (easy to carry)',
          'Acceptance (people will take it)',
          'Divisibility (can be broken into smaller units)'
        ],
        correct: 2,
        explanation: 'While all properties matter, acceptance is crucial. Money only works if people believe it has value and will accept it in exchange.'
      }
    }
  },
  {
    id: 7,
    title: 'Digital Revolution',
    type: 'reading',
    duration: '7 min',
    content: {
      title: 'The Future of Money',
      text: 'We\'re witnessing the biggest transformation in money since the invention of coins. Digital payments, cryptocurrencies, and central bank digital currencies (CBDCs) are reshaping how we think about money.',
      points: [
        '💳 Digital payments now dominate in developed countries',
        '₿ Cryptocurrencies challenge traditional monetary systems',
        '🏦 Central banks are creating digital versions of national currencies',
        '📱 Mobile money is banking the unbanked in developing nations'
      ]
    }
  },
  {
    id: 8,
    title: 'Final Assessment',
    type: 'quiz',
    duration: '5 min',
    content: {
      title: 'Module Completion Quiz',
      text: 'Congratulations! You\'ve learned the fundamentals of money. Let\'s test your comprehensive understanding.',
      interactive: {
        question: 'What is the PRIMARY reason money was invented?',
        options: [
          'To make governments more powerful',
          'To solve the problems of barter systems',
          'To create inequality in society',
          'To replace gold and silver'
        ],
        correct: 1,
        explanation: 'Money was invented to solve the inefficiencies of barter systems, particularly the double coincidence of wants problem, enabling more complex trade and economic development.'
      }
    }
  }
]

export default function MoneyBasicsModule() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [moduleStarted, setModuleStarted] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  const lesson = lessons[currentLesson]
  const progress = ((currentLesson + 1) / lessons.length) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (moduleStarted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 60000) // Update every minute
    }
    return () => clearInterval(interval)
  }, [moduleStarted])

  const handleNext = () => {
    if (!moduleStarted) {
      setModuleStarted(true)
    }
    
    // Mark current lesson as completed
    setCompletedLessons(prev => new Set([...prev, lesson.id]))
    
    // Reset quiz state
    setSelectedAnswer(null)
    setShowAnswer(false)
    
    // Move to next lesson
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }

  const isLastLesson = currentLesson === lessons.length - 1
  const isCompleted = completedLessons.has(lesson.id)

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
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/learn/finance-fundamentals"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back to Finance Fundamentals
            </Link>
            <div className="text-sm text-gray-400">
              {timeSpent > 0 && `${timeSpent} min spent`}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">What is Money?</h1>
              <p className="text-gray-300">Understanding the fundamentals of money and its evolution</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Progress</div>
              <div className="text-2xl font-bold text-blue-400">{Math.round(progress)}%</div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-gray-700 rounded-full h-2 mb-8"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Lessons</h3>
              <div className="space-y-2">
                {lessons.map((lessonItem, index) => (
                  <button
                    key={lessonItem.id}
                    onClick={() => {
                      setCurrentLesson(index)
                      setSelectedAnswer(null)
                      setShowAnswer(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentLesson
                        ? 'bg-blue-600/20 border border-blue-500/30 text-white'
                        : completedLessons.has(lessonItem.id)
                        ? 'bg-green-600/10 text-green-300 hover:bg-green-600/20'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {completedLessons.has(lessonItem.id) ? (
                          <FaCheck className="w-4 h-4 text-green-400 mr-2" />
                        ) : index === currentLesson ? (
                          <FaPlay className="w-4 h-4 text-blue-400 mr-2" />
                        ) : (
                          <div className="w-4 h-4 border border-gray-500 rounded-full mr-2" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{lessonItem.title}</div>
                          <div className="text-xs text-gray-400">{lessonItem.duration}</div>
                        </div>
                      </div>
                      {lessonItem.type === 'quiz' && <FaQuestionCircle className="w-4 h-4 text-yellow-400" />}
                      {lessonItem.type === 'interactive' && <FaLightbulb className="w-4 h-4 text-purple-400" />}
                      {lessonItem.type === 'reading' && <FaBook className="w-4 h-4 text-blue-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              {/* Lesson Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    lesson.type === 'quiz' ? 'bg-yellow-500/10' :
                    lesson.type === 'interactive' ? 'bg-purple-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    {lesson.type === 'quiz' && <FaQuestionCircle className="w-5 h-5 text-yellow-400" />}
                    {lesson.type === 'interactive' && <FaLightbulb className="w-5 h-5 text-purple-400" />}
                    {lesson.type === 'reading' && <FaBook className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{lesson.content.title}</h2>
                    <div className="flex items-center text-gray-400 text-sm">
                      <FaClock className="w-4 h-4 mr-1" />
                      {lesson.duration}
                      <span className="mx-2">•</span>
                      Lesson {lesson.id} of {lessons.length}
                    </div>
                  </div>
                </div>
                {isCompleted && (
                  <div className="flex items-center text-green-400">
                    <FaCheck className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                )}
              </div>

              {/* Lesson Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {lesson.content.text}
                    </p>

                    {/* Points/List Content */}
                    {lesson.content.points && (
                      <ul className="space-y-3 mb-6">
                        {lesson.content.points.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start text-gray-300"
                          >
                            <FaCheck className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* Interactive Quiz Content */}
                    {lesson.content.interactive && (
                      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-white mb-4">
                          {lesson.content.interactive.question}
                        </h3>
                        <div className="space-y-3">
                          {lesson.content.interactive.options.map((option, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showAnswer}
                              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                                selectedAnswer === index
                                  ? index === lesson.content.interactive!.correct
                                    ? 'bg-green-600/20 border-green-500 text-green-300'
                                    : 'bg-red-600/20 border-red-500 text-red-300'
                                  : showAnswer && index === lesson.content.interactive!.correct
                                  ? 'bg-green-600/20 border-green-500 text-green-300'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  selectedAnswer === index || (showAnswer && index === lesson.content.interactive!.correct)
                                    ? 'border-current'
                                    : 'border-gray-500'
                                }`}>
                                  {(selectedAnswer === index || (showAnswer && index === lesson.content.interactive!.correct)) && (
                                    <div className="w-3 h-3 rounded-full bg-current"></div>
                                  )}
                                </div>
                                {option}
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Answer Explanation */}
                        {showAnswer && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg"
                          >
                            <h4 className="text-lg font-semibold text-blue-300 mb-2">Explanation</h4>
                            <p className="text-gray-300">{lesson.content.interactive.explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentLesson === 0}
                  className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {isLastLesson && isCompleted ? (
                  <Link href="/learn/finance-fundamentals">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <FaTrophy className="w-4 h-4 mr-2" />
                      Module Complete! +250 XP
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={lesson.type === 'quiz' && !showAnswer}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLastLesson ? 'Complete Module' : 'Next Lesson'}
                    <FaArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}