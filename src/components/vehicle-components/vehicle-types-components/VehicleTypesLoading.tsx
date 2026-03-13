import React from "react";

interface VehicleTypesLoadingProps {
  itemsPerPage: number;
}

const VehicleTypesLoading: React.FC<VehicleTypesLoadingProps> = ({
  itemsPerPage,
}) => {
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="text-center">
          <div className="h-10 w-48 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 max-w-full bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Filter Section Skeleton */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-teal-200 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-32 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full animate-pulse"></div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="h-4 w-20 bg-gradient-to-r from-teal-200 to-cyan-200 rounded mb-2 animate-pulse"></div>
          <div className="h-12 w-full bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Results Section Skeleton */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-40 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-32 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-r from-teal-100 to-cyan-100 animate-pulse"></div>
              <div className="p-3 sm:p-4 md:p-6 space-y-3">
                <div className="h-6 w-3/4 bg-gradient-to-r from-teal-100 to-cyan-100 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gradient-to-r from-teal-50 to-cyan-50 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gradient-to-r from-teal-50 to-cyan-50 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded animate-pulse"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-10 w-1/2 bg-gradient-to-r from-teal-200 to-teal-300 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-1/2 bg-gradient-to-r from-cyan-200 to-cyan-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleTypesLoading;
