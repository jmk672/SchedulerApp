import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Use to track hours open each day
// Each entry should cover one day

const hoursSchema = new Schema({
    date: {type: String, required: true, unique: true}, // format YYYY-MM-DD
    startTime: {type: Number, required: true}, // format 1234 for 12:34 pm - 0 == midnight
    endTime: {type: Number, required: true}, // format 1234 for 12:34 pm - 0 == midnight
    seats: {type: Number, required: true, default: 5}
})

export default mongoose.model('Hours',hoursSchema)