import { Router } from 'express';
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getUserQuoteRequests,
} from '../controllers/userAuthController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

/**
 * End-user Authentication & Profile Routes
 */

// 1. Signup / Register
router.post('/signup', signup);
router.post('/register', signup);

// 2. Signin / Login
router.post('/signin', signin);
router.post('/login', signin);

// 3. Forgot Password
router.post('/forgot-password', forgotPassword);

// 4. Reset Password
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPassword);

// 5. User Profile (Protected - Bearer JWT)
router.get('/profile', authenticateUser, getProfile);
router.get('/me', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);
router.patch('/profile', authenticateUser, updateProfile);

// 6. User's Quote Requests (Protected - Bearer JWT)
router.get('/my-quotes', authenticateUser, getUserQuoteRequests);
router.get('/quotes', authenticateUser, getUserQuoteRequests);

export default router;
