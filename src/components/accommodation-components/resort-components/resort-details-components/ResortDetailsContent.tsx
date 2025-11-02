// components/accommodation-components/resort-components/resort-details-components/ResortDetailsContent.tsx
'use client';

import React from 'react';
import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import ResortHeader from './ResortHeader';
import ResortGallery from './ResortGallery';
import ResortOverview from './ResortOverview';
import ResortRooms from './ResortRooms';
import ResortPackages from './ResortPackages';
import ResortReviews from './ResortReviews';
import ResortLocation from './ResortLocation';
import ResortAmenities from './ResortAmenities';

interface ResortDetailsContentProps {
  resortData: ServiceProviderAPIResponse;
}

const ResortDetailsContent: React.FC<ResortDetailsContentProps> = ({ resortData }) => {
  const { data } = resortData;
  const { serviceProviderDetails } = data;

  return (
    <>
      {/* Header Section */}
      <ResortHeader resort={serviceProviderDetails} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Section */}
        <ResortGallery images={serviceProviderDetails.images} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <ResortOverview 
              resort={serviceProviderDetails}
              amenities={data.amenities}
              facilities={data.facilities}
            />
            
            {/* Rooms Section */}
            <ResortRooms rooms={data.roomDetails} />
            
            {/* Packages Section */}
            <ResortPackages packages={data.packageDetails} />
            
            {/* Reviews Section */}
            <ResortReviews reviews={data.reviews} statistics={data.statistics} />
          </div>
          
          <div className="space-y-8">
            {/* Location Section */}
            <ResortLocation 
              resort={serviceProviderDetails}
              nearbyDestinations={data.nearbyDestinations}
            />
            
            {/* Amenities Summary */}
            <ResortAmenities amenities={data.amenities} facilities={data.facilities} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResortDetailsContent;