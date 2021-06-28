const express = require('express')
const resumeModel = require('../Models/resumeModel')
const  {isStringEmpty} = require('../Helpers/checkFormat')
const success = require('../Helpers/request')

const router = express.Router()

router.post('/', async (req,res, next) => {

    try {
        const resume = await new resumeModel(req.body)
        const resumeSaved = await resume.save()

        return success(res, resumeSaved)
        
    } catch (error) {
        next({status: 400, message: "failed to create resume"})
    }

})

module.exports = router