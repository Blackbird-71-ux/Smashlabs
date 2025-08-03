'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaLightbulb, FaRedo } from 'react-icons/fa'

interface KnowledgeItem {
  id: string
  statement: string
  isTrue: boolean
  explanation: string
}

interface KnowledgeCheckProps {
  title?: string
  items: KnowledgeItem[]
  onComplete?: (score: number) => void
}

export default function KnowledgeCheck({ 
  title = "Knowledge Check",
  items,
  onComplete
}: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<{ [key: string]: boolean | null }>({})
  const [showResults, setShowResults] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleAnswer = (itemId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [itemId]: answer }))
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setShowResults(true)
      const score = items.reduce((acc, item) => {
        return acc + (answers[item.id] === item.isTrue ? 1 : 0)
      }, 0)
      onComplete?.(score)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setCurrentIndex(0)
  }

  const currentItem = items[currentIndex]
  const hasAnswered = answers[currentItem?.id] !== undefined && answers[currentItem?.id] !== null
  const progress = ((currentIndex + 1) / items.length) * 100

  if (showResults) {
    const score = items.reduce((acc, item) => {
      return acc + (answers[item.id] === item.isTrue ? 1 : 0)
    }, 0)
    const percentage = Math.round((score / items.length) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 80 ? 'bg-green-500/20 text-green-400' : 
              percentage >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-orange-500/20 text-orange-400'
            }`}
          >
            {percentage >= 80 ? (
              <FaCheck className="w-8 h-8" />
            ) : (
              <FaLightbulb className="w-8 h-8" />
            )}
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Work!' : 'Keep Learning!'}
          </h3>
          
          <p className="text-gray-300 mb-6">
            You got {score} out of {items.length} correct ({percentage}%)
          </p>

          {/* Results Breakdown */}
          <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
            {items.map((item, index) => {
              const userAnswer = answers[item.id]
              const isCorrect = userAnswer === item.isTrue
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    isCorrect 
                      ? 'bg-green-600/10 border-green-500/20' 
                      : 'bg-red-600/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <FaCheck className="w-3 h-3 text-white" />
                      ) : (
                        <FaTimes className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">{item.statement}</p>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Correct answer: </span>
                        {item.isTrue ? 'True' : 'False'}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Your answer: {userAnswer ? 'True' : 'False'}
                      </div>
                      <div className="mt-2 text-sm text-gray-300 bg-black/20 rounded p-2">
                        {item.explanation}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <FaRedo className="w-4 h-4 mr-2" />
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold"
            >
              Continue Learning
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-sm text-gray-400">
          {currentIndex + 1} of {items.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h4 className="text-lg font-semibold text-white mb-8">
            {currentItem.statement}
          </h4>

          {/* True/False Buttons */}
          <div className="flex justify-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(currentItem.id, true)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
                answers[currentItem.id] === true
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-green-600/20 border border-white/20'
              }`}
            >
              TRUE
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(currentItem.id, false)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
                answers[currentItem.id] === false
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-red-600/20 border border-white/20'
              }`}
            >
              FALSE
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!hasAnswered}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentIndex === items.length - 1 ? 'See Results' : 'Next'}
        </motion.button>
      </div>
    </motion.div>
  )
}