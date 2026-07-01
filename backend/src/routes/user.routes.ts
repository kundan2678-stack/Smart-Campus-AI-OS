import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { AuthRequest, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Get current user profile
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, avatar, bio, department } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        phone,
        avatar,
        bio,
        department,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get('/', authorizeRole(['admin']), async (req: Request, res: Response) => {
  try {
    const users = await User.find().limit(100);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;