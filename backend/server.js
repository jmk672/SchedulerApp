import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();

import express from 'express';

// creates express app
const app = express()

app.use(cors())
// converts requests to json
app.use(express.json())

// allows cookies
app.use(cookieParser())

// routes

// auth routes 

import authRoutes from "./routes/auth.js"
app.use('/auth', authRoutes)

// user routes
import userRoutes from './routes/user.js'
app.use('/users', userRoutes)

// hours routes

import hoursRoutes from './routes/hours.js'
app.use('/hours', hoursRoutes)

// exam routes

import examRoutes from './routes/exam.js'
app.use('/exams', examRoutes)

// appointment routes
import appointmentRoutes from './routes/appointments.js'
app.use('/appointments', appointmentRoutes)



// pdf generation testing

import pdfRoutes from './routes/pdftest.js'

app.use('/pdf', pdfRoutes)



// report errors
import { handleError } from './utils/error.js';

app.use(handleError)


// connect to DB and start listening
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('Mongo Connected')
        const port = process.env.PORT
        app.listen(port, () => {
        console.log(`Listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })