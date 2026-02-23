// components/resort/ResortOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Waves, Sun, Anchor } from 'lucide-react';
import { ServiceProviderDetails, Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface ResortOverviewProps {
  resort: ServiceProviderDetails;
  amenities: Amenity[];
  facilities: Facility[];
}

const ResortOverview: React.FC<ResortOverviewProps> = ({ resort, amenities, facilities }) => {
  const topAmenities = amenities.slice(0, 6);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-xl">
          <Waves className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#0A2F44]">Resort Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-[#0A2F44] mb-6 flex items-center gap-3">
            <Anchor className="w-6 h-6 text-[#1F5F72]" />
            Resort Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#0A2F44]/10 rounded-lg">
                <Clock className="w-6 h-6 text-[#0A2F44]" />
              </div>
              <div>
                <div className="font-semibold text-[#0A2F44]">Check-in/out Times</div>
                <div className="text-[#144A5E]">{resort.checkInTime} / {resort.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10 hover:shadow-md transition-all">
              <div className="p-2 bg-[#144A5E]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#144A5E]" />
              </div>
              <div>
                <div className="font-semibold text-[#0A2F44]">Accommodation</div>
                <div className="text-[#144A5E]">{resort.totalRooms} luxury rooms & suites</div>
              </div>
            </div>
            
            {resort.parkingFacility && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10 hover:shadow-md transition-all">
                <div className="p-2 bg-[#1F5F72]/10 rounded-lg">
                  <Car className="w-6 h-6 text-[#1F5F72]" />
                </div>
                <div>
                  <div className="font-semibold text-[#0A2F44]">Parking</div>
                  <div className="text-[#144A5E]">
                    {resort.parkingCapacity ? `${resort.parkingCapacity} spaces` : 'Complimentary valet parking'}
                  </div>
                </div>
              </div>
            )}
            
            {resort.wifiAvailable && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10 hover:shadow-md transition-all">
                <div className="p-2 bg-[#1F5F72]/10 rounded-lg">
                  <Wifi className="w-6 h-6 text-[#1F5F72]" />
                </div>
                <div className="font-semibold text-[#0A2F44]">High-speed WiFi throughout resort</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-[#0A2F44] mb-6 flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-600" />
            Premium Amenities
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {topAmenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10 hover:shadow-md transition-all group"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="font-medium text-[#0A2F44]">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-[#0A2F44]/10">
        <h3 className="text-xl font-semibold text-[#0A2F44] mb-4 flex items-center gap-2">
          <Waves className="w-5 h-5 text-[#1F5F72]" />
          Resort Description
        </h3>
        <div className="bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-2xl p-6 border border-[#0A2F44]/10">
          <p className="text-[#144A5E] leading-relaxed text-lg">{resort.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ResortOverview;