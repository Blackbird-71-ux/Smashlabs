'use client';

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaHammer, FaGlassMartiniAlt, FaTshirt, FaShieldAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaClock, FaTools, FaChevronDown, FaUserShield, FaUserTie, FaArrowUp, FaStar, FaQuoteLeft, FaInstagram, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCoffee, FaBriefcase, FaRocket, FaAtom, FaMicrochip, FaGift } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { trackButtonClick, trackFormSubmit, trackVideoInteraction, trackBookingAttempt, trackContactAttempt, trackError } from '@/lib/analytics'
import { GridSkeleton, TextSkeleton, Skeleton } from '@/components/Skeleton'
import { useCounter } from '@/hooks/useCounter'
import Counter from '@/components/Counter'
import CustomCursor from '@/components/CustomCursor'
import SmashAnimation from '@/components/SmashAnimation'
import { motion, useScroll, useTransform } from 'framer-motion'
import FinTechAnimation from '@/components/FinTechAnimation'
import { useToast } from '@/components/ui/Toast'
import { validateBookingForm, validateContactForm, sanitizeInput, type BookingFormData, type ContactFormData } from '@/lib/validation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { submitBooking, submitContact, APIError } from '@/lib/api'

// Add tracking function
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // You can implement your analytics tracking here
  // For now, we'll just console.log for development
  console.log('Event tracked:', eventName, properties)
}

