import express from 'express'
import { createAppointment, findATime, getAllAppointments } from '../controllers/appointments.js'
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

// get all appointments

router.get('/', verifyAdmin, getAllAppointments)

// get all appointments for a day

router.get('/daily/:day', verifyAdmin,  )

// make a new appointment

router.post('/', verifyToken, createAppointment )

// get available appointments on a day

router.get('/available/:day/length/:length', verifyToken, findATime)

// get appointment by student

router.get('/byStudent/:name', verifyAdmin,  )


export default router