// =============== Require Packages ============== //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')


const app = express()
// ===============Database Connections ============= //

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db 
    .on('connected',()=>{console.log(`connected to ${mongoose.connection.name} Database`)})

// Import model 
const Repertory = require('./model/repertory.js')


// ===============Middleware ============= //

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
const port = process.env.PORT || "3000"

// ===============routes ============= //

// home
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

// send New Form
app.get('/repertory/new',(req, res) => {
    res.render('repertory/new.ejs')
})
// Handel create to database from New form
app.post('/repertory', async(req, res) => {
    const createRepertory = await Repertory.create(req.body)
    console.log(createRepertory)
    res.redirect('/repertory/new')

})



// ============== listener ============= //
app.listen(port)