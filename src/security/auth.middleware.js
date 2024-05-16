import { getUserByUsername } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const authed = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Token is required' });
  }

   // [0]Bearer [1]≤token≥
   const token = authorization.split(' ')[1];

  try {
    const appSecret = process.env.APP_KEY;
    const decoded = jwt.verify(token, appSecret);

    const user = await getUserByUsername(decoded.sub);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add user to res.locals so we can access it in the next middleware
    res.locals.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}