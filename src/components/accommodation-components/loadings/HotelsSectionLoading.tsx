import React from "react";

const HotelsSectionLoading = ({ visibleCount }: { visibleCount: number }) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] min-h-[600px]">
      {/* Simple loading header */}
      <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2A6F97]/30 shadow-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2A6F97]"></div>
          <span className="text-[#2A6F97] text-sm font-medium">
            Loading luxury hotels...
          </span>
        </div>
      </div>

      {/* Section Header Skeleton */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="text-center">
          {/* Subtitle */}
          <div className="h-4 sm:h-5 bg-[#2A6F97]/20 rounded-full w-32 sm:w-40 md:w-48 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

          {/* Title */}
          <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-4 animate-pulse"></div>

          {/* Description */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="h-4 sm:h-5 bg-[#3F8AB2]/20 rounded w-full animate-pulse"></div>
            <div className="h-4 sm:h-5 bg-[#3F8AB2]/20 rounded w-5/6 mx-auto animate-pulse"></div>
          </div>

          {/* Decorative line */}
          <div className="h-1 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] rounded w-16 sm:w-20 md:w-24 mx-auto mt-4 opacity-50"></div>
        </div>
      </div>

      {/* Hotels Grid Skeleton */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(visibleCount || 8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#2A6F97]/10 animate-pulse"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Hotel Images Section */}
            <div className="relative overflow-hidden">
              {/* Image Placeholder - Split into two */}
              <div className="flex h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60">
                <div className="flex-1 bg-gradient-to-br from-[#2A6F97]/30 to-[#54A5CC]/30"></div>
                <div className="flex-1 bg-gradient-to-br from-[#3F8AB2]/30 to-[#2A6F97]/30"></div>
              </div>

              {/* Star Rating Badge Skeleton */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-[#2A6F97]/20">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-[#2A6F97]/30 rounded"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Luxury Badge Skeleton */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-[#2A6F97]/50 to-[#54A5CC]/50 px-3 py-1 rounded-full">
                <div className="w-20 h-3 bg-white/30 rounded"></div>
              </div>
            </div>

            {/* Hotel Details */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Hotel Name and Location */}
              <div className="space-y-3">
                <div className="h-5 sm:h-6 bg-gradient-to-r from-[#2A6F97]/30 to-[#3F8AB2]/30 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#3F8AB2]/20 rounded w-full"></div>
                  <div className="h-3 bg-[#3F8AB2]/20 rounded w-5/6"></div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-4 h-4 bg-[#2A6F97]/30 rounded mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>

              {/* Reviews Section Skeleton */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
                <div className="flex items-center">
                  <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#2A6F97]/20">
                    <div className="w-8 h-4 bg-[#2A6F97]/30 rounded"></div>
                  </div>
                  <div className="ml-3 w-24 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-32 h-3 bg-gray-200 rounded hidden sm:block"></div>
              </div>

              {/* Rooms Section Skeleton */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-1 h-4 bg-[#2A6F97]/50 rounded-full mr-2"></div>
                  <div className="h-4 w-32 bg-gradient-to-r from-[#2A6F97]/30 to-[#3F8AB2]/30 rounded"></div>
                </div>
                <div className="space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2"
                    >
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-[#2A6F97]/30 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Section Skeleton */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-1 h-4 bg-[#2A6F97]/50 rounded-full mr-2"></div>
                  <div className="h-4 w-24 bg-gradient-to-r from-[#2A6F97]/30 to-[#3F8AB2]/30 rounded"></div>
                </div>
                <div className="space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2"
                    >
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-[#54A5CC]/30 rounded w-12"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Skeleton */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-100 px-3 py-1.5 rounded-full">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Contact & Booking Skeleton */}
              <div className="mt-4 pt-4 border-t border-[#2A6F97]/10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="h-2 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-[#2A6F97]/30 rounded"></div>
                  </div>
                  <div className="w-28 h-10 bg-gradient-to-r from-[#2A6F97]/40 to-[#54A5CC]/40 rounded-xl"></div>
                </div>
              </div>

              {/* Trust Badge Skeleton */}
              <div className="flex justify-end mt-2">
                <div className="flex items-center">
                  <div className="w-1 h-1 bg-[#2A6F97]/30 rounded-full mr-1"></div>
                  <div className="h-2 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button Skeleton */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
        <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#2A6F97]/50 to-[#54A5CC]/50 rounded-xl animate-pulse">
          <div className="h-5 w-24 bg-white/30 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HotelsSectionLoading;
