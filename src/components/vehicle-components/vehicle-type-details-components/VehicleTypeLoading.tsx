// components/vehicle-type-components/VehicleTypeLoading.tsx
import React from "react";

const VehicleTypeLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badges Skeleton */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <div className="w-20 h-8 bg-white/20 rounded-full"></div>
                <div className="w-24 h-8 bg-white/20 rounded-full"></div>
                <div className="w-28 h-8 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Title Skeleton */}
              <div className="h-12 sm:h-16 lg:h-20 w-3/4 mx-auto bg-white/20 rounded-lg mb-6"></div>
              
              {/* Description Skeleton */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
                <div className="h-4 bg-white/20 rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-4 bg-white/20 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-white/50 rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-16 sm:h-20 bg-white/50 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Overview Skeleton */}
          <div className="space-y-6">
            <div className="bg-white/50 rounded-2xl p-6 animate-pulse">
              <div className="h-8 w-48 bg-teal-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-teal-100 rounded w-full"></div>
                <div className="h-4 bg-teal-100 rounded w-5/6"></div>
                <div className="h-4 bg-teal-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeLoading;