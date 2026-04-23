import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getPortfolioItems, 
  createPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '../controllers/portfolio.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Public route to get all items
router.get('/', getPortfolioItems);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createPortfolioItem);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updatePortfolioItem);
router.delete('/:id', verifyToken, verifyAdmin, deletePortfolioItem);

export default router;
