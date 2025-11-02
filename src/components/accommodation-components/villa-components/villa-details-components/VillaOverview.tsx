// components/villa/VillaOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Home, Shield, Sparkles } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex items-center gap-3 mb-8">
        <Home className="w-7 h-7 text-emerald-600" />
        <h2 className="text-3xl font-bold text-gray-900">Villa Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Villa Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            Villa Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <Clock className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-semibold text-gray-800">Check-in/out</div>
                <div className="text-gray-600">{villa.checkInTime} / {villa.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <Users className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-semibold text-gray-800">Accommodation</div>
                <div className="text-gray-600">{villa.totalRooms} luxury rooms & suites</div>
              </div>
            </div>
            
            {villa.parkingFacility && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <Car className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="font-semibold text-gray-800">Parking</div>
                  <div className="text-gray-600">
                    {villa.parkingCapacity ? `${villa.parkingCapacity} private spaces` : 'Secure private parking'}
                  </div>
                </div>
              </div>
            )}
            
            {villa.wifiAvailable && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <Wifi className="w-6 h-6 text-emerald-600" />
                <div className="font-semibold text-gray-800">High-Speed WiFi</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Premium Amenities */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            Premium Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topAmenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <div>
                  <div className="font-semibold text-gray-800">{amenity.amenityName}</div>
                  <div className="text-sm text-gray-600">{amenity.amenityDescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Villa Description */}
      <div className="pt-8 border-t border-emerald-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-600" />
          About This Villa
        </h3>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <p className="text-gray-700 leading-relaxed text-lg">{villa.description}</p>
          
          {/* Special Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {villa.establishmentYear && (
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{villa.establishmentYear}</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{villa.totalRooms}</div>
              <div className="text-sm text-gray-600">Luxury Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{villa.starRating}/5</div>
              <div className="text-sm text-gray-600">Star Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">24/7</div>
              <div className="text-sm text-gray-600">Concierge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaOverview;