const mongoose = require('mongoose')

// Define Schema
const songSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
})

// Add schema to Model


// export schema