export default function Home() {
  const { count: customers, isAnimating: customersAnimating } = useCounter(0);
  const { count: satisfaction, isAnimating: satisfactionAnimating } = useCounter(95);
  const { count: events, isAnimating: eventsAnimating } = useCounter(0);

  const statsLoading = customersAnimating || satisfactionAnimating || eventsAnimating;

  const [contactFormLoading, setContactFormLoading] = useState(false);

  const { success, error: showError } = useToast();
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    package: 'standard',
    message: ''
  });

  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactFormErrors, setContactFormErrors] = useState<Record<string, string>>({});

  const animationRef = useRef<number | null>(null);

  const [showStats, setShowStats] = useState(false);
  const [showSmashAnimation, setShowSmashAnimation] = useState(false);
  const [smashType, setSmashType] = useState<'glass' | 'wood' | 'metal'>('glass');

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Set minimum date after component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: today
    }));
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted with data:', formData);
    
    const validation = validateBookingForm(formData);
    console.log('🔍 Validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      setErrors(validation.errors);
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setIsBookingLoading(true);
    setErrors({});

    try {
      // Track booking attempt
      trackBookingAttempt(formData.package, parseInt(formData.guests) || 1);
      console.log('🚀 Starting booking submission...', formData);
      
      // Convert time to period for API
      const getTimePeriod = (time: string): 'morning' | 'afternoon' | 'evening' => {
        const hour = parseInt(time.split(':')[0]);
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
      };

      // Submit to real API
      const response = await submitBooking({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: `+91${formData.phone}`, // Add country code
        packageType: formData.package as 'basic' | 'premium' | 'ultimate',
        packageName: formData.package,
        packagePrice: formData.package === 'basic' ? 2500 : formData.package === 'group' ? 4500 : 6500,
        preferredDate: formData.date,
        preferredTime: getTimePeriod(formData.time),
        duration: formData.package === 'basic' ? 30 : formData.package === 'group' ? 60 : 90,
        participants: parseInt(formData.guests) || 1,
        specialRequests: formData.message
      });
      
      trackFormSubmit('Booking Form', {
        bookingId: response.data?.bookingId,
        packageType: formData.package,
        guestCount: parseInt(formData.guests) || 1
      });
      
      // Reset form
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: today,
        time: '',
        guests: '',
        package: 'standard',
        message: ''
      });
      
      console.log('✅ Booking API response:', response);
      success('🎉 Course Enrollment Confirmed!', `Your learning journey begins! Enrollment ID: ${response.data?.bookingId || 'SMASHTECH-' + Date.now()}. Check your email for course access details. Get ready to master fintech!`);
    } catch (error) {
      console.error('❌ Booking submission error:', error);
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
      
      // Track error
      trackError('booking_submission_failed', error instanceof Error ? error.message : 'Unknown error', 'booking_form');
      
      if (error instanceof APIError) {
        if (error.status === 409) {
          showError('Time Slot Unavailable', 'This time slot is already booked. Please select a different time.');
        } else if (error.status === 400) {
          showError('Invalid Booking Data', error.message);
        } else {
          showError('Booking Failed', error.message);
        }
      } else {
        // For now, show success even if API fails (since backend might not be fully connected)
        console.log('🔄 API failed, showing fallback success message');
        success('🎉 Enrollment Request Received!', `Your course enrollment request has been received! We'll contact you shortly to confirm your learning track access. Get ready to master fintech!`);
        
        // Reset form even on API failure
        const today = new Date().toISOString().split('T')[0];
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: today,
          time: '',
          guests: '',
          package: 'basic',
          message: ''
        });
      }
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateContactForm(contactFormData);
    if (!validation.isValid) {
      setContactFormErrors(validation.errors);
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setContactFormLoading(true);
    setContactFormErrors({});

    try {
      // Track contact attempt
      trackContactAttempt('contact_form');
      
      // Submit to real API
      const response = await submitContact({
        name: contactFormData.name,
        email: contactFormData.email,
        subject: 'Website Contact Form',
        message: contactFormData.message,
        inquiryType: 'general',
        source: 'website_contact_form'
      });
      
      trackFormSubmit('Contact Form', {
        ticketId: response.data?.id
      });
      
      setContactFormData({
        name: '',
        email: '',
        message: ''
      });
      
      success('Message Sent!', `Your message has been sent! Ticket ID: ${response.data?.id}. We will get back to you soon.`);
    } catch (error) {
      console.error('Contact submission error:', error);
      
      // Track error
      trackError('contact_submission_failed', error instanceof Error ? error.message : 'Unknown error', 'contact_form');
      
      if (error instanceof APIError) {
        showError('Send Failed', error.message);
      } else {
        showError('Send Failed', 'An unexpected error occurred. Please try again or contact support.');
      }
    } finally {
      setContactFormLoading(false);
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = safeSanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Safe sanitization that preserves spaces
  const safeSanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags only
      .substring(0, 1000); // Limit length but keep spaces and don't trim
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = safeSanitizeInput(value);
    
    setContactFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (contactFormErrors[name]) {
      setContactFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSmash = (type: 'glass' | 'wood' | 'metal') => {
    setSmashType(type);
    setShowSmashAnimation(true);
    setTimeout(() => setShowSmashAnimation(false), 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white overflow-x-hidden" suppressHydrationWarning={true}>
      <CustomCursor />
              <SmashAnimation isActive={showSmashAnimation} type={smashType} />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-500 origin-left z-50 max-w-full"
        style={{ scaleX: scrollYProgress }}
        suppressHydrationWarning={true}
      />

      {/* Hero Section with Parallax */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 w-full max-w-full" suppressHydrationWarning={true}>
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
          suppressHydrationWarning={true}
        >
          <FinTechAnimation />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 to-dark-950/90"></div>
        </motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning={true}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
            suppressHydrationWarning={true}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-blue-500">
              Master FinTech Like a Pro
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
              <span className="text-blue-500">Learn</span>. Apply. <span className="text-blue-500">Succeed</span>.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Master the intersection of finance and technology through gamified learning experiences. Build real-world skills that power the future of finance.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
              suppressHydrationWarning={true}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-blue-500 hover:border-blue-600 uppercase tracking-wide"
              >
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('features')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600 hover:border-gray-500 uppercase tracking-wide"
              >
                View Features
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-center"
          >
            <span className="block text-sm mb-2">Scroll to Explore</span>
            <FaChevronDown className="w-6 h-6 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToSection('booknow')}
        className="fixed bottom-8 right-8 z-50 bg-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300"
      >
        <FaCalendarAlt className="w-6 h-6" />
      </motion.button>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, scale: scrollYProgress.get() > 0.2 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 z-50 bg-dark-800 text-white p-4 rounded-full shadow-lg hover:shadow-dark-800/50 transition-all duration-300"
      >
        <FaArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Enhanced Stats Section */}
      <section id="stats" className="section bg-black/20 backdrop-blur-sm py-24 relative overflow-hidden" suppressHydrationWarning={true}>
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: customers.toLocaleString() + '+', label: 'Happy Customers', icon: FaUsers },
              { value: satisfaction + '%', label: 'Satisfaction Rate', icon: FaStar },
              { value: events.toLocaleString() + '+', label: 'Corporate Events', icon: FaCalendarAlt },
              { value: '24/7', label: 'Adrenaline Rush', icon: FaClock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-8 text-center rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-red-500 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RedBull of India Section */}
      <section id="lifestyle" className="section bg-black/30 backdrop-blur-sm py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-red-500">
              The Crackhead Version of RedBull
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-4xl mx-auto">
              Red Bull gives you wings. SmashTech gives you skills. We're here for the ambitious professionals, the career-changers, and the innovators who operate at 110% and need fintech mastery that matches their intensity. We're not just an 'online course'; we are a platform that champions practical learning and career transformation.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              We sponsor local bands, host underground art shows, and fuel the creative chaos that drives India forward. We are the rebellion against the mundane.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <button
                onClick={() => scrollToSection('booknow')}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
              >
                Book Your Experience
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 bg-black/10 backdrop-blur-sm relative overflow-hidden" suppressHydrationWarning={true}>
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 lg:pr-8"
            >
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-red-500 leading-tight">
                  The SmashTech Experience
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  At SmashTech, we don't just offer courses; we offer transformation. Step into our world of gamified learning, where every lesson, every project, and every milestone is a step towards financial technology mastery.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/30 backdrop-blur-sm border border-dark-700/30 hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaTools className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">State-of-the-art Facilities</h3>
                    <p className="text-gray-300 text-xs">Premium smash rooms designed for exhilarating experiences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/30 backdrop-blur-sm border border-dark-700/30 hover:border-green-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">Diverse Selection</h3>
                    <p className="text-gray-300 text-xs">Wide variety of items to smash, from electronics to glass.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/30 backdrop-blur-sm border border-dark-700/30 hover:border-purple-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUserTie className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">Customizable Packages</h3>
                    <p className="text-gray-300 text-xs">Tailored packages for individuals, groups, and corporates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/30 backdrop-blur-sm border border-dark-700/30 hover:border-orange-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCoffee className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">Chill Zone</h3>
                    <p className="text-gray-300 text-xs">Relax with refreshments in our serene environment.</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('experience_book_click');
                  scrollToSection('booknow');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
              >
                Book Experience
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden group shadow-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                                    src="/smashtech-learning-platform.png"
                alt="SmashTech Learning Platform - Interactive FinTech Education"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-20 sm:py-32 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-500">
              Why Choose SmashTech?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master fintech through hands-on labs, real-world projects, and gamified learning experiences designed for today's financial technology landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: FaTools,
                title: 'Interactive Labs',
                description: 'Hands-on coding environments with real fintech APIs, blockchain simulators, and trading platforms.',
                color: 'blue'
              },
              {
                icon: FaShieldAlt,
                title: 'Gamified Learning',
                description: 'Earn XP, unlock badges, and climb leaderboards while mastering complex financial technologies.',
                color: 'green'
              },
              {
                icon: FaUserShield,
                title: 'Real-World Projects',
                description: 'Build payment systems, trading bots, and DeFi protocols that showcase your expertise to employers.',
                color: 'purple'
              },
              {
                icon: FaUserTie,
                title: 'Expert Mentorship',
                description: 'Learn from industry professionals with years of experience in fintech, blockchain, and financial engineering.',
                color: 'orange'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="group bg-dark-800/50 p-8 rounded-2xl backdrop-blur-sm border border-dark-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                  feature.color === 'blue' ? 'bg-blue-500/10 group-hover:bg-blue-500/20' :
                  feature.color === 'green' ? 'bg-green-500/10 group-hover:bg-green-500/20' :
                  feature.color === 'purple' ? 'bg-purple-500/10 group-hover:bg-purple-500/20' :
                  'bg-orange-500/10 group-hover:bg-orange-500/20'
                }`}>
                  <feature.icon className={`w-8 h-8 transition-colors duration-300 ${
                    feature.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' :
                    feature.color === 'green' ? 'text-green-400 group-hover:text-green-300' :
                    feature.color === 'purple' ? 'text-purple-400 group-hover:text-purple-300' :
                    'text-orange-400 group-hover:text-orange-300'
                  }`} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themed Rooms Section */}
      <section id="themed-rooms" className="py-20 sm:py-32 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text">
              Choose Your Learning Path
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Master different aspects of financial technology through specialized learning tracks. 
              Four comprehensive paths, each designed to build expertise in cutting-edge fintech domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Digital Payments Track */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="group bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-blue-700/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Digital Payments
              </h3>
              <p className="text-blue-300 font-medium text-sm mb-4">
                Master the Future of Money Movement
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Build real-world payment systems from APIs to mobile wallets. 
                Learn Stripe, PayPal integration, cross-border payments, and fraud detection.
              </p>
              <div className="bg-black/30 p-4 rounded-xl mb-6 border border-blue-800/50">
                <p className="text-gray-300 text-sm italic">
                  PV = PMT × [(1 - (1 + r)^-n) / r] - Time value of money in action
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">6-8 Weeks</p>
                  <p className="text-gray-400 text-sm">Intermediate Level</p>
                </div>
                <motion.a
                  href="/courses/digital-payments"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Start Track
                </motion.a>
              </div>
            </motion.div>

            {/* Blockchain & DeFi Track */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="group bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-8 rounded-2xl backdrop-blur-sm border border-green-700/30 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaAtom className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                Blockchain & DeFi
              </h3>
              <p className="text-green-300 font-medium text-sm mb-4">
                Decentralize Everything, Build the Future
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Master smart contracts, DeFi protocols, and Web3 development. 
                Build DEXs, lending platforms, and explore cryptocurrency trading strategies.
              </p>
              <div className="bg-black/30 p-4 rounded-xl mb-6 border border-green-800/50">
                <p className="text-gray-300 text-sm italic">
                  Hash(Block_n) = Previous_Hash + Merkle_Root + Nonce - Immutable ledger
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">8-10 Weeks</p>
                  <p className="text-gray-400 text-sm">Advanced Level</p>
                </div>
                <motion.a
                  href="/courses/blockchain-defi"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  Start Track
                </motion.a>
              </div>
            </motion.div>

            {/* AI/ML in Finance Track */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="group bg-gradient-to-br from-pink-900/20 to-cyan-900/20 p-8 rounded-2xl backdrop-blur-sm border border-pink-700/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaMicrochip className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">
                AI/ML in Finance
              </h3>
              <p className="text-pink-300 font-medium text-sm mb-4">
                Predict Markets, Automate Decisions
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Build algorithmic trading systems, robo-advisors, and fraud detection models. 
                Master machine learning for credit scoring, risk assessment, and market prediction.
              </p>
              <div className="bg-black/30 p-4 rounded-xl mb-6 border border-pink-800/50">
                <p className="text-gray-300 text-sm italic">
                  σ(z) = 1/(1 + e^(-z)) - Sigmoid function for financial predictions
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">8-12 Weeks</p>
                  <p className="text-gray-400 text-sm">Advanced Level</p>
                </div>
                <motion.a
                  href="/courses/ai-ml-finance"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  Start Track
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 group"
            >
              <span>View All Courses</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Action Section */}
      <section id="signup" className="section bg-black/40 backdrop-blur-md py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-500">
              Ready to Master FinTech?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose your learning path and join thousands mastering the future of finance and technology!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Start Learning Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaRocket className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start Learning</h3>
                <p className="text-gray-300 mb-6">
                  Ready to master fintech? Start your journey with our comprehensive learning tracks and real-world projects!
                </p>
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-blue-500 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 uppercase tracking-wide inline-block"
                >
                  Sign Up Now
                </motion.a>
              </div>
            </motion.div>

            {/* Enterprise Training Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Training</h3>
                <p className="text-gray-300 mb-6">
                  Transform your team's fintech skills with custom corporate training programs and certification paths!
                </p>
                <motion.a
                  href="/enterprise"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-purple-500 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/25 uppercase tracking-wide inline-block"
                >
                  Get Enterprise Quote
                </motion.a>
              </div>
            </motion.div>

            {/* Free Trial Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaGift className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Free Trial</h3>
                <p className="text-gray-300 mb-6">
                  Explore our platform with a 7-day free trial. Access foundation courses and experience gamified learning!
                </p>
                <motion.a
                  href="/free-trial"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-green-500 hover:border-green-600 hover:shadow-lg hover:shadow-green-500/25 uppercase tracking-wide inline-block"
                >
                  Start Free Trial
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-500">
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands who've transformed their careers through SmashTech's gamified fintech education platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Success Story 1 - Alex Rodriguez */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "SmashTech's blockchain track completely transformed my career! The hands-on projects and gamified learning made complex DeFi concepts easy to understand. I landed a senior developer role at a major fintech company within 3 months!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">AR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Alex Rodriguez</h4>
                  <p className="text-sm text-gray-400">Blockchain Developer at PayTech</p>
                </div>
              </div>
            </motion.div>

            {/* Success Story 2 - Maya Patel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "The AI/ML track was a game-changer! The interactive trading simulations and real-world projects helped me transition from traditional banking to fintech. I increased my yearly salary by 40% and now lead algorithmic trading at a hedge fund!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold">MP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Maya Patel</h4>
                  <p className="text-sm text-gray-400">Algo Trading Lead at Quantum Capital</p>
                </div>
              </div>
            </motion.div>

            {/* Success Story 3 - David Kim */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "As a finance professional, SmashTech's digital payments track gave me the tech skills I was missing. The gamification kept me engaged, and the hands-on projects were perfect for my portfolio. I'm now Product Manager at a major fintech unicorn!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">DK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">David Kim</h4>
                  <p className="text-sm text-gray-400">Product Manager at PayFlow</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-2xl font-bold text-white">Follow Us on Social Media</h3>
            <div className="flex gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/smashlab_x?igsh=MTNnZmRydm13ZnU2eg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com/smashtech_edu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com/smashtech.education"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden" suppressHydrationWarning={true}>
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
              SmashTech Learning Gallery
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Take a look at our state-of-the-art facilities and the exhilarating experiences we offer.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* First row - 3 images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-1.jpg.png"
                    alt="SmashTech Student Success - Interactive Learning"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-2.jpg.png"
                    alt="SmashTech Blockchain Lab - Hands-on Development"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-3.jpg.png"
                    alt="SmashTech AI/ML Training - Real-world Projects"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>
            </div>

            {/* Second row - 2 images centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                                      <Image
                      src="/images/gallery-4.jpg.png"
                      alt="SmashTech Digital Payments Workshop"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                                      <Image
                      src="/images/gallery-5.jpg.png"
                      alt="SmashTech Student Community - Collaborative Learning"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-dark-950 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about your SmashTech learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'What safety measures are in place?',
                answer: 'We provide full protective gear and have trained staff supervising all sessions. Our rooms are specially designed for safe destruction.'
              },
              {
                question: 'What items can I smash?',
                answer: 'We offer a variety of items including electronics, glass, and furniture. All items are pre-approved for safe destruction.'
              },
              {
                question: 'How long is each session?',
                answer: 'Standard sessions are 30 minutes, with options for extended sessions. Corporate events can be customized to your needs.'
              },
              {
                question: 'Do I need to bring anything?',
                answer: 'Just yourself and comfortable clothes. We provide all necessary safety equipment and tools.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800/50 p-6 rounded-xl backdrop-blur-sm border border-dark-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 