import mongoose from 'mongoose'

const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    courses: [{courseNumber: {type: String, required: true}}],
    coordinates: [{courseNumber: {type: String, required: true}}]
    }
)

export default mongoose.model('User', userSchema)