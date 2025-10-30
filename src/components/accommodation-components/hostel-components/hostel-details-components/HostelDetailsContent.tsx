// components/hostel/HostelDetailsContent.tsx
'use client';

import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import React from 'react';
import HostelHeader from './HostelHeader';
import HostelRooms from './HostelRooms';
import HostelPackages from './HostelRooms';
import HostelLocation from './HostelLocation';
import HostelGallery from './HostelGallery';
import HostelOverview from './HostelOverview';
import HostelReviews from './HostelReviews';
import HostelAmenities from './HostelAmenities';


interface HostelDetailsContentProps {
  hostelData: ServiceProviderAPIResponse;
}

const HostelDetailsContent: React.FC<HostelDetailsContentProps> = ({ hostelData }) => {
  const { data } = hostelData;
  const { serviceProviderDetails } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <HostelHeader hostel={serviceProviderDetails} />
      
      {/* Gallery Section */}
      {/* <HostelGallery images={serviceProviderDetails.images} /> */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <HostelOverview 
            hostel={serviceProviderDetails}
            amenities={data.amenities}
            facilities={data.facilities}
          />
          
          {/* Rooms Section */}
          <HostelRooms rooms={data.roomDetails} />
          
          {/* Packages Section */}
          <HostelPackages packages={data.packageDetails} />
          
          {/* Reviews Section */}
          <HostelReviews reviews={data.reviews} statistics={data.statistics} />
        </div>
        
        <div className="space-y-8">
          {/* Location Section */}
          <HostelLocation 
            hostel={serviceProviderDetails}
            nearbyDestinations={data.nearbyDestinations}
          />
          
          {/* Amenities Summary */}
          <HostelAmenities amenities={data.amenities} facilities={data.facilities} />
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsContent;