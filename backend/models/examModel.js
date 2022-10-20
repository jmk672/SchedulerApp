import mongoose from 'mongoose'

const Schema = mongoose.Schema

const examSchema = new Schema({
    name: {type: String, required: true},
    owner: {type: String, required: true},
    courseNumber: {type: Number, required: true},
    isCoordinated: {type: Boolean, required: true, default: false},
    standardLength: {type: Number, required: true},
    calculator: {type: String, required: true, default: "none"},
    notes: {type: String, required: true, default: "none"},
    other: {type: String, default: "none"},
    file: {
        data: Buffer, 
        contentType: String }  // I need to figure out how to deal with files
})

export default mongoose.model('Exam', examSchema)