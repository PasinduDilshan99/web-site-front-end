import React from 'react'

const UserProfilePendingToursLoading = () => {
 return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading pending tours...</span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
          <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
        </div>

        {/* Statistics Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 p-3 md:p-4 text-center">
              <div className="h-5 md:h-6 lg:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Pending Tours List Skeleton */}
        <div className="space-y-4 md:space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 overflow-hidden">
              {/* Tour Header Skeleton */}
              <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                      <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
                      <div className="w-16 h-5 bg-gradient-to-r from-sky-800 to-sky-800/50 rounded-full"></div>
                      <div className="w-14 h-5 bg-gradient-to-r from-teal-800 to-teal-800/50 rounded-full"></div>
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    </div>

                    {/* Mobile Info Skeleton */}
                    <div className="space-y-2 md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12"></div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Info Skeleton */}
                    <div className="hidden md:flex flex-wrap gap-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Expanded Details Skeleton (shown for first item) */}
              {index === 0 && (
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Status and Action Bar Skeleton */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20">
                    <div className="space-y-2 sm:space-y-0 sm:space-x-4 flex flex-wrap">
                      {[...Array(3)].map((_, i) => (
                        <div key={i}>
                          <div className="h-2 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-1"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                    <div className="w-24 h-8 bg-gradient-to-r from-red-800 to-red-800/50 rounded-lg"></div>
                  </div>

                  {/* Tour Details Grid Skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Package Information Skeleton */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 border border-teal-500/20">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24"></div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex justify-between">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information Skeleton */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 border border-teal-500/20">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28"></div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex justify-between">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tour Information Skeleton */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 border border-teal-500/20">
                    <div className="flex items-center mb-3">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i}>
                          <div className="h-2 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 mb-1"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Skeleton */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <div className="h-9 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-lg w-32"></div>
                    <div className="h-9 bg-gradient-to-r from-red-800 to-red-800/50 rounded-lg w-28"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Price Disclaimer Skeleton */}
        <div className="mt-6 text-center">
          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};


export default UserProfilePendingToursLoading