import React from "react";

const UserProfileToursLoading = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading your tours...</span>
          </div>
        </div>

        {/* Header Loading */}
        <div className="mb-6 sm:mb-8">
          <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 sm:w-64 mb-4 animate-pulse"></div>
          <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-80 animate-pulse"></div>
        </div>

        {/* Tour Categories Loading */}
        <div className="mb-8 sm:mb-12">
          <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 sm:w-48 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl border border-teal-500/20 p-4 sm:p-6 animate-pulse"
              >
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl sm:rounded-2xl animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                  <div className="w-8 h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs Loading */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 animate-pulse"></div>
            </div>

            {/* Filter Buttons Loading */}
            <div className="flex flex-wrap items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 sm:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-16 sm:w-20 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tours Grid Loading */}
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 p-4 sm:p-5 animate-pulse"
            >
              <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="mb-4 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 pr-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"
                            ></div>
                          ))}
                        </div>
                        <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                        <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                      </div>

                      {/* Additional Info Badges */}
                      <div className="flex gap-2 mt-2">
                        <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-16 animate-pulse"></div>
                        <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Location and Tour Type Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-24 animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-28 animate-pulse"></div>
                  </div>

                  {/* Images Loading */}
                  <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg border border-teal-500/20 animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-teal-500/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-8 animate-pulse"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Loading */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="h-10 sm:h-11 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-32 mx-auto animate-pulse"></div>
        </div>

        {/* Quick Stats Loading */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl border border-teal-500/20 p-6 sm:p-8">
          <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-4"
              >
                <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileToursLoading;
