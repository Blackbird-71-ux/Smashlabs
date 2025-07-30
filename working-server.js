const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Simple middleware
app.use(cors());
app.use(express.json());

// Health check endpoints
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'SmashLabs Backend is Running!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString(),
        port: process.env.PORT || 5000
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Direct MongoDB connection (working credentials)
const MONGODB_URI = "mongodb+srv://smashlabs-admin:TykW4NKV8sUxC9cv@smashlabs-prod.vco1cqn.mongodb.net/smashlabs?retryWrites=true&w=majority&appName=smashlabs-prod";

// MongoDB connection
async function connectDB() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
}

// Start server
async function startServer() {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Backend running on port: ${PORT}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🎯 Health check: http://localhost:${PORT}/`);
        });
    } catch (err) {
        console.error('❌ Server failed to start:', err.message);
        process.exit(1);
    }
}

startServer();