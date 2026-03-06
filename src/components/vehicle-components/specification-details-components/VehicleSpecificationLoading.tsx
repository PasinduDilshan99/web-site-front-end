import React from "react";

const VehicleSpecificationLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              {/* Badges Skeleton */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
                <div className="w-16 sm:w-20 h-6 sm:h-8 bg-white/20 rounded-full"></div>
                <div className="w-20 sm:w-24 h-6 sm:h-8 bg-white/20 rounded-full"></div>
                <div className="w-16 sm:w-20 h-6 sm:h-8 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Title Skeleton */}
              <div className="w-3/4 sm:w-2/3 h-10 sm:h-12 lg:h-16 bg-white/20 rounded-lg mx-auto mb-4 sm:mb-6"></div>
              
              {/* Description Container Skeleton */}
              <div className="w-full max-w-4xl h-40 sm:h-44 lg:h-48 bg-white/10 rounded-xl mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeletons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Images Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-white/60 rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-16 sm:h-20 lg:h-24 bg-white/60 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-3/4 h-6 sm:h-7 lg:h-8 bg-teal-100 rounded mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-full h-3 sm:h-4 bg-teal-50 rounded animate-pulse"></div>
                <div className="w-5/6 h-3 sm:h-4 bg-teal-50 rounded animate-pulse"></div>
                <div className="w-4/6 h-3 sm:h-4 bg-teal-50 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-1/2 h-5 sm:h-6 bg-cyan-100 rounded mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-16 sm:w-20 h-3 sm:h-4 bg-cyan-50 rounded animate-pulse"></div>
                    <div className="w-20 sm:w-24 h-4 sm:h-5 lg:h-6 bg-cyan-50 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationLoading;