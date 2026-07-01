import express, { Request, Response } from 'express';
import { Faculty } from '../models/Faculty';
import { AuthRequest, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Get faculty dashboard
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user.id });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.json({
      faculty,
      stats: {
        totalClasses: faculty.classes.length,
        department: faculty.department,
        experience: faculty.experience
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get faculty classes
router.get('/classes', async (req: AuthRequest, res: Response) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user.id });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ classes: faculty.classes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get live attendance for a class
router.get('/classes/:classId/attendance', async (req: Request, res: Response) => {
  try {
    res.json({ message: 'Live attendance data' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Submit grades for students
router.post('/grades', async (req: Request, res: Response) => {
  try {
    const { studentId, classId, grade, marks } = req.body;
    res.json({ message: 'Grade submitted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get faculty analytics
router.get('/analytics', async (req: AuthRequest, res: Response) => {
  try {
    res.json({ analytics: {} });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;