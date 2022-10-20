import mongoose from 'mongoose'

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    student: { type: String, required: true },
    instructor: { type: String, required: true }, // User.id
    examId: { type: String, required: true }, // Exam._id
    day: { type: String, required: true }, // YYYY-MM-DD format
    time: { type: String, required: true }, // 1234 format
    extraTime: {type: Number, required: false, default: 0}, // minutes extra
    other: { type: String, required: false, default: "none"}
})



export default mongoose.model('Appointment', appointmentSchema)