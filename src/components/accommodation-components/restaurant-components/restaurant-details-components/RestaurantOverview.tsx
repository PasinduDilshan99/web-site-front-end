// components/restaurant/RestaurantOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Star, Waves } from 'lucide-react';
import { OperatingHours, ServiceProviderDetails, Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl">
      <h2 className="text-2xl font-bold text-[#3A9B9B] mb-6 flex items-center gap-2">
        <Waves className="w-6 h-6" />
        Restaurant Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-[#3A9B9B] mb-4">Restaurant Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-[#E8F6F6] rounded-xl">
              <Clock className="w-5 h-5 text-[#3A9B9B] mt-0.5" />
              <div>
                <div className="font-medium text-[#3A9B9B]">Operating Hours</div>
                {operatingHours.map((hours, index) => (
                  <div key={index} className="text-[#5FB3B3] text-sm">
                    {getDayName(hours.dayOfWeek)}: {hours.opensAt} - {hours.closesAt}
                    {hours.hoursSpecialNote && ` (${hours.hoursSpecialNote})`}
                  </div>
                ))}
              </div>
            </div>
            
            {restaurant.parkingFacility && (
              <div className="flex items-center gap-3 p-3 bg-[#E8F6F6] rounded-xl">
                <Car className="w-5 h-5 text-[#3A9B9B]" />
                <div>
                  <div className="font-medium text-[#3A9B9B]">Parking</div>
                  <div className="text-[#5FB3B3]">
                    {restaurant.parkingCapacity ? `${restaurant.parkingCapacity} spaces` : 'Valet Available'}
                  </div>
                </div>
              </div>
            )}
            
            {restaurant.wifiAvailable && (
              <div className="flex items-center gap-3 p-3 bg-[#E8F6F6] rounded-xl">
                <Wifi className="w-5 h-5 text-[#3A9B9B]" />
                <div className="font-medium text-[#3A9B9B]">Coastal WiFi</div>
              </div>
            )}
            
            {restaurant.petFriendly && (
              <div className="flex items-center gap-3 p-3 bg-[#E8F6F6] rounded-xl">
                <Star className="w-5 h-5 text-[#3A9B9B]" />
                <div className="font-medium text-[#3A9B9B]">Pet Friendly</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#3A9B9B] mb-4">Coastal Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {topAmenities.map((amenity) => (
              <div key={amenity.providerAmenityId} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#3A9B9B]/10">
                <div className="w-2 h-2 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full"></div>
                <span className="text-[#5FB3B3]">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#3A9B9B]/10">
        <h3 className="text-lg font-semibold text-[#3A9B9B] mb-4">About Our Coastal Restaurant</h3>
        <p className="text-[#5FB3B3] leading-relaxed">{restaurant.description}</p>
        
        {restaurant.specialInstructions && (
          <div className="mt-4 p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
            <h4 className="font-semibold text-[#3A9B9B] mb-2">Special Notes</h4>
            <p className="text-[#5FB3B3] text-sm">{restaurant.specialInstructions}</p>
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