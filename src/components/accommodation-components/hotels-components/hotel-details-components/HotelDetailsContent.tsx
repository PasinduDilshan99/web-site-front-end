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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#3F8AB2] mb-4">
        <span>Hotels</span>
        <span className="text-[#2A6F97]">›</span>
        <span className="text-[#1D4F6E] font-medium">{serviceProviderDetails.name}</span>
      </div>

      {/* Header Section */}
      <HotelHeader hotel={serviceProviderDetails} />
      
      {/* Gallery Section */}
      <HotelGallery images={serviceProviderDetails.images} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <HotelOverview 
              hotel={serviceProviderDetails}
              amenities={data.amenities}
              facilities={data.facilities}
            />
          </div>
          
          {/* Rooms Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#2A6F97] to-[#54A5CC] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1D4F6E]">Rooms & Suites</h2>
              </div>
              <HotelRooms rooms={data.roomDetails} />
            </div>
          </div>
          
          {/* Packages Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#3F8AB2] to-[#2A6F97] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1D4F6E]">Special Packages</h2>
              </div>
              <HotelPackages packages={data.packageDetails} />
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#54A5CC] to-[#2A6F97] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1D4F6E]">Guest Reviews</h2>
              </div>
              <HotelReviews reviews={data.reviews} statistics={data.statistics} />
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Location Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#2A6F97] to-[#3F8AB2] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#1D4F6E]">Location</h2>
              </div>
              <HotelLocation 
                hotel={serviceProviderDetails}
                nearbyDestinations={data.nearbyDestinations}
              />
            </div>
          </div>
          
          {/* Amenities Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#2A6F97]/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#54A5CC] to-[#2A6F97] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#1D4F6E]">Amenities</h2>
              </div>
              <HotelAmenities amenities={data.amenities} facilities={data.facilities} />
            </div>
          </div>

          {/* Quick Booking Card */}
          <div className="bg-gradient-to-br from-[#2A6F97] to-[#54A5CC] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2">Ready to Experience?</h3>
              <p className="text-white/80 text-sm mb-4">
                Book your stay now and enjoy premium comfort with our best rate guarantee.
              </p>
              <button className="w-full bg-white text-[#2A6F97] hover:bg-[#F0F7FF] py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Check Availability
              </button>
              <p className="text-white/60 text-xs mt-3 text-center">
                ✦ 24/7 Concierge ✦ Best Rate Guarantee ✦
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#2A6F97]/20">
          <span className="w-2 h-2 bg-[#2A6F97] rounded-full"></span>
          <span className="text-xs text-[#1D4F6E]">Part of the True Sea Blues Luxury Collection</span>
          <span className="w-2 h-2 bg-[#54A5CC] rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsContent;