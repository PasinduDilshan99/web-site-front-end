import React from "react";

const UserProfilePackageReviewsLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading package reviews...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
          <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
        </div>

        {/* Stats Overview Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4 text-center"
              >
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-12 md:w-16 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Package Reviews List Skeleton */}
        <div className="space-y-4 md:space-y-6">
          {[...Array(3)].map((_, reviewIndex) => (
            <div
              key={reviewIndex}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 overflow-hidden"
            >
              <div className="p-4 md:p-6">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 md:mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg md:rounded-xl animate-pulse"></div>
                      <div>
                        <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-1 animate-pulse"></div>
                        <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="w-24 h-6 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-full"></div>
                    <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-800/50 rounded-full"></div>
                  </div>
                </div>

                {/* Review Content Skeleton */}
                <div className="mb-4 md:mb-6 space-y-2">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Images Gallery Skeleton */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="pt-4 border-t border-teal-500/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-8"></div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-8"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                      </div>
                      <div className="w-16 h-4 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePackageReviewsLoading;
