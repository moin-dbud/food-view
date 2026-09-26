// yaha logic likha hota hai ki kis tarike se ham database se connect karenge but ye file sirf database se connect karne ka kaam karti hai execute karne ka nahi
require('dotenv').config();

const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Connected to MongoDB ✅');
    })
    .catch((err)=>{
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectDB;