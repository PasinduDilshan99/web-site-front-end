// components/villa/VillaAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Coffee, Tv, Waves, TreePine, Sparkles, Leaf } from 'lucide-react';
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
        return 'from-blue-600 to-cyan-600';
      case 'recreation':
        return 'from-purple-600 to-pink-600';
      case 'wellness':
        return 'from-[#1B4D3E] to-[#2E6B5C]';
      case 'dining':
        return 'from-amber-600 to-orange-600';
      case 'parking':
        return 'from-gray-600 to-slate-600';
      case 'nature':
        return 'from-[#428577] to-[#1B4D3E]';
      default:
        return 'from-[#1B4D3E] to-[#428577]';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B4D3E]">Villa Amenities</h2>
      </div>
      
      <div className="space-y-8">
        {/* Amenities Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-[#1B4D3E] mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#428577]" />
            Premium Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="group p-4 bg-white rounded-xl border border-[#1B4D3E]/10 hover:border-[#428577]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-r ${getCategoryColor(amenity.amenityCategory)} rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    {getAmenityIcon(amenity.amenityCategory)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1B4D3E] group-hover:text-[#428577] transition-colors">
                      {amenity.amenityName}
                    </div>
                    <div className="text-sm text-[#2E6B5C] mt-1">{amenity.amenityDescription}</div>
                    {amenity.localAdditionalCharge > 0 ? (
                      <div className="text-xs text-amber-600 font-semibold mt-1">
                        Additional charge: ${amenity.localAdditionalCharge}
                      </div>
                    ) : (
                      <div className="text-xs text-[#428577] font-semibold mt-1">
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
            <h3 className="text-2xl font-semibold text-[#1B4D3E] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#428577]" />
              Exclusive Facilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-6 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-2xl border border-[#1B4D3E]/10 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <Sparkles className="w-6 h-6 text-[#1B4D3E]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1B4D3E] text-lg mb-2 group-hover:text-[#428577] transition-colors">
                        {facility.facilityName}
                      </h4>
                      <p className="text-[#2E6B5C] mb-3 leading-relaxed">
                        {facility.facilityDescription}
                      </p>
                      {facility.specialNote && (
                        <div className="p-3 bg-white bg-opacity-50 rounded-lg border border-[#1B4D3E]/10">
                          <p className="text-sm text-[#428577] font-medium">
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
        <div className="p-6 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="text-center relative z-10">
            <h4 className="text-xl font-bold mb-2">Complete Luxury Experience</h4>
            <p className="opacity-90">
              Enjoy {amenities.length} premium amenities and {facilities.length} exclusive facilities 
              designed for your ultimate comfort and relaxation.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm">Deep Sea Greens Collection</span>
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaAmenities;