// mongoose model
import User from '../models/userModel.js'
import { createError } from '../utils/error.js'

// get all users from db
export const getUsers = async (req, res, next) => {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

// get one user from db
export const getUser = async ( req, res, next ) => {
    try {
        const user = await User.findOne({id: req.params.id})
        if (!user) return next(createError(404, "User not found"))
        else {res.status(200).json(user)}
    } catch (err) {
        next(err)
    }
}

// add user to db
export const addUser = async (req, res, next) => {
    const { firstName, lastName, id, isAdmin, courses, coordinates } = req.body

    try{
        const user = await User.create({ firstName, lastName, id, isAdmin, courses, coordinates})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// update user record
export const updateUser = async ( req, res, next ) => {
    const { firstName, lastName, id, isAdmin, courses, coordinates } = req.body
    try{
        const user = await User.findOneAndUpdate({id: req.params.id}, { firstName, lastName, id, isAdmin, courses, coordinates}, {new: true})
        res.status(200).json(user)
    } catch (err) {
        next (err)
    }
}

// delete user
export const deleteUser = async( req, res, next ) => {
    try{
        const user = await User.findOneAndRemove({id: req.params.id})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}