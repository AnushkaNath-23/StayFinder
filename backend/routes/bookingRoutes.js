import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getHostBookings
} from '../controllers/bookingController.js';
import { protect, hostOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes for all authenticated users
router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBookingStatus);

// Host only routes
router.get('/host/bookings', protect, hostOnly, getHostBookings);

export default router;