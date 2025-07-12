const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const emailService = require('../services/emailService');
const Package = require('../models/Package');
const { sendBookingConfirmation, sendBookingUpdate } = require('../services/emailService');
const { info, error, warn, debug } = require('../services/logger');

// Validation middleware for booking
const validateBooking = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('date')
    .isDate()
    .custom((value) => {
      const bookingDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (bookingDate <= today) {
        throw new Error('Booking date must be in the future');
      }
      
      // Check if booking is within allowed advance period
      const maxAdvanceDays = 90; // 3 months in advance
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + maxAdvanceDays);
      
      if (bookingDate > maxDate) {
        throw new Error(`Bookings can only be made up to ${maxAdvanceDays} days in advance`);
      }
      
      return true;
    }),
  
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format')
    .custom((value) => {
      const [hours] = value.split(':');
      const hour = parseInt(hours);
      
      if (hour < 10 || hour >= 22) {
        throw new Error('Bookings are only available between 10:00 AM and 10:00 PM');
      }
      
      return true;
    }),
  
  body('guests')
    .isInt({ min: 1, max: 50 })
    .withMessage('Number of guests must be between 1 and 50'),
  
  body('package')
    .isIn(['basic', 'premium', 'ultimate', 'corporate'])
    .withMessage('Please select a valid package'),
  
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// GET /api/bookings - Get all bookings (with pagination and filtering)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build filter object
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.package) filter.package = req.query.package;
        if (req.query.email) filter.email = new RegExp(req.query.email, 'i');
        if (req.query.date) {
            const date = new Date(req.query.date);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);
            filter.date = { $gte: date, $lt: nextDay };
        }
        
        const bookings = await Booking.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Booking.countDocuments(filter);
        
        res.json({
            success: true,
            data: bookings,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalBookings: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (err) {
        error('Failed to fetch bookings', {
            error: err.message,
            stack: err.stack,
            requestId: req.id,
            query: req.query
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: err.message,
            requestId: req.id
        });
    }
});

// GET /api/bookings/:id - Get single booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        res.json({
            success: true,
            data: booking
        });
    } catch (err) {
        error('Failed to fetch booking by ID', {
            error: err.message,
            stack: err.stack,
            requestId: req.id,
            bookingId: req.params.id
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: err.message,
            requestId: req.id
        });
    }
});

// GET /api/bookings/booking-id/:bookingId - Get booking by booking ID
router.get('/booking-id/:bookingId', async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.bookingId });
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        res.json({
            success: true,
            data: booking
        });
    } catch (err) {
        error('Failed to fetch booking by booking ID', {
            error: err.message,
            stack: err.stack,
            requestId: req.id,
            bookingId: req.params.bookingId
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: err.message,
            requestId: req.id
        });
    }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            package: packageName,
            date,
            time,
            people,
            specialRequests,
            corporateBooking
        } = req.body;
        
        // Validate required fields
        if (!customerName || !email || !phone || !packageName || !date || !time || !people) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['customerName', 'email', 'phone', 'package', 'date', 'time', 'people']
            });
        }
        
        // Check if package exists
        const packageData = await Package.findOne({ name: packageName });
        if (!packageData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid package selected'
            });
        }
        
        // Calculate total amount
        const pricing = packageData.calculatePrice(people, corporateBooking);
        
        // Check for existing booking at same date/time
        const existingBooking = await Booking.findOne({
            date: new Date(date),
            time: time,
            status: { $in: ['pending', 'confirmed'] }
        });
        
        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: 'Time slot already booked. Please choose a different time.'
            });
        }
        
        // Create new booking
        const booking = new Booking({
            customerName,
            email,
            phone,
            package: packageName,
            date: new Date(date),
            time,
            people,
            totalAmount: pricing.finalPrice,
            specialRequests,
            corporateBooking: corporateBooking || false,
            discountApplied: pricing.discountApplied
        });
        
        await booking.save();
        
        // Send confirmation email
        try {
            await sendBookingConfirmation(booking);
        } catch (emailError) {
            warn('Failed to send confirmation email', {
                error: emailError.message,
                stack: emailError.stack,
                requestId: req.id,
                bookingId: booking.bookingId,
                customerEmail: booking.email
            });
            // Don't fail the booking if email fails
        }
        
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
        
    } catch (err) {
        error('Failed to create booking', {
            error: err.message,
            stack: err.stack,
            requestId: req.id,
            bookingData: {
                customerName: req.body.customerName,
                email: req.body.email,
                package: req.body.package,
                date: req.body.date,
                time: req.body.time,
                people: req.body.people
            }
        });
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(err.errors).map(error => error.message),
                requestId: req.id
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: err.message,
            requestId: req.id
        });
    }
});

