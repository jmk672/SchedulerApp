import express from 'express'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'

// mongoose model
import User from '../models/userModel.js'
import { createError } from '../utils/error.js'

// router for exports
const router = express.Router()

// get all users
router.get('/', getUsers)

// get a user
router.get('/:id', getUser)

// add a new user
router.post('/', addUser)

// update a user
router.patch('/:id', updateUser)

// remove a user
router.delete('/:id', deleteUser)

export default router