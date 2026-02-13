// PackagesCompareLoading.tsx
import React, { useState } from "react";
import { Search, DollarSign } from "lucide-react";

const PackagesCompareLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* Hero Section Skeleton - Matches PackageComparisonHeaderSection */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-sky-600/20 to-teal-600/20">
        {/* Image Slider Skeleton */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-100">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-teal-900/50">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl text-white mx-auto text-center">
              {/* Tour Title */}
              <div className="h-10 md:h-12 lg:h-14 bg-white/10 backdrop-blur-sm rounded-lg w-64 sm:w-72 md:w-80 lg:w-96 mx-auto mb-6 animate-pulse"></div>

              {/* Description Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mb-8 mx-auto">
                <div className="space-y-3 mb-6">
                  <div className="h-5 md:h-6 bg-white/20 rounded w-full animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-5/6 mx-auto animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-4/6 mx-auto animate-pulse"></div>
                </div>

                {/* Tour Info - CENTERED */}
                <div className="flex flex-wrap justify-center gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full animate-pulse"
                    >
                      <div className="w-5 h-5 bg-white/20 rounded"></div>
                      <div className="h-4 w-24 bg-white/20 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Counter */}
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex mx-auto animate-pulse">
                <div className="w-4 h-4 bg-white/20 rounded"></div>
                <div className="h-4 w-16 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse"></div>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse"></div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === selectedImageIndex
                  ? "bg-gradient-to-r from-sky-400 to-teal-400"
                  : "bg-white/30"
              } animate-pulse`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div className="h-full w-1/4 bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400" />
        </div>
      </div>

      {/* Image Thumbnails Skeleton */}
      {true && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 ${
                  i === 0 ? "border-sky-500" : "border-gray-700"
                } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
              >
                {i === 0 && (
                  <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 h-6"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Header Skeleton - Matches SearchHeader */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-teal-500/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <div className="h-8 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-2 animate-pulse"></div>
            <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-72 md:w-80 mx-auto animate-pulse"></div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500/50 w-5 h-5" />
              <div className="w-full h-14 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/30 rounded-xl animate-pulse"></div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-teal-500/30 rounded"></div>
            </div>

            {/* Tour Dropdown Skeleton - Shown when search is active */}
            {true && (
              <div className="absolute z-50 w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-teal-500/30 max-h-96 overflow-y-auto">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full p-4 border-b border-teal-500/20 last:border-b-0 animate-pulse"
                  >
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mb-3"></div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="h-6 bg-gray-800 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-800 rounded-full w-24"></div>
                      <div className="h-6 bg-gray-800 rounded-full w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Selection Skeleton - Matches PackageSelection */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-8 border border-teal-500/20">
            <div className="h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 sm:w-56 md:w-64 mb-6 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Package 1 Selection */}
              <div>
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/30 rounded-lg animate-pulse"></div>
              </div>

              {/* Package 2 Selection */}
              <div>
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/30 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Comparison Button Skeleton */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-lg shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-teal-500/30 rounded"></div>
                  <div className="h-5 w-48 bg-teal-500/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 sm:w-56 md:w-64 mx-auto mb-8 animate-pulse"></div>

          {/* Summary Cards Skeleton */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Mobile Horizontal Scroll Skeleton */}
              <div className="sm:hidden">
                <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-[80vw]">
                      <div className="mb-2 h-4 w-20 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                      <PackageSummaryCardSkeleton />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <PackageSummaryCardSkeleton />
              </div>
              <div className="hidden sm:block">
                <PackageSummaryCardSkeleton />
              </div>
            </div>
          </div>

          {/* Day Comparison Table Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20 mb-8">
            <div className="h-6 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-6 animate-pulse"></div>
            
            {/* Days Navigation */}
            <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-16 h-10 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-lg border border-teal-500/20 animate-pulse"
                ></div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 items-center">
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Details Comparison Tabs Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-teal-500/20 pb-4">
              {["inclusions", "exclusions", "conditions", "tips"].map((tab, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-lg ${
                    i === 0
                      ? "bg-gradient-to-r from-gray-700 to-teal-800/50"
                      : "bg-gray-800/50"
                  } animate-pulse`}
                >
                  <div className="h-4 w-20 bg-gray-600/50 rounded"></div>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-3 animate-pulse"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-teal-500/30 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-3 animate-pulse"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-teal-500/30 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* No Packages Message Skeleton */}
        {false && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-teal-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <DollarSign className="w-8 h-8 text-teal-500/30" />
              </div>
              <div className="h-6 w-48 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 w-64 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Initial State - No Tour Selected Skeleton */}
        {false && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-teal-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Search className="w-8 h-8 text-teal-500/30" />
              </div>
              <div className="h-6 w-48 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 w-56 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 w-32 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// PackageSummaryCardSkeleton Component
const PackageSummaryCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
        </div>
        <div className="px-3 py-1 bg-gray-800 rounded-full">
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="h-3 w-16 bg-gray-800 rounded mb-1"></div>
          <div className="h-4 w-20 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
        </div>
        <div>
          <div className="h-3 w-16 bg-gray-800 rounded mb-1"></div>
          <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
      </div>

      {/* Package Images Gallery Skeleton */}
      <div className="mt-6">
        <div className="h-4 w-28 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-3"></div>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full h-20 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesCompareLoading;