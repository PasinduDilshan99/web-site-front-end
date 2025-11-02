// components/resort/ResortAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Coffee, Tv, Waves, Sun, Umbrella, Sparkles } from 'lucide-react';
import { Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface ResortAmenitiesProps {
  amenities: Amenity[];
  facilities: Facility[];
}

const ResortAmenities: React.FC<ResortAmenitiesProps> = ({ amenities, facilities }) => {
  const getAmenityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return <Wifi className="w-6 h-6" />;
      case 'recreation':
        return <Dumbbell className="w-6 h-6" />;
      case 'wellness':
        return <Coffee className="w-6 h-6" />;
      case 'dining':
        return <Utensils className="w-6 h-6" />;
      case 'parking':
        return <Car className="w-6 h-6" />;
      case 'beach':
        return <Waves className="w-6 h-6" />;
      case 'pool':
        return <Umbrella className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'from-blue-500 to-cyan-500';
      case 'recreation':
        return 'from-emerald-500 to-green-500';
      case 'wellness':
        return 'from-purple-500 to-pink-500';
      case 'dining':
        return 'from-amber-500 to-orange-500';
      case 'parking':
        return 'from-gray-500 to-slate-500';
      case 'beach':
        return 'from-teal-500 to-blue-500';
      case 'pool':
        return 'from-cyan-500 to-blue-500';
      default:
        return 'from-teal-500 to-emerald-500';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-teal-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Resort Amenities
        </h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Premium Features</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Amenities Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-500" />
            Resort Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-blue-50 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(amenity.amenityCategory)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {getAmenityIcon(amenity.amenityCategory)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 text-lg mb-1">{amenity.amenityName}</div>
                  <div className="text-sm text-gray-600">{amenity.amenityDescription}</div>
                  {amenity.localAdditionalCharge > 0 && (
                    <div className="text-xs text-teal-600 font-semibold mt-1">
                      Additional: ${amenity.localAdditionalCharge}
                    </div>
                  )}
                </div>
                {amenity.isAvailable && (
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Facilities Section */}
        {facilities.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Waves className="w-6 h-6 text-teal-500" />
              Resort Facilities
            </h3>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-3 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-teal-800 text-lg mb-2">{facility.facilityName}</div>
                      <div className="text-teal-700 mb-3">{facility.facilityDescription}</div>
                      {facility.specialNote && (
                        <div className="text-sm bg-white/80 text-teal-600 px-4 py-2 rounded-lg border border-teal-200">
                          💡 {facility.specialNote}
                        </div>
                      )}
                    </div>
                    {facility.images.length > 0 && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={facility.images[0].imageUrl}
                          alt={facility.images[0].imageName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{amenities.length}+ Premium Amenities</div>
          <div className="text-teal-100">
            Everything you need for a perfect luxury resort experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortAmenities;