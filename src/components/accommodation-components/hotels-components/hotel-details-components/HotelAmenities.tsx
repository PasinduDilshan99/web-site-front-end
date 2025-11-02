// components/hotel/HotelAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Coffee, Tv } from 'lucide-react';
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
        return <Coffee className="w-5 h-5" />;
      case 'dining':
        return <Utensils className="w-5 h-5" />;
      case 'parking':
        return <Car className="w-5 h-5" />;
      default:
        return <Tv className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="text-amber-600">
                  {getAmenityIcon(amenity.amenityCategory)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{amenity.amenityName}</div>
                  <div className="text-sm text-gray-600">{amenity.amenityDescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {facilities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Facilities</h3>
            <div className="space-y-3">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-3 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <div className="font-medium text-purple-800">{facility.facilityName}</div>
                  <div className="text-sm text-purple-600 mt-1">{facility.facilityDescription}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelAmenities;