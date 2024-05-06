const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
app.use(express.static('uploads'))

// controllers
const Users = require("./users");

const port = process.env.PORT || 8080

const url = process.env.MONGODB_URL

// mongoose
mongoose.connect(url)
    .then((result) => {
        console.log("ConnectedSuccessful to db")
    }).catch((err) => {
        console.log("Error in the db Connection")
    })

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// cors
app.use(cors())
// controllers
app.get('/', function (req, res) { })
app.use("/Users", Users)
app.use("/Users/loginaccount", Users)
app.use("/Users/alluserdetails", Users)
app.use("/Users/datacount", Users)
app.use("/Users/alluserdetails/:_id", Users)
app.use("/Users/userdelete/:_id", Users)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})