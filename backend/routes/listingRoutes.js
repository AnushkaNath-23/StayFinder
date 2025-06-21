import express from 'express';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getHostListings
} from '../controllers/listingController.js';
import { protect, hostOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getListings);
router.get('/:id', getListingById);

// Host routes - protected
router.post('/', protect, hostOnly, createListing);
router.put('/:id', protect, hostOnly, updateListing);
router.delete('/:id', protect, hostOnly, deleteListing);
router.get('/host/listings', protect, hostOnly, getHostListings);

export default router;