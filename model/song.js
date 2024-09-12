const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
})