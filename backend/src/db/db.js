// yaha logic likha hota hai ki kis tarike se ham database se connect karenge but ye file sirf database se connect karne ka kaam karti hai execute karne ka nahi
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb+srv://moinsheikh1303_db_user:q89LaSu5J09hJFEd@cluster0.nyztlxt.mongodb.net')
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectDB;