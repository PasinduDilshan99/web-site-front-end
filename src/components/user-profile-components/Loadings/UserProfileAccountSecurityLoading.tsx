import React from "react";

const UserProfileAccountSecurityLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading security settings...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Email Addresses Section Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-2 animate-pulse"></div>
                <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-56 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-teal-500/20">
            {/* Primary Email Skeleton */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                    <div className="w-14 h-5 bg-gradient-to-r from-sky-800 to-sky-900/50 rounded-full"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                    <div className="w-20 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 mt-2 animate-pulse"></div>
                </div>
                <div className="w-full md:w-24 h-9 bg-gradient-to-r from-sky-700 to-sky-800/50 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Secondary Email Skeleton */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    <div className="w-14 h-5 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-5 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full md:w-24 h-9 bg-gradient-to-r from-teal-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Numbers Section Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-2 animate-pulse"></div>
                <div className="h-3 md:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-56 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-teal-500/20">
            {/* Primary Mobile Skeleton */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                    <div className="w-14 h-5 bg-gradient-to-r from-sky-800 to-sky-900/50 rounded-full"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                    <div className="w-20 h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 mt-2 animate-pulse"></div>
                </div>
                <div className="w-full md:w-24 h-9 bg-gradient-to-r from-sky-700 to-sky-800/50 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Secondary Mobile Skeleton */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    <div className="w-14 h-5 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-5 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full md:w-24 h-9 bg-gradient-to-r from-teal-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips & Account Status Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Security Tips Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl md:rounded-2xl border border-teal-500/20 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded flex-shrink-0 mt-0.5 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Status Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl md:rounded-2xl border border-teal-500/20 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                <div className="w-16 h-6 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20"
                  >
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-8 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="w-full h-9 bg-gradient-to-r from-sky-800 to-teal-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAccountSecurityLoading;
