import React from "react";

const UserProfileUpcomingToursLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading upcoming tours...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-2 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 animate-pulse"></div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex space-x-1 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-1 max-w-md border border-teal-500/20">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Statistics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4 animate-pulse"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Tours List Skeleton */}
        <div className="space-y-6">
          {[...Array(2)].map((_, tourIndex) => (
            <div
              key={tourIndex}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 overflow-hidden animate-pulse"
            >
              {/* Tour Header */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                      <div className="h-5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full w-16 animate-pulse"></div>
                      <div className="h-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full w-20 animate-pulse"></div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-28 animate-pulse"></div>
                    <div className="h-9 w-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Payment Progress Bar Skeleton */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-28 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="w-full bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-full h-2.5">
                    <div className="h-2.5 bg-gradient-to-r from-sky-600 to-teal-600 rounded-full w-3/4"></div>
                  </div>
                  <div className="mt-2 h-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded w-48 animate-pulse"></div>
                </div>
              </div>

              {/* Expanded Details Skeleton (shown for first item) */}
              {tourIndex === 0 && (
                <div className="border-t border-teal-500/20">
                  <div className="p-6 space-y-8">
                    {/* Package & Payment Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg p-5 border border-teal-500/20">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
                          <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center"
                            >
                              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                              <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg p-5 border border-teal-500/20">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
                          <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center p-3 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20"
                            >
                              <div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-1 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                              </div>
                              <div className="text-right">
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mb-1 animate-pulse"></div>
                                <div className="h-4 bg-gradient-to-r from-amber-600 to-teal-600 rounded w-16 animate-pulse"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Participants Section */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-1 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                              </div>
                              <div className="h-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded w-16 animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                              {[...Array(4)].map((_, j) => (
                                <div
                                  key={j}
                                  className="flex items-center justify-between"
                                >
                                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                                  <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activities Section */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-4"
                          >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-1 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full mb-2 animate-pulse"></div>
                                <div className="flex flex-wrap gap-3">
                                  {[...Array(4)].map((_, j) => (
                                    <div
                                      key={j}
                                      className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"
                                    ></div>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 mb-2 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-gradient-to-br from-gray-800/50 to-teal-900/20 border border-teal-500/20 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                              <div>
                                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-1 animate-pulse"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                              </div>
                            </div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions Skeleton */}
        <div className="mt-10 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-6">
          <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center space-x-3 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg p-4 border border-teal-500/20 animate-pulse"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileUpcomingToursLoading;
