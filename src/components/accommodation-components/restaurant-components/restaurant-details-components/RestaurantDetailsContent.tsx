// components/restaurant/RestaurantDetailsContent.tsx
"use client";

import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import React from "react";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantGallery from "./RestaurantGallery";
import RestaurantOverview from "./RestaurantOverview";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantReviews from "./RestaurantReviews";
import RestaurantAmbience from "./RestaurantAmbience";
import RestaurantLocation from "./RestaurantLocation";

interface RestaurantDetailsContentProps {
  restaurantData: ServiceProviderAPIResponse;
}

const RestaurantDetailsContent: React.FC<RestaurantDetailsContentProps> = ({
  restaurantData,
}) => {
  const { data } = restaurantData;
  const { serviceProviderDetails } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#3A9B9B]/60 mb-4">
        <span>Coastal Dining</span>
        <span className="text-[#84CACA]">›</span>
        <span className="text-[#3A9B9B] font-medium">
          {serviceProviderDetails.name}
        </span>
      </div>

      {/* Header Section */}
      <div className="relative">
        <RestaurantHeader restaurant={serviceProviderDetails} />
      </div>

      {/* Gallery Section */}
      <div className="mt-6">
        <RestaurantGallery images={serviceProviderDetails.images} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Overview Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#3A9B9B]/10">
            <RestaurantOverview
              restaurant={serviceProviderDetails}
              amenities={data.amenities}
              facilities={data.facilities}
              operatingHours={serviceProviderDetails.operatingHours}
            />
          </div>

          {/* Menu Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#3A9B9B]/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#3A9B9B] to-[#84CACA] rounded-full"></span>
              <h2 className="text-2xl font-semibold text-[#3A9B9B]">
                Coastal Menu
              </h2>
            </div>
            <RestaurantMenu meals={data.mealDetails} />
          </div>

          {/* Ambience Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#3A9B9B]/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#5FB3B3] to-[#84CACA] rounded-full"></span>
              <h2 className="text-2xl font-semibold text-[#3A9B9B]">
                Coastal Ambience
              </h2>
            </div>
            <RestaurantAmbience
              facilities={data.facilities}
              amenities={data.amenities}
            />
          </div>

          {/* Reviews Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#3A9B9B]/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#84CACA] to-[#3A9B9B] rounded-full"></span>
              <h2 className="text-2xl font-semibold text-[#3A9B9B]">
                Guest Experiences
              </h2>
            </div>
            <RestaurantReviews
              reviews={data.reviews}
              statistics={data.statistics}
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Location Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#3A9B9B]/10">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#3A9B9B] to-[#5FB3B3] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#3A9B9B]">
                  Location
                </h2>
              </div>
              <RestaurantLocation
                restaurant={serviceProviderDetails}
                nearbyDestinations={data.nearbyDestinations}
              />{" "}
            </div>
          </div>

          {/* Contact & Info */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#3A9B9B]/10">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#84CACA] to-[#3A9B9B] rounded-full"></span>
                <h2 className="text-xl font-semibold text-[#3A9B9B]">
                  Contact & Info
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-[#E8F6F6] rounded-lg">
                  <div className="font-semibold text-[#3A9B9B]">Phone</div>
                  <div className="text-gray-700">
                    {serviceProviderDetails.contactNumber}
                  </div>
                </div>
                <div className="p-3 bg-[#E8F6F6] rounded-lg">
                  <div className="font-semibold text-[#3A9B9B]">Email</div>
                  <div className="text-gray-700">
                    {serviceProviderDetails.email}
                  </div>
                </div>
                {serviceProviderDetails.websiteUrl && (
                  <div className="p-3 bg-[#E8F6F6] rounded-lg">
                    <div className="font-semibold text-[#3A9B9B]">Website</div>
                    <a
                      href={serviceProviderDetails.websiteUrl}
                      className="text-[#5FB3B3] hover:text-[#3A9B9B] underline font-medium"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Reserve Card */}
          <div className="bg-gradient-to-br from-[#3A9B9B] to-[#84CACA] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2">Ready to Dine?</h3>
              <p className="text-white/80 text-sm mb-4">
                Experience coastal cuisine at its finest. Reserve your table
                today.
              </p>
              <button className="w-full bg-white text-[#3A9B9B] hover:bg-[#E8F6F6] py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Reserve a Table
              </button>
              <p className="text-white/60 text-xs mt-3 text-center">
                ✦ Ocean Views ✦ Fresh Seafood ✦
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#3A9B9B]/10">
          <span className="w-2 h-2 bg-[#3A9B9B] rounded-full"></span>
          <span className="text-xs text-[#3A9B9B]/60">
            Part of the Coastal Dining Collection
          </span>
          <span className="w-2 h-2 bg-[#84CACA] rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsContent;
