import express from 'express';
import { 
  recordVisit,
  updateDuration,
  getAnalyticsStats,
  resetAnalytics
} from '../controllers/analytics.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Optional token verification for tracking (so anonymous users can be tracked without error)
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    verifyToken(req, res, () => next());
  } else {
    next();
  }
};

router.post('/visit', optionalAuth, recordVisit);
router.post('/heartbeat', updateDuration);

// Admin only routes
router.get('/stats', verifyToken, verifyAdmin, getAnalyticsStats);
router.delete('/reset', verifyToken, verifyAdmin, resetAnalytics);

export default router;
