import React from "react";

const VehicleDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[500px] md:h-[700px] bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex justify-center gap-3 mb-6">
                <div className="w-24 h-8 bg-white/20 rounded-full"></div>
                <div className="w-32 h-8 bg-white/20 rounded-full"></div>
              </div>
              <div className="w-3/4 h-16 bg-white/20 rounded-lg mx-auto mb-4"></div>
              <div className="w-1/2 h-10 bg-white/20 rounded-lg mx-auto mb-6"></div>
              <div className="w-full h-48 bg-white/10 rounded-xl mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-12 w-64 bg-gray-300 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="h-48 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-40 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsLoading;