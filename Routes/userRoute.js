const express = require('express')
const router = express.Router()
const userModel = require('../Models/userModel')
const  {isStringEmpty} = require('../Helpers/checkFormat')
const success = require('../Helpers/request')

router.post('/', async (req, res, next) => {

    const {userName, email} = req.body

    try {
        if (!isStringEmpty(userName) && !isStringEmpty(email)) {
            const user = await  new userModel({
                userName : req.body.userName,
                email : req.body.email
            })
            const userSaved =  await user.save()
            return success(res, userSaved)
        }
        
    } catch (err) {
        next({status: 400, message: "failed to create account"})
    }
})


router.post('/loadUser', async (req, res, next) => {

    const {email} = req.body

    try {
        const user = await userModel.findOne({email: email})
        return success(res, user)
        
    } catch (error) {
        next({status: 400, message: "failed to log"})
    }
})

router.put('/:id', async (req, res, next) => {

    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        return success(res, user)
        
    } catch (error) {
        next({status: 400, message: 'failed to update your infos'})
    }

})



module.exports = router