import { Router } from 'express';
import {
  createQuoteRequest,
  getAllQuoteRequests,
  getQuoteRequestById,
  updateQuoteRequestStatus,
  deleteQuoteRequest,
} from '../controllers/quoteController';
import { optionalAuth } from '../middleware/authMiddleware';

const router = Router();

// Public route for end users to submit quote requests (with optional auth to link user ID), and admin to list
router.route('/')
  .post(optionalAuth, createQuoteRequest)
  .get(getAllQuoteRequests);

// Single quote operations
router.route('/:id')
  .get(getQuoteRequestById)
  .delete(deleteQuoteRequest);

// Update status
router.route('/:id/status')
  .patch(updateQuoteRequestStatus);

export default router;

