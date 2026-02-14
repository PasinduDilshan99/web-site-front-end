import React from 'react'

const UserProfileNotificationLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading notification settings...</span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Notification Settings Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden">
              {/* Settings Header */}
              <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                  <div>
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-56 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Notification Toggles Skeleton */}
              <div className="divide-y divide-teal-500/20">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="p-4 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                          </div>
                          <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 mt-2 animate-pulse"></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 md:space-x-3">
                        {/* Toggle Switch Skeleton */}
                        <div className="h-4 w-8 md:h-6 md:w-11 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Enable All Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gradient-to-r from-sky-700 to-sky-800/50 rounded-lg w-full animate-pulse"></div>
            </div>

            {/* Disable All Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-lg w-full animate-pulse"></div>
            </div>

            {/* Information Section Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full mt-1 mr-2 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Summary Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-2xl border border-teal-500/20 p-6">
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                  </div>
                ))}
                <div className="pt-3 border-t border-teal-500/20">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default UserProfileNotificationLoading