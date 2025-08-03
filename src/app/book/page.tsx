'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header with Back Button */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              ← Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Book Your <span className="text-red-500">Smash</span>
              <br className="sm:hidden" />
              <span className="sm:inline"> Session</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Ready to master fintech? Enroll in your learning track now and experience career transformation!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Individual Booking Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💥</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Enroll in <span className="text-blue-500">FinTech</span> Course
            </h2>
            <p className="text-gray-300 mb-6">
              Ready to unleash your stress? Fill out the form below and we'll confirm your booking!
            </p>
          </div>
          
          <BookingForm />
        </motion.div>


      </div>
    </div>
  );
} 