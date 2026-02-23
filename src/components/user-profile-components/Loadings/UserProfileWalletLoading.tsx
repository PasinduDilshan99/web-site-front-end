import React from "react";

const UserProfileWalletLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading your wallet...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 md:w-36 lg:w-40 mb-2 animate-pulse"></div>
          <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 md:w-56 lg:w-64 animate-pulse"></div>
        </div>

        {/* Main Wallet Card Skeleton */}
        <div className="bg-gradient-to-br from-gray-800 to-teal-900/50 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 md:w-40 lg:w-48 mb-2 animate-pulse"></div>
              <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-36 animate-pulse"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
              </div>
              <div className="w-20 h-6 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-1 animate-pulse"></div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
            </div>
            <div className="text-4xl md:text-5xl text-gray-700">💳</div>
          </div>
        </div>

        {/* Wallet Details Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Account Information Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
              <div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-1 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-28 animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-teal-500/20 last:border-0"
                >
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Status Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
              <div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 mb-1 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-2 animate-pulse"></div>
                <div className="w-24 h-8 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-lg"></div>
              </div>

              <div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-2 animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
            <div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full mt-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div>
          <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-5 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note Skeleton */}
        <div className="mt-8 pt-6 border-t border-teal-500/20">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileWalletLoading;
