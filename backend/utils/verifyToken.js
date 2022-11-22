import jwt from 'jsonwebtoken'
import { createError } from './error.js'

// checks if cookie is valid
export const verifyToken = async ( req, res, next ) => {
    const { authorization } = req.headers
  
    if (!authorization) {
        return next(createError(401, "Not Authenticated"))
    }
    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, ( err, user ) => {
        if (err) return next(createError(403, "Token not valid"))
        req.user = user
        next()
    })
    
}

// checks if logged in user is equal to req.params.id // if we need to check something else, we'll have to do this differently
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
      if (err) return next(err)
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err)
    try {
      if (!req.user || !req.user.isAdmin) {
        return next(createError(403, "You are not an admin!"));
       
      } else {
        next()
      }} catch (err) {
        next(err)
      }
  });
};
  