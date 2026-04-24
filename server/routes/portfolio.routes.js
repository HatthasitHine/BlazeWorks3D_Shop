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
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
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
