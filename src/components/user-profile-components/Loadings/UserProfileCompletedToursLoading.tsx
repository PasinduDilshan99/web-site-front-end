import React from "react";

const UserProfileCompletedToursLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading completed tours...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Statistics Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4 md:p-6 animate-pulse"
            >
              <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
              <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Completed Tours List Skeleton */}
        <div className="space-y-4 md:space-y-6">
          {[...Array(3)].map((_, tourIndex) => (
            <div
              key={tourIndex}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
            >
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                      <div className="h-5 bg-gradient-to-r from-emerald-700 to-emerald-800/50 rounded-full w-20 animate-pulse"></div>
                    </div>
                    <div className="space-y-2 mb-3 md:mb-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-36 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Expanded Details Skeleton (shown for first item) */}
              {tourIndex === 0 && (
                <div className="p-4 md:p-6 space-y-4 md:space-y-6 border-t border-teal-500/20">
                  {/* Package & Payment Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-4 md:p-5">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                        <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex justify-between py-1">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-4 md:p-5">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                        <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex justify-between py-1">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Participants Section Skeleton */}
                  <div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-3 md:p-4"
                        >
                          <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 animate-pulse"></div>
                          <div className="space-y-2">
                            {[...Array(5)].map((_, j) => (
                              <div key={j} className="flex items-center">
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mr-2 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities Section Skeleton */}
                  <div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 rounded-lg border border-teal-500/20 p-3 md:p-4"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-2 mb-2">
                            <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
                            <div className="h-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded w-16 animate-pulse"></div>
                          </div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full mb-2 animate-pulse"></div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            {[...Array(4)].map((_, j) => (
                              <div
                                key={j}
                                className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payments Section Skeleton */}
                  <div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-3 md:p-4"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-2 mb-2">
                            <div className="space-y-1">
                              <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="h-4 bg-gradient-to-r from-purple-600 to-teal-600 rounded w-20 animate-pulse"></div>
                              <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Section Skeleton */}
                  <div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-gradient-to-br from-amber-900/30 to-teal-900/20 border border-teal-500/20 rounded-lg p-3 md:p-4"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                            <div className="text-left">
                              <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-1 animate-pulse"></div>
                              <div className="h-2 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCompletedToursLoading;
