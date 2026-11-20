import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/User';
import QuoteRequest from '../models/QuoteRequest';
import {
  AuthenticatedRequest,
  generateToken,
} from '../middleware/authMiddleware';

/**
 * @desc    End-user registration (Signup)
 * @route   POST /api/auth/signup, POST /api/user/signup
 * @access  Public
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, name, email, emailAddress, password, phoneNumber, companyName } = req.body;

    const resolvedName = (fullName || name || '').trim();
    const resolvedEmail = (email || emailAddress || '').trim().toLowerCase();
    const resolvedPassword = password ? String(password).trim() : '';

    if (!resolvedName) {
      res.status(400).json({
        success: false,
        message: 'Full name is required.',
      });
      return;
    }

    if (!resolvedEmail) {
      res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(resolvedEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
      return;
    }

    if (!resolvedPassword || resolvedPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: resolvedEmail });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
      return;
    }

    // Create user
    const newUser = await User.create({
      fullName: resolvedName,
      email: resolvedEmail,
      password: resolvedPassword,
      phoneNumber: phoneNumber ? String(phoneNumber).trim() : '',
      companyName: companyName ? String(companyName).trim() : '',
      role: 'user',
      status: 'active',
      lastLogin: new Date(),
    });

    // Auto-link any previous quote requests that match this email
    await QuoteRequest.updateMany(
      { businessEmail: resolvedEmail, userId: null },
      { $set: { userId: newUser._id } }
    );

    // Generate JWT token
    const token = generateToken(newUser);

    // Fetch quote requests linked to this user's email
    const quoteRequests = await QuoteRequest.find({
      $or: [{ businessEmail: resolvedEmail }, { userId: newUser._id }],
    }).sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        companyName: newUser.companyName,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      quoteRequestsCount: quoteRequests.length,
      quoteRequests,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    End-user signin (Login)
 * @route   POST /api/auth/signin, POST /api/user/signin
 * @access  Public
 */
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, emailAddress, password } = req.body;

    const resolvedEmail = (email || emailAddress || '').trim().toLowerCase();
    const resolvedPassword = password ? String(password).trim() : '';

    if (!resolvedEmail || !resolvedPassword) {
      res.status(400).json({
        success: false,
        message: 'Email address and password are required.',
      });
      return;
    }

    // Find user with password included for comparison
    const user = await User.findOne({ email: resolvedEmail }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact customer support.',
      });
      return;
    }

    const isMatch = await user.comparePassword(resolvedPassword);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Auto-link any previous quote requests that match this email
    await QuoteRequest.updateMany(
      { businessEmail: resolvedEmail, userId: null },
      { $set: { userId: user._id } }
    );

    // Generate JWT token
    const token = generateToken(user);

    // Fetch quote requests linked to this user's email
    const quoteRequests = await QuoteRequest.find({
      $or: [{ businessEmail: resolvedEmail }, { userId: user._id }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
      quoteRequestsCount: quoteRequests.length,
      quoteRequests,
    });
  } catch (error: any) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during sign in.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Forgot Password - Generates reset token
 * @route   POST /api/auth/forgot-password, POST /api/user/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, emailAddress } = req.body;
    const resolvedEmail = (email || emailAddress || '').trim().toLowerCase();

    if (!resolvedEmail) {
      res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
      return;
    }

    const user = await User.findOne({ email: resolvedEmail });

    // For security, respond consistently, but if user exists, generate reset token
    if (!user) {
      res.status(200).json({
        success: true,
        message: 'If an account exists with this email, password reset instructions have been generated.',
      });
      return;
    }

    // Generate 32-byte secure random reset token
    const rawResetToken = crypto.randomBytes(32).toString('hex');

    // Hash token to store in database
    const hashedToken = crypto.createHash('sha256').update(rawResetToken).digest('hex');

    // Set token expiration to 1 hour from now
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset token generated successfully.',
      email: resolvedEmail,
      resetToken: rawResetToken,
      expiresIn: '1 hour',
      resetEndpoint: `/api/auth/reset-password`,
      instructions: 'Submit POST to /api/auth/reset-password with token and new password.',
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing forgot password request.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Reset Password using token
 * @route   POST /api/auth/reset-password, POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenParam = req.params?.token;
    const { token, resetToken, password, newPassword } = req.body;

    const resolvedToken = (tokenParam || token || resetToken || '').trim();
    const resolvedPassword = password || newPassword;

    if (!resolvedToken) {
      res.status(400).json({
        success: false,
        message: 'Reset token is required.',
      });
      return;
    }

    if (!resolvedPassword || String(resolvedPassword).trim().length < 6) {
      res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
      return;
    }

    // Hash the token provided by the user to compare with database record
    const hashedToken = crypto.createHash('sha256').update(resolvedToken).digest('hex');

    // Find user with valid and non-expired token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired. Please request a new one.',
      });
      return;
    }

    // Set new password (pre-save hook will hash it)
    user.password = String(resolvedPassword).trim();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now sign in with your new password.',
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting password.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get current user profile with their linked quote requests
 * @route   GET /api/auth/profile, GET /api/user/profile, GET /api/auth/me
 * @access  Private (Authenticated User)
 */
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User profile not found.',
      });
      return;
    }

    // Find all quote requests linked to this user's email address or userId
    const quoteRequests = await QuoteRequest.find({
      $or: [{ businessEmail: user.email.toLowerCase() }, { userId: user._id }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      quoteRequestsCount: quoteRequests.length,
      quoteRequests,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/auth/profile, PUT /api/user/profile
 * @access  Private (Authenticated User)
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User profile not found.',
      });
      return;
    }

    const { fullName, phoneNumber, companyName, currentPassword, newPassword } = req.body;

    if (fullName && String(fullName).trim()) {
      user.fullName = String(fullName).trim();
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = String(phoneNumber).trim();
    }

    if (companyName !== undefined) {
      user.companyName = String(companyName).trim();
    }

    // If user wants to update password
    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({
          success: false,
          message: 'Current password is required to set a new password.',
        });
        return;
      }

      const userWithPassword = await User.findById(user._id).select('+password');
      if (!userWithPassword) {
        res.status(404).json({ success: false, message: 'User not found.' });
        return;
      }

      const isMatch = await userWithPassword.comparePassword(currentPassword);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: 'Incorrect current password.',
        });
        return;
      }

      if (String(newPassword).trim().length < 6) {
        res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.',
        });
        return;
      }

      user.password = String(newPassword).trim();
    }

    await user.save();

    // Re-fetch linked quote requests
    const quoteRequests = await QuoteRequest.find({
      $or: [{ businessEmail: user.email.toLowerCase() }, { userId: user._id }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        role: user.role,
        updatedAt: user.updatedAt,
      },
      quoteRequestsCount: quoteRequests.length,
      quoteRequests,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile.',
      error: error.message || error,
    });
  }
};

/**
 * @desc    Get only quote requests for the authenticated user
 * @route   GET /api/auth/my-quotes, GET /api/user/quotes
 * @access  Private (Authenticated User)
 */
export const getUserQuoteRequests = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
      return;
    }

    const quotes = await QuoteRequest.find({
      $or: [{ businessEmail: user.email.toLowerCase() }, { userId: user._id }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error: any) {
    console.error('Get user quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quote requests.',
      error: error.message || error,
    });
  }
};
