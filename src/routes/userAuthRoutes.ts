import { Router } from 'express';
import {
  signup,
  signin,
  continueWithGoogle,
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

// 3. Continue with Google (Unified Google Signup & Signin)
router.post('/google', continueWithGoogle);
router.post('/continue-with-google', continueWithGoogle);
router.post('/google-signup', continueWithGoogle);
router.post('/google-signin', continueWithGoogle);
router.post('/google-login', continueWithGoogle);
router.post('/auth/google', continueWithGoogle);

// 4. Forgot Password
router.post('/forgot-password', forgotPassword);

// 5. Reset Password
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPassword);

// 6. User Profile (Protected - Bearer JWT)
router.get('/profile', authenticateUser, getProfile);
router.get('/me', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);
router.patch('/profile', authenticateUser, updateProfile);

// 7. User's Quote Requests (Protected - Bearer JWT)
router.get('/my-quotes', authenticateUser, getUserQuoteRequests);
router.get('/quotes', authenticateUser, getUserQuoteRequests);

export default router;
