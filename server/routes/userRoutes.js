import express from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Route to get all users - Admin only
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router; 