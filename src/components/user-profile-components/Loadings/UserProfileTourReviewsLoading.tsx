import React from "react";

const UserProfileTourReviewsLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading tour reviews...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
          <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
        </div>

        {/* Stats and Filter Section Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-8 animate-pulse"></div>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-amber-700 to-amber-800/50 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-8"></div>
                  </div>
                  <div className="w-1 h-4 bg-gradient-to-br from-gray-700 to-gray-800/50 rounded"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24"></div>
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
            </div>

            {/* Filter Buttons Skeleton */}
            <div className="flex items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Mobile Stats Skeleton */}
          <div className="md:hidden flex items-center justify-between bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg p-3 border border-teal-500/20">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gradient-to-br from-amber-700 to-amber-800/50 rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-8"></div>
              </div>
              <div className="w-1 h-4 bg-gradient-to-br from-gray-700 to-gray-800/50 rounded"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
            >
              <div className="p-5 md:p-6">
                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"
                          ></div>
                        ))}
                      </div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20"></div>
                    </div>
                    <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="w-24 h-6 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                </div>

                {/* Review Text Skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Journey Route Skeleton */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16"></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mx-2"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16"></div>
                </div>

                {/* Images Gallery Skeleton */}
                <div className="mt-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions Skeleton */}
                <div className="mt-4 pt-4 border-t border-teal-500/20 flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <div className="h-4 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded w-20"></div>
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-rose-800 to-rose-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-sky-800 to-teal-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 mx-auto animate-pulse"></div>
        </div>

        {/* Stats Summary Skeleton */}
        <div className="mt-8 md:mt-12 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 p-6 md:p-8">
          <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 md:mb-6 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20"
              >
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTourReviewsLoading;
