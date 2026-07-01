import { Pool, PoolClient } from 'pg';
import mongoose from 'mongoose';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL Connection
export const pgPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smart_campus',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432')
});

pgPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// MongoDB Connection
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart_campus');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

// Redis Connection
export const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.connect();

export default { pgPool, connectMongo, redisClient };