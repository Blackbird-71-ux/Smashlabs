const morgan = require('morgan');
const { logger } = require('../services/logger');

// Create a write stream to interface with Winston
const stream = {
  write: (message) => {
    // Remove trailing newline
    logger.http(message.trim());
  },
};

// Define custom token for request duration
morgan.token('duration', (req, res) => {
  if (req.startTime) {
    return Date.now() - req.startTime;
  }
  return '-';
});

// Define custom token for request ID
morgan.token('req-id', (req) => {
  return req.id || '-';
});

// Define custom token for user ID (if available)
morgan.token('user-id', (req) => {
  return req.user?.id || '-';
});

// Create different formats for different environments
const developmentFormat = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

const productionFormat = morgan(
  ':req-id :remote-addr :method :url :status :res[content-length] :user-agent - :response-time ms',
  { stream }
);

// Enhanced format with more details
const detailedFormat = morgan(
  ':req-id :remote-addr [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  { stream }
);

// Skip logging for health checks and static assets
const skipHealthChecks = (req, res) => {
  // Skip health check endpoints
  if (req.url === '/' || req.url === '/health' || req.url === '/ping') {
    return true;
  }
  
  // Skip static assets in development
  if (process.env.NODE_ENV === 'development' && req.url.startsWith('/static/')) {
    return true;
  }
  
  return false;
};

// Request ID middleware
const requestId = (req, res, next) => {
  req.id = Math.random().toString(36).substr(2, 9);
  req.startTime = Date.now();
  res.setHeader('X-Request-ID', req.id);
  next();
};

// Export middleware based on environment
module.exports = {
  requestId,
  requestLogger: process.env.NODE_ENV === 'production' 
    ? morgan(productionFormat, { stream, skip: skipHealthChecks })
    : morgan(developmentFormat, { stream, skip: skipHealthChecks }),
  
  // Export individual formats for specific use cases
  development: developmentFormat,
  production: productionFormat,
  detailed: detailedFormat,
  
  // Custom logger for specific endpoints
  customLogger: (format) => morgan(format, { stream }),
}; 