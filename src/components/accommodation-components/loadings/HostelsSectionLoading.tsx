import React from "react";

const HostelsSectionLoading = ({ visibleCount }: { visibleCount: number }) => {
  // components/HostelsSection.tsx - Loading State
  return (
    <section className="bg-gradient-to-br from-[#F5FDFA] via-[#FAFFFD] to-[#F0FAF5] relative overflow-hidden min-h-[800px]">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#B5E5D4]/30 rounded-full -ml-36 -mt-36 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DDF9F2]/40 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      {/* Bubbles Pattern Overlay - Social & Airy */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="bubbles-pattern-loading"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="3" fill="#B5E5D4" />
              <circle cx="30" cy="20" r="4" fill="#C9EFE3" />
              <circle cx="20" cy="30" r="2" fill="#DDF9F2" />
              <circle cx="35" cy="35" r="3" fill="#B5E5D4" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#bubbles-pattern-loading)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#B5E5D4]/50 shadow-md">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7ABFA5]"></div>
            <span className="text-[#2D4F43] text-sm font-medium">
              Finding fresh hostel spaces...
            </span>
          </div>
        </div>

        {/* Header with Fresh & Social Styling Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <div className="text-center">
            {/* Subtitle */}
            <div className="h-4 sm:h-5 bg-[#B5E5D4]/40 rounded-full w-40 sm:w-48 md:w-56 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

            {/* Title */}
            <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-lg w-40 sm:w-48 md:w-56 lg:w-64 mx-auto mb-4 animate-pulse"></div>

            {/* Description */}
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="h-4 sm:h-5 bg-[#C9EFE3]/40 rounded w-full animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-[#C9EFE3]/40 rounded w-5/6 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Fresh Elements Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-8 h-8 rounded-full bg-[#B5E5D4]/30 flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-[#B5E5D4]/50 rounded-full"></div>
            </div>
            <div className="h-3 w-32 bg-[#7ABFA5]/20 rounded animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-[#DDF9F2]/30 flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-[#DDF9F2]/50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hostels Grid Skeleton */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(visibleCount || 8)].map((_, index) => (
            <div
              key={index}
              className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-[#B5E5D4] animate-pulse hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Hostel Images Skeleton */}
              <div className="relative h-40 sm:h-44 md:h-40 lg:h-44 xl:h-48 overflow-hidden">
                <div className="flex h-full">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex-1 relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#B5E5D4]/40 to-[#DDF9F2]/40">
                        {/* Light Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#B5E5D4]/30 via-transparent to-transparent" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Badge Skeleton */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#B5E5D4]">
                    <div className="h-3 w-16 bg-[#B5E5D4]/30 rounded"></div>
                  </div>
                </div>

                {/* Star Rating Skeleton */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full border border-[#B5E5D4]">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#B5E5D4]/40 rounded"></div>
                    <div className="w-4 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Hostel Type Skeleton */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-[#C9EFE3]">
                    <div className="h-2 w-12 bg-[#C9EFE3]/40 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Hostel Details Skeleton */}
              <div className="p-4 space-y-3">
                {/* Hostel Name and Description */}
                <div className="space-y-2">
                  <div className="h-5 lg:h-6 bg-[#2D4F43]/20 rounded w-3/4"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-[#5A8F7A]/20 rounded w-full"></div>
                    <div className="h-3 bg-[#5A8F7A]/20 rounded w-5/6"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#3F6B5C]/30 rounded mr-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>

                {/* Price Range & Capacity Skeleton */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
                  <div className="text-center flex-1 space-y-1">
                    <div className="h-4 w-16 bg-[#2D4F43]/30 rounded mx-auto"></div>
                    <div className="h-2 w-12 bg-gray-200 rounded mx-auto"></div>
                  </div>
                  <div className="h-8 w-px bg-[#B5E5D4] mx-2"></div>
                  <div className="text-center flex-1 space-y-1">
                    <div className="h-4 w-8 bg-[#2D4F43]/30 rounded mx-auto"></div>
                    <div className="h-2 w-10 bg-gray-200 rounded mx-auto"></div>
                  </div>
                </div>

                {/* Room Types Skeleton */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-[#B5E5D4]/50 rounded-full mr-2"></div>
                    <div className="h-3 w-32 bg-[#2D4F43]/20 rounded"></div>
                  </div>
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-2 border border-transparent"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-16 bg-[#2D4F43]/20 rounded"></div>
                          <div className="w-1 h-1 bg-[#5A8F7A]/30 rounded"></div>
                          <div className="h-2 w-8 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 bg-gray-200 rounded"></div>
                          <div className="h-4 w-10 bg-[#F5FDFA] rounded-full border border-[#B5E5D4]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meals Skeleton */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-[#C9EFE3]/50 rounded-full mr-2"></div>
                    <div className="h-3 w-24 bg-[#2D4F43]/20 rounded"></div>
                  </div>
                  <div className="space-y-1">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-2"
                      >
                        <div className="h-3 w-16 bg-[#2D4F43]/20 rounded"></div>
                        <div className="h-4 w-12 bg-[#FAFFFD] rounded-full border border-[#DDF9F2]"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Skeleton */}
                <div className="p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white px-2 py-1 rounded-full border border-[#B5E5D4]">
                        <div className="w-6 h-3 bg-[#2D4F43]/30 rounded mr-1"></div>
                      </div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mt-1"></div>
                </div>

                {/* Amenities Skeleton */}
                <div className="flex flex-wrap gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#F5FDFA] px-2 py-1 rounded-full border border-[#B5E5D4]"
                    >
                      <div className="h-2 w-12 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Check-in/out Skeleton */}
                <div className="flex items-center justify-between bg-[#F5FDFA] p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Social Features Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex space-x-2 pt-2 border-t border-[#B5E5D4]">
                  <div className="flex-1 h-8 bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-lg"></div>
                  <div className="w-16 h-8 border border-[#B5E5D4] rounded-lg"></div>
                </div>

                {/* Social Vibe Skeleton */}
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-[#5A8F7A]/30 rounded"></div>
                  <div className="h-2 w-32 bg-gray-200 rounded"></div>
                  <div className="w-2 h-2 bg-[#5A8F7A]/30 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button Skeleton */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16">
          <div className="inline-block px-6 py-2.5 bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-xl animate-pulse border border-[#B5E5D4]">
            <div className="h-4 w-28 bg-white/50 rounded"></div>
          </div>
        </div>

        {/* Social Trust Indicators Skeleton */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-[#B5E5D4]/30">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-[#B5E5D4]/40"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Budget-Friendly Note Skeleton */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
            <div className="h-3 w-64 bg-gray-200 rounded"></div>
            <div className="w-3 h-3 bg-[#5A8F7A]/30 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostelsSectionLoading;
