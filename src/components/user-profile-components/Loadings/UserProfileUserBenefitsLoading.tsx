import React from "react";

const UserProfileUserBenefitsLoading = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading benefits dashboard...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 lg:w-56 mb-3 animate-pulse"></div>
              <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 lg:w-72 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* User Stats Card Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-5 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-2xl animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 lg:w-40 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 lg:w-32 mb-2 animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-20 h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full"></div>
                  <div className="w-24 h-6 bg-gradient-to-r from-sky-800 to-sky-900/50 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto text-left lg:text-right">
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 lg:w-56 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 lg:w-28 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Progress Bar Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 p-5 lg:p-6 mb-6 lg:mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
            </div>
            <div className="text-right">
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-12 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full bg-gradient-to-br from-gray-800 to-teal-900/50 rounded-full h-3">
            <div className="w-3/4 h-3 bg-gradient-to-r from-sky-600 to-teal-600 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        {/* Membership Levels Skeleton */}
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 lg:w-40 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-5 animate-pulse"
              >
                <div className="text-center">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full mx-auto mb-3"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                  <div className="space-y-1 mb-3">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 mx-auto animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mx-auto animate-pulse"></div>
                  </div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-20 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Level Benefits Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden mb-8 lg:mb-10">
          <div className="p-5 lg:p-6 bg-gradient-to-br from-gray-800 to-teal-900/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse"></div>
                <div>
                  <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 lg:w-40 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 lg:w-56 animate-pulse"></div>
                </div>
              </div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl p-4 lg:p-5 border border-teal-500/20"
                >
                  <div className="flex items-start gap-3 lg:gap-4 mb-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded text-2xl"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                  </div>

                  <div className="h-5 lg:h-6 bg-gradient-to-r from-sky-600 to-teal-600 rounded w-16 mb-3 animate-pulse"></div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                    <div className="h-5 bg-gradient-to-r from-emerald-800 to-emerald-900/50 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Earn More Points Skeleton */}
        <div className="bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-2xl p-5 lg:p-6 mb-8 lg:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Comparison Table Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl border border-teal-500/20 overflow-hidden">
          <div className="bg-gradient-to-br from-gray-800 to-teal-900/50 p-5 lg:p-6 border-b border-teal-500/20">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 mt-1 animate-pulse"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-br from-gray-800 to-teal-900/50">
                  {[...Array(4)].map((_, i) => (
                    <th key={i} className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 mx-auto animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-500/20">
                {[...Array(3)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(4)].map((_, colIndex) => (
                      <td key={colIndex} className="px-4 lg:px-6 py-3 lg:py-4">
                        <div
                          className={`h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-${colIndex === 0 ? "24" : "12"} mx-auto animate-pulse`}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileUserBenefitsLoading;
