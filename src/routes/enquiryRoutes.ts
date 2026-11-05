import { Router } from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';

const router = Router();

// Public route for submitting and admin listing
router.route('/')
  .post(createEnquiry)
  .get(getAllEnquiries);

// Single enquiry operations
router.route('/:id')
  .get(getEnquiryById)
  .delete(deleteEnquiry);

// Update status and admin notes
router.route('/:id/status')
  .patch(updateEnquiryStatus);

export default router;
