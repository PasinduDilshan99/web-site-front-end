// components/hostel/HostelOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Coffee, Users2, Globe } from 'lucide-react';
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
        <div className="animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hostel Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">Check-in/out</div>
                <div className="text-gray-600">
                  {hostel.checkInTime || 'Not specified'} / {hostel.checkOutTime || 'Not specified'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">Total Rooms</div>
                <div className="text-gray-600">
                  {hostel.totalRooms ? `${hostel.totalRooms} rooms & dorms` : 'Not specified'}
                </div>
              </div>
            </div>
            
            {hostel.parkingFacility && (
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Parking</div>
                  <div className="text-gray-600">
                    {hostel.parkingCapacity ? `${hostel.parkingCapacity} spaces` : 'Available'}
                  </div>
                </div>
              </div>
            )}
            
            {hostel.wifiAvailable && (
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-blue-600" />
                <div className="font-medium text-gray-600">Free WiFi</div>
              </div>
            )}

            {hostel.languagesSpoken && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Languages</div>
                  <div className="text-gray-600">{hostel.languagesSpoken}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Amenities {topAmenities.length === 0 && '(None listed)'}
          </h3>
          {topAmenities.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {topAmenities.map((amenity) => (
                <div key={amenity.providerAmenityId} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-700">{amenity.amenityName}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No amenities listed</p>
          )}
        </div>
      </div>
      
      {/* Hostel Specific Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
          <Users2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-blue-700">Social Common Areas</div>
        </div>
        <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <Coffee className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-indigo-700">Communal Kitchen</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <Utensils className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-green-700">Budget Meals</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="w-6 h-6 text-amber-600 mx-auto mb-2">🎒</div>
          <div className="text-sm font-semibold text-amber-700">Backpacker Friendly</div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About This Hostel</h3>
        <p className="text-gray-600 leading-relaxed">
          {hostel.description || 'No description available for this hostel.'}
        </p>
        
        {hostel.awardsCertifications && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-1">Awards & Certifications</h4>
            <p className="text-amber-700 text-sm">{hostel.awardsCertifications}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelOverview;