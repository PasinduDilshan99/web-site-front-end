import React from "react";

const UserProfileBrowserHistoryLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading browsing history...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 animate-pulse"></div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4"
              >
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section Skeleton */}
        <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 animate-pulse"></div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 animate-pulse"></div>
                <div className="flex bg-gradient-to-br from-gray-800 to-teal-900/50 rounded-lg p-1">
                  <div className="w-12 h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-md mx-1"></div>
                  <div className="w-12 h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-md mx-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary Skeleton */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 animate-pulse"></div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-16 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* History List View Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 overflow-hidden">
          <div className="divide-y divide-teal-500/20">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-5 bg-gradient-to-r from-sky-800 to-sky-900/50 rounded-lg"></div>
                          <div className="w-14 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-lg"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>

          <div className="flex items-center space-x-2">
            <div className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"></div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>

            <div className="h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"></div>
          </div>

          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
        </div>

        {/* Info Footer Skeleton */}
        <div className="mt-8 pt-6 border-t border-teal-500/20">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBrowserHistoryLoading;
