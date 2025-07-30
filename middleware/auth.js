const jwt = require('jsonwebtoken');
const { error, warn, info } = require('../services/logger');

// JWT secret key - should be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// Token expiration times
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || '15m';
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || '7d';

// Generate JWT token
const generateToken = (payload, expiresIn = ACCESS_TOKEN_EXPIRE) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Generate refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    warn('Authentication failed: No token provided', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.url,
      method: req.method,
      requestId: req.id
    });
    return res.status(401).json({
      success: false,
      message: 'Access token required',
      error: 'UNAUTHORIZED'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    
    info('User authenticated successfully', {
      userId: decoded.id,
      email: decoded.email,
      role: decoded.role,
      requestId: req.id
    });
    
    next();
  } catch (err) {
    error('Authentication failed: Invalid token', {
      error: err.message,
      token: token.substring(0, 20) + '...',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.url,
      method: req.method,
      requestId: req.id
    });
    
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
      error: 'FORBIDDEN'
    });
  }
};

// Role-based authorization middleware
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      error('Authorization failed: No user in request', {
        requestId: req.id
      });
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      warn('Authorization failed: Insufficient permissions', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
        url: req.url,
        method: req.method,
        requestId: req.id
      });
      
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        error: 'FORBIDDEN'
      });
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    
    info('Optional authentication successful', {
      userId: decoded.id,
      email: decoded.email,
      requestId: req.id
    });
  } catch (err) {
    warn('Optional authentication failed', {
      error: err.message,
      requestId: req.id
    });
    // Continue without authentication
  }

  next();
};

// API key authentication middleware (for service-to-service calls)
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_SECRET_KEY;

  if (!apiKey || !validApiKey) {
    warn('API key authentication failed: Missing API key', {
      hasApiKey: !!apiKey,
      hasValidApiKey: !!validApiKey,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.url,
      method: req.method,
      requestId: req.id
    });
    
    return res.status(401).json({
      success: false,
      message: 'API key required',
      error: 'UNAUTHORIZED'
    });
  }

  if (apiKey !== validApiKey) {
    error('API key authentication failed: Invalid API key', {
      providedKey: apiKey.substring(0, 8) + '...',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.url,
      method: req.method,
      requestId: req.id
    });
    
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
      error: 'FORBIDDEN'
    });
  }

  info('API key authentication successful', {
    requestId: req.id
  });
  
  next();
};

// Rate limiting for authentication endpoints
const authRateLimit = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    warn('Authentication rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: req.id
    });
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again later',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  authenticateToken,
  authorizeRole,
  optionalAuth,
  authenticateApiKey,
  authRateLimit,
  
  // Constants
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
  
  // Common role definitions
  ROLES: {
    ADMIN: 'admin',
    STAFF: 'staff',
    CUSTOMER: 'customer',
    MANAGER: 'manager'
  }
}; 