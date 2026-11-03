import dotenv from 'dotenv';
// Load environment variables before anything else
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  // Start HTTP server immediately
  const server = app.listen(PORT, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
    console.log(`[Server] Health check endpoint: http://localhost:${PORT}/api/health`);
  });

  // Connect to MongoDB
  await connectDB();

  // Graceful shutdown handling
  const handleShutdown = async (signal: string) => {
    console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('[Database] MongoDB connection closed.');
      }
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};

startServer();
