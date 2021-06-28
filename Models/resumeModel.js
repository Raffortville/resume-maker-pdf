const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    userId: String,
    resumeTitle: String
})

const resumeModel = mongoose.model('resume', resumeSchema)

module.exports = resumeModel