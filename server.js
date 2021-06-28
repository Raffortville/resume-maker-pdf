const express = require('express')
const PORT =   process.env.PORT || 3001
const cors = require('cors')
const mongoose = require('mongoose')

const userRoute = require('./Routes/userRoute')
const resumeRoute = require('./Routes/resumeRoute')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


const options = { 
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(process.env.DB_URI, options)
.then(() => console.log('DB CONNECTED'), app.listen(PORT, () => console.log(PORT)))
.catch((error) => console.log(error))


app.use('/user', userRoute)
app.use('/resume', resumeRoute)

app.use((err, req, res, next) => {
    return res.status(err.status || 400).json({
      status: err.status || 400,
      message: err.message || "there was an error processing request",
    })
})






