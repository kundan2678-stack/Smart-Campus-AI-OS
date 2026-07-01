import express, { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
import { AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// Mark attendance
router.post('/mark', async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, classId, status, detectedVia, confidence } = req.body;
    
    const attendance = new Attendance({
      studentId,
      classId,
      date: new Date(),
      status: status || 'present',
      detectedVia: detectedVia || 'manual',
      confidence
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance records for a student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId });
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a class
router.get('/class/:classId', async (req: Request, res: Response) => {
  try {
    const records = await Attendance.find({ classId: req.params.classId });
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;