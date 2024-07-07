// authMiddleware.js
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;;

  if (!token) {
    return next(errorHandler(401 , 'Unauthorized'));
  }

  try {
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user) => {
      if(err) return next(errorHandler(403 , "Forbidden"));

      req.user = user;
      next();
  })
  } catch (error) {
    next();
  }
};

export default authMiddleware;