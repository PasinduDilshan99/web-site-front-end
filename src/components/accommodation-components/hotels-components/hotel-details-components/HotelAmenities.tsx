// components/hotel/HotelAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Coffee, Tv, Waves, Anchor } from 'lucide-react';
import { Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface HotelAmenitiesProps {
  amenities: Amenity[];
  facilities: Facility[];
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities, facilities }) => {
  const getAmenityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return <Wifi className="w-5 h-5" />;
      case 'recreation':
        return <Dumbbell className="w-5 h-5" />;
      case 'wellness':
        return <Waves className="w-5 h-5" />;
      case 'dining':
        return <Utensils className="w-5 h-5" />;
      case 'parking':
        return <Car className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Anchor className="w-4 h-4 text-[#2A6F97]" />
          <h3 className="text-lg font-semibold text-[#1D4F6E]">Amenities</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.providerAmenityId}
              className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10 hover:border-[#3F8AB2]/30 transition-colors group"
            >
              <div className="text-[#2A6F97] group-hover:scale-110 transition-transform">
                {getAmenityIcon(amenity.amenityCategory)}
              </div>
              <div>
                <div className="font-medium text-[#1D4F6E]">{amenity.amenityName}</div>
                <div className="text-sm text-[#3F8AB2]">{amenity.amenityDescription}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {facilities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#1D4F6E] mb-4">Facilities</h3>
          <div className="space-y-3">
            {facilities.map((facility) => (
              <div
                key={facility.facilityId}
                className="p-3 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10 hover:border-[#54A5CC]/30 transition-colors"
              >
                <div className="font-medium text-[#1D4F6E]">{facility.facilityName}</div>
                <div className="text-sm text-[#3F8AB2] mt-1">{facility.facilityDescription}</div>
                {facility.specialNote && (
                  <div className="text-xs text-[#54A5CC] mt-1 bg-white p-2 rounded-lg border border-[#2A6F97]/10">
                    {facility.specialNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Premium Features Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
        <h3 className="font-semibold text-[#1D4F6E] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2A6F97] rounded-full"></span>
          Premium Services
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#2A6F97]/10">
            <div className="w-2 h-2 bg-[#2A6F97] rounded-full"></div>
            <span className="text-[#1D4F6E]">24/7 Concierge</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#2A6F97]/10">
            <div className="w-2 h-2 bg-[#3F8AB2] rounded-full"></div>
            <span className="text-[#1D4F6E]">Valet Parking</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#2A6F97]/10">
            <div className="w-2 h-2 bg-[#54A5CC] rounded-full"></div>
            <span className="text-[#1D4F6E]">Spa Access</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#2A6F97]/10">
            <div className="w-2 h-2 bg-[#2A6F97] rounded-full"></div>
            <span className="text-[#1D4F6E]">Business Center</span>
          </div>
        </div>
        
        {/* Trust Note */}
        <div className="mt-3 pt-3 border-t border-[#2A6F97]/10 text-center">
          <p className="text-xs text-[#3F8AB2] flex items-center justify-center gap-1">
            <span>✦</span>
            All amenities included in your stay
            <span>✦</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelAmenities;