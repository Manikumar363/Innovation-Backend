import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const JWT_SECRET = process.env.JWT_SECRET || 'innovation_jwt_secret_key_2026_super_secure';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

/**
 * Extracts Bearer token from authorization header or query param
 */
const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1].trim();
  }
  if (req.headers['x-auth-token'] && typeof req.headers['x-auth-token'] === 'string') {
    return req.headers['x-auth-token'].trim();
  }
  if (req.query?.token && typeof req.query.token === 'string') {
    return req.query.token.trim();
  }
  return null;
};

/**
 * Protect middleware: requires valid end-user JWT token
 */
export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. No authorization token provided.',
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    if (!decoded || !decoded.id) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization token.',
      });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User account not found or token has expired.',
      });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Session expired. Please sign in again.',
      });
      return;
    }
    res.status(401).json({
      success: false,
      message: 'Invalid or malformed authorization token.',
      error: err.message,
    });
  }
};

/**
 * Optional Auth middleware: attaches user if token is present, continues even if not
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
      if (decoded && decoded.id) {
        const user = await User.findById(decoded.id);
        if (user && user.status !== 'suspended') {
          req.user = user;
        }
      }
    }
  } catch {
    // Ignore invalid/expired token in optionalAuth
  }
  next();
};

/**
 * Generate standard JWT token for a user
 */
export const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions
  );
};
