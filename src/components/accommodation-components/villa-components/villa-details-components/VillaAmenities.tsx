// components/villa/VillaAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Coffee, Tv, Waves, TreePine, Sparkles } from 'lucide-react';
import { Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface VillaAmenitiesProps {
  amenities: Amenity[];
  facilities: Facility[];
}

const VillaAmenities: React.FC<VillaAmenitiesProps> = ({ amenities, facilities }) => {
  const getAmenityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return <Wifi className="w-6 h-6" />;
      case 'recreation':
        return <Dumbbell className="w-6 h-6" />;
      case 'wellness':
        return <Waves className="w-6 h-6" />;
      case 'dining':
        return <Utensils className="w-6 h-6" />;
      case 'parking':
        return <Car className="w-6 h-6" />;
      case 'nature':
        return <TreePine className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'from-blue-500 to-cyan-500';
      case 'recreation':
        return 'from-purple-500 to-pink-500';
      case 'wellness':
        return 'from-emerald-500 to-teal-500';
      case 'dining':
        return 'from-amber-500 to-orange-500';
      case 'parking':
        return 'from-gray-500 to-slate-500';
      case 'nature':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-7 h-7 text-emerald-600" />
        <h2 className="text-3xl font-bold text-gray-900">Villa Amenities</h2>
      </div>
      
      <div className="space-y-8">
        {/* Amenities Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Premium Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="group p-4 bg-white rounded-xl border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-r ${getCategoryColor(amenity.amenityCategory)} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                    {getAmenityIcon(amenity.amenityCategory)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                      {amenity.amenityName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{amenity.amenityDescription}</div>
                    {amenity.localAdditionalCharge > 0 ? (
                      <div className="text-xs text-amber-600 font-semibold mt-1">
                        Additional charge: ${amenity.localAdditionalCharge}
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-600 font-semibold mt-1">
                        Complimentary
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Facilities Section */}
        {facilities.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Exclusive Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-emerald-800 text-lg mb-2">
                        {facility.facilityName}
                      </h4>
                      <p className="text-emerald-700 mb-3 leading-relaxed">
                        {facility.facilityDescription}
                      </p>
                      {facility.specialNote && (
                        <div className="p-3 bg-white bg-opacity-50 rounded-lg border border-emerald-200">
                          <p className="text-sm text-emerald-600 font-medium">
                            {facility.specialNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Summary */}
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-2">Complete Luxury Experience</h4>
            <p className="opacity-90">
              Enjoy {amenities.length} premium amenities and {facilities.length} exclusive facilities 
              designed for your ultimate comfort and relaxation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaAmenities;