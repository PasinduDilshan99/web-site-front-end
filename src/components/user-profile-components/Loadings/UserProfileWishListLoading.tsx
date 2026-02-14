import React from "react";

const UserProfileWishListLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading your wish list...
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

        {/* Category Tabs Skeleton */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-xl w-24 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Wish List Items Sections */}
        <div className="space-y-10 md:space-y-12">
          {/* Packages Section */}
          <div>
            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
                >
                  <div className="relative h-52 md:h-56 bg-gradient-to-br from-gray-700 to-teal-800/50">
                    {/* Wish Icon Button Placeholder */}
                    <div className="absolute top-3 left-3 w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    {/* Discount Badge Placeholder */}
                    <div className="absolute top-3 right-3 w-16 h-6 bg-gradient-to-r from-red-800 to-red-900/50 rounded-lg"></div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                      <div className="w-16 h-6 bg-gradient-to-r from-sky-800 to-sky-900/50 rounded-full"></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>

                    <div className="mb-4">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-sky-600 to-teal-600 rounded w-20 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between border-t border-teal-500/20 pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                      </div>
                      <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tours Section */}
          <div>
            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
                >
                  <div className="relative h-52 md:h-56 bg-gradient-to-br from-gray-700 to-teal-800/50">
                    <div className="absolute top-3 left-3 w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    <div className="absolute bottom-3 left-3 w-20 h-6 bg-gradient-to-r from-blue-800 to-sky-900/50 rounded-lg"></div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                      <div className="w-12 h-6 bg-gradient-to-r from-teal-800 to-teal-900/50 rounded-full"></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between border-t border-teal-500/20 pt-4">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                      <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations Section */}
          <div>
            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
                >
                  <div className="relative h-52 md:h-56 bg-gradient-to-br from-gray-700 to-teal-800/50">
                    <div className="absolute top-3 left-3 w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    <div className="absolute bottom-3 left-3 w-24 h-6 bg-gradient-to-r from-emerald-800 to-teal-900/50 rounded-lg"></div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
                      <div className="w-20 h-6 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-28 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between border-t border-teal-500/20 pt-4">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                      <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div>
            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
                >
                  <div className="relative h-52 md:h-56 bg-gradient-to-br from-gray-700 to-teal-800/50">
                    <div className="absolute top-3 left-3 w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    <div className="absolute bottom-3 left-3 w-32 h-6 bg-gradient-to-r from-purple-800 to-violet-900/50 rounded-lg"></div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                      <div className="w-16 h-6 bg-gradient-to-r from-purple-800 to-purple-900/50 rounded-full"></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between border-t border-teal-500/20 pt-4">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                      <div className="w-16 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="mt-12 md:mt-16 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6 md:p-8">
          <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-4 md:p-5"
              >
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-teal-500/20">
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileWishListLoading;
