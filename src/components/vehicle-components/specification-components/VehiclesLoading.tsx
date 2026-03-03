import React from "react";

interface VehiclesLoadingProps {
  itemsPerPage?: number;
}

const VehiclesLoading: React.FC<VehiclesLoadingProps> = ({ itemsPerPage = 12 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="w-48 sm:w-56 lg:w-64 h-8 sm:h-10 lg:h-12 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="w-64 sm:w-80 lg:w-96 h-4 sm:h-5 lg:h-6 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Filter Section Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-32 sm:w-36 lg:w-40 h-6 sm:h-7 lg:h-8 bg-teal-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none w-full sm:w-20 h-9 sm:h-10 bg-teal-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 sm:flex-none w-full sm:w-20 h-9 sm:h-10 bg-cyan-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 sm:h-11 lg:h-12 bg-teal-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-32 sm:w-40 lg:w-48 h-6 sm:h-7 lg:h-8 bg-teal-200 rounded-lg animate-pulse"></div>
          <div className="w-full sm:w-48 h-9 sm:h-10 bg-cyan-100 rounded-lg animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-teal-200"
            >
              <div className="h-40 sm:h-44 lg:h-48 bg-gradient-to-r from-teal-200 to-cyan-200 animate-pulse"></div>
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="h-5 sm:h-6 bg-teal-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 sm:h-4 bg-teal-100 rounded animate-pulse w-1/2"></div>
                <div className="flex justify-between items-center mt-2 sm:mt-3">
                  <div className="h-6 sm:h-7 lg:h-8 bg-cyan-200 rounded animate-pulse w-16 sm:w-20"></div>
                  <div className="h-6 sm:h-7 lg:h-8 bg-teal-200 rounded animate-pulse w-20 sm:w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8">
          <div className="w-48 h-4 sm:h-5 bg-teal-200 rounded animate-pulse"></div>
          <div className="flex gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-teal-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesLoading;