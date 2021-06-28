const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    emailPro: String,
    firstName: String,
    lastName: String,
    city: String,
    phone: String,
    country: String
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel