import Appointment from '../models/appointmentModel.js'
import Exam from '../models/examModel.js'
import Hours from '../models/hoursModel.js'
import { isTimeAvailable, timeTable, timeTableInverse } from '../utils/isTimeAvailable.js'
import { createError } from '../utils/error.js'

// gets all appointments
export const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({})
        res.status(200).json(appointments)
    } catch (err) {
        next(err)
    }
}

export const createAppointment = async ( req, res, next ) => {
    try{
        const hours = await Hours.findOne({date: req.body.day})
        const i=timeTable[req.body.time]
        const thisExam = await Exam.findById(req.body.examId)
        const appointments = await Appointment.find({date: req.body.day})


        var appointmentArray = []
        for (const appointment of appointments) {
            const appointmentExam = await Exam.findById(appointment.examId)

            if (!appointmentExam) return(next( createError(400, "No Exam Found")))

            const appointmentLength = appointmentExam.standardLength + appointment.extraTime

            appointmentArray.push({time: timeTable[appointment.time], length: Math.ceil(appointmentLength/15)})
        }
        appointmentArray.sort(function(a, b){return a.time - b.time})

        if (!thisExam) return(next( createError(400, "No Exam Found")))

        if (!req.user.isAdmin && !isTimeAvailable(i, thisExam.length+req.body.extraTime, appointmentArray, hours.open, hours.close, hours.seats)) return(next( createError(400, "Time not Available")))

        console.log(req.body.instructor)
        if (!req.body.instructor) req.body.instructor = req.user.id
        console.log(req.body.instructor)

        const exam = await Appointment.create({
            student: req.body.student, 
            instructor: req.body.instructor,
            examId: req.body.examId,
            day: req.body.day,
            time: req.body.time,
            extraTime: req.body.extraTime,
            other: req.body.other
        })
        res.status(200).json(exam)
       
    } catch (err) {
        next(err)
    }
}

export const findATime = async (req, res, next) => {
    try {
        const day = req.params.day
        console.log(day)
        const length = Math.ceil(req.params.length/15)
        console.log(length)
        const appointments = await Appointment.find({})
        const hours = await Hours.findOne({date: day})
        
        if (!hours) return(next( createError(400, "Not Available")))

        const open = timeTable[hours.startTime]
        const close = timeTable[hours.endTime]
        console.log(length, open, close)

        var appointmentArray = []
        for (const appointment of appointments) {
            const appointmentExam = await Exam.findById(appointment.examId)

            if (!appointmentExam) return(next( createError(400, "No Exam Found")))

            const appointmentLength = appointmentExam.standardLength + appointment.extraTime

            appointmentArray.push({time: timeTable[appointment.time], length: Math.ceil(appointmentLength/15)})
        }
        appointmentArray.sort(function(a, b){return a.time - b.time})
        
        for (let i=open; i < close; i++) {
            console.log(i, timeTableInverse[i], isTimeAvailable(i, length, appointmentArray, open, close))
        }

        res.status(200).send("Success")

    } catch (err) {
        next (err)
    }


}