// components/seasons-components/SeasonDetailsLoading.tsx
import React from 'react';

const SeasonDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-teal-800 to-cyan-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
        
        {/* Content Overlay Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="h-8 w-32 bg-white/20 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-12 md:h-16 w-64 md:w-96 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-8 w-48 bg-white/20 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-10 w-56 bg-white/20 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Description Card Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <div className="h-8 w-48 bg-teal-200 rounded-lg mb-6 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Weather Card Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <div className="h-8 w-48 bg-cyan-200 rounded-lg mb-6 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-teal-50 rounded-xl p-5">
                  <div className="h-20 bg-teal-200 rounded animate-pulse" />
                </div>
                <div className="bg-teal-50 rounded-xl p-5">
                  <div className="h-20 bg-teal-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="space-y-4 md:space-y-6">
            {/* Monsoon Type Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <div className="h-7 w-32 bg-teal-200 rounded mb-4 animate-pulse" />
              <div className="h-16 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-xl animate-pulse" />
            </div>

            {/* Quick Facts Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <div className="h-7 w-32 bg-cyan-200 rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Gallery Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <div className="h-7 w-24 bg-teal-200 rounded mb-4 animate-pulse" />
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-teal-200 rounded-lg animate-pulse" />
                <div className="aspect-square bg-teal-200 rounded-lg animate-pulse" />
                <div className="aspect-square bg-teal-200 rounded-lg animate-pulse" />
                <div className="aspect-square bg-teal-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsLoading;