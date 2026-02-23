import React from 'react'

const HostelPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] via-white to-[#FAFFFD] relative overflow-hidden">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#B5E5D4]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DDF9F2]/30 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Bubbles Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hostel-bubbles-loading"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="3" fill="#B5E5D4" />
              <circle cx="30" cy="20" r="4" fill="#C9EFE3" />
              <circle cx="20" cy="30" r="2" fill="#DDF9F2" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#hostel-bubbles-loading)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Simple loading header */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#B5E5D4] shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3A9B9B]"></div>
              <span className="text-[#2D4F43] text-sm font-medium">Finding fresh hostel spaces...</span>
            </div>
          </div>

          {/* Page Header Skeleton - Fresh & Social Styling */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] rounded-full"></div>

            <div className="pt-8 space-y-4">
              <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-[#3A9B9B]/20 to-[#5FB3B3]/20 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto animate-pulse"></div>
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="h-5 md:h-6 bg-[#B5E5D4]/30 rounded w-full animate-pulse"></div>
                <div className="h-5 md:h-6 bg-[#C9EFE3]/30 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Social Trust Indicators Skeleton */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-[#B5E5D4]/50">
                  <div className="w-2 h-2 bg-[#B5E5D4]/50 rounded-full animate-pulse"></div>
                  <div className="h-4 w-20 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#B5E5D4] shadow-lg relative overflow-hidden">
            {/* Fresh Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5E5D4]/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DDF9F2]/30 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
              <div className="relative">
                <div className="h-8 w-48 bg-gradient-to-r from-[#3A9B9B]/20 to-[#5FB3B3]/20 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-[#B5E5D4]/30 rounded mt-2 animate-pulse"></div>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] rounded-full"></div>
              </div>
              
              <div className="h-10 w-28 bg-[#F5FDFA] border-2 border-[#B5E5D4] rounded-xl animate-pulse"></div>
            </div>

            {/* Basic Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#B5E5D4]/50 rounded-full"></div>
                    <div className="h-4 w-24 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-12 bg-[#F5FDFA] border border-[#B5E5D4] rounded-xl animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Advanced Filters Toggle Skeleton */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#B5E5D4]/30"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#B5E5D4] rounded-full">
                  <div className="w-4 h-4 bg-[#B5E5D4]/50 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count Skeleton */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-[#F5FDFA] border border-[#B5E5D4] rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Hostels Grid Skeleton */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <DetailedHostelCardSkeleton key={index} delay={index * 80} />
            ))}
          </div>

          {/* Budget-Friendly Note Skeleton */}
          <div className="text-center mt-10 pt-6 border-t border-[#B5E5D4]/30">
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-4 bg-[#B5E5D4]/50 rounded animate-pulse"></div>
              <div className="h-3 w-64 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
              <div className="h-3 w-4 bg-[#B5E5D4]/50 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// DetailedHostelCard Skeleton Component
const DetailedHostelCardSkeleton = ({ delay = 0 }) => {
  return (
    <div 
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hostel Header Skeleton */}
      <div className="bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 p-4 relative overflow-hidden">
        {/* Adventure Pattern Placeholder */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-2 text-2xl opacity-30">⛰️</div>
          <div className="absolute bottom-2 left-2 text-2xl opacity-30">🌲</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-5 w-16 bg-white/60 rounded-full"></div>
                <div className="h-5 w-20 bg-white/60 rounded-full"></div>
              </div>
              <div className="h-6 w-3/4 bg-white/60 rounded mb-2"></div>
              <div className="space-y-1 mb-2">
                <div className="h-3 w-full bg-white/40 rounded"></div>
                <div className="h-3 w-5/6 bg-white/40 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 bg-white/60 rounded-full"></div>
                <div className="h-3 w-12 bg-white/40 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Images Gallery Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#B5E5D4]/50 rounded-full"></div>
              <div className="h-4 w-24 bg-[#B5E5D4]/30 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-[#B5E5D4]/30 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-[#B5E5D4]/20 to-[#DDF9F2]/20 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-4 w-8 bg-[#B5E5D4]/30 rounded mx-auto mb-1"></div>
              <div className="h-3 w-12 bg-[#B5E5D4]/20 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Location & Contact Skeleton */}
        <div className="p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
          <div className="grid grid-cols-2 gap-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-3 h-3 bg-[#B5E5D4]/40 rounded mr-2"></div>
                <div className="h-3 w-20 bg-[#B5E5D4]/30 rounded"></div>
              </div>
            ))}
            <div className="col-span-2 flex items-center bg-white p-2 rounded-lg">
              <div className="w-3 h-3 bg-[#B5E5D4]/40 rounded mr-2"></div>
              <div className="h-3 w-32 bg-[#B5E5D4]/30 rounded"></div>
            </div>
          </div>
        </div>

        {/* Room Options Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#B5E5D4]/50 rounded-full"></div>
              <div className="h-4 w-24 bg-[#B5E5D4]/30 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-[#B5E5D4]/30 rounded"></div>
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#B5E5D4]/40 rounded mr-2"></div>
                    <div className="h-4 w-24 bg-[#B5E5D4]/30 rounded"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-3 w-16 bg-[#B5E5D4]/20 rounded"></div>
                    <div className="h-3 w-16 bg-[#B5E5D4]/20 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-12 bg-[#B5E5D4]/30 rounded mb-1"></div>
                  <div className="h-6 w-16 bg-[#B5E5D4]/40 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Meals Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#C9EFE3]/50 rounded-full"></div>
            <div className="h-4 w-20 bg-[#C9EFE3]/30 rounded"></div>
          </div>
          <div className="space-y-1">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-[#FAFFFD] rounded-lg border border-[#DDF9F2]">
                <div className="space-y-1">
                  <div className="h-3 w-16 bg-[#DDF9F2]/40 rounded"></div>
                  <div className="h-2 w-24 bg-[#DDF9F2]/30 rounded"></div>
                </div>
                <div className="h-5 w-12 bg-white border border-[#B5E5D4] rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hostel Vibes Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#DDF9F2]/50 rounded-full"></div>
            <div className="h-4 w-20 bg-[#DDF9F2]/30 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-16 bg-[#F5FDFA] border border-[#B5E5D4] rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white px-2 py-1 rounded-full border border-[#B5E5D4]">
                <div className="h-3 w-8 bg-[#B5E5D4]/30 rounded mr-1"></div>
                <div className="w-3 h-3 bg-[#B5E5D4]/30 rounded"></div>
              </div>
              <div className="h-3 w-20 bg-[#B5E5D4]/30 rounded"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-full bg-[#B5E5D4]/20 rounded"></div>
            <div className="h-2 w-5/6 bg-[#B5E5D4]/20 rounded"></div>
          </div>
        </div>

        {/* Cancellation Policy Skeleton */}
        <div className="p-3 bg-[#FAFFFD] rounded-xl border border-[#DDF9F2]">
          <div className="flex items-center mb-1">
            <div className="w-1.5 h-1.5 bg-[#C9EFE3]/50 rounded-full mr-2"></div>
            <div className="h-3 w-24 bg-[#C9EFE3]/30 rounded"></div>
          </div>
          <div className="h-2 w-full bg-[#C9EFE3]/20 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-[#C9EFE3]/20 rounded"></div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-2 pt-3 border-t border-[#B5E5D4]/30">
          <div className="flex-1 h-9 bg-gradient-to-r from-[#B5E5D4]/40 to-[#DDF9F2]/40 rounded-xl"></div>
          <div className="px-4 py-2 border-2 border-[#B5E5D4]/30 rounded-xl w-20"></div>
        </div>

        {/* Social Vibe Skeleton */}
        <div className="flex justify-center gap-1">
          <div className="h-2 w-2 bg-[#B5E5D4]/30 rounded-full"></div>
          <div className="h-3 w-40 bg-[#B5E5D4]/20 rounded"></div>
          <div className="h-2 w-2 bg-[#B5E5D4]/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HostelPageLoading