const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const my_app = express()
const port = 11000

// mdb
const mdb_url = 'mongodb://localhost/phones'
mongoose.connect(mdb_url, {useNewUrlParser: true, useUnifiedTopology: true})
const con = mongoose.connection
con.on('open', () => {})

my_app.use(cors())
// cors header:
//     my_app.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
// })

my_app.use(express.json());
// my_app.use(express.urlencoded({ extended: true }))

// router
const phoneRouter = require('./routes/phones')
my_app.use('/phones', phoneRouter)

my_app.listen(port, () => {
    console.log('Server started on PORT:' + port)
})