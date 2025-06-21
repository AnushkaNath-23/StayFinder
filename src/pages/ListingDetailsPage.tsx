import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Bed, Bath, Star, Wifi, Car, Coffee, Tv, School as Pool, Utensils } from 'lucide-react';
import { Listing } from '../types';
import { listingService } from '../services/listingService';
import ImageGallery from '../components/ImageGallery';
import BookingForm from '../components/BookingForm';
import LoadingSpinner from '../components/LoadingSpinner';

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await listingService.getListing(id);
        if (!data) {
          setError('Listing not found');
        } else {
          setListing(data);
        }
      } catch (err) {
        setError('Failed to load listing details');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'WiFi': <Wifi className="h-5 w-5" />,
      'Parking': <Car className="h-5 w-5" />,
      'Kitchen': <Utensils className="h-5 w-5" />,
      'Pool': <Pool className="h-5 w-5" />,
      'TV': <Tv className="h-5 w-5" />,
      'Coffee': <Coffee className="h-5 w-5" />
    };
    return iconMap[amenity] || <Coffee className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Listing not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{listing.rating}</span>
              <span className="mx-1">·</span>
              <span>{listing.reviewCount} reviews</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {listing.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery images={listing.images} title={listing.title} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Hosted by {listing.hostName}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{listing.maxGuests} guests</span>
                  <span>·</span>
                  <Bed className="h-4 w-4" />
                  <span>{listing.bedrooms} bedrooms</span>
                  <span>·</span>
                  <Bath className="h-4 w-4" />
                  <span>{listing.bathrooms} bathrooms</span>
                </div>
              </div>
              {listing.hostAvatar && (
                <img
                  src={listing.hostAvatar}
                  alt={listing.hostName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>

            {/* Description */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this place
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {listing.rating} · {listing.reviewCount} reviews
                </span>
              </div>
              
              {/* Mock Reviews */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                      alt="Reviewer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Alex Johnson</p>
                      <p className="text-sm text-gray-500">March 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Amazing stay! The property was exactly as described and the host was incredibly welcoming. 
                    The location was perfect and we enjoyed every moment of our trip.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                      alt="Reviewer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Maria Rodriguez</p>
                      <p className="text-sm text-gray-500">February 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Clean, comfortable, and beautifully designed space. Great communication from the host 
                    and all amenities worked perfectly. Would definitely stay again!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;