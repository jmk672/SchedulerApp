import express from 'express'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'

// mongoose model
import User from '../models/userModel.js'
import { createError } from '../utils/error.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

// router for exports
const router = express.Router()

// get all users
router.get('/', verifyToken, getUsers)

// get a user
router.get('/:id', verifyUser , getUser)

// add a new user
router.post('/', verifyAdmin, addUser)

// update a user
router.patch('/:id', verifyAdmin, updateUser)

// remove a user
router.delete('/:id', verifyAdmin, deleteUser)

export default router