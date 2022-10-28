import express from 'express'
import { deleteHours, getHours, setHours, batchHours } from '../controllers/hours.js'
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js'

// mongoose model
import Hours from '../models/hoursModel.js'

// router for exports
const router = express.Router()


// get all times

router.get('/', verifyToken, getHours)

// set an available time

router.post('/', verifyAdmin, setHours)

router.post('/batch', verifyAdmin, batchHours)

// remove a timeslot ( should be pretty rare - will need warnings!!)

router.delete('/:date', deleteHours )

export default router