// PUT /api/bookings/:id - Update booking
router.put('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        const allowedUpdates = ['status', 'paymentStatus', 'specialRequests', 'date', 'time'];
        const updates = {};
        
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });
        
        // If date or time is being updated, check for conflicts
        if (updates.date || updates.time) {
            const checkDate = updates.date ? new Date(updates.date) : booking.date;
            const checkTime = updates.time || booking.time;
            
            const existingBooking = await Booking.findOne({
                _id: { $ne: booking._id },
                date: checkDate,
                time: checkTime,
                status: { $in: ['pending', 'confirmed'] }
            });
            
            if (existingBooking) {
                return res.status(409).json({
                    success: false,
                    message: 'Time slot already booked. Please choose a different time.'
                });
            }
        }
        
        Object.assign(booking, updates);
        await booking.save();
        
        // Send update notification if status changed
        if (updates.status && updates.status !== booking.status) {
            try {
                await sendBookingUpdate(booking);
            } catch (emailError) {
                console.error('Failed to send update email:', emailError);
            }
        }
        
        res.json({
            success: true,
            message: 'Booking updated successfully',
            data: booking
        });
        
    } catch (error) {
        console.error('Error updating booking:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to update booking',
            error: error.message
        });
    }
});

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        // Update status to cancelled instead of deleting
        booking.status = 'cancelled';
        await booking.save();
        
        // Send cancellation notification
        try {
            await sendBookingUpdate(booking);
        } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
        }
        
        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
        
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
});

// GET /api/bookings/stats/overview - Get booking statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const stats = await Booking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);
        
        const totalBookings = await Booking.countDocuments();
        const totalRevenue = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        
        const overview = {
            totalBookings,
            totalRevenue: totalRevenue[0]?.total || 0,
            statusBreakdown: stats.reduce((acc, stat) => {
                acc[stat._id] = {
                    count: stat.count,
                    revenue: stat.totalRevenue
                };
                return acc;
            }, {})
        };
        
        res.json({
            success: true,
            data: overview
        });
        
    } catch (error) {
        console.error('Error fetching booking stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking statistics',
            error: error.message
        });
    }
});

// GET /api/bookings/availability - Check time slot availability
router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    const bookingDate = new Date(date);
    
    // Get all bookings for the date
    const existingBookings = await Booking.find({
      'bookingDetails.date': bookingDate,
      status: { $in: ['pending', 'confirmed'] }
    }).select('bookingDetails.time');

    // Generate available time slots
    const businessHours = { start: 10, end: 22 };
    const availableSlots = [];
    const bookedTimes = existingBookings.map(b => b.bookingDetails.time);

    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      if (!bookedTimes.includes(timeSlot)) {
        availableSlots.push(timeSlot);
      }
    }

    res.json({
      success: true,
      date: date,
      availableSlots: availableSlots,
      bookedSlots: bookedTimes
    });

  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check availability'
    });
  }
});

// GET /api/bookings/pricing - Get package pricing
router.get('/pricing', async (req, res) => {
  try {
    const config = require('../config');
    
    res.json({
      success: true,
      pricing: {
        basic: {
          price: config.pricing.basic,
          currency: 'INR',
          duration: 30,
          description: '30-minute session with basic equipment'
        },
        premium: {
          price: config.pricing.premium,
          currency: 'INR',
          duration: 60,
          description: '60-minute session with premium equipment'
        },
        ultimate: {
          price: config.pricing.ultimate,
          currency: 'INR',
          duration: 90,
          description: '90-minute session with all equipment and extras'
        },
        corporate: {
          price: config.pricing.ultimate,
          currency: 'INR',
          duration: 120,
          description: 'Corporate package with team building activities',
          discount: config.pricing.corporateDiscount
        }
      },
      discounts: {
        corporate: config.pricing.corporateDiscount,
        group: 5 // 5% discount for groups of 10+
      }
    });

  } catch (error) {
    console.error('Pricing fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing information'
    });
  }
});

module.exports = router; 