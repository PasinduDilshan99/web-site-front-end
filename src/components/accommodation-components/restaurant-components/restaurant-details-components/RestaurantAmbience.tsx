// components/restaurant/RestaurantAmbience.tsx
import React from 'react';
import { Music, Palette, Users, Heart } from 'lucide-react';
import { Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface RestaurantAmbienceProps {
  facilities: Facility[];
  amenities: Amenity[];
}

const RestaurantAmbience: React.FC<RestaurantAmbienceProps> = ({ facilities, amenities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ambience & Atmosphere</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dining Experience</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-200">
              <Music className="w-5 h-5 text-rose-600" />
              <div>
                <div className="font-medium text-rose-800">Live Music</div>
                <div className="text-sm text-rose-600">Evening performances</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Palette className="w-5 h-5 text-orange-600" />
              <div>
                <div className="font-medium text-orange-800">Modern Decor</div>
                <div className="text-sm text-orange-600">Contemporary design</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-200">
              <Users className="w-5 h-5 text-rose-600" />
              <div>
                <div className="font-medium text-rose-800">Private Dining</div>
                <div className="text-sm text-rose-600">Available for events</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Heart className="w-5 h-5 text-orange-600" />
              <div>
                <div className="font-medium text-orange-800">Romantic Setting</div>
                <div className="text-sm text-orange-600">Perfect for dates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAmbience;