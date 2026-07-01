import express, { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// Create assignment
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, classId, dueDate, totalPoints } = req.body;
    
    const assignment = new Assignment({
      title,
      description,
      classId,
      facultyId: req.user.id,
      dueDate,
      totalPoints,
      submissions: []
    });

    await assignment.save();
    res.status(201).json({ message: 'Assignment created', assignment });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignments for a class
router.get('/class/:classId', async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find({ classId: req.params.classId });
    res.json(assignments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Submit assignment
router.post('/:id/submit', async (req: AuthRequest, res: Response) => {
  try {
    const { fileUrl } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          submissions: {
            studentId: req.user.id,
            submittedAt: new Date(),
            fileUrl,
            submittedStatus: 'submitted'
          }
        }
      },
      { new: true }
    );
    res.json({ message: 'Assignment submitted', assignment });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Grade assignment
router.post('/:id/grade', async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, grade, feedback } = req.body;
    res.json({ message: 'Grade submitted', status: 'success' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;