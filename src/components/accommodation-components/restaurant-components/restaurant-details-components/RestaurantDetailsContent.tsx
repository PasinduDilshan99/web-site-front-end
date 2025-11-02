// components/restaurant/RestaurantDetailsContent.tsx
'use client';

import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import React from 'react';
import RestaurantHeader from './RestaurantHeader';
import RestaurantGallery from './RestaurantGallery';
import RestaurantOverview from './RestaurantOverview';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReviews from './RestaurantReviews';
import RestaurantAmbience from './RestaurantAmbience';
import RestaurantLocation from './RestaurantLocation';


interface RestaurantDetailsContentProps {
  restaurantData: ServiceProviderAPIResponse;
}

const RestaurantDetailsContent: React.FC<RestaurantDetailsContentProps> = ({ restaurantData }) => {
  const { data } = restaurantData;
  const { serviceProviderDetails } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <RestaurantHeader restaurant={serviceProviderDetails} />
      
      {/* Gallery Section */}
      <RestaurantGallery images={serviceProviderDetails.images} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <RestaurantOverview 
            restaurant={serviceProviderDetails}
            amenities={data.amenities}
            facilities={data.facilities}
            operatingHours={serviceProviderDetails.operatingHours}
          />
          
          {/* Menu Section */}
          <RestaurantMenu meals={data.mealDetails} />
          
          {/* Ambience Section */}
          <RestaurantAmbience 
            facilities={data.facilities}
            amenities={data.amenities}
          />
          
          {/* Reviews Section */}
          <RestaurantReviews reviews={data.reviews} statistics={data.statistics} />
        </div>
        
        <div className="space-y-8">
          {/* Location Section */}
          <RestaurantLocation 
            restaurant={serviceProviderDetails}
            nearbyDestinations={data.nearbyDestinations}
          />
          
          {/* Contact & Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact & Info</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-rose-600">Phone</div>
                <div className="text-gray-700">{serviceProviderDetails.contactNumber}</div>
              </div>
              <div>
                <div className="font-semibold text-rose-600">Email</div>
                <div className="text-gray-700">{serviceProviderDetails.email}</div>
              </div>
              {serviceProviderDetails.websiteUrl && (
                <div>
                  <div className="font-semibold text-rose-600">Website</div>
                  <a href={serviceProviderDetails.websiteUrl} className="text-orange-600 hover:text-orange-700 underline">
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsContent;