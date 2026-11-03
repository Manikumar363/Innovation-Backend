import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

const DB_STATES: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

router.get('/health', (_req: Request, res: Response) => {
  const readyState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: DB_STATES[readyState] || 'unknown',
      readyState,
    },
  });
});

export default router;
