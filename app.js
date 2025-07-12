require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { info, error, warn, security } = require('./services/logger');
const { requestId, requestLogger } = require('./middleware/requestLogger');

const app = express();

// Request ID and logging middleware (must be first)
app.use(requestId);
app.use(requestLogger);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://smashlabx.com',
        'https://www.smashlabx.com'
    ],
    credentials: true
}));

// Rate limiting with enhanced logging
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    onLimitReached: (req, res, options) => {
        security(`Rate limit exceeded for IP: ${req.ip}`, {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url,
            method: req.method
        });
    }
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🚀 SmashLabs API is running!',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
    error('Application error occurred', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        requestId: req.id
    });
    
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        requestId: req.id
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// MongoDB connection and server start
async function connectDB() {
    try {
        info('Connecting to MongoDB Atlas...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'smashlabs'
        });
        
        info('Connected to MongoDB Atlas successfully', {
            database: mongoose.connection.name,
            host: mongoose.connection.host,
            port: mongoose.connection.port
        });
    } catch (err) {
        error('MongoDB connection failed', {
            error: err.message,
            stack: err.stack,
            mongoUri: process.env.MONGODB_URI ? 'SET' : 'NOT_SET'
        });
        throw err;
    }
}

async function startServer() {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            info('SmashLabs API started successfully', {
                port: PORT,
                environment: process.env.NODE_ENV || 'development',
                healthCheck: `http://localhost:${PORT}`,
                nodeVersion: process.version,
                platform: process.platform
            });
        });
        
        // Handle server errors
        server.on('error', (err) => {
            error('Server error occurred', {
                error: err.message,
                stack: err.stack,
                port: PORT
            });
        });
        
        return server;
    } catch (err) {
        error('Failed to start server', {
            error: err.message,
            stack: err.stack
        });
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    info('Received SIGINT signal, shutting down gracefully...');
    try {
        await mongoose.connection.close();
        info('Database connection closed successfully');
        process.exit(0);
    } catch (err) {
        error('Error during graceful shutdown', {
            error: err.message,
            stack: err.stack
        });
        process.exit(1);
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    error('Uncaught Exception', {
        error: err.message,
        stack: err.stack
    });
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    error('Unhandled Rejection', {
        reason: reason?.message || reason,
        promise: promise
    });
    process.exit(1);
});

startServer(); 