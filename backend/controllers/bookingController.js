import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, guests } = req.body;

    // Validate input
    if (!listingId || !startDate || !endDate || !guests) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    // Check if guests count is valid
    if (guests > listing.maxGuests) {
      res.status(400);
      throw new Error(`This listing can only accommodate up to ${listing.maxGuests} guests`);
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate dates
    if (start >= end) {
      res.status(400);
      throw new Error('End date must be after start date');
    }

    // Check if the listing is available for the requested dates
    const conflictingBooking = await Booking.findOne({
      listing: listingId,
      status: { $ne: 'cancelled' },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (conflictingBooking) {
      res.status(400);
      throw new Error('Listing is not available for the selected dates');
    }

    // Calculate total price (number of nights * price per night)
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    // Create the booking
    const booking = new Booking({
      listing: listingId,
      user: req.user._id,
      startDate: start,
      endDate: end,
      guests,
      totalPrice,
      status: 'pending'
    });

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'listing',
        select: 'title location images price'
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'listing',
        select: 'title location images price host',
        populate: {
          path: 'host',
          select: 'name avatar'
        }
      })
      .populate({
        path: 'user',
        select: 'name email'
      });

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    // Check if the user is authorized to view this booking
    if (
      booking.user._id.toString() !== req.user._id.toString() &&
      booking.listing.host.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized to view this booking');
    }

    res.json(booking);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    // Get the listing to check if the user is the host
    const listing = await Listing.findById(booking.listing);

    // Check authorization - only the host can confirm bookings
    // Users can cancel their own bookings
    if (status === 'confirmed' && listing.host.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Only the host can confirm bookings');
    }

    if (status === 'cancelled' && 
        booking.user.toString() !== req.user._id.toString() && 
        listing.host.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to cancel this booking');
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Get bookings for host's listings
// @route   GET /api/bookings/host
// @access  Private/Host
export const getHostBookings = async (req, res) => {
  try {
    // First, get all listings by the host
    const hostListings = await Listing.find({ host: req.user._id }).select('_id');
    const listingIds = hostListings.map(listing => listing._id);

    // Then, get all bookings for those listings
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate({
        path: 'listing',
        select: 'title location images price'
      })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};