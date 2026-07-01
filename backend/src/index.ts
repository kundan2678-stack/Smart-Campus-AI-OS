import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston';
import { Pool } from 'pg';
import mongoose from 'mongoose';
import redis from 'redis';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import studentRoutes from './routes/student.routes';
import facultyRoutes from './routes/faculty.routes';
import adminRoutes from './routes/admin.routes';
import assignmentRoutes from './routes/assignment.routes';
import attendanceRoutes from './routes/attendance.routes';

// Import middleware
import { errorHandler, requestLogger } from './middleware/error.middleware';
import { authenticateToken } from './middleware/auth.middleware';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000' }
});

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Routes (Public)
app.use('/auth', authRoutes);

// Routes (Protected)
app.use('/users', authenticateToken, userRoutes);
app.use('/students', authenticateToken, studentRoutes);
app.use('/faculty', authenticateToken, facultyRoutes);
app.use('/admin', authenticateToken, adminRoutes);
app.use('/assignments', authenticateToken, assignmentRoutes);
app.use('/attendance', authenticateToken, attendanceRoutes);

// WebSocket events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 Server running on port ${PORT}`);
});

export { app, io, logger };