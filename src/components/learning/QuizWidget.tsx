'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaLightbulb } from 'react-icons/fa'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points?: number
}

interface QuizWidgetProps {
  questions: QuizQuestion[]
  onComplete: (score: number, answers: number[]) => void
  title?: string
  showProgress?: boolean
}

export default function QuizWidget({ 
  questions, 
  onComplete, 
  title = "Knowledge Check",
  showProgress = true 
}: QuizWidgetProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setShowExplanation(false)
    } else {
      // Calculate final score
      const finalScore = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)
      
      setScore(finalScore)
      setIsCompleted(true)
      onComplete(finalScore, selectedAnswers)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowExplanation(false)
    setIsCompleted(false)
    setScore(0)
  }

  const isCorrect = selectedAnswers[currentQuestion] === question?.correctAnswer
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

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
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
            }`}
          >
            {passed ? (
              <FaCheck className="w-10 h-10" />
            ) : (
              <FaLightbulb className="w-10 h-10" />
            )}
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {passed ? 'Excellent Work!' : 'Good Effort!'}
          </h3>
          
          <p className="text-gray-300 mb-6">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>

          <div className="flex justify-center space-x-4">
            {!passed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Again
              </motion.button>
            )}
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
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
          />
        </div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-white mb-6">
            {question.question}
          </h4>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: hasAnswered ? 1 : 1.02 }}
                whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                onClick={() => !hasAnswered && handleAnswerSelect(index)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? index === question.correctAnswer
                      ? 'bg-green-600/20 border-green-500 text-green-300'
                      : 'bg-red-600/20 border-red-500 text-red-300'
                    : hasAnswered && index === question.correctAnswer
                    ? 'bg-green-600/20 border-green-500 text-green-300'
                    : hasAnswered
                    ? 'bg-white/5 border-white/10 text-gray-400'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 cursor-pointer'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index || (hasAnswered && index === question.correctAnswer)
                      ? 'border-current'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <>
                        {index === question.correctAnswer ? (
                          <FaCheck className="w-3 h-3" />
                        ) : (
                          <FaTimes className="w-3 h-3" />
                        )}
                      </>
                    )}
                    {hasAnswered && index === question.correctAnswer && selectedAnswers[currentQuestion] !== index && (
                      <FaCheck className="w-3 h-3" />
                    )}
                  </div>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg border mb-6 ${
                isCorrect 
                  ? 'bg-green-600/10 border-green-500/20' 
                  : 'bg-blue-600/10 border-blue-500/20'
              }`}
            >
              <div className="flex items-start">
                <FaLightbulb className={`w-5 h-5 mr-3 mt-0.5 ${
                  isCorrect ? 'text-green-400' : 'text-blue-400'
                }`} />
                <div>
                  <h5 className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-300' : 'text-blue-300'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h5>
                  <p className="text-gray-300 text-sm">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!hasAnswered}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}