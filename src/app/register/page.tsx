'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { validateContactForm, sanitizeInput, sanitizeInputPreserveSpaces, type ContactFormData } from '@/lib/validation';
import { submitRegistration, type CreateRegistrationRequest } from '@/lib/registrationApi';

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  hearAbout: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    interests: [],
    hearAbout: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const interestOptions = [
            'FinTech Career Growth',
    'Team Building',
    'Corporate Events',
    'Birthday Parties',
    'Date Night',
    'Solo Session',
    'Group Therapy',
    'Anger Management'
  ];

  const hearAboutOptions = [
    'Social Media',
    'Google Search',
    'Friend/Family',
    'Advertisement',
    'Event/Exhibition',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const showError = (title: string, message: string) => {
    setSubmitStatus('error');
    setSubmitMessage(`${title}: ${message}`);
    setTimeout(() => {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }, 5000);
  };

  const showSuccess = (message: string) => {
    setSubmitStatus('success');
    setSubmitMessage(message);
    setTimeout(() => {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }, 5000);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Registration form submitted with data:', formData);
    
    // Basic validation
    const basicValidation = validateContactForm({
      name: formData.name,
      email: formData.email,
      message: formData.message || 'Interest registration'
    });
    
    // Additional validation for registration
    const registrationErrors: Record<string, string> = {};
    
    if (!formData.phone.trim()) {
      registrationErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      registrationErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.interests.length === 0) {
      registrationErrors.interests = 'Please select at least one interest';
    }
    
    if (!formData.hearAbout) {
      registrationErrors.hearAbout = 'Please tell us how you heard about us';
    }
    
    const allErrors = { ...basicValidation.errors, ...registrationErrors };
    
    if (!basicValidation.isValid || Object.keys(registrationErrors).length > 0) {
      console.log('❌ Validation failed:', allErrors);
      setErrors(allErrors);
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('🚀 Submitting registration to API...');
      
      // Prepare registration data for the new API
      const registrationData: CreateRegistrationRequest = {
        name: sanitizeInput(formData.name),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        interests: formData.interests,
        hearAbout: formData.hearAbout,
        message: sanitizeInputPreserveSpaces(formData.message) || undefined
      };

      console.log('📤 Sending registration data:', registrationData);
      
      const result = await submitRegistration(registrationData);
      console.log('✅ Registration result:', result);

      if (result.success) {
        const registrationId = result.data?.registrationId || 'Unknown';
        showSuccess(`🎉 Registration Successful! Welcome to SmashTech Community! Your registration ID is: ${registrationId}`);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          interests: [],
          hearAbout: ''
        });
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('❌ Registration submission error:', error);
      
      if (error.message && error.message.includes('Email already registered')) {
        showError('Registration Error', 'This email is already registered. Please use a different email address.');
      } else {
        showError('Registration Error', error.message || 'Failed to submit registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
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
              Join the <span className="text-blue-500">SmashTech</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Community</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Be the first to know about our launch, exclusive offers, and stress-busting events!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-white font-medium mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-3 bg-white/5 border border-white/20 rounded-l-lg border-r-0">
                  <span className="text-white font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Interests */}
            <div>
              <label className="block text-white font-medium mb-4">
                What interests you about SmashTech? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-4 h-4 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span className="text-white text-sm">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="text-red-400 text-sm mt-1">{errors.interests}</p>}
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block text-white font-medium mb-2">
                How did you hear about SmashTech? *
              </label>
              <select
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="" className="bg-gray-800">Select an option</option>
                {hearAboutOptions.map((option) => (
                  <option key={option} value={option} className="bg-gray-800">
                    {option}
                  </option>
                ))}
              </select>
              {errors.hearAbout && <p className="text-red-400 text-sm mt-1">{errors.hearAbout}</p>}
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-white font-medium mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Tell us more about what you're looking for or any questions you have..."
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  'Join SmashTech Community 🚀'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}
              >
                {submitMessage}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}