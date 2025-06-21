import Listing from '../models/Listing.js';

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, startDate, endDate } = req.query;
    let query = {};

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // TODO: Filter by availability (requires checking bookings)
    // This would be implemented with a more complex query involving the Booking model

    const listings = await Listing.find(query).populate({
      path: 'host',
      select: 'name avatar'
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate({
      path: 'host',
      select: 'name avatar'
    });

    if (listing) {
      res.json(listing);
    } else {
      res.status(404);
      throw new Error('Listing not found');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private/Host
export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      price,
      images,
      amenities,
      maxGuests,
      bedrooms,
      bathrooms,
      coordinates
    } = req.body;

    const listing = new Listing({
      title,
      description,
      location,
      price,
      images: images || [],
      host: req.user._id,
      amenities: amenities || [],
      maxGuests,
      bedrooms,
      bathrooms,
      coordinates
    });

    const createdListing = await listing.save();
    res.status(201).json(createdListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private/Host
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    // Check if user is the host of the listing
    if (listing.host.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized, only the host can update this listing');
    }

    const {
      title,
      description,
      location,
      price,
      images,
      amenities,
      maxGuests,
      bedrooms,
      bathrooms,
      coordinates
    } = req.body;

    // Update fields
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (location) listing.location = location;
    if (price) listing.price = price;
    if (images) listing.images = images;
    if (amenities) listing.amenities = amenities;
    if (maxGuests) listing.maxGuests = maxGuests;
    if (bedrooms) listing.bedrooms = bedrooms;
    if (bathrooms) listing.bathrooms = bathrooms;
    if (coordinates) listing.coordinates = coordinates;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private/Host
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    // Check if user is the host of the listing
    if (listing.host.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized, only the host can delete this listing');
    }

    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Get listings by host
// @route   GET /api/listings/host
// @access  Private/Host
export const getHostListings = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};