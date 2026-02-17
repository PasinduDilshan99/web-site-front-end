import React from "react";

const VillasSectionLoading = ({ visibleCount }: { visibleCount: number }) => {
  // components/VillasSection.tsx - Loading State
  return (
    <section className="bg-gradient-to-br from-[#E8F3EF] via-[#F0F9F5] to-[#D9ECE5] relative overflow-hidden min-h-[800px]">
      {/* Decorative Elements - matching the actual component */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B4D3E]/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#428577]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="leaf-pattern-loading"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 10 Q40 10 45 20 Q50 30 40 40 Q30 50 20 40 Q10 30 20 20 Q25 10 30 10"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#leaf-pattern-loading)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#1B4D3E]/30 shadow-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1B4D3E]"></div>
            <span className="text-[#1B4D3E] text-sm font-medium">
              Loading private luxury villas...
            </span>
          </div>
        </div>

        {/* Header with Nature-Inspired Styling - Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <div className="text-center">
            {/* Subtitle */}
            <div className="h-4 sm:h-5 bg-[#1B4D3E]/20 rounded-full w-40 sm:w-48 md:w-56 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

            {/* Title */}
            <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-4 animate-pulse"></div>

            {/* Description */}
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="h-4 sm:h-5 bg-[#2E6B5C]/20 rounded w-full animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-[#2E6B5C]/20 rounded w-5/6 mx-auto animate-pulse"></div>
            </div>

            {/* Natural Elements Line */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#1B4D3E]/30 to-transparent"></div>
              <div className="h-3 w-32 bg-[#1B4D3E]/20 rounded-full animate-pulse"></div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#1B4D3E]/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Villas Grid Skeleton */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(visibleCount || 8)].map((_, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-[#1B4D3E]/10 animate-pulse"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Villa Image Section */}
              <div className="relative h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
                {/* Image Placeholder with Gradient */}
                <div className="w-full h-full bg-gradient-to-br from-[#1B4D3E]/30 to-[#428577]/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/80 via-transparent to-transparent"></div>

                  {/* Decorative Leaf Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="leaf-overlay-loading"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M20 5 Q25 5 28 10 Q30 15 25 20 Q20 25 15 20 Q10 15 15 10 Q18 5 20 5"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#leaf-overlay-loading)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Exclusive Badge Skeleton */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#1B4D3E]/50 to-[#428577]/50 px-4 py-1.5 rounded-full">
                    <div className="h-3 w-16 bg-white/30 rounded"></div>
                  </div>
                </div>

                {/* Star Rating Skeleton */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-[#1B4D3E]/10">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#2E6B5C]/30 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Villa Type Badge Skeleton */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#428577]/20">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Price Tag Skeleton */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-[#1B4D3E]/50 px-4 py-2 rounded-xl border border-[#428577]/30">
                    <div className="h-4 w-20 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Villa Details */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Villa Name and Description */}
                <div className="space-y-3">
                  <div className="h-6 lg:h-7 bg-gradient-to-r from-[#1B4D3E]/30 to-[#2E6B5C]/30 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#2E6B5C]/20 rounded w-full"></div>
                    <div className="h-3 bg-[#2E6B5C]/20 rounded w-5/6"></div>
                  </div>
                  {/* Location */}
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#1B4D3E]/30 rounded mr-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>

                {/* Capacity and Features */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F0F9F5] to-[#E8F3EF] rounded-xl border border-[#1B4D3E]/10">
                  <div className="flex items-center space-x-6">
                    <div className="text-center space-y-1">
                      <div className="h-5 w-8 bg-[#1B4D3E]/30 rounded mx-auto"></div>
                      <div className="h-2 w-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-8 w-px bg-[#428577]/30"></div>
                    <div className="text-center space-y-1">
                      <div className="h-5 w-8 bg-[#428577]/30 rounded mx-auto"></div>
                      <div className="h-2 w-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-8 w-px bg-[#428577]/30"></div>
                    <div className="text-center space-y-1">
                      <div className="h-5 w-8 bg-[#2E6B5C]/30 rounded mx-auto"></div>
                      <div className="h-2 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Rooms Section - Private Suites */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-[#428577]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-24 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 bg-white border border-[#1B4D3E]/10 rounded-xl"
                      >
                        <div className="space-y-2">
                          <div className="h-3 w-20 bg-[#1B4D3E]/30 rounded"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-12 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-[#1B4D3E]/50 px-3 py-1.5 rounded-lg">
                            <div className="h-3 w-12 bg-white/30 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Skeleton */}
                <div className="p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#428577]/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#1B4D3E]/10">
                        <div className="w-6 h-3 bg-[#1B4D3E]/30 rounded mr-1"></div>
                        <div className="w-3 h-3 bg-[#428577]/30 rounded"></div>
                      </div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>

                {/* Amenities Skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#1B4D3E]/10 px-3 py-1.5 rounded-full border border-[#1B4D3E]/20"
                    >
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex space-x-3 pt-4 border-t border-[#1B4D3E]/10">
                  <div className="flex-1 bg-gradient-to-r from-[#1B4D3E]/40 to-[#428577]/40 py-3.5 rounded-xl">
                    <div className="h-4 w-20 bg-white/30 rounded mx-auto"></div>
                  </div>
                  <div className="px-6 py-3.5 border-2 border-[#1B4D3E]/20 rounded-xl">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Trust Badge Skeleton */}
                <div className="flex justify-end">
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-[#428577]/30 rounded-full mr-1"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button Skeleton */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <div className="inline-block bg-gradient-to-r from-[#1B4D3E]/50 to-[#428577]/50 py-3.5 px-8 rounded-xl animate-pulse border border-[#428577]/30">
            <div className="h-5 w-32 bg-white/30 rounded"></div>
          </div>
        </div>

        {/* Trust Indicators Skeleton */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#1B4D3E]/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#1B4D3E]/30 rounded-full"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillasSectionLoading;
