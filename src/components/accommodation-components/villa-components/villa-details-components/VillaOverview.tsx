// components/villa/VillaOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Home, Shield, Sparkles, Leaf } from 'lucide-react';
import { Amenity, Facility, ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaOverviewProps {
  villa: ServiceProviderDetails;
  amenities: Amenity[];
  facilities: Facility[];
}

const VillaOverview: React.FC<VillaOverviewProps> = ({ villa, amenities, facilities }) => {
  const topAmenities = amenities.slice(0, 6);
  const topFacilities = facilities.slice(0, 4);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-xl">
          <Home className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B4D3E]">Villa Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Villa Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#1B4D3E] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#428577]" />
            Villa Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#1B4D3E]/10 rounded-lg">
                <Clock className="w-6 h-6 text-[#1B4D3E]" />
              </div>
              <div>
                <div className="font-semibold text-[#1B4D3E]">Check-in/out</div>
                <div className="text-[#2E6B5C]">{villa.checkInTime} / {villa.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#428577]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#428577]" />
              </div>
              <div>
                <div className="font-semibold text-[#1B4D3E]">Accommodation</div>
                <div className="text-[#2E6B5C]">{villa.totalRooms} luxury suites & villas</div>
              </div>
            </div>
            
            {villa.parkingFacility && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10 hover:shadow-md transition-all">
                <div className="p-2 bg-[#1B4D3E]/10 rounded-lg">
                  <Car className="w-6 h-6 text-[#1B4D3E]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1B4D3E]">Parking</div>
                  <div className="text-[#2E6B5C]">
                    {villa.parkingCapacity ? `${villa.parkingCapacity} private spaces` : 'Secure private parking'}
                  </div>
                </div>
              </div>
            )}
            
            {villa.wifiAvailable && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10 hover:shadow-md transition-all">
                <div className="p-2 bg-[#428577]/10 rounded-lg">
                  <Wifi className="w-6 h-6 text-[#428577]" />
                </div>
                <div className="font-semibold text-[#1B4D3E]">High-Speed WiFi</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Premium Amenities */}
        <div>
          <h3 className="text-xl font-semibold text-[#1B4D3E] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#428577]" />
            Premium Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topAmenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#1B4D3E]/10 hover:shadow-lg transition-all group hover:border-[#428577]/30"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full group-hover:scale-150 transition-transform"></div>
                <div>
                  <div className="font-semibold text-[#1B4D3E]">{amenity.amenityName}</div>
                  <div className="text-sm text-[#2E6B5C]">{amenity.amenityDescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Villa Description */}
      <div className="pt-8 border-t border-[#1B4D3E]/10">
        <h3 className="text-xl font-semibold text-[#1B4D3E] mb-6 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#428577]" />
          About This Villa
        </h3>
        <div className="bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-2xl p-6 border border-[#1B4D3E]/10">
          <p className="text-[#1B4D3E] leading-relaxed text-lg">{villa.description}</p>
          
          {/* Special Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {villa.establishmentYear && (
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-[#1B4D3E]">{villa.establishmentYear}</div>
                <div className="text-sm text-[#2E6B5C]">Established</div>
              </div>
            )}
            <div className="text-center p-3 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-[#428577]">{villa.totalRooms}</div>
              <div className="text-sm text-[#2E6B5C]">Luxury Suites</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-[#1B4D3E]">{villa.starRating}/5</div>
              <div className="text-sm text-[#2E6B5C]">Star Rating</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-[#428577]">24/7</div>
              <div className="text-sm text-[#2E6B5C]">Private Concierge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaOverview;