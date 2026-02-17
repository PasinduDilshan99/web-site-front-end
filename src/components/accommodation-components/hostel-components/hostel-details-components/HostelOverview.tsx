// components/hostel/HostelOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Coffee, Users2, Globe, Leaf } from 'lucide-react';
import { ServiceProviderDetails, Amenity, Facility } from '@/types/accommodations-types/service-provider-types';

interface HostelOverviewProps {
  hostel: ServiceProviderDetails | null;
  amenities: Amenity[];
  facilities: Facility[];
}

const HostelOverview: React.FC<HostelOverviewProps> = ({ hostel, amenities, facilities }) => {
  // Handle null hostel case
  if (!hostel) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-7 bg-[#B5E5D4] rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-5 bg-[#C9EFE3] rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#DDF9F2] rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-[#F5FDFA] rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-[#FAFFFD] rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-5 bg-[#C9EFE3] rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#B5E5D4] rounded-full"></div>
                    <div className="h-3 bg-[#F5FDFA] rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const topAmenities = amenities?.slice(0, 6) || [];
  const topFacilities = facilities?.slice(0, 4) || [];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="w-6 h-6 text-[#3A9B9B]" />
        <h2 className="text-2xl font-bold text-[#2D4F43]">Hostel Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-[#2D4F43] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#B5E5D4] rounded-full"></span>
            Hostel Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
              <Clock className="w-5 h-5 text-[#3A9B9B]" />
              <div>
                <div className="font-medium text-[#2D4F43]">Check-in/out</div>
                <div className="text-[#5A8F7A]">
                  {hostel.checkInTime || 'Not specified'} / {hostel.checkOutTime || 'Not specified'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#C9EFE3]">
              <Users className="w-5 h-5 text-[#3A9B9B]" />
              <div>
                <div className="font-medium text-[#2D4F43]">Total Rooms</div>
                <div className="text-[#5A8F7A]">
                  {hostel.totalRooms ? `${hostel.totalRooms} rooms & dorms` : 'Not specified'}
                </div>
              </div>
            </div>
            
            {hostel.parkingFacility && (
              <div className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#DDF9F2]">
                <Car className="w-5 h-5 text-[#3A9B9B]" />
                <div>
                  <div className="font-medium text-[#2D4F43]">Parking</div>
                  <div className="text-[#5A8F7A]">
                    {hostel.parkingCapacity ? `${hostel.parkingCapacity} spaces` : 'Available'}
                  </div>
                </div>
              </div>
            )}
            
            {hostel.wifiAvailable && (
              <div className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                <Wifi className="w-5 h-5 text-[#3A9B9B]" />
                <div className="font-medium text-[#2D4F43]">Free WiFi</div>
              </div>
            )}

            {hostel.languagesSpoken && (
              <div className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#C9EFE3]">
                <Globe className="w-5 h-5 text-[#3A9B9B]" />
                <div>
                  <div className="font-medium text-[#2D4F43]">Languages</div>
                  <div className="text-[#5A8F7A]">{hostel.languagesSpoken}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#2D4F43] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C9EFE3] rounded-full"></span>
            Top Amenities {topAmenities.length === 0 && '(None listed)'}
          </h3>
          {topAmenities.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {topAmenities.map((amenity) => (
                <div key={amenity.providerAmenityId} className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4] hover:shadow-sm transition-all">
                  <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
                  <span className="text-[#2D4F43] text-sm">{amenity.amenityName}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5A8F7A] text-sm bg-[#F5FDFA] p-3 rounded-lg border border-[#B5E5D4]">
              No amenities listed
            </p>
          )}
        </div>
      </div>
      
      {/* Hostel Specific Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4] hover:shadow-md transition-all">
          <Users2 className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
          <div className="text-sm font-semibold text-[#2D4F43]">Social Common Areas</div>
        </div>
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#C9EFE3] hover:shadow-md transition-all">
          <Coffee className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
          <div className="text-sm font-semibold text-[#2D4F43]">Communal Kitchen</div>
        </div>
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#DDF9F2] hover:shadow-md transition-all">
          <Utensils className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
          <div className="text-sm font-semibold text-[#2D4F43]">Budget Meals</div>
        </div>
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4] hover:shadow-md transition-all">
          <div className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2">🎒</div>
          <div className="text-sm font-semibold text-[#2D4F43]">Backpacker Friendly</div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#B5E5D4]/30">
        <h3 className="text-lg font-semibold text-[#2D4F43] mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#DDF9F2] rounded-full"></span>
          About This Hostel
        </h3>
        <p className="text-[#5A8F7A] leading-relaxed bg-[#F5FDFA] p-4 rounded-xl border border-[#B5E5D4]">
          {hostel.description || 'No description available for this hostel.'}
        </p>
        
        {hostel.awardsCertifications && (
          <div className="mt-4 p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
            <h4 className="font-semibold text-[#2D4F43] mb-1">Awards & Certifications</h4>
            <p className="text-[#5A8F7A] text-sm">{hostel.awardsCertifications}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelOverview;