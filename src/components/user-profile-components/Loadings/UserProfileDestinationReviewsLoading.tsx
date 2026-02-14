import React from "react";

const UserProfileDestinationReviewsLoading = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading destination reviews...
            </span>
          </div>
        </div>

        {/* Header Section Skeleton */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div>
              <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 sm:w-56 md:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-72 md:w-80 animate-pulse"></div>
            </div>

            <div className="h-8 sm:h-10 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-xl w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Summary Skeleton */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-4 sm:p-6 border border-teal-500/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-6 sm:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
            >
              {/* Review Header Skeleton */}
              <div className="p-5 sm:p-6 border-b border-teal-500/20">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <div className="w-16 h-6 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Review Content Skeleton */}
              <div className="p-5 sm:p-6">
                <div className="space-y-2 mb-4 sm:mb-5">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Images Gallery Skeleton */}
                <div className="mb-4 sm:mb-5">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Review Footer Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-5 border-t border-teal-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                    <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-800/50 rounded-full"></div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4"></div>
                    </div>

                    <div className="w-16 h-4 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination/Footer Skeleton */}
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg"></div>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg"
              ></div>
            ))}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDestinationReviewsLoading;
