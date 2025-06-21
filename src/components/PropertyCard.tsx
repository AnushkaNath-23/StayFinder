import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Listing } from '../types';

interface PropertyCardProps {
  listing: Listing;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
  return (
    <Link to={`/listings/${listing.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{listing.rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            {listing.location}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {listing.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {listing.maxGuests} guests • {listing.bedrooms} bed • {listing.bathrooms} bath
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-gray-900">${listing.price}</span>
              <span className="text-gray-500 text-sm ml-1">/ night</span>
            </div>
            <div className="text-sm text-gray-500">
              {listing.reviewCount} reviews
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;