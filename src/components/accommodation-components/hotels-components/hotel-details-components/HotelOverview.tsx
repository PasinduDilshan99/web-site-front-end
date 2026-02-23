// components/hotel/HotelOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Anchor } from 'lucide-react';
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
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Anchor className="w-6 h-6 text-[#2A6F97]" />
        <h2 className="text-2xl font-bold text-[#1D4F6E]">Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-[#1D4F6E] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#2A6F97] rounded-full"></span>
            Hotel Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
              <Clock className="w-5 h-5 text-[#2A6F97]" />
              <div>
                <div className="font-medium text-[#1D4F6E]">Check-in/out</div>
                <div className="text-[#3F8AB2]">{hotel.checkInTime} / {hotel.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
              <Users className="w-5 h-5 text-[#2A6F97]" />
              <div>
                <div className="font-medium text-[#1D4F6E]">Total Rooms</div>
                <div className="text-[#3F8AB2]">{hotel.totalRooms} luxury rooms</div>
              </div>
            </div>
            
            {hotel.parkingFacility && (
              <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
                <Car className="w-5 h-5 text-[#2A6F97]" />
                <div>
                  <div className="font-medium text-[#1D4F6E]">Parking</div>
                  <div className="text-[#3F8AB2]">
                    {hotel.parkingCapacity ? `${hotel.parkingCapacity} spaces` : 'Valet parking available'}
                  </div>
                </div>
              </div>
            )}
            
            {hotel.wifiAvailable && (
              <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
                <Wifi className="w-5 h-5 text-[#2A6F97]" />
                <div className="font-medium text-[#1D4F6E]">Premium WiFi</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#1D4F6E] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#54A5CC] rounded-full"></span>
            Top Amenities
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {topAmenities.map((amenity) => (
              <div key={amenity.providerAmenityId} className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10 hover:shadow-sm transition-all">
                <div className="w-2 h-2 bg-[#2A6F97] rounded-full"></div>
                <span className="text-[#1D4F6E] text-sm">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#2A6F97]/10">
        <h3 className="text-lg font-semibold text-[#1D4F6E] mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#3F8AB2] rounded-full"></span>
          Description
        </h3>
        <p className="text-[#3F8AB2] leading-relaxed bg-[#F0F7FF] p-4 rounded-xl border border-[#2A6F97]/10">
          {hotel.description}
        </p>
      </div>
    </div>
  );
};

export default HotelOverview;