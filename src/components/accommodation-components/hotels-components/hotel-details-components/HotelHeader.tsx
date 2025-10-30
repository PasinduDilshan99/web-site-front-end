// components/hotel/HotelHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelHeaderProps {
  hotel: ServiceProviderDetails;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {hotel.name}
          </h1>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < hotel.starRating 
                      ? 'fill-amber-500 text-amber-500' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-amber-600">
              {hotel.starRating} Star Hotel
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{hotel.address}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-purple-600" />
              <span>{hotel.contactNumber}</span>
            </div>
            {hotel.websiteUrl && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-purple-600" />
                <a 
                  href={hotel.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 underline"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 min-w-[200px]">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {hotel.checkInTime} - {hotel.checkOutTime}
            </div>
            <div className="text-sm text-gray-600 mt-1">Check-in / Check-out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;