const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Simple middleware
app.use(cors());
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
    res.json({ 
        message: 'SmashLabs Backend is Running!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
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
        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Backend running at: http://localhost:${PORT}`);
            console.log(`🌐 Frontend running at: http://localhost:3001`);
            console.log(`🎯 Test backend: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Server failed to start:', err.message);
        process.exit(1);
    }
}

startServer();