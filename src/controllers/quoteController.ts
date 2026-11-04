import { Request, Response } from 'express';
import QuoteRequest, { QuoteStatus } from '../models/QuoteRequest';

/**
 * @desc    Submit a new quote request (Public endpoint for end-users)
 * @route   POST /api/quotes
 * @access  Public
 */
export const createQuoteRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      productName,
      productId,
      fullName,
      companyName,
      businessEmail,
      phoneNumber,
      quantity,
      additionalRequirements,
      source,
    } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      res.status(400).json({ success: false, message: 'Full name is required.' });
      return;
    }

    if (!companyName || !companyName.trim()) {
      res.status(400).json({ success: false, message: 'Company name is required.' });
      return;
    }

    if (!businessEmail || !businessEmail.trim()) {
      res.status(400).json({ success: false, message: 'Business email is required.' });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(businessEmail.trim())) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      res.status(400).json({ success: false, message: 'Phone number is required.' });
      return;
    }

    const parsedQty = Number(quantity);
    if (isNaN(parsedQty) || parsedQty < 1) {
      res.status(400).json({ success: false, message: 'Required quantity must be at least 1.' });
      return;
    }

    const newQuote = await QuoteRequest.create({
      productName: productName?.trim() || 'General Inquiry',
      productId: productId?.trim() || '',
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      businessEmail: businessEmail.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      quantity: parsedQty,
      additionalRequirements: additionalRequirements?.trim() || '',
      status: 'pending',
      source: source?.trim() || 'website',
    });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully. Our team will get in touch with you shortly.',
      data: newQuote,
    });
  } catch (error: any) {
    console.error('Error creating quote request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting quote request.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get all quote requests (with optional search, status filtering, and stats)
 * @route   GET /api/quotes
 * @access  Admin / Public
 */
export const getAllQuoteRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, limit, page } = req.query;

    const filter: Record<string, any> = {};

    // Filter by status if provided and not 'all'
    if (status && status !== 'all' && typeof status === 'string') {
      filter.status = status;
    }

    // Search query across name, company, email, phone, product
    if (search && typeof search === 'string' && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { fullName: searchRegex },
        { companyName: searchRegex },
        { businessEmail: searchRegex },
        { phoneNumber: searchRegex },
        { productName: searchRegex },
      ];
    }

    // Sorting: newest first
    let query = QuoteRequest.find(filter).sort({ createdAt: -1 });

    if (limit && !isNaN(Number(limit))) {
      const pageNum = page && !isNaN(Number(page)) ? Number(page) : 1;
      const limitNum = Number(limit);
      query = query.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const quotes = await query.exec();
    const totalCount = await QuoteRequest.countDocuments(filter);

    // Get aggregated stats counts
    const [pendingCount, inReviewCount, contactedCount, completedCount, cancelledCount, allCount] =
      await Promise.all([
        QuoteRequest.countDocuments({ status: 'pending' }),
        QuoteRequest.countDocuments({ status: 'in_review' }),
        QuoteRequest.countDocuments({ status: 'contacted' }),
        QuoteRequest.countDocuments({ status: 'completed' }),
        QuoteRequest.countDocuments({ status: 'cancelled' }),
        QuoteRequest.countDocuments({}),
      ]);

    res.json({
      success: true,
      count: quotes.length,
      total: totalCount,
      stats: {
        all: allCount,
        pending: pendingCount,
        in_review: inReviewCount,
        contacted: contactedCount,
        completed: completedCount,
        cancelled: cancelledCount,
      },
      data: quotes,
    });
  } catch (error: any) {
    console.error('Error fetching quote requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote requests.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get a single quote request by ID
 * @route   GET /api/quotes/:id
 * @access  Admin
 */
export const getQuoteRequestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const quote = await QuoteRequest.findById(id);

    if (!quote) {
      res.status(404).json({ success: false, message: 'Quote request not found.' });
      return;
    }

    res.json({ success: true, data: quote });
  } catch (error: any) {
    console.error('Error fetching quote request by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote request details.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Update a quote request's status or admin notes
 * @route   PATCH /api/quotes/:id/status
 * @access  Admin
 */
export const updateQuoteRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses: QuoteStatus[] = ['pending', 'in_review', 'contacted', 'completed', 'cancelled'];

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

    const updatedQuote = await QuoteRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuote) {
      res.status(404).json({ success: false, message: 'Quote request not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Quote request updated successfully.',
      data: updatedQuote,
    });
  } catch (error: any) {
    console.error('Error updating quote request status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote request.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Delete a quote request
 * @route   DELETE /api/quotes/:id
 * @access  Admin
 */
export const deleteQuoteRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedQuote = await QuoteRequest.findByIdAndDelete(id);

    if (!deletedQuote) {
      res.status(404).json({ success: false, message: 'Quote request not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Quote request deleted successfully.',
      data: { id },
    });
  } catch (error: any) {
    console.error('Error deleting quote request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quote request.',
      error: error.message || error,
    });
  }
};

