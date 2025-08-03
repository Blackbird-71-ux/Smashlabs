'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLightbulb, FaPlay, FaChartBar, FaCoins, FaCreditCard, FaBitcoin } from 'react-icons/fa'

interface CardData {
  id: string
  title: string
  content: string
  type: 'fact' | 'example' | 'comparison' | 'timeline'
  icon?: any
  color?: string
}

interface InteractiveCardProps {
  title: string
  cards: CardData[]
  layout?: 'grid' | 'carousel' | 'stack'
}

const iconMap = {
  coins: FaCoins,
  card: FaCreditCard,
  bitcoin: FaBitcoin,
  chart: FaChartBar,
  lightbulb: FaLightbulb
}

export default function InteractiveCard({ 
  title,
  cards,
  layout = 'grid'
}: InteractiveCardProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const handleCardClick = (cardId: string) => {
    if (layout === 'stack') {
      setSelectedCard(selectedCard === cardId ? null : cardId)
    } else {
      setFlippedCards(prev => {
        const newSet = new Set(prev)
        if (newSet.has(cardId)) {
          newSet.delete(cardId)
        } else {
          newSet.add(cardId)
        }
        return newSet
      })
    }
  }

  const getCardColor = (type: string) => {
    switch (type) {
      case 'fact': return 'from-blue-600/20 to-cyan-600/20 border-blue-500/30'
      case 'example': return 'from-green-600/20 to-emerald-600/20 border-green-500/30'
      case 'comparison': return 'from-purple-600/20 to-pink-600/20 border-purple-500/30'
      case 'timeline': return 'from-orange-600/20 to-red-600/20 border-orange-500/30'
      default: return 'from-gray-600/20 to-gray-600/20 border-gray-500/30'
    }
  }

  if (layout === 'stack') {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
        
        <div className="relative h-64">
          {cards.map((card, index) => {
            const isSelected = selectedCard === card.id
            const isTop = index === cards.length - 1 && !selectedCard
            const shouldShow = isSelected || (!selectedCard && index === cards.length - 1)
            
            return (
              <motion.div
                key={card.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: shouldShow ? 1 : 0.9,
                  opacity: shouldShow ? 1 : 0.3,
                  y: shouldShow ? 0 : index * -4,
                  zIndex: isSelected ? 10 : cards.length - index
                }}
                whileHover={{ scale: shouldShow ? 1.02 : 0.9 }}
                onClick={() => handleCardClick(card.id)}
                className={`absolute inset-0 bg-gradient-to-br ${getCardColor(card.type)} rounded-lg p-6 cursor-pointer transition-all duration-300`}
                style={{ 
                  transformOrigin: 'center bottom',
                  boxShadow: shouldShow ? '0 10px 25px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <FaLightbulb className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{card.content}</p>
              </motion.div>
            )
          })}
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedCard === card.id || (!selectedCard && index === cards.length - 1)
                  ? 'bg-blue-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
      
      <div className={`grid gap-4 ${
        layout === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1'
      }`}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.has(card.id)
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCardClick(card.id)}
              className="relative h-32 cursor-pointer perspective-1000"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full transform-style-preserve-3d"
              >
                {/* Front of card */}
                <div className={`absolute inset-0 backface-hidden bg-gradient-to-br ${getCardColor(card.type)} rounded-lg p-4 flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaPlay className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">Click to explore</p>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className={`absolute inset-0 backface-hidden bg-gradient-to-br ${getCardColor(card.type)} rounded-lg p-4 transform rotateY-180`}>
                  <div className="h-full flex flex-col justify-center">
                    <p className="text-gray-200 text-sm leading-relaxed">{card.content}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}