import React from "react";

const RestaurantsSectionLoading = ({
  visibleCount,
}: {
  visibleCount: number;
}) => {
  return (
    <section className="bg-gradient-to-br from-[#E8F6F6] via-[#F0FAFA] to-[#D9F0F0] relative overflow-hidden min-h-[800px]">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84CACA]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-pattern-loading"
              x="0"
              y="0"
              width="60"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q15 10 30 20 T60 20"
                stroke="#3A9B9B"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q15 20 30 30 T60 30"
                stroke="#5FB3B3"
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
          <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#3A9B9B]/30 shadow-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3A9B9B]"></div>
            <span className="text-[#3A9B9B] text-sm font-medium">
              Curating coastal dining experiences...
            </span>
          </div>
        </div>

        {/* Header with Coastal Styling Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <div className="text-center">
            {/* Subtitle */}
            <div className="h-4 sm:h-5 bg-[#3A9B9B]/20 rounded-full w-48 sm:w-56 md:w-64 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

            {/* Title */}
            <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-[#3A9B9B]/30 to-[#84CACA]/30 rounded-lg w-40 sm:w-48 md:w-56 lg:w-64 mx-auto mb-4 animate-pulse"></div>

            {/* Description */}
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="h-4 sm:h-5 bg-[#5FB3B3]/20 rounded w-full animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-[#5FB3B3]/20 rounded w-5/6 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Coastal Elements Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#3A9B9B]/30 to-transparent"></div>
            <div className="h-3 w-40 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#3A9B9B]/30 to-transparent"></div>
          </div>
        </div>

        {/* Restaurants Grid Skeleton */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(visibleCount || 8)].map((_, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#3A9B9B]/10 animate-pulse hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Restaurant Header with Coastal Image Skeleton */}
              <div className="relative h-44 sm:h-48 md:h-44 lg:h-48 xl:h-52 overflow-hidden">
                {/* Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#3A9B9B]/30 via-[#5FB3B3]/30 to-[#84CACA]/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A9B9B]/60 via-transparent to-transparent" />

                  {/* Wave Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="card-wave-loading"
                          x="0"
                          y="0"
                          width="40"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0 10 Q10 5 20 10 T40 10"
                            stroke="white"
                            fill="none"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#card-wave-loading)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Restaurant Type Badge Skeleton */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#3A9B9B]/50 to-[#84CACA]/50 px-4 py-1.5 rounded-full border border-white/20">
                    <div className="h-3 w-16 bg-white/30 rounded"></div>
                  </div>
                </div>

                {/* Star Rating Skeleton */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#3A9B9B]/10">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#5FB3B3]/30 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Restaurant Name Overlay Skeleton */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="h-5 lg:h-6 bg-white/30 rounded w-3/4"></div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-[#84CACA]/50 rounded-full mr-2"></div>
                    <div className="h-3 bg-white/20 rounded w-5/6"></div>
                  </div>
                </div>
              </div>

              {/* Restaurant Details Skeleton */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Cuisine Types Skeleton */}
                <div className="flex flex-wrap gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-[#E8F6F6] to-[#D9F0F0] px-3 py-1.5 rounded-full border border-[#3A9B9B]/20"
                    >
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Location & Contact Skeleton */}
                <div className="p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10 space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 w-4 h-4 bg-[#5FB3B3]/30 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-1 w-3 h-3 bg-[#5FB3B3]/30 rounded"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-1 w-3 h-3 bg-[#5FB3B3]/30 rounded"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Popular Dishes Skeleton */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#3A9B9B]/50 to-[#84CACA]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-28 bg-[#3A9B9B]/30 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-2.5 bg-white border border-[#3A9B9B]/10 rounded-xl"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="h-4 w-32 bg-[#3A9B9B]/30 rounded"></div>
                          <div className="flex items-center space-x-2">
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            <div className="w-1 h-1 bg-gray-200 rounded"></div>
                            <div className="h-3 w-12 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="w-16 h-6 bg-[#E8F6F6] rounded-full ml-3"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities Skeleton */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#5FB3B3]/50 to-[#84CACA]/50 rounded-full mr-2"></div>
                    <div className="h-4 w-28 bg-[#5FB3B3]/30 rounded"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] px-3 py-1.5 rounded-full border border-[#3A9B9B]/20"
                      >
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i === 0
                          ? "bg-[#3A9B9B]/10"
                          : i === 1
                            ? "bg-[#5FB3B3]/10"
                            : i === 2
                              ? "bg-[#84CACA]/10"
                              : "bg-gradient-to-r from-[#3A9B9B]/5 to-[#84CACA]/5"
                      } px-3 py-1.5 rounded-full border border-[#3A9B9B]/20 flex items-center`}
                    >
                      <div className="w-1.5 h-1.5 bg-[#3A9B9B]/30 rounded-full mr-1.5"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Reviews Skeleton */}
                <div className="p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-[#3A9B9B]/10">
                        <div className="w-8 h-4 bg-[#3A9B9B]/30 rounded mr-1"></div>
                      </div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex space-x-3 pt-4 border-t border-[#3A9B9B]/10">
                  <div className="flex-1 h-11 bg-gradient-to-r from-[#3A9B9B]/40 to-[#84CACA]/40 rounded-xl"></div>
                  <div className="w-20 h-11 border-2 border-[#3A9B9B]/20 rounded-xl"></div>
                </div>

                {/* Trust Badge Skeleton */}
                <div className="flex justify-end">
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-[#3A9B9B]/30 rounded-full mr-1"></div>
                    <div className="h-2 w-36 bg-gray-200 rounded"></div>
                    <div className="w-1 h-1 bg-[#84CACA]/30 rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button Skeleton */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#3A9B9B]/50 to-[#84CACA]/50 rounded-xl animate-pulse border border-[#84CACA]/30">
            <div className="h-5 w-32 bg-white/30 rounded"></div>
          </div>
        </div>

        {/* Trust Indicators Skeleton */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#3A9B9B]/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  i === 0
                    ? "bg-[#3A9B9B]/30"
                    : i === 1
                      ? "bg-[#5FB3B3]/30"
                      : "bg-[#84CACA]/30"
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

export default RestaurantsSectionLoading;
