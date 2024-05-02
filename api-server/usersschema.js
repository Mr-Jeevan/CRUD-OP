const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fullname: String,
    fName: String,
    lName: String,
    email: String,
    phoneno: Number,
    identity: String,
    password: String,
    c_password: String,
})

module.exports = mongoose.model('Users', usersSchema);