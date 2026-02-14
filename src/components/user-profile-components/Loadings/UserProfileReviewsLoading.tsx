import React from "react";

const UserProfileReviewsLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading your reviews...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
          <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
        </div>

        {/* Review Categories Skeleton */}
        <div className="mb-8 md:mb-12">
          <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-4 md:mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 p-4 md:p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl md:rounded-2xl animate-pulse"></div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                    <div className="w-8 h-5 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-16 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4 md:p-5 animate-pulse"
            >
              <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="mb-4 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                        <div className="w-16 h-5 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"
                            ></div>
                          ))}
                        </div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Entity Info Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="w-20 h-5 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                    <div className="w-16 h-5 bg-gradient-to-r from-amber-800 to-amber-800/50 rounded-full"></div>
                  </div>

                  {/* Images Skeleton */}
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-3 border-t border-teal-500/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                    </div>
                    <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-800/50 rounded-full"></div>
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

        {/* Quick Stats Skeleton */}
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

export default UserProfileReviewsLoading;
