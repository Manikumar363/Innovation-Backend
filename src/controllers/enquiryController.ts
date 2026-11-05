import { Request, Response } from 'express';
import Enquiry, { EnquiryStatus } from '../models/Enquiry';

/**
 * @desc    Submit a new enquiry (Public endpoint for end-users)
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, emailAddress, subject, message, source } = req.body;

    const userEmail = email || emailAddress;

    // Validation
    if (!fullName || !fullName.trim()) {
      res.status(400).json({ success: false, message: 'Full name is required.' });
      return;
    }

    if (!userEmail || !userEmail.trim()) {
      res.status(400).json({ success: false, message: 'Email address is required.' });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userEmail.trim())) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    if (!subject || !subject.trim()) {
      res.status(400).json({ success: false, message: 'Subject is required.' });
      return;
    }

    if (!message || !message.trim()) {
      res.status(400).json({ success: false, message: 'Message is required.' });
      return;
    }

    const newEnquiry = await Enquiry.create({
      fullName: fullName.trim(),
      email: userEmail.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'pending',
      source: source?.trim() || 'website',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. Our team will get back to you shortly.',
      data: newEnquiry,
    });
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting enquiry.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get all enquiries with optional search, status filtering, and stats
 * @route   GET /api/enquiries
 * @access  Admin / Public
 */
export const getAllEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, limit, page } = req.query;

    const filter: Record<string, any> = {};

    if (status && status !== 'all' && typeof status === 'string') {
      filter.status = status;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
      ];
    }

    let query = Enquiry.find(filter).sort({ createdAt: -1 });

    if (limit && !isNaN(Number(limit))) {
      const pageNum = page && !isNaN(Number(page)) ? Number(page) : 1;
      const limitNum = Number(limit);
      query = query.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const enquiries = await query.exec();
    const totalCount = await Enquiry.countDocuments(filter);

    // Get aggregated stats
    const [pendingCount, inReviewCount, contactedCount, resolvedCount, cancelledCount, allCount] =
      await Promise.all([
        Enquiry.countDocuments({ status: 'pending' }),
        Enquiry.countDocuments({ status: 'in_review' }),
        Enquiry.countDocuments({ status: 'contacted' }),
        Enquiry.countDocuments({ status: 'resolved' }),
        Enquiry.countDocuments({ status: 'cancelled' }),
        Enquiry.countDocuments({}),
      ]);

    res.json({
      success: true,
      count: enquiries.length,
      total: totalCount,
      stats: {
        all: allCount,
        pending: pendingCount,
        in_review: inReviewCount,
        contacted: contactedCount,
        resolved: resolvedCount,
        cancelled: cancelledCount,
      },
      data: enquiries,
    });
  } catch (error: any) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get a single enquiry by ID
 * @route   GET /api/enquiries/:id
 * @access  Admin
 */
export const getEnquiryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }

    res.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error('Error fetching enquiry by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry details.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Update enquiry status or admin notes
 * @route   PATCH /api/enquiries/:id/status
 * @access  Admin
 */
export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses: EnquiryStatus[] = ['pending', 'in_review', 'contacted', 'resolved', 'cancelled'];

    const updateData: Record<string, any> = {};

    if (status) {
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
        return;
      }
      updateData.status = status;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    const updated = await Enquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Delete an enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Admin
 */
export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Enquiry deleted successfully.',
      data: { id },
    });
  } catch (error: any) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
      error: error.message || error,
    });
  }
};

