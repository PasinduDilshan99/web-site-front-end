import React from "react";

const UserDetailsLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading profile information...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6 md:p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5"
                  >
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6 md:p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5"
                  >
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6 md:p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
                {/* Complete Address */}
                <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
                </div>

                {/* City, District, Province, Country */}
                <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-5 md:gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5"
                    >
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-14 mb-3 animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Postal Code & Verified Status */}
                <div className="sm:col-span-2 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-3 animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-3 animate-pulse"></div>
                      <div className="h-6 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full w-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Identification & Stats */}
          <div className="space-y-6 lg:space-y-8">
            {/* Identification Cards */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
              </div>

              <div className="space-y-5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-5"
                  >
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Stats */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
              </div>

              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20">
                  <div className="h-8 w-16 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 mx-auto animate-pulse"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 border border-teal-500/20"
                    >
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mb-2 animate-pulse"></div>
                      <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div className="h-6 md:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 border border-teal-500/20"
                  >
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 mb-2 animate-pulse"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
                <div className="col-span-2">
                  <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsLoading;
