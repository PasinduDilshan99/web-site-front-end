import React from "react";

const HotelPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E6F0FA]">
      <main className="pt-24 pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Simple loading header */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2A6F97]/30 shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2A6F97]"></div>
              <span className="text-[#2A6F97] text-sm font-medium">
                Loading luxury hotels...
              </span>
            </div>
          </div>

          {/* Page Header Skeleton */}
          <div className="text-center mb-16 relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] rounded-full"></div>

            <div className="pt-8 space-y-4">
              <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto animate-pulse"></div>
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="h-5 md:h-6 bg-[#3F8AB2]/20 rounded w-full animate-pulse"></div>
                <div className="h-5 md:h-6 bg-[#3F8AB2]/20 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Trust Indicators Skeleton */}
            <div className="flex justify-center gap-8 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2A6F97]/30 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#2A6F97]/20 shadow-xl">
            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="relative">
                <div className="h-8 w-48 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mt-2 animate-pulse"></div>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] rounded-full"></div>
              </div>
              <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>

            {/* Basic Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#2A6F97]/30 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Advanced Filters Toggle Skeleton */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2A6F97]/10"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#2A6F97]/30 rounded-full">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count Skeleton */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Hotels Grid Skeleton */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <CompactDetailedHotelCardSkeleton
                key={index}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// CompactDetailedHotelCard Skeleton Component
const CompactDetailedHotelCardSkeleton = ({ delay = 0 }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#2A6F97]/10 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hotel Header Skeleton */}
      <div className="bg-gradient-to-r from-[#2A6F97]/50 via-[#3F8AB2]/50 to-[#54A5CC]/50 p-5 relative overflow-hidden">
        {/* Decorative waves */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-16 bg-white/20 rounded-full"></div>
            <div className="h-5 w-20 bg-white/20 rounded-full"></div>
          </div>
          <div className="h-6 w-3/4 bg-white/20 rounded mb-2"></div>
          <div className="space-y-1 mb-2">
            <div className="h-3 w-full bg-white/20 rounded"></div>
            <div className="h-3 w-5/6 bg-white/20 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-16 bg-white/20 rounded-full"></div>
            <div className="h-3 w-20 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Images Gallery Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#2A6F97]/30 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>

        {/* Contact & Location Skeleton */}
        <div className="p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-[#2A6F97]/30 rounded mr-2"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
            <div className="col-span-2 flex items-center bg-white/50 p-2 rounded-lg">
              <div className="w-4 h-4 bg-[#2A6F97]/30 rounded mr-2"></div>
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Quick Info Skeleton */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-white border border-[#2A6F97]/10 rounded-xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-4 w-8 bg-gray-200 rounded mx-auto mb-1"></div>
              <div className="h-2 w-12 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Rooms Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#2A6F97]/30 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl"
              >
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="flex gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dining Options Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#54A5CC]/30 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F0F7FF] to-white rounded-xl"
              >
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-[#54A5CC]/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#3F8AB2]/30 rounded-full"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500/30 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-20 bg-green-50 rounded-full"></div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-yellow-200 rounded"></div>
                ))}
              </div>
              <div className="h-3 w-12 bg-gray-200 rounded ml-2"></div>
            </div>
            <div className="space-y-1">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Cancellation Policy Skeleton */}
        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
          <div className="flex items-center mb-2">
            <div className="w-1.5 h-1.5 bg-red-500/30 rounded-full mr-2"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-3 pt-4 border-t border-[#2A6F97]/10">
          <div className="flex-1 h-12 bg-gradient-to-r from-[#2A6F97]/40 to-[#54A5CC]/40 rounded-xl"></div>
          <div className="w-12 h-12 border-2 border-[#2A6F97]/20 rounded-xl"></div>
        </div>

        {/* Trust Badge Skeleton */}
        <div className="flex justify-end">
          <div className="flex items-center">
            <div className="w-1 h-1 bg-[#2A6F97]/30 rounded-full mr-1"></div>
            <div className="h-2 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelPageLoading;
