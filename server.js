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


// =============== Middleware ======================= //

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
const port = process.env.PORT || "3000"

// =============== Routes ========================== //

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
    res.redirect('/repertory/new')

})
// handle index
app.get('/repertory', async(req, res) => {
    const repertoryIndex = await Repertory.find()
    res.render('repertory/index.ejs', {repertory: repertoryIndex})
})
// handle show route    
app.get('/repertory/:id', async(req, res) =>{
    const findRepertory = await Repertory.findById(req.params.id)
    res.render('repertory/show.ejs', {repertory: findRepertory})
})

// handle delete route
app.delete('/repertory/:id', async(req, res)=>{
    await Repertory.findByIdAndDelete(req.params.id)
    res.redirect('/repertory')
})

// send edit page based on id
app.get('/repertory/:id/edit', async(req,res)=>{
    const foundRepertory = await Repertory.findById(req.params.id)
    res.render('repertory/edit.ejs', {repertory: foundRepertory})
})
// handle the edit route
app.put('/repertory/:id',async (req, res) => {
    console.log(req.body)
    await Repertory.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/repertory/${req.params.id}`)
})

// ============== listener ============= //
app.listen(port)