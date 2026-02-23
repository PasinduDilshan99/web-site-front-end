import React from "react";

const ResortsSectionLoading = ({ visibleCount }: { visibleCount: number }) => {
  // components/ResortsSection.tsx - Loading State
  return (
    <section className="bg-gradient-to-br from-[#E6F0F5] via-[#F0F7FA] to-[#D9E9F0] relative overflow-hidden min-h-[800px]">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-pattern-loading"
              x="0"
              y="0"
              width="100"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q25 10 50 20 T100 20 T150 20 T200 20"
                stroke="#0A2F44"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q25 20 50 30 T100 30 T150 30 T200 30"
                stroke="#144A5E"
                fill="none"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#wave-pattern-loading)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#0A2F44]/30 shadow-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A2F44]"></div>
            <span className="text-[#0A2F44] text-sm font-medium">
              Curating exclusive resort experiences...
            </span>
          </div>
        </div>

        {/* Header with Ocean-Inspired Styling Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <div className="text-center">
            {/* Subtitle */}
            <div className="h-4 sm:h-5 bg-[#0A2F44]/20 rounded-full w-40 sm:w-48 md:w-56 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

            {/* Title */}
            <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-lg w-40 sm:w-48 md:w-56 lg:w-64 mx-auto mb-4 animate-pulse"></div>

            {/* Description */}
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="h-4 sm:h-5 bg-[#144A5E]/20 rounded w-full animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-[#144A5E]/20 rounded w-5/6 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Ocean Depth Indicator Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#0A2F44]/30 to-transparent"></div>
            <div className="h-3 w-40 bg-[#0A2F44]/20 rounded animate-pulse"></div>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#0A2F44]/30 to-transparent"></div>
          </div>
        </div>

        {/* Resorts Grid Skeleton */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(visibleCount || 8)].map((_, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#0A2F44]/10 animate-pulse hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Ocean-Inspired Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="card-wave-pattern-loading"
                      x="0"
                      y="0"
                      width="60"
                      height="30"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 15 Q15 8 30 15 T60 15"
                        stroke="#0A2F44"
                        fill="none"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#card-wave-pattern-loading)"
                  />
                </svg>
              </div>

              {/* Resort Images Carousel Skeleton */}
              <div className="relative h-56 sm:h-64 md:h-60 lg:h-64 xl:h-72 overflow-hidden">
                <div className="flex h-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex-1 relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#0A2F44]/30 via-[#144A5E]/30 to-[#1F5F72]/30"></div>
                      {/* Ocean-Inspired Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F44]/60 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* All-Inclusive Badge Skeleton */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#0A2F44]/50 via-[#144A5E]/50 to-[#1F5F72]/50 px-4 py-2 rounded-full border border-white/20">
                    <div className="h-3 w-20 bg-white/30 rounded"></div>
                  </div>
                </div>

                {/* Star Rating & Resort Type Skeleton */}
                <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg border border-[#0A2F44]/10">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-[#1F5F72]/30 rounded"></div>
                      <div className="w-6 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#144A5E]/50 to-[#1F5F72]/50 px-3 py-1 rounded-full border border-white/10">
                    <div className="h-2 w-16 bg-white/30 rounded"></div>
                  </div>
                </div>

                {/* Resort Name Overlay Skeleton */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="h-6 lg:h-7 bg-white/30 rounded w-3/4"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#1F5F72]/50 rounded-full"></div>
                    <div className="h-3 bg-white/20 rounded w-5/6"></div>
                    <div className="w-1 h-1 bg-[#0A2F44]/50 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Resort Details Skeleton */}
              <div className="p-6 relative space-y-5">
                {/* Location & Contact */}
                <div className="space-y-2">
                  <div className="flex items-center bg-[#E6F0F5] px-3 py-2 rounded-xl">
                    <div className="mr-2 w-4 h-4 bg-[#1F5F72]/30 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="flex justify-between items-center bg-white border border-[#0A2F44]/10 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#1F5F72]/30 rounded"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#1F5F72]/30 rounded"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Capacity & Rooms */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-2xl border border-[#0A2F44]/10">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="h-5 w-8 bg-[#0A2F44]/30 rounded mx-auto mb-1"></div>
                      <div className="h-2 w-12 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>

                {/* Accommodations Skeleton */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#0A2F44]/50 to-[#1F5F72]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-28 bg-[#0A2F44]/30 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 bg-white border border-[#0A2F44]/10 rounded-xl"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-24 bg-[#0A2F44]/30 rounded"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-12 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-200 rounded"></div>
                            <div className="h-2 w-16 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="w-16 h-8 bg-gradient-to-r from-[#0A2F44]/40 to-[#1F5F72]/40 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dining Options Skeleton */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#144A5E]/50 to-[#1F5F72]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-28 bg-[#144A5E]/30 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-[#E6F0F5] to-white rounded-xl border border-[#0A2F44]/10"
                      >
                        <div>
                          <div className="h-3 w-20 bg-[#0A2F44]/30 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-12 h-6 bg-[#1F5F72]/20 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities & Amenities Skeleton */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#1F5F72]/50 to-[#0A2F44]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-28 bg-[#1F5F72]/30 rounded"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-[#0A2F44]/10 to-[#144A5E]/10 px-3 py-1.5 rounded-full border border-[#0A2F44]/20"
                      >
                        <div className="h-2 w-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Skeleton */}
                <div className="p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-2xl border border-[#0A2F44]/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#0A2F44]/10">
                        <div className="w-8 h-4 bg-[#0A2F44]/30 rounded mr-1"></div>
                      </div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-[#144A5E]/20 rounded w-20 mt-1"></div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex space-x-3 pt-4 border-t border-[#0A2F44]/10">
                  <div className="flex-1 h-12 bg-gradient-to-r from-[#0A2F44]/40 via-[#144A5E]/40 to-[#1F5F72]/40 rounded-xl"></div>
                  <div className="w-20 h-12 border-2 border-[#0A2F44]/20 rounded-xl"></div>
                </div>

                {/* Trust Badge Skeleton */}
                <div className="flex justify-end mt-2">
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-[#0A2F44]/30 rounded-full mr-1"></div>
                    <div className="h-2 w-36 bg-gray-200 rounded"></div>
                    <div className="w-1 h-1 bg-[#1F5F72]/30 rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button Skeleton */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#0A2F44]/50 to-[#1F5F72]/50 rounded-xl animate-pulse border border-[#1F5F72]/30">
            <div className="h-5 w-28 bg-white/30 rounded"></div>
          </div>
        </div>

        {/* Trust Indicators - Ocean Theme Skeleton */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#0A2F44]/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  i === 0
                    ? "bg-[#0A2F44]/30"
                    : i === 1
                      ? "bg-[#144A5E]/30"
                      : "bg-[#1F5F72]/30"
                }`}
              ></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResortsSectionLoading;
