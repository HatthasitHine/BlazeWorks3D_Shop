import express from 'express';
import multer from 'multer';
import { 
  getPortfolioItems, 
  createPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '../controllers/portfolio.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Use memoryStorage so we get file buffer (for Base64 DB storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public route to get all items
router.get('/', getPortfolioItems);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createPortfolioItem);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updatePortfolioItem);
router.delete('/:id', verifyToken, verifyAdmin, deletePortfolioItem);

export default router;
