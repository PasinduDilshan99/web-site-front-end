// components/seasons-components/SeasonsLoading.tsx
import React from 'react';

interface SeasonsLoadingProps {
  itemsPerPage: number;
}

const SeasonsLoading: React.FC<SeasonsLoadingProps> = ({ itemsPerPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
          <div className="h-8 w-48 bg-teal-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 bg-teal-200 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-6 w-64 bg-teal-200 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Filter Section Skeleton */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-teal-200 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="h-8 w-40 bg-teal-200 rounded-lg animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse" />
              <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-12 bg-teal-200 rounded-lg animate-pulse" />
            <div className="h-12 bg-teal-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="h-8 w-48 bg-teal-200 rounded-lg animate-pulse" />
          <div className="h-10 w-40 bg-teal-200 rounded-lg animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-teal-100"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gradient-to-r from-teal-200 to-cyan-200 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-teal-200 rounded-lg animate-pulse" />
                <div className="h-4 w-1/2 bg-teal-200 rounded-lg animate-pulse" />
                <div className="h-4 w-2/3 bg-teal-200 rounded-lg animate-pulse" />
                <div className="h-8 w-full bg-teal-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-teal-200">
          <div className="h-4 w-48 bg-teal-200 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-10 bg-teal-200 rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-24 bg-teal-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonsLoading;