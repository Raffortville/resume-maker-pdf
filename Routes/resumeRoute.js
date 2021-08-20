const express = require('express')
const resumeModel = require('../Models/resumeModel')
const  {isStringEmpty} = require('../Helpers/checkFormat')
const success = require('../Helpers/request')


const router = express.Router()

router.post('/', async (req,res, next) => {

    let paylod = {...req.body, createdtAt: new Date().toISOString()}
   
    try {
        const resume = await new resumeModel(paylod)
        const resumeSaved = await resume.save()
        return success(res, resumeSaved)
        
    } catch (error) {
        next({status: 400, message: "failed to create resume"})
    }

})

router.put('/:id', async (req, res, next) => {

    try {
        await resumeModel.updateOne({_id:req.params.id}, req.body)
        return success(res, {})
        
    } catch (error) {
        next({status: 400, message: "failed to save resume"})
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {

    try {
        const resumes = await resumeModel.find({userId: req.params.id})
        return success(res, resumes)
        
    } catch (error) {
        next({status: 400, message: "failed to save resume"})
        console.log(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await resumeModel.deleteOne({_id: req.params.id})
        return success(res, {})
        
    } catch (error) {
        next({status: 400, message: "failed to save resume"})
        console.log(error)
    }
})
module.exports = router