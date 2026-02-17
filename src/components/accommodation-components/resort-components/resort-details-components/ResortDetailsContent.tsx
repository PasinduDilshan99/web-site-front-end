// components/accommodation-components/resort-components/resort-details-components/ResortDetailsContent.tsx
"use client";

import React from "react";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import ResortHeader from "./ResortHeader";
import ResortGallery from "./ResortGallery";
import ResortOverview from "./ResortOverview";
import ResortRooms from "./ResortRooms";
import ResortPackages from "./ResortPackages";
import ResortReviews from "./ResortReviews";
import ResortLocation from "./ResortLocation";
import ResortAmenities from "./ResortAmenities";

interface ResortDetailsContentProps {
  resortData: ServiceProviderAPIResponse;
}

const ResortDetailsContent: React.FC<ResortDetailsContentProps> = ({
  resortData,
}) => {
  const { data } = resortData;
  const { serviceProviderDetails } = data;

  return (
    <div className="relative z-10">
      {/* Header Section */}
      <ResortHeader resort={serviceProviderDetails} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#0A2F44]/60 mb-4">
          <span>Ultra-Luxury Resorts</span>
          <span className="text-[#1F5F72]">›</span>
          <span className="text-[#0A2F44] font-medium">
            {serviceProviderDetails.name}
          </span>
        </div>

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
            <ResortReviews
              reviews={data.reviews}
              statistics={data.statistics}
            />
          </div>

          <div className="space-y-8">
            {/* Location Section */}
            <ResortLocation
              resort={serviceProviderDetails}
              nearbyDestinations={data.nearbyDestinations}
            />

            {/* Amenities Summary */}
            <ResortAmenities
              amenities={data.amenities}
              facilities={data.facilities}
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#0A2F44]/10">
            <span className="w-2 h-2 bg-[#0A2F44] rounded-full"></span>
            <span className="text-xs text-[#0A2F44]/60">
              Part of the Deep Sea Blues Ultra-Luxury Collection
            </span>
            <span className="w-2 h-2 bg-[#1F5F72] rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortDetailsContent;
