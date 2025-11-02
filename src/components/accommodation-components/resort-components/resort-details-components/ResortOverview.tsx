// components/resort/ResortOverview.tsx
import React from 'react';
import { Clock, Users, Car, Wifi, Utensils, Waves, Sun } from 'lucide-react';
import { ServiceProviderDetails,Amenity, Facility  } from '@/types/accommodations-types/service-provider-types';

interface ResortOverviewProps {
  resort: ServiceProviderDetails;
  amenities: Amenity[];
  facilities: Facility[];
}

const ResortOverview: React.FC<ResortOverviewProps> = ({ resort, amenities, facilities }) => {
  const topAmenities = amenities.slice(0, 6);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-teal-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
        Resort Overview
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <Waves className="w-6 h-6 text-teal-600" />
            Resort Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <Clock className="w-6 h-6 text-teal-600" />
              <div>
                <div className="font-semibold text-gray-800">Check-in/out Times</div>
                <div className="text-gray-600">{resort.checkInTime} / {resort.checkOutTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
              <Users className="w-6 h-6 text-teal-600" />
              <div>
                <div className="font-semibold text-gray-800">Accommodation</div>
                <div className="text-gray-600">{resort.totalRooms} luxury rooms & suites</div>
              </div>
            </div>
            
            {resort.parkingFacility && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <Car className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-semibold text-gray-800">Parking</div>
                  <div className="text-gray-600">
                    {resort.parkingCapacity ? `${resort.parkingCapacity} spaces` : 'Complimentary valet parking'}
                  </div>
                </div>
              </div>
            )}
            
            {resort.wifiAvailable && (
              <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
                <Wifi className="w-6 h-6 text-teal-600" />
                <div className="font-semibold text-gray-600">High-speed WiFi throughout resort</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-600" />
            Premium Amenities
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {topAmenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200"
              >
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="font-medium text-gray-800">{amenity.amenityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-teal-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Resort Description</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{resort.description}</p>
      </div>
    </div>
  );
};

export default ResortOverview;