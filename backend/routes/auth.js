import express from 'express'

// mongoose model
import { login, logout } from '../controllers/auth.js'
import { isTimeAvailable } from '../utils/isTimeAvailable.js'
import { verifyToken } from '../utils/verifyToken.js'

// router for exports
const router = express.Router()

router.post('/login', login)

router.post('/logout', verifyToken, logout)

router.get('/', verifyToken, (req, res)=>{
    res.send(req.user)
})

export default router