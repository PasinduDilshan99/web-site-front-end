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
    <div className="min-h-screen bg-gradient-to-br from-[#E8F3EF] via-[#F0F9F5] to-[#D9ECE5] relative overflow-hidden">
      {/* Nature-Inspired Decorative Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-[#1B4D3E]/5 rounded-full -mr-32 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-[#428577]/5 rounded-full -ml-36 blur-3xl"></div>
      
      {/* Subtle Leaf Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="content-leaf-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 15 Q50 15 55 25 Q60 35 50 45 Q40 55 30 45 Q20 35 30 25 Q35 15 40 15" 
                fill="none" stroke="#1B4D3E" strokeWidth="0.5"/>
              <circle cx="40" cy="30" r="2" fill="#1B4D3E" opacity="0.2"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#content-leaf-pattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb/Navigation Indicator */}
        <div className="flex items-center gap-2 text-sm text-[#1B4D3E]/60 mb-4">
          <span>Private Villas</span>
          <span className="text-[#428577]">›</span>
          <span className="text-[#1B4D3E] font-medium">{serviceProviderDetails.name}</span>
        </div>

        {/* Header Section */}
        <div className="relative">
          <VillaHeader villa={serviceProviderDetails} />
        </div>
        
        {/* Gallery Section */}
        <div className="mt-6">
          <VillaGallery images={serviceProviderDetails.images} />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#1B4D3E]/10">
              <VillaOverview 
                villa={serviceProviderDetails}
                amenities={data.amenities}
                facilities={data.facilities}
              />
            </div>
            
            {/* Rooms Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#1B4D3E] to-[#428577] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1B4D3E]">Private Suites</h2>
              </div>
              <VillaRooms rooms={data.roomDetails} />
            </div>
            
            {/* Packages Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#2E6B5C] to-[#428577] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1B4D3E]">Luxury Experiences</h2>
              </div>
              <VillaPackages packages={data.packageDetails} />
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#428577] to-[#1B4D3E] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#1B4D3E]">Guest Experiences</h2>
              </div>
              <VillaReviews reviews={data.reviews} statistics={data.statistics} />
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#1B4D3E]/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-[#1B4D3E] to-[#2E6B5C] rounded-full"></span>
                  <h2 className="text-xl font-semibold text-[#1B4D3E]">Location</h2>
                </div>
                <VillaLocation 
                  villa={serviceProviderDetails}
                  nearbyDestinations={data.nearbyDestinations}
                />
              </div>
            </div>
            
            {/* Amenities Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#1B4D3E]/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-[#428577] to-[#1B4D3E] rounded-full"></span>
                  <h2 className="text-xl font-semibold text-[#1B4D3E]">Premium Amenities</h2>
                </div>
                <VillaAmenities amenities={data.amenities} facilities={data.facilities} />
              </div>
            </div>

            {/* Quick Booking Card */}
            <div className="bg-gradient-to-br from-[#1B4D3E] to-[#428577] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">Ready to Experience?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Book your private luxury villa today and enjoy exclusive amenities.
                </p>
                <button className="w-full bg-white text-[#1B4D3E] hover:bg-[#F0F9F5] py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Check Availability
                </button>
                <p className="text-white/60 text-xs mt-3 text-center">
                  ✦ 24/7 Concierge ✦ Best Price Guarantee ✦
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#1B4D3E]/10">
            <span className="w-2 h-2 bg-[#1B4D3E] rounded-full"></span>
            <span className="text-xs text-[#1B4D3E]/60">Part of the Deep Sea Greens Luxury Collection</span>
            <span className="w-2 h-2 bg-[#428577] rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetailsContent;