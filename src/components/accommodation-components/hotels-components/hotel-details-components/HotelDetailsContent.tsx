// components/hotel/HotelDetailsContent.tsx
'use client';

import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import React from 'react';
import HotelHeader from './HotelHeader';
import HotelGallery from './HotelGallery';
import HotelOverview from './HotelOverview';
import HotelRooms from './HotelRooms';
import HotelReviews from './HotelReviews';
import HotelAmenities from './HotelAmenities';
import HotelPackages from './HotelPackages';
import HotelLocation from './HotelLocation';


interface HotelDetailsContentProps {
  hotelData: ServiceProviderAPIResponse;
}

const HotelDetailsContent: React.FC<HotelDetailsContentProps> = ({ hotelData }) => {
  const { data } = hotelData;
  const { serviceProviderDetails } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <HotelHeader hotel={serviceProviderDetails} />
      
      {/* Gallery Section */}
      <HotelGallery images={serviceProviderDetails.images} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <HotelOverview 
            hotel={serviceProviderDetails}
            amenities={data.amenities}
            facilities={data.facilities}
          />
          
          {/* Rooms Section */}
          <HotelRooms rooms={data.roomDetails} />
          
          {/* Packages Section */}
          <HotelPackages packages={data.packageDetails} />
          
          {/* Reviews Section */}
          <HotelReviews reviews={data.reviews} statistics={data.statistics} />
        </div>
        
        <div className="space-y-8">
          {/* Location Section */}
          <HotelLocation 
            hotel={serviceProviderDetails}
            nearbyDestinations={data.nearbyDestinations}
          />
          
          {/* Amenities Summary */}
          <HotelAmenities amenities={data.amenities} facilities={data.facilities} />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsContent;