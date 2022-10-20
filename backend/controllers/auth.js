import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'
import { verifyToken } from '../utils/verifyToken.js'


export const login = async (req, res, next) => {
    try {
        
        const user = await User.findOne({id: req.body.id}) // look up user in database
        
        // if user exists, make a JWT and send as a cookie

        if (user) {
            const token = jwt.sign( {id: user.id, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin, courses: user.courses, coordinates: user.coordinates}, process.env.JWT_SECRET, {expiresIn: "1d"})
            res
            .status(200)
            .cookie("access_token", token, {httpOnly: true})
            .json({ token })
        }

        // otherwise send "Bad Request" error
        
        else  {next(createError(401, "User not found!"))}
    } catch(err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {

    // replace the user's cookie with empty fields - should run verifyToken first
    verifyToken(req, res, () => {
        res
        .status(200)
        .clearCookie("access_token", {httpOnly: true})
        .json({message: "Logged out!"})
    })
}