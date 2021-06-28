const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    position: String,
    portfolio: String,
    socialMedias: String,
    expertises :  Array,
    softSkills : Array,
    experiences: Array,
    createdtAt : Date,
    state: String
})

const resumeModel = mongoose.model('resume', resumeSchema)

module.exports = resumeModel