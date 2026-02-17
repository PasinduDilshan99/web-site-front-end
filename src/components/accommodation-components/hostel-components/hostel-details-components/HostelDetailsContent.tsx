// components/hostel/HostelDetailsContent.tsx
"use client";

import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import React from "react";
import HostelHeader from "./HostelHeader";
import HostelRooms from "./HostelRooms";
import HostelLocation from "./HostelLocation";
import HostelGallery from "./HostelGallery";
import HostelOverview from "./HostelOverview";
import HostelReviews from "./HostelReviews";
import HostelAmenities from "./HostelAmenities";
import HostelPackages from "./HostelPackage";

interface HostelDetailsContentProps {
  hostelData: ServiceProviderAPIResponse;
}

const HostelDetailsContent: React.FC<HostelDetailsContentProps> = ({
  hostelData,
}) => {
  const { data } = hostelData;
  const { serviceProviderDetails } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#5A8F7A] mb-4">
        <span>Hostels</span>
        <span className="text-[#B5E5D4]">›</span>
        <span className="text-[#2D4F43] font-medium">
          {serviceProviderDetails.name}
        </span>
      </div>

      {/* Header Section */}
      <HostelHeader hostel={serviceProviderDetails} />

      {/* Gallery Section - Uncomment when ready */}
      {/* <HostelGallery images={serviceProviderDetails.images} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <HostelOverview
              hostel={serviceProviderDetails}
              amenities={data.amenities}
              facilities={data.facilities}
            />
          </div>

          {/* Rooms Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#B5E5D4] to-[#DDF9F2] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#2D4F43]">
                  Rooms & Dorms
                </h2>
              </div>
              <HostelRooms rooms={data.roomDetails} />
            </div>
          </div>

          {/* Packages Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#C9EFE3] to-[#B5E5D4] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#2D4F43]">
                  Budget Packages
                </h2>
              </div>
              <HostelPackages packages={data.packageDetails} />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#DDF9F2] to-[#C9EFE3] rounded-full"></span>
                <h2 className="text-2xl font-semibold text-[#2D4F43]">
                  Guest Reviews
                </h2>
              </div>
              <HostelReviews
                reviews={data.reviews}
                statistics={data.statistics}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Location Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#B5E5D4] to-[#C9EFE3] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#2D4F43]">
                  Location
                </h2>
              </div>
              <HostelLocation
                hostel={serviceProviderDetails}
                nearbyDestinations={data.nearbyDestinations}
              />
            </div>
          </div>

          {/* Amenities Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#B5E5D4] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#DDF9F2] to-[#B5E5D4] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#2D4F43]">
                  Amenities
                </h2>
              </div>
              <HostelAmenities
                amenities={data.amenities}
                facilities={data.facilities}
              />
            </div>
          </div>

          {/* Quick Booking Card */}
          <div className="bg-gradient-to-br from-[#B5E5D4] to-[#DDF9F2] rounded-2xl shadow-md p-6 text-[#2D4F43] relative overflow-hidden border border-[#B5E5D4]">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-8 -mb-8"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2">
                Ready for Adventure?
              </h3>
              <p className="text-[#2D4F43]/80 text-sm mb-4">
                Book your bed now and join fellow travelers in our fresh, social
                spaces.
              </p>
              <button className="w-full bg-white text-[#2D4F43] hover:bg-[#F5FDFA] py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md border border-[#B5E5D4]">
                Check Availability
              </button>
              <p className="text-[#2D4F43]/60 text-xs mt-3 text-center">
                ✦ Free WiFi ✦ No Booking Fees ✦ Free Cancellation ✦
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#B5E5D4]">
          <span className="w-2 h-2 bg-[#B5E5D4] rounded-full"></span>
          <span className="text-xs text-[#2D4F43]">
            Part of the Fresh Hostel Collection
          </span>
          <span className="w-2 h-2 bg-[#DDF9F2] rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsContent;
