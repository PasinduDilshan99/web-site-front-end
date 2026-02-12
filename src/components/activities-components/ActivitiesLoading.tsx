import React from "react";

const ActivitiesLoading = ({ itemsPerPage }: { itemsPerPage: number }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Simple loading header for main content */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading activities...</span>
          </div>
        </div>

        {/* Page Header Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="text-center">
            <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-80 md:w-96 lg:w-[32rem] mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-56 sm:w-72 md:w-80 lg:w-96 mx-auto animate-pulse"></div>
            <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-16 sm:w-20 md:w-24 mx-auto mt-4 animate-pulse"></div>
          </div>
        </div>

        {/* Filters Section Skeleton */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl p-6 border border-teal-500/20">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-xl w-full animate-pulse border border-teal-500/20"></div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded-full w-20 animate-pulse"
                ></div>
              ))}
            </div>

            {/* Price Range & Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                <div className="h-2 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-full animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
              <div className="h-10 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded-lg w-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>

            {/* Items Per Page Selector Skeleton */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg px-4 py-2 border border-teal-500/20">
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-16 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Activities Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {[...Array(itemsPerPage || 12)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl overflow-hidden border border-teal-500/20 animate-pulse"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Activity Image */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-teal-800/50 relative">
                <div className="absolute top-3 right-3 w-16 h-6 bg-gray-900/80 rounded-full border border-teal-500/30"></div>
                <div className="absolute bottom-3 left-3 w-20 h-6 bg-gray-900/80 rounded-lg border border-teal-500/30"></div>
              </div>

              {/* Activity Content */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-8"></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24"></div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20"></div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-28"></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-1"></div>
                    <div className="h-5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded w-20"></div>
                  </div>
                  <div className="w-20 h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-teal-500/20">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 animate-pulse"></div>

          <div className="flex items-center gap-2">
            <div className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesLoading;
