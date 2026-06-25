import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import logger from '../utils/logger';

const router = Router();
const secret = process.env.JWT_SECRET || 'your-secret-key';

// Mock database
const users: any[] = [];

interface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin';
}

interface LoginBody {
  email: string;
  password: string;
}

/**
 * Register a new user
 * POST /auth/register
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body as RegisterBody;

    // Validation
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      createdAt: new Date(),
    };

    users.push(user);

    // Generate token
    const token = jwt.encode(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      },
      secret
    );

    logger.info(`User registered: ${email}`);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * Login user
 * POST /auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.encode(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      secret
    );

    logger.info(`User logged in: ${email}`);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * Refresh token
 * POST /auth/refresh-token
 */
router.post('/refresh-token', (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    const decoded = jwt.decode(token, secret);
    const newToken = jwt.encode(
      {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      secret
    );

    res.json({ token: newToken });
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
});

export default router;