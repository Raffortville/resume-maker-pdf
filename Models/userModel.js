const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: {type: String, required: true},
    emailPro: String,
    firstName: String,
    lastName: String,
    city: String,
    phone: String,
    country: String
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel