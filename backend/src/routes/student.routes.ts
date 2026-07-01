import express, { Request, Response } from 'express';
import { Student } from '../models/Student';
import { AuthRequest, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Get student dashboard
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      student,
      stats: {
        attendance: student.attendance,
        cgpa: student.cgpa,
        studyScore: student.studyScore,
        completedCredits: student.completedCredits,
        placementStatus: student.placementStatus
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get student attendance
router.get('/:id/attendance', async (req: Request, res: Response) => {
  try {
    // Fetch attendance records from database
    res.json({ message: 'Attendance data' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get student grades
router.get('/:id/grades', async (req: Request, res: Response) => {
  try {
    // Fetch grades from database
    res.json({ message: 'Grade data' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get student progress
router.get('/:id/progress', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.params.id });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ progress: student });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create student profile
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { rollNumber, batch, semester } = req.body;
    
    const student = new Student({
      userId: req.user.id,
      rollNumber,
      batch,
      semester
    });

    await student.save();
    res.status(201).json({ message: 'Student profile created', student });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;