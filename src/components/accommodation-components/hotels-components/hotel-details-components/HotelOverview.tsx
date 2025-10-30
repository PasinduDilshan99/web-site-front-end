// components/hotel/HotelOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils } from 'lucide-react';
import { Amenity, Facility, ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelOverviewProps {
  hotel: ServiceProviderDetails;
  amenities: Amenity[];
  facilities: Facility[];
}

const HotelOverview: React.FC<HotelOverviewProps> = ({ hotel, amenities, facilities }) => {
  const topAmenities = amenities.slice(0, 6);
  const topFacilities = facilities.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hotel Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <div>
                <div className="font-medium">Check-in/out</div>
                <div className="text-gray-600">{hotel.checkInTime} / {hotel.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-600" />
              <div>
                <div className="font-medium">Total Rooms</div>
                <div className="text-gray-600">{hotel.totalRooms} rooms</div>
              </div>
            </div>
            
            {hotel.parkingFacility && (
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium">Parking</div>
                  <div className="text-gray-600">
                    {hotel.parkingCapacity ? `${hotel.parkingCapacity} spaces` : 'Available'}
                  </div>
                </div>
              </div>
            )}
            
            {hotel.wifiAvailable && (
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-amber-600" />
                <div className="font-medium text-gray-600">Free WiFi</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {topAmenities.map((amenity) => (
              <div key={amenity.providerAmenityId} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
      </div>
    </div>
  );
};

export default HotelOverview;