// components/restaurant/RestaurantHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Clock, Utensils, Waves } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface RestaurantHeaderProps {
  restaurant: ServiceProviderDetails;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-[#3A9B9B]/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A9B9B]/5 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#84CACA]/5 rounded-full -ml-8 -mb-8"></div>
      <Waves className="absolute bottom-2 right-2 w-16 h-16 text-[#3A9B9B]/5" />
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] text-white p-2 rounded-lg">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#3A9B9B]">
              {restaurant.name}
            </h1>
            <span className="px-3 py-1 bg-[#3A9B9B]/10 text-[#3A9B9B] rounded-full text-xs font-medium border border-[#3A9B9B]/20">
              Coastal Dining
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < restaurant.starRating 
                        ? 'fill-[#5FB3B3] text-[#5FB3B3]' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-[#5FB3B3]">
                {restaurant.starRating} Star Restaurant
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[#3A9B9B] bg-[#E8F6F6] px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                {restaurant.operatingHours?.[0]?.opensAt} - {restaurant.operatingHours?.[0]?.closesAt}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 text-gray-600">
            <div className="flex items-center gap-2 bg-[#E8F6F6] px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4 text-[#3A9B9B]" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#E8F6F6] px-3 py-1.5 rounded-lg">
              <Phone className="w-4 h-4 text-[#3A9B9B]" />
              <span>{restaurant.contactNumber}</span>
            </div>
            {restaurant.websiteUrl && (
              <div className="flex items-center gap-2 bg-[#E8F6F6] px-3 py-1.5 rounded-lg hover:bg-[#3A9B9B]/10 transition-colors">
                <Globe className="w-4 h-4 text-[#3A9B9B]" />
                <a 
                  href={restaurant.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#5FB3B3] hover:text-[#3A9B9B] underline font-medium"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-xl p-4 min-w-[200px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-6 -mt-6"></div>
          <div className="text-center relative z-10">
            <div className="text-2xl font-bold">Multi-Cuisine</div>
            <div className="text-sm opacity-90 mt-1">Coastal & International</div>
            <div className="flex justify-center gap-1 mt-2">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;