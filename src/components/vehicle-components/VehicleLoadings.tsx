"use client";
import React from "react";

interface VehicleLoadingProps {
  itemsPerPage: number;
}

const VehicleLoading: React.FC<VehicleLoadingProps> = ({ itemsPerPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-3 sm:px-4 py-8">
        {/* Header Skeleton */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="text-center">
            <div className="h-10 w-64 bg-teal-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-teal-100 rounded-lg mx-auto max-w-full animate-pulse"></div>
          </div>
        </div>

        {/* Filter Section Skeleton */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-4 md:p-6 mb-8 border-2 border-teal-200 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="h-8 w-40 bg-teal-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-16 bg-teal-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-teal-100 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section Skeleton */}
        <div id="results-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="h-8 w-48 bg-teal-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-teal-100 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Vehicle List Sidebar Skeleton */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="h-6 w-32 bg-teal-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(itemsPerPage)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border-2 border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-teal-100 rounded-lg animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 w-24 bg-teal-200 rounded mb-2 animate-pulse"></div>
                          <div className="h-3 w-20 bg-teal-100 rounded mb-2 animate-pulse"></div>
                          <div className="h-5 w-16 bg-teal-100 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Details Skeleton */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="h-8 w-64 bg-teal-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-48 bg-teal-100 rounded mb-4 animate-pulse"></div>
                <div className="flex gap-2 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-teal-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-teal-100 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-teal-100 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-teal-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLoading;