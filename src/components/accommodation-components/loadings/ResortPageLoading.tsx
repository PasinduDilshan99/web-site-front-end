import React from 'react'

const ResortPageLoading = () => {
// app/resorts/page.tsx - Loading State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] via-white to-[#D9E9F0] relative overflow-hidden">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>
      
      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-wave-pattern-loading" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q25 10 50 20 T100 20 T150 20 T200 20" 
                stroke="#0A2F44" fill="none" strokeWidth="1"/>
              <path d="M0 30 Q25 20 50 30 T100 30 T150 30 T200 30" 
                stroke="#144A5E" fill="none" strokeWidth="1" opacity="0.5"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#page-wave-pattern-loading)"/>
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#0A2F44]/30 shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A2F44]"></div>
              <span className="text-[#0A2F44] text-sm font-medium">Curating ultra-luxury resorts...</span>
            </div>
          </div>

          {/* Page Header Skeleton */}
          <div className="text-center mb-16 relative">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full"></div>
            
            <div className="pt-8 space-y-4">
              <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto animate-pulse"></div>
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="h-5 md:h-6 bg-[#144A5E]/20 rounded w-full animate-pulse"></div>
                <div className="h-5 md:h-6 bg-[#144A5E]/20 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Ocean Depth Trust Indicators Skeleton */}
            <div className="flex justify-center gap-8 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0A2F44]/30 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <ResortFilterSectionSkeleton />

          {/* Results Count Skeleton */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Resorts Grid Skeleton */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <DetailedResortCardSkeleton key={index} delay={index * 80} />
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="text-center mt-12">
            <div className="inline-block h-12 w-48 border-2 border-[#0A2F44]/30 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ResortFilterSection Skeleton Component
const ResortFilterSectionSkeleton = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#0A2F44]/20 shadow-xl relative overflow-hidden">
      {/* Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A2F44]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1F5F72]/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      
      {/* Wave Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="filter-wave-pattern-loading" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q15 5 30 10 T60 10" stroke="#0A2F44" fill="none" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#filter-wave-pattern-loading)"/>
        </svg>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="relative">
          <div className="h-8 w-64 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-200 rounded mt-2 animate-pulse"></div>
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full"></div>
        </div>
        
        <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      {/* Basic Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#0A2F44]/30 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Advanced Filters Toggle Skeleton */}
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#0A2F44]/20"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#0A2F44]/30 rounded-full">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DetailedResortCard Skeleton Component
const DetailedResortCardSkeleton = ({ delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#0A2F44]/10 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Resort Header Skeleton */}
      <div className="bg-gradient-to-r from-[#0A2F44]/50 via-[#144A5E]/50 to-[#1F5F72]/50 p-5 relative overflow-hidden">
        {/* Wave Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="card-header-wave-loading" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 5 20 10 T40 10" stroke="white" fill="none" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#card-header-wave-loading)"/>
          </svg>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-16 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-5 w-20 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <div className="h-6 w-3/4 bg-white/20 rounded mb-2 animate-pulse"></div>
              <div className="space-y-1 mb-3">
                <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                <div className="h-3 w-5/6 bg-white/20 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-24 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Images Gallery Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#0A2F44]/30 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Luxury Features Quick View Skeleton */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-xl border border-[#0A2F44]/10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-5 w-8 bg-[#0A2F44]/30 rounded mx-auto mb-1 animate-pulse"></div>
              <div className="h-3 w-10 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Location & Contact Skeleton */}
        <div className="p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-[#0A2F44]/30 rounded mr-2 animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="col-span-2 flex items-center bg-white/50 p-2 rounded-lg">
              <div className="w-4 h-4 bg-[#0A2F44]/30 rounded mr-2 animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Luxury Accommodations Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#144A5E]/30 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-start p-3 bg-white border border-[#0A2F44]/10 rounded-xl">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-5 w-16 bg-[#1F5F72]/30 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gradient-to-r from-[#0A2F44]/30 to-[#144A5E]/30 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fine Dining Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#1F5F72]/30 rounded-full"></div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gradient-to-r from-[#E6F0F5] to-white rounded-xl border border-[#0A2F44]/10">
                <div className="space-y-1">
                  <div className="h-4 w-20 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="text-right space-y-1">
                  <div className="h-4 w-16 bg-[#1F5F72]/30 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resort Facilities & Amenities Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full"></div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Guest Reviews Skeleton */}
        <div className="p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-xl border border-[#0A2F44]/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-[#0A2F44]/10">
                <div className="h-4 w-6 bg-[#0A2F44]/30 rounded mr-1 animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-300/30 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Cancellation Policy Skeleton */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center mb-2">
            <div className="w-1.5 h-1.5 bg-green-500/30 rounded-full mr-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-3 pt-4 border-t border-[#0A2F44]/10">
          <div className="flex-1 h-12 bg-gradient-to-r from-[#0A2F44]/30 via-[#144A5E]/30 to-[#1F5F72]/30 rounded-xl animate-pulse"></div>
          <div className="h-12 w-20 border-2 border-[#0A2F44]/20 rounded-xl animate-pulse"></div>
        </div>

        {/* Trust Badge Skeleton */}
        <div className="flex justify-end">
          <div className="flex items-center">
            <div className="w-1 h-1 bg-[#0A2F44]/30 rounded-full mr-1"></div>
            <div className="h-2 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1 h-1 bg-[#1F5F72]/30 rounded-full ml-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortPageLoading