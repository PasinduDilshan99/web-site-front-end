// components/restaurant/RestaurantOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Star } from 'lucide-react';
import { OperatingHours,ServiceProviderDetails, Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface RestaurantOverviewProps {
  restaurant: ServiceProviderDetails;
  amenities: Amenity[];
  facilities: Facility[];
  operatingHours: OperatingHours[];
}

const RestaurantOverview: React.FC<RestaurantOverviewProps> = ({ 
  restaurant, 
  amenities, 
  facilities,
  operatingHours 
}) => {
  const topAmenities = amenities.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-rose-600" />
              <div>
                <div className="font-medium">Operating Hours</div>
                {operatingHours.map((hours, index) => (
                  <div key={index} className="text-gray-600 text-sm">
                    {getDayName(hours.dayOfWeek)}: {hours.opensAt} - {hours.closesAt}
                    {hours.hoursSpecialNote && ` (${hours.hoursSpecialNote})`}
                  </div>
                ))}
              </div>
            </div>
            
            {restaurant.parkingFacility && (
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-rose-600" />
                <div>
                  <div className="font-medium">Parking</div>
                  <div className="text-gray-600">
                    {restaurant.parkingCapacity ? `${restaurant.parkingCapacity} spaces` : 'Available'}
                  </div>
                </div>
              </div>
            )}
            
            {restaurant.wifiAvailable && (
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-rose-600" />
                <div className="font-medium text-gray-600">Free WiFi</div>
              </div>
            )}
            
            {restaurant.petFriendly && (
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-rose-600" />
                <div className="font-medium text-gray-600">Pet Friendly</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {topAmenities.map((amenity) => (
              <div key={amenity.providerAmenityId} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Our Restaurant</h3>
        <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
        
        {restaurant.specialInstructions && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">Special Notes</h4>
            <p className="text-orange-700 text-sm">{restaurant.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get day name from day number
const getDayName = (dayNumber: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber - 1] || days[0];
};

export default RestaurantOverview;