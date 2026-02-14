import React from "react";

const UserProfileCouponsLoading = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading your coupons...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 md:w-56 lg:w-64 mb-3 animate-pulse"></div>
              <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 lg:w-80 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-28 animate-pulse"></div>
          </div>
        </div>

        {/* Statistics Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl border border-teal-500/20 p-4 sm:p-5 animate-pulse"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mx-auto mb-2 sm:mb-3"></div>
              <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-1 animate-pulse"></div>
              <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Coupons List Skeleton */}
        <div className="space-y-4 sm:space-y-6">
          {[...Array(3)].map((_, couponIndex) => (
            <div
              key={couponIndex}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl border border-teal-500/20 overflow-hidden animate-pulse"
            >
              {/* Coupon Header Skeleton */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-teal-900/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="h-5 sm:h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-20 h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full self-start"></div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-8 sm:h-9 md:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 flex-1 animate-pulse"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg flex-shrink-0"></div>
                  </div>
                  <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-cyan-600 to-teal-600 rounded w-20 animate-pulse"></div>
                </div>
              </div>

              {/* Coupon Details Skeleton */}
              <div className="p-4 sm:p-6">
                {/* Discount Limits */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 p-3 sm:p-4 rounded-lg border border-teal-500/20"
                    >
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-2 animate-pulse"></div>
                      <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Applicable Packages Skeleton */}
                <div className="mb-4 sm:mb-6">
                  <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 mb-3 animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-16 h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Validity & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20"
                    >
                      <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Skeleton */}
                <div className="mt-6 pt-6 border-t border-teal-500/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 h-10 sm:h-11 md:h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg"></div>
                    <div className="flex-1 h-10 sm:h-11 md:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Summary Skeleton */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl border border-teal-500/20 p-6 sm:p-8">
          <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-xl border border-teal-500/20 p-4 sm:p-5"
              >
                <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Action Button Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900/95 to-teal-950/95 backdrop-blur-sm border-t border-teal-500/20 p-4 shadow-2xl sm:hidden z-50">
          <div className="h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCouponsLoading;
