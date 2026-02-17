// components/resort/ResortAmenities.tsx
import React from 'react';
import { Wifi, Car, Dumbbell, Utensils, Waves, Sun, Umbrella, Sparkles, Anchor } from 'lucide-react';
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
        return <Waves className="w-6 h-6" />;
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
        return 'from-blue-600 to-cyan-600';
      case 'recreation':
        return 'from-emerald-600 to-green-600';
      case 'wellness':
        return 'from-[#0A2F44] to-[#144A5E]';
      case 'dining':
        return 'from-amber-600 to-orange-600';
      case 'parking':
        return 'from-gray-600 to-slate-600';
      case 'beach':
        return 'from-[#1F5F72] to-[#0A2F44]';
      case 'pool':
        return 'from-[#144A5E] to-[#1F5F72]';
      default:
        return 'from-[#0A2F44] to-[#1F5F72]';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A2F44]">Resort Amenities</h2>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white px-4 py-2 rounded-full">
          <Anchor className="w-5 h-5" />
          <span className="font-semibold">Premium Features</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Amenities Grid */}
        <div>
          <h3 className="text-xl font-semibold text-[#0A2F44] mb-6 flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-500" />
            Resort Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-[#F0F7FA] rounded-2xl border border-[#0A2F44]/10 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(amenity.amenityCategory)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {getAmenityIcon(amenity.amenityCategory)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#0A2F44] text-lg mb-1">{amenity.amenityName}</div>
                  <div className="text-sm text-[#144A5E]">{amenity.amenityDescription}</div>
                  {amenity.localAdditionalCharge > 0 ? (
                    <div className="text-xs text-amber-600 font-semibold mt-1">
                      Additional: ${amenity.localAdditionalCharge}
                    </div>
                  ) : (
                    <div className="text-xs text-[#1F5F72] font-semibold mt-1">
                      Complimentary
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
            <h3 className="text-xl font-semibold text-[#0A2F44] mb-6 flex items-center gap-3">
              <Waves className="w-6 h-6 text-[#1F5F72]" />
              Resort Facilities
            </h3>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-6 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-2xl border border-[#0A2F44]/10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white p-3 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#0A2F44] text-lg mb-2">{facility.facilityName}</div>
                      <div className="text-[#144A5E] mb-3">{facility.facilityDescription}</div>
                      {facility.specialNote && (
                        <div className="text-sm bg-white/80 text-[#1F5F72] px-4 py-2 rounded-lg border border-[#0A2F44]/10">
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
      <div className="mt-8 p-6 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
        
        <div className="text-center relative z-10">
          <div className="text-2xl font-bold mb-2">{amenities.length}+ Premium Amenities</div>
          <div className="text-white/80">
            Everything you need for a perfect ultra-luxury resort experience
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="text-sm">Deep Sea Blues Collection</span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortAmenities;