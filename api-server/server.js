const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
app.use(express.static('uploads'))

// controllers
const Users = require("./users");

const port = 3001 || 8080

const url = "mongodb://localhost:27017/login-server"

// mongoose
mongoose.connect(url).then((result) => {
    console.log("ConnectedSuccessful to db")
}).catch((err) => {
    console.log("Error in the Connection")
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
// app.listen(3001)