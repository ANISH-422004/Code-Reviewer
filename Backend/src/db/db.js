const mongoose = require('mongoose');
const config = require('../config/config')
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

module.exports = { connectDB };
