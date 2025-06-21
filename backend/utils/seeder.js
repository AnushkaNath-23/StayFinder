import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedData();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Listing.deleteMany();
    await Booking.deleteMany();

    console.log('Data cleared');

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const hostUser = await User.create({
      name: 'John Host',
      email: 'host@example.com',
      password: hashedPassword,
      role: 'host',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    });

    const guestUser = await User.create({
      name: 'Jane Guest',
      email: 'guest@example.com',
      password: hashedPassword,
      role: 'guest',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    });

    console.log('Users created');

    // Create listings
    const listings = [
      {
        title: 'Luxury Beachfront Villa',
        description: 'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views. Perfect for couples or small families looking for an unforgettable getaway.',
        location: 'Malibu, California',
        price: 450,
        images: [
          'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        host: hostUser._id,
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Air Conditioning'],
        maxGuests: 4,
        bedrooms: 2,
        bathrooms: 2
      },
      {
        title: 'Mountain Retreat Cabin',
        description: 'Cozy cabin nestled in the mountains with stunning views and hiking trails nearby. Perfect for nature lovers and those seeking peace and quiet.',
        location: 'Aspen, Colorado',
        price: 275,
        images: [
          'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        host: hostUser._id,
        amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Kitchen', 'Hiking'],
        maxGuests: 4,
        bedrooms: 2,
        bathrooms: 1
      },
      {
        title: 'Modern City Loft',
        description: 'Stylish loft in the heart of downtown with floor-to-ceiling windows and city skyline views. Walking distance to restaurants, shops, and nightlife.',
        location: 'New York, NY',
        price: 320,
        images: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        host: hostUser._id,
        amenities: ['WiFi', 'Gym', 'Doorman', 'Kitchen', 'Washer/Dryer'],
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1
      }
    ];

    const createdListings = await Listing.insertMany(listings);
    console.log('Listings created');

    // Create a booking
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // 7 days from now
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3); // 3 day stay

    const booking = await Booking.create({
      listing: createdListings[0]._id,
      user: guestUser._id,
      startDate,
      endDate,
      guests: 2,
      totalPrice: createdListings[0].price * 3, // 3 nights
      status: 'confirmed'
    });

    console.log('Booking created');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};