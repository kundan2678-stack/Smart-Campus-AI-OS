import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface CustomError extends Error {
  status?: number;
  details?: any;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}`, err);

  res.status(status).json({
    error: message,
    details: err.details || null,
    timestamp: new Date(),
  });
};

export default errorHandler;