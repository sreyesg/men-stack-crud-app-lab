// =============== Require Packages ============== //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express()
// ===============Database Connections ============= //

const db = mongoose.connect(process.env.MONGODB_URI)
db 
    .on('connect',()=>{console.log(`connected to ${mongoose.connection.name}`)})

// ===============Middleware ============= //

app.use(express.urlencoded({extended: false}))
app.use(morgan())


// ===============routes ============= //




// ============== listener ============= //
app.listen(port)