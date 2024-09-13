const mongoose = require('mongoose')

// Define Schema
const repertorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
})

// Add schema to Model


// export schema