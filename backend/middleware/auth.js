import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const authenticate = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chitwan_sajha_hospital_super_secret_jwt_key_2026_nepal');
    
    // Fetch user from DB
    const user = db.prepare('SELECT id, name, email, phone, role, avatar FROM users WHERE id = ?').get(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session user.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid signature or expired token.' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${roles.join(', ')}]. Your role is ${req.user.role}.`
      });
    }

    next();
  };
};
