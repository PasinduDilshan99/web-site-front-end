// components/villa/VillaDetailsContent.tsx
'use client';

import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import React from 'react';
import VillaHeader from './VillaHeader';
import VillaGallery from './VillaGallery';
import VillaLocation from './VillaLocation';
import VillaOverview from './VillaOverview';
import VillaRooms from './VillaRooms';
import VillaPackages from './VillaPackages';
import VillaReviews from './VillaReviews';
import VillaAmenities from './VillaAmenities';


interface VillaDetailsContentProps {
  villaData: ServiceProviderAPIResponse;
}

const VillaDetailsContent: React.FC<VillaDetailsContentProps> = ({ villaData }) => {
  const { data } = villaData;
  const { serviceProviderDetails } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <VillaHeader villa={serviceProviderDetails} />
        
        {/* Gallery Section */}
        <VillaGallery images={serviceProviderDetails.images} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <VillaOverview 
              villa={serviceProviderDetails}
              amenities={data.amenities}
              facilities={data.facilities}
            />
            
            {/* Rooms Section */}
            <VillaRooms rooms={data.roomDetails} />
            
            {/* Packages Section */}
            <VillaPackages packages={data.packageDetails} />
            
            {/* Reviews Section */}
            <VillaReviews reviews={data.reviews} statistics={data.statistics} />
          </div>
          
          <div className="space-y-8">
            {/* Location Section */}
            <VillaLocation 
              villa={serviceProviderDetails}
              nearbyDestinations={data.nearbyDestinations}
            />
            
            {/* Amenities Summary */}
            <VillaAmenities amenities={data.amenities} facilities={data.facilities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetailsContent;