// components/restaurant/RestaurantHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Clock, Utensils } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface RestaurantHeaderProps {
  restaurant: ServiceProviderDetails;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-rose-500 text-white p-2 rounded-lg">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {restaurant.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < restaurant.starRating 
                        ? 'fill-orange-500 text-orange-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-orange-600">
                {restaurant.starRating} Star Restaurant
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-rose-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                {restaurant.operatingHours?.[0]?.opensAt} - {restaurant.operatingHours?.[0]?.closesAt}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-600" />
              <span>{restaurant.contactNumber}</span>
            </div>
            {restaurant.websiteUrl && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-rose-600" />
                <a 
                  href={restaurant.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 underline"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-4 min-w-[200px] text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {restaurant.cuisineType || "Multi-Cuisine"}
            </div>
            <div className="text-sm opacity-90 mt-1">Cuisine Type</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;