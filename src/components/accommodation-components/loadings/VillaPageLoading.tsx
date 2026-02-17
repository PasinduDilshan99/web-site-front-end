import React from "react";

const VillaPageLoading = () => {
  // app/villas/page.tsx - Loading State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F5] via-white to-[#E8F3EF] relative overflow-hidden">
      {/* Nature-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#428577]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Leaf Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="villa-leaf-pattern-loading"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 15 Q50 15 55 25 Q60 35 50 45 Q40 55 30 45 Q20 35 30 25 Q35 15 40 15"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
              <circle cx="40" cy="30" r="2" fill="#1B4D3E" opacity="0.3" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#villa-leaf-pattern-loading)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#1B4D3E]/30 shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1B4D3E]"></div>
              <span className="text-[#1B4D3E] text-sm font-medium">
                Curating private luxury villas...
              </span>
            </div>
          </div>

          {/* Page Header Skeleton */}
          <div className="text-center mb-16 relative">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full"></div>

            <div className="pt-8 space-y-4">
              <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto animate-pulse"></div>
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="h-5 md:h-6 bg-[#2E6B5C]/20 rounded w-full animate-pulse"></div>
                <div className="h-5 md:h-6 bg-[#2E6B5C]/20 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Trust Indicators Skeleton */}
            <div className="flex justify-center gap-8 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1B4D3E]/30 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <VillaFilterSectionSkeleton />

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

          {/* Villas Grid Skeleton */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <DetailedVillaCardSkeleton key={index} delay={index * 80} />
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="text-center mt-12">
            <div className="inline-block h-12 w-48 border-2 border-[#1B4D3E]/30 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

// VillaFilterSection Skeleton Component
const VillaFilterSectionSkeleton = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#1B4D3E]/20 shadow-xl relative overflow-hidden">
      {/* Nature-Inspired Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B4D3E]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#428577]/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="relative">
          <div className="h-8 w-64 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-200 rounded mt-2 animate-pulse"></div>
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full"></div>
        </div>

        <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      {/* Basic Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#1B4D3E]/30 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Advanced Filters Toggle Skeleton */}
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1B4D3E]/20"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#1B4D3E]/30 rounded-full">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DetailedVillaCard Skeleton Component
const DetailedVillaCardSkeleton = ({ delay = 0 }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#1B4D3E]/10 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Villa Header Skeleton */}
      <div className="bg-gradient-to-r from-[#1B4D3E]/50 via-[#2E6B5C]/50 to-[#428577]/50 p-5 relative overflow-hidden">
        {/* Decorative Nature Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>

        {/* Leaf Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="header-leaf-loading"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 5 Q25 5 28 10 Q30 15 25 20 Q20 25 15 20 Q10 15 15 10 Q18 5 20 5"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#header-leaf-loading)"
            />
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
              <div className="w-1.5 h-1.5 bg-[#1B4D3E]/30 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
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
        <div className="p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-[#1B4D3E]/30 rounded mr-2 animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="col-span-2 flex items-center bg-white/50 p-2 rounded-lg">
              <div className="w-4 h-4 bg-[#1B4D3E]/30 rounded mr-2 animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Villa Features Skeleton */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-white border border-[#1B4D3E]/10 rounded-xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-4 w-8 bg-[#1B4D3E]/30 rounded mx-auto mb-1 animate-pulse"></div>
              <div className="h-3 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Villa Suites Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#1B4D3E]/30 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <div className="w-4 h-4 bg-purple-200 rounded"></div>
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-5 w-16 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-[#1B4D3E]/10 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Amenities Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#428577]/30 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-[#1B4D3E]/10 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500/30 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
              <div className="h-4 w-8 bg-green-200 rounded mr-1"></div>
              <div className="w-4 h-4 bg-yellow-200 rounded"></div>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-yellow-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Cancellation Policy Skeleton */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <div className="flex items-center mb-2">
            <div className="w-1.5 h-1.5 bg-amber-500/30 rounded-full mr-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-3 pt-4 border-t border-[#1B4D3E]/10">
          <div className="flex-1 h-12 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl animate-pulse"></div>
          <div className="h-12 w-12 border-2 border-[#1B4D3E]/20 rounded-xl animate-pulse"></div>
        </div>

        {/* Trust Badge Skeleton */}
        <div className="flex justify-end">
          <div className="flex items-center">
            <div className="w-1 h-1 bg-[#1B4D3E]/30 rounded-full mr-1"></div>
            <div className="h-2 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaPageLoading;
