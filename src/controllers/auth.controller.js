import {
  createUser,
  getUserByUsername,
} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const user = req.body;

    // encrypt password
    const saltRounds = 10;
    const appSecret = process.env.APP_KEY;

    // hash password
    const hash = await bcrypt.hash(user.password + appSecret, saltRounds);

    // replace password with hash
    user.password = hash;

    const data = await createUser(user);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const appSecret = process.env.APP_KEY;

    const match = await bcrypt.compare(password + appSecret, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // generate token
    const token = jwt.sign({ sub: username }, appSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}