import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/express_mongo_db';

  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] MongoDB connection failed: ${(error as Error).message}`);
    console.warn('[Database] Tip: Ensure local MongoDB service is running or check your MONGODB_URI in .env');
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB connection disconnected.');
});

mongoose.connection.on('error', (err) => {
  if (mongoose.connection.readyState === 1) {
    console.error('[Database] MongoDB runtime error:', err.message);
  }
});
