import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jwt-simple';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY || '86400'); // 24 hours

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'student'
    });

    await user.save();

    const token = jwt.encode(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email, role: user.role },
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.encode(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET
    );

    res.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, role: user.role },
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Refresh Token
router.post('/refresh-token', (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    const decoded = jwt.decode(token, JWT_SECRET);
    const newToken = jwt.encode(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      JWT_SECRET
    );

    res.json({ token: newToken });
  } catch (error: any) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

export default router;