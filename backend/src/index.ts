import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import facultyRoutes from './routes/faculty.routes';
import adminRoutes from './routes/admin.routes';
import aiRoutes from './routes/ai.routes';
import errorHandler from './middleware/errorHandler';
import logger from './utils/logger';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/ai', aiRoutes);

// WebSocket setup
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('subscribe', (data) => {
    socket.join(data.channel);
    logger.info(`Socket ${socket.id} subscribed to ${data.channel}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Export io for use in other modules
app.set('io', io);

// Error handler
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

httpServer.listen(PORT, () => {
  logger.info(`🚀 Smart Campus API Gateway running on port ${PORT}`);
});

export { app, io };