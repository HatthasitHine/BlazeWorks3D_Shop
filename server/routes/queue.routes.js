import express from 'express';
import { getQueue, addQueue, startPrint, resetPrint, deleteQueue, completePrint } from '../controllers/queue.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getQueue);
router.post('/', verifyToken, verifyAdmin, addQueue);
router.patch('/:id/start', verifyToken, verifyAdmin, startPrint);
router.patch('/:id/reset', verifyToken, verifyAdmin, resetPrint);
router.patch('/:id/complete', verifyToken, verifyAdmin, completePrint);
router.delete('/:id', verifyToken, verifyAdmin, deleteQueue);

export default router;
