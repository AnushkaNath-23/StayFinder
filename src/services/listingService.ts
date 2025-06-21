import { Listing, Booking, BookingFormData } from '../types';

// Mock data - replace with actual API calls
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    description: 'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views. Perfect for couples or small families looking for an unforgettable getaway.',
    location: 'Malibu, California',
    price: 450,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '1',
    hostName: 'Sarah Johnson',
    hostAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Parking'],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to nature in this charming mountain cabin surrounded by pine trees and hiking trails. Features a fireplace and hot tub for the perfect retreat.',
    location: 'Aspen, Colorado',
    price: 280,
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '2',
    hostName: 'Mike Chen',
    hostAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Kitchen', 'Hiking'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '3',
    title: 'Modern City Loft',
    description: 'Stylish loft in the heart of downtown with floor-to-ceiling windows and city skyline views. Walking distance to restaurants, shops, and nightlife.',
    location: 'New York, NY',
    price: 320,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '3',
    hostName: 'Emma Davis',
    hostAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'City View', 'Kitchen', 'Gym Access', 'Elevator'],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: '4',
    title: 'Romantic Vineyard Cottage',
    description: 'Charming cottage nestled in a working vineyard with wine tastings and breathtaking sunset views. Perfect for a romantic getaway or peaceful retreat.',
    location: 'Napa Valley, California',
    price: 380,
    images: [
      'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '4',
    hostName: 'Robert Wilson',
    hostAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'Wine Tasting', 'Garden', 'Kitchen', 'Parking'],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.9,
    reviewCount: 73
  },
  {
    id: '5',
    title: 'Tropical Paradise Villa',
    description: 'Private villa with infinity pool overlooking crystal clear waters. Includes private beach access and daily housekeeping service.',
    location: 'Key West, Florida',
    price: 520,
    images: [
      'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '5',
    hostName: 'Maria Garcia',
    hostAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Housekeeping', 'Kitchen'],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.8,
    reviewCount: 94
  },
  {
    id: '6',
    title: 'Historic Brownstone',
    description: 'Beautifully restored 19th-century brownstone with original architectural details and modern amenities. Located in a prestigious neighborhood.',
    location: 'Boston, Massachusetts',
    price: 295,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    hostId: '6',
    hostName: 'James Thompson',
    hostAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    amenities: ['WiFi', 'Historic Building', 'Kitchen', 'Garden', 'Parking'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.6,
    reviewCount: 112
  }
];

class ListingService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getListings(): Promise<Listing[]> {
    await this.delay(800);
    return mockListings;
  }

  async getListing(id: string): Promise<Listing | null> {
    await this.delay(600);
    return mockListings.find(listing => listing.id === id) || null;
  }

  async createBooking(listingId: string, bookingData: BookingFormData): Promise<Booking> {
    await this.delay(1000);
    
    const listing = mockListings.find(l => l.id === listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    const days = Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * listing.price;

    return {
      id: Math.random().toString(36).substr(2, 9),
      listingId,
      userId: '1', // Mock user ID
      checkIn: bookingData.checkIn.toISOString(),
      checkOut: bookingData.checkOut.toISOString(),
      guests: bookingData.guests,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
  }
}

export const listingService = new ListingService();