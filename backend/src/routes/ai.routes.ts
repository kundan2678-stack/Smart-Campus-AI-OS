import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import logger from '../utils/logger';
import axios from 'axios';

const router = Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * AI Chat endpoint
 * POST /ai/chat
 */
router.post('/chat', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { message, agentType = 'academic_advisor' } = req.body;
    const userId = (req as any).user.id;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // Call AI service
    const response = await axios.post(`${AI_SERVICE_URL}/chat`, {
      message,
      agentType,
      userId,
    });

    logger.info(`AI Chat processed for user ${userId} with agent ${agentType}`);

    res.json(response.data);
  } catch (error) {
    logger.error('Error in AI chat:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

/**
 * Generate study plan
 * POST /ai/study-plan
 */
router.post('/study-plan', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { courseId, examDate, hoursPerDay, learningStyle } = req.body;
    const userId = (req as any).user.id;

    if (!courseId || !examDate) {
      return res.status(400).json({ error: 'courseId and examDate required' });
    }

    // Call AI service
    const response = await axios.post(`${AI_SERVICE_URL}/study-plan`, {
      courseId,
      examDate,
      hoursPerDay: hoursPerDay || 3,
      learningStyle: learningStyle || 'visual',
      userId,
    });

    logger.info(`Study plan generated for user ${userId}`);

    res.json(response.data);
  } catch (error) {
    logger.error('Error generating study plan:', error);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

/**
 * Analyze resume
 * POST /ai/analyze-resume
 */
router.post('/analyze-resume', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { resumeText } = req.body;
    const userId = (req as any).user.id;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text required' });
    }

    // Call AI service
    const response = await axios.post(`${AI_SERVICE_URL}/analyze-resume`, {
      resumeText,
      userId,
    });

    logger.info(`Resume analyzed for user ${userId}`);

    res.json(response.data);
  } catch (error) {
    logger.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

/**
 * Get placement insights
 * GET /ai/placement-insights/:studentId
 */
router.get('/placement-insights/:studentId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // Call AI service
    const response = await axios.get(`${AI_SERVICE_URL}/placement-insights/${studentId}`);

    logger.info(`Placement insights fetched for student ${studentId}`);

    res.json(response.data);
  } catch (error) {
    logger.error('Error fetching placement insights:', error);
    res.status(500).json({ error: 'Failed to fetch placement insights' });
  }
});

/**
 * Get AI predictions
 * POST /ai/predict
 */
router.post('/predict', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { predictionType, studentId, parameters } = req.body;

    if (!predictionType || !studentId) {
      return res.status(400).json({ error: 'predictionType and studentId required' });
    }

    // Call AI service
    const response = await axios.post(`${AI_SERVICE_URL}/predict`, {
      predictionType,
      studentId,
      parameters,
    });

    logger.info(`Prediction made for student ${studentId}`);

    res.json(response.data);
  } catch (error) {
    logger.error('Error making prediction:', error);
    res.status(500).json({ error: 'Failed to make prediction' });
  }
});

export default router;