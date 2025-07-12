'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debug, info, warn, error, logApiCall, logUserAction, logValidation } from '@/lib/clientLogger';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  package: string;
  room: string;
  participants: string;
  specialRequests: string;
}

interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  package?: string;
  room?: string;
  participants?: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    package: '',
    room: '',
    participants: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSmashAnimation, setShowSmashAnimation] = useState(false);

  const packages = [
    { value: 'quick', label: 'Quick Smash (30 min) - ₹2,500' },
    { value: 'team', label: 'Team Smash (60 min) - ₹4,500' },
    { value: 'corporate', label: 'Corporate Smash (90 min) - ₹6,500' }
  ];

  const rooms = [
    { value: 'theory-of-relativity', label: 'Theory of Relativity - ₹3,500 (45 min)' },
    { value: 'quantum-theory', label: 'Quantum Theory - ₹4,000 (50 min)' },
    { value: 'cyberpunk-dystopian', label: 'Cyberpunk Dystopian - ₹4,500 (60 min)' }
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.package) newErrors.package = 'Package is required';
    if (!formData.room) newErrors.room = 'Room selection is required';
    if (!formData.participants) newErrors.participants = 'Number of participants is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    logUserAction('Booking form submitted', { formData });
    
    if (!validateForm()) {
      logValidation('booking-form', 'Form validation failed', { errors });
      return;
    }
    
    info('Booking form validation passed');
    setIsLoading(true);
    
    try {
      // Map frontend data to backend expected format
      const packageMapping: { [key: string]: { type: string; name: string; price: number; duration: number } } = {
        'quick': { type: 'basic', name: 'Quick Smash (30 min)', price: 2500, duration: 30 },
        'team': { type: 'premium', name: 'Team Smash (60 min)', price: 4500, duration: 60 },
        'corporate': { type: 'ultimate', name: 'Corporate Smash (90 min)', price: 6500, duration: 90 }
      };

      // Map time slots to time periods
      const timeMapping: { [key: string]: string } = {
        '10:00 AM': 'morning',
        '11:00 AM': 'morning',
        '12:00 PM': 'afternoon',
        '1:00 PM': 'afternoon',
        '2:00 PM': 'afternoon',
        '3:00 PM': 'afternoon',
        '4:00 PM': 'afternoon',
        '5:00 PM': 'evening',
        '6:00 PM': 'evening',
        '7:00 PM': 'evening',
        '8:00 PM': 'evening'
      };

      const selectedPackage = packageMapping[formData.package];
      const mappedTime = timeMapping[formData.time];

      debug('Package and time mapping', { 
        selectedPackage, 
        mappedTime,
        originalPackage: formData.package,
        originalTime: formData.time
      });

      if (!selectedPackage) {
        error('Invalid package selected', { package: formData.package });
        alert(`Invalid package selected: ${formData.package}`);
        return;
      }

      if (!mappedTime) {
        error('Invalid time selected', { time: formData.time });
        alert(`Invalid time selected: ${formData.time}`);
        return;
      }

      // Convert date to ISO format for backend
      const dateObj = new Date(formData.date + 'T10:00:00.000Z');
      debug('Date conversion', { 
        originalDate: formData.date, 
        convertedDate: dateObj.toISOString() 
      });

      const backendData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        packageType: selectedPackage.type,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        preferredDate: dateObj.toISOString(),
        preferredTime: mappedTime,
        duration: selectedPackage.duration,
        participants: parseInt(formData.participants),
        selectedRoom: formData.room,
        specialRequests: formData.specialRequests || ''
      };

      const apiUrl = 'https://smashlabs-backend-production.up.railway.app/api/bookings';
      const startTime = Date.now();
      
      debug('Sending booking data to backend', { 
        backendData, 
        apiUrl 
      });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });
      
      const duration = Date.now() - startTime;
      logApiCall('POST', apiUrl, response.status, duration);
      
      if (response.ok) {
        const successData = await response.json();
        info('Booking successful', { 
          bookingId: successData.data?.bookingId || 'N/A',
          customerName: backendData.customerName
        });
        setShowSmashAnimation(true);
        setTimeout(() => {
          setShowSmashAnimation(false);
          setIsSuccess(true);
        }, 2000);
      } else {
        const errorData = await response.json();
        error('Booking failed', {
          responseData: errorData,
          responseStatus: response.status,
          responseHeaders: Object.fromEntries(response.headers.entries())
        });
        
        let errorMessage = 'Please try again.';
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.errors && errorData.errors.length > 0) {
          errorMessage = errorData.errors.map((err: any) => err.msg || err.message).join(', ');
        }
        
        warn('Booking error presented to user', { errorMessage });
        alert(`Booking failed: ${errorMessage}`);
      }
    } catch (err) {
      error('Network/JavaScript error during booking', {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      alert('Booking failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
      debug('Booking form submission completed');
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      name: '', email: '', phone: '', date: '', time: '', 
      package: '', room: '', participants: '', specialRequests: ''
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Booking <span className="text-red-500">Smashed</span> Successfully!
        </h3>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Your stress relief session has been booked! We'll send you a confirmation email shortly.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetForm}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600 hover:border-gray-500 uppercase tracking-wide"
        >
          Book Another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSmashAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: 0 }}
              animate={{ scale: [0.5, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-8xl"
            >
              💥
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-2">
                <span className="text-red-500">SMASH</span> BOOKED!
              </h2>
              <p className="text-gray-300">Processing your booking...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Enter your full name"
              style={{ fontSize: '16px' }} // Prevents iOS zoom
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Enter your email"
              style={{ fontSize: '16px' }} // Prevents iOS zoom
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-base text-gray-300 bg-black/30 border border-r-0 border-white/20 rounded-l-lg">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`flex-1 px-4 py-4 text-base bg-black/30 border rounded-r-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.phone ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter 10-digit phone number"
                style={{ fontSize: '16px' }} // Prevents iOS zoom
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Participants */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Number of Participants *
            </label>
            <select
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.participants ? 'border-red-500' : 'border-white/20'
              }`}
              style={{ fontSize: '16px' }} // Prevents iOS zoom
            >
              <option value="">Select participants</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
            </select>
            {errors.participants && <p className="text-red-400 text-sm mt-1">{errors.participants}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.date ? 'border-red-500' : 'border-white/20'
              }`}
              style={{ fontSize: '16px' }} // Prevents iOS zoom
            />
            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-3">
              Preferred Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.time ? 'border-red-500' : 'border-white/20'
              }`}
              style={{ fontSize: '16px' }} // Prevents iOS zoom
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>

        {/* Package */}
        <div>
          <label className="block text-base font-medium text-gray-300 mb-3">
            Choose Your Package *
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
              errors.package ? 'border-red-500' : 'border-white/20'
            }`}
            style={{ fontSize: '16px' }} // Prevents iOS zoom
          >
            <option value="">Select a package</option>
            {packages.map(pkg => (
              <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
            ))}
          </select>
          {errors.package && <p className="text-red-400 text-sm mt-1">{errors.package}</p>}
        </div>

        {/* Room Selection */}
        <div>
          <label className="block text-base font-medium text-gray-300 mb-3">
            Choose Your Reality *
          </label>
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            className={`w-full px-4 py-4 text-base bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
              errors.room ? 'border-red-500' : 'border-white/20'
            }`}
            style={{ fontSize: '16px' }} // Prevents iOS zoom
          >
            <option value="">Select a themed room</option>
            {rooms.map(room => (
              <option key={room.value} value={room.value}>{room.label}</option>
            ))}
          </select>
          {errors.room && <p className="text-red-400 text-sm mt-1">{errors.room}</p>}
          <p className="text-gray-400 text-sm mt-2">
            🚀 Theory of Relativity | ⚛️ Quantum Theory | 🔮 Cyberpunk Dystopian
          </p>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-base font-medium text-gray-300 mb-3">
            Special Requests (Optional)
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-4 text-base bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            placeholder="Any special requests or requirements?"
            style={{ fontSize: '16px' }} // Prevents iOS zoom
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg text-base font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Booking...
            </>
          ) : (
            <>
              💥 Book Session
            </>
          )}
        </motion.button>
      </form>
    </>
  );
} 