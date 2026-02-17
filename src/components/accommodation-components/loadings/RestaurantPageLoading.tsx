import React from 'react'

const RestaurantPageLoading = () => {
// app/restaurants/page.tsx - Loading State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F6F6] via-white to-[#D9F0F0] relative overflow-hidden">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#84CACA]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#5FB3B3]/5 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="restaurant-wave-pattern-loading"
              x="0"
              y="0"
              width="80"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q20 10 40 20 T80 20"
                stroke="#3A9B9B"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q20 20 40 30 T80 30"
                stroke="#5FB3B3"
                fill="none"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#restaurant-wave-pattern-loading)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#3A9B9B]/30 shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3A9B9B]"></div>
              <span className="text-[#3A9B9B] text-sm font-medium">Curating coastal dining experiences...</span>
            </div>
          </div>

          {/* Page Header Skeleton */}
          <div className="text-center mb-16 relative">
            {/* Decorative Wave Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full"></div>

            <div className="pt-8 space-y-4">
              <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-[#3A9B9B]/30 to-[#84CACA]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto animate-pulse"></div>
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="h-5 md:h-6 bg-[#5FB3B3]/20 rounded w-full animate-pulse"></div>
                <div className="h-5 md:h-6 bg-[#5FB3B3]/20 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Trust Indicators Skeleton */}
            <div className="flex justify-center gap-8 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3A9B9B]/30 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <RestaurantFilterSectionSkeleton />

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

          {/* Restaurants Grid Skeleton */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <DetailedRestaurantCardSkeleton key={index} delay={index * 80} />
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="text-center mt-12">
            <div className="inline-block h-12 w-48 border-2 border-[#3A9B9B]/30 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

// RestaurantFilterSection Skeleton Component
const RestaurantFilterSectionSkeleton = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#3A9B9B]/20 shadow-xl relative overflow-hidden">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A9B9B]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#84CACA]/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      {/* Wave Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="filter-wave-loading" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q10 5 20 10 T40 10" stroke="#3A9B9B" fill="none" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#filter-wave-loading)"/>
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="relative">
          <div className="h-8 w-64 bg-gradient-to-r from-[#3A9B9B]/30 to-[#84CACA]/30 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-200 rounded mt-2 animate-pulse"></div>
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full"></div>
        </div>
        
        <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      {/* Basic Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#3A9B9B]/30 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Advanced Filters Toggle Skeleton */}
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#3A9B9B]/20"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#3A9B9B]/30 rounded-full">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DetailedRestaurantCard Skeleton Component
const DetailedRestaurantCardSkeleton = ({ delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#3A9B9B]/10 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Restaurant Header Skeleton - Coastal Theme */}
      <div className="bg-gradient-to-r from-[#3A9B9B]/50 via-[#5FB3B3]/50 to-[#84CACA]/50 p-5 relative overflow-hidden">
        {/* Coastal Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="card-header-wave-loading" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 5 20 10 T40 10" stroke="white" fill="none" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#card-header-wave-loading)"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-16 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-5 w-20 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <div className="h-6 w-3/4 bg-white/20 rounded mb-2 animate-pulse"></div>
              <div className="space-y-1 mb-2">
                <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                <div className="h-3 w-5/6 bg-white/20 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Images Gallery Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#3A9B9B]/30 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Cuisine Types Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#5FB3B3]/30 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-[#E8F6F6] rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Location & Contact Skeleton */}
        <div className="p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-[#3A9B9B]/30 rounded mr-2 animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="col-span-2 flex items-center bg-white/50 p-2 rounded-lg">
              <div className="w-4 h-4 bg-[#3A9B9B]/30 rounded mr-2 animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Signature Dishes Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#84CACA]/30 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-16 bg-[#E8F6F6] rounded-full animate-pulse"></div>
                    <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-5 w-16 bg-[#3A9B9B]/30 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-[#3A9B9B]/10 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Features Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#5FB3B3]/30 rounded-full"></div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-[#E8F6F6] rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Dining Amenities Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#3A9B9B]/30 to-[#84CACA]/30 rounded-full"></div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-[#3A9B9B]/10 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Skeleton */}
        <div className="p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-[#3A9B9B]/10">
                <div className="h-4 w-8 bg-[#3A9B9B]/30 rounded mr-1 animate-pulse"></div>
                <div className="w-3 h-3 bg-[#5FB3B3]/30 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-3 pt-4 border-t border-[#3A9B9B]/10">
          <div className="flex-1 h-12 bg-gradient-to-r from-[#3A9B9B]/30 to-[#84CACA]/30 rounded-xl animate-pulse"></div>
          <div className="h-12 w-24 border-2 border-[#3A9B9B]/20 rounded-xl animate-pulse"></div>
        </div>

        {/* Trust Badge Skeleton */}
        <div className="flex justify-end">
          <div className="flex items-center">
            <div className="w-1 h-1 bg-[#3A9B9B]/30 rounded-full mr-1"></div>
            <div className="h-2 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1 h-1 bg-[#84CACA]/30 rounded-full ml-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPageLoading