import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { Listing, BookingFormData } from '../types';
import { listingService } from '../services/listingService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  listing: Listing;
}

const BookingForm: React.FC<BookingFormProps> = ({ listing }) => {
  const { user } = useAuth();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const days = checkIn && checkOut ? 
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = days * listing.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to book this property');
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      alert('Please select valid check-in and check-out dates');
      return;
    }

    setLoading(true);
    try {
      const bookingData: BookingFormData = {
        checkIn,
        checkOut,
        guests
      };
      
      await listingService.createBooking(listing.id, bookingData);
      setSuccess(true);
    } catch (error) {
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">
            Your reservation has been confirmed. You'll receive a confirmation email shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Book Another Stay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
          <span className="text-gray-500 ml-1">/ night</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>★ {listing.rating}</span>
          <span className="mx-1">·</span>
          <span>{listing.reviewCount} reviews</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg overflow-hidden">
          <div className="p-3 border-r border-gray-300">
            <label className="block text-xs font-semibold text-gray-700 mb-1">CHECK-IN</label>
            <DatePicker
              selected={checkIn}
              onChange={setCheckIn}
              minDate={new Date()}
              placeholderText="Add date"
              className="w-full border-none outline-none text-sm"
              dateFormat="MMM d, yyyy"
            />
          </div>
          <div className="p-3">
            <label className="block text-xs font-semibold text-gray-700 mb-1">CHECK-OUT</label>
            <DatePicker
              selected={checkOut}
              onChange={setCheckOut}
              minDate={checkIn || new Date()}
              placeholderText="Add date"
              className="w-full border-none outline-none text-sm"
              dateFormat="MMM d, yyyy"
            />
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1">GUESTS</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border-none outline-none text-sm"
          >
            {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !user}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : !user ? (
            'Log in to Book'
          ) : (
            'Reserve'
          )}
        </button>

        {!user && (
          <p className="text-sm text-gray-500 text-center">
            You need to be logged in to make a reservation
          </p>
        )}

        {checkIn && checkOut && days > 0 && (
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span>${listing.price} x {days} nights</span>
              <span>${listing.price * days}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>${Math.round(totalPrice * 0.1)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;