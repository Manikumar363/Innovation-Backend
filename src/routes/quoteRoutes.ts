import { Router } from 'express';
import {
  createQuoteRequest,
  getAllQuoteRequests,
  getQuoteRequestById,
  updateQuoteRequestStatus,
  deleteQuoteRequest,
} from '../controllers/quoteController';

const router = Router();

// Public route for end users to submit quote requests, and admin to list
router.route('/')
  .post(createQuoteRequest)
  .get(getAllQuoteRequests);

// Single quote operations
router.route('/:id')
  .get(getQuoteRequestById)
  .delete(deleteQuoteRequest);

// Update status
router.route('/:id/status')
  .patch(updateQuoteRequestStatus);

export default router;

