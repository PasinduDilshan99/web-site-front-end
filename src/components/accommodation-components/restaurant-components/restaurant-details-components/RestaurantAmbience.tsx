// components/restaurant/RestaurantAmbience.tsx
import React from 'react';
import { Music, Palette, Users, Heart, Waves, Wind } from 'lucide-react';
import { Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface RestaurantAmbienceProps {
  facilities: Facility[];
  amenities: Amenity[];
}

const RestaurantAmbience: React.FC<RestaurantAmbienceProps> = ({ facilities, amenities }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl">
      <h2 className="text-2xl font-bold text-[#3A9B9B] mb-6 flex items-center gap-2">
        <Wind className="w-6 h-6" />
        Coastal Ambience & Atmosphere
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-[#3A9B9B] mb-4">Dining Experience</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#3A9B9B]/10 rounded-lg">
                <Music className="w-5 h-5 text-[#3A9B9B]" />
              </div>
              <div>
                <div className="font-medium text-[#3A9B9B]">Coastal Live Music</div>
                <div className="text-sm text-[#5FB3B3]">Evening performances</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#84CACA]/10 rounded-lg">
                <Palette className="w-5 h-5 text-[#84CACA]" />
              </div>
              <div>
                <div className="font-medium text-[#3A9B9B]">Ocean-Inspired Decor</div>
                <div className="text-sm text-[#5FB3B3]">Contemporary coastal design</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#3A9B9B] mb-4">Special Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#3A9B9B]/10 rounded-lg">
                <Users className="w-5 h-5 text-[#3A9B9B]" />
              </div>
              <div>
                <div className="font-medium text-[#3A9B9B]">Private Coastal Dining</div>
                <div className="text-sm text-[#5FB3B3]">Available for events</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#84CACA]/10 rounded-lg">
                <Heart className="w-5 h-5 text-[#84CACA]" />
              </div>
              <div>
                <div className="font-medium text-[#3A9B9B]">Romantic Sunset Views</div>
                <div className="text-sm text-[#5FB3B3]">Perfect for dates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Ambience Features */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
        <h4 className="font-semibold text-[#3A9B9B] mb-3 flex items-center gap-2">
          <Waves className="w-4 h-4" />
          Coastal Atmosphere
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-2">
            <div className="text-[#3A9B9B] font-bold">Ocean View</div>
            <div className="text-xs text-[#5FB3B3]">Panoramic</div>
          </div>
          <div className="text-center p-2">
            <div className="text-[#3A9B9B] font-bold">Open Air</div>
            <div className="text-xs text-[#5FB3B3]">Seasonal</div>
          </div>
          <div className="text-center p-2">
            <div className="text-[#3A9B9B] font-bold">Candlelight</div>
            <div className="text-xs text-[#5FB3B3]">Evenings</div>
          </div>
          <div className="text-center p-2">
            <div className="text-[#3A9B9B] font-bold">Beachfront</div>
            <div className="text-xs text-[#5FB3B3]">Direct access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAmbience;