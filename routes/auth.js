const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { 
  generateToken, 
  generateRefreshToken, 
  verifyToken, 
  authenticateToken, 
  authRateLimit,
  ROLES 
} = require('../middleware/auth');
const { info, error, warn, debug } = require('../services/logger');
const { sendEmailVerification, sendPasswordReset } = require('../services/emailService');

// Validation middleware
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validatePasswordReset = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

const validatePasswordUpdate = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// POST /api/auth/register - Register new user
router.post('/register', authRateLimit, validateRegister, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      warn('User registration failed: Validation errors', {
        errors: errors.array(),
        requestId: req.id
      });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      warn('User registration failed: Email already exists', {
        email,
        requestId: req.id
      });
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      metadata: {
        registrationSource: 'web',
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip
      }
    });

    await user.save();

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      await sendEmailVerification(user, verificationToken);
    } catch (emailError) {
      warn('Failed to send verification email', {
        userId: user._id,
        email: user.email,
        error: emailError.message,
        requestId: req.id
      });
    }

    info('User registered successfully', {
      userId: user._id,
      email: user.email,
      name: user.name,
      requestId: req.id
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        user: user.toJSON(),
        requiresVerification: true
      }
    });

  } catch (err) {
    error('User registration failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: err.message
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', authRateLimit, validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      warn('User login failed: Validation errors', {
        errors: errors.array(),
        requestId: req.id
      });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findByEmail(email).select('+password +loginAttempts +lockUntil');
    if (!user) {
      warn('User login failed: User not found', {
        email,
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      warn('User login failed: Account locked', {
        userId: user._id,
        email: user.email,
        lockUntil: user.lockUntil,
        requestId: req.id
      });
      return res.status(423).json({
        success: false,
        message: 'Account temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      warn('User login failed: Account inactive', {
        userId: user._id,
        email: user.email,
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      warn('User login failed: Invalid password', {
        userId: user._id,
        email: user.email,
        loginAttempts: user.loginAttempts + 1,
        requestId: req.id
      });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email
    });

    // Save refresh token
    await user.addRefreshToken(refreshToken);

    info('User logged in successfully', {
      userId: user._id,
      email: user.email,
      role: user.role,
      requestId: req.id
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        accessToken,
        refreshToken,
        expiresIn: '15m'
      }
    });

  } catch (err) {
    error('User login failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err.message
    });
  }
});

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      warn('Token refresh failed: No refresh token provided', {
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      warn('Token refresh failed: User not found or inactive', {
        userId: decoded.id,
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
    if (!tokenExists) {
      warn('Token refresh failed: Refresh token not found', {
        userId: user._id,
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new access token
    const newAccessToken = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    debug('Token refreshed successfully', {
      userId: user._id,
      requestId: req.id
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        expiresIn: '15m'
      }
    });

  } catch (err) {
    error('Token refresh failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findById(req.user.id);

    if (user && refreshToken) {
      // Remove the specific refresh token
      await user.removeRefreshToken(refreshToken);
    }

    info('User logged out successfully', {
      userId: req.user.id,
      requestId: req.id
    });

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (err) {
    error('Logout failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// POST /api/auth/logout-all - Logout from all devices
router.post('/logout-all', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Remove all refresh tokens
      await user.removeAllRefreshTokens();
    }

    info('User logged out from all devices', {
      userId: req.user.id,
      requestId: req.id
    });

    res.json({
      success: true,
      message: 'Logged out from all devices'
    });

  } catch (err) {
    error('Logout all failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// GET /api/auth/profile - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      warn('Profile request failed: User not found', {
        userId: req.user.id,
        requestId: req.id
      });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.toJSON()
    });

  } catch (err) {
    error('Profile request failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
});

// POST /api/auth/verify-email - Verify email address
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token required'
      });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      warn('Email verification failed: Invalid or expired token', {
        token: token.substring(0, 10) + '...',
        requestId: req.id
      });
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    info('Email verified successfully', {
      userId: user._id,
      email: user.email,
      requestId: req.id
    });

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (err) {
    error('Email verification failed', {
      error: err.message,
      stack: err.stack,
      requestId: req.id
    });

    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
});

module.exports = router; 