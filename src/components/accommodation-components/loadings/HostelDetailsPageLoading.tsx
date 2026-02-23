// components/hostel/HostelDetailsPageLoading.tsx
import React from 'react';

const HostelDetailsPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] via-[#FAFFFD] to-[#F0FAF5] relative overflow-hidden">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#B5E5D4]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DDF9F2]/30 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Bubbles Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hostel-detail-bubbles-loading"
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
            fill="url(#hostel-detail-bubbles-loading)"
          />
        </svg>
      </div>

      {/* Simple loading header */}
      <div className="flex justify-center pt-24 pb-4 relative z-10">
        <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#B5E5D4] shadow-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3A9B9B]"></div>
          <span className="text-[#2D4F43] text-sm font-medium">Loading fresh hostel details...</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-16 bg-[#B5E5D4]/50 rounded animate-pulse"></div>
          <span className="text-[#B5E5D4]">›</span>
          <div className="h-4 w-24 bg-[#C9EFE3]/50 rounded animate-pulse"></div>
        </div>

        {/* Hostel Header Skeleton - matches HostelHeader component */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-[#B5E5D4] relative overflow-hidden mb-6">
          {/* Decorative Bubbles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5E5D4]/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DDF9F2]/20 rounded-full -ml-8 -mb-8"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-6 w-32 bg-[#F5FDFA] border border-[#B5E5D4] rounded-full animate-pulse"></div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              <div className="h-8 lg:h-10 w-3/4 bg-[#2D4F43]/20 rounded-lg mb-2 animate-pulse"></div>
              
              <div className="flex flex-wrap gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] border border-[#B5E5D4] rounded-xl p-4 min-w-[200px] shadow-sm">
              <div className="text-center space-y-1">
                <div className="h-6 w-32 bg-[#2D4F43]/20 rounded mx-auto animate-pulse"></div>
                <div className="h-4 w-24 bg-[#5A8F7A]/20 rounded mx-auto animate-pulse"></div>
                <div className="h-3 w-20 bg-[#5A8F7A]/20 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Hostel Specific Features Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                <div className="w-6 h-6 bg-[#3A9B9B]/20 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-20 bg-[#2D4F43]/20 rounded mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section Skeleton - matches HostelOverview */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#B5E5D4]/50 rounded-full"></div>
                      <div className="h-6 w-32 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                          <div className="w-5 h-5 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-4 w-20 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#C9EFE3]/50 rounded-full"></div>
                      <div className="h-6 w-28 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                          <div className="w-2 h-2 bg-[#3A9B9B]/30 rounded-full"></div>
                          <div className="h-4 w-16 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hostel Specific Features Grid */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                      <div className="w-6 h-6 bg-[#3A9B9B]/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-[#2D4F43]/20 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#B5E5D4]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-[#DDF9F2]/50 rounded-full"></div>
                    <div className="h-6 w-24 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-[#F5FDFA] p-4 rounded-xl border border-[#B5E5D4] space-y-2">
                    <div className="h-4 w-full bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Section Skeleton - matches HostelRooms */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-full"></div>
                  <div className="h-8 w-40 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#B5E5D4] rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          <div className="w-full h-48 lg:h-full bg-gradient-to-br from-[#B5E5D4]/30 to-[#DDF9F2]/30 rounded-lg animate-pulse"></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="h-6 w-24 bg-[#F5FDFA] border border-[#B5E5D4] rounded-full animate-pulse"></div>
                                <div className="h-4 w-16 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                              </div>
                              <div className="h-6 w-40 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                              <div className="h-4 w-64 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                            </div>
                            
                            <div className="mt-4 lg:mt-0 text-right">
                              <div className="h-8 w-24 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                              <div className="h-3 w-16 bg-[#5A8F7A]/20 rounded mt-1 animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                                <div className="w-4 h-4 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                                <div className="h-4 w-16 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="h-6 w-20 bg-[#F5FDFA] border border-[#B5E5D4] rounded-full animate-pulse"></div>
                            ))}
                          </div>
                          
                          <div className="h-10 w-32 bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages Section Skeleton - matches HostelPackages */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#C9EFE3]/50 to-[#B5E5D4]/50 rounded-full"></div>
                  <div className="h-8 w-40 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="h-4 w-48 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border border-[#B5E5D4] rounded-xl overflow-hidden bg-white">
                      {/* Package Header */}
                      <div className="p-4 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] border-b border-[#B5E5D4]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="h-5 w-32 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                          <div className="h-5 w-16 bg-[#F5FDFA] border border-[#B5E5D4] rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="h-5 w-16 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                          <div className="h-5 w-16 bg-[#C9EFE3]/30 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Package Image */}
                      <div className="h-32 bg-gradient-to-br from-[#B5E5D4]/30 to-[#DDF9F2]/30 animate-pulse"></div>
                      
                      {/* Package Content */}
                      <div className="p-4">
                        <div className="h-8 w-24 bg-[#2D4F43]/20 rounded mb-3 animate-pulse"></div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-8 bg-[#F5FDFA] border border-[#B5E5D4] rounded-lg animate-pulse"></div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                              <div className="h-3 w-32 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="flex-1 h-8 bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-lg animate-pulse"></div>
                          <div className="w-16 h-8 border border-[#B5E5D4] rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section Skeleton - matches HostelReviews */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#DDF9F2]/50 to-[#C9EFE3]/50 rounded-full"></div>
                  <div className="h-8 w-36 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
                      <div className="h-6 w-16 bg-[#2D4F43]/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-[#5A8F7A]/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-3 h-3 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Recent Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                    <div className="h-5 w-32 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                  </div>
                  
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#B5E5D4] rounded-xl p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <div key={j} className="w-4 h-4 bg-[#B5E5D4]/30 rounded animate-pulse"></div>
                            ))}
                          </div>
                          <div className="h-4 w-12 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-20 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                      </div>
                      
                      <div className="h-5 w-40 bg-[#2D4F43]/20 rounded mb-2 animate-pulse"></div>
                      <div className="space-y-1 mb-3">
                        <div className="h-3 w-full bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                        <div className="h-3 w-5/6 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#B5E5D4]/50 rounded-full"></div>
                        <div className="h-3 w-32 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Section Skeleton - matches HostelLocation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#B5E5D4]/50">
              <div className="h-6 w-32 bg-gradient-to-r from-[#2C4A3E]/20 to-[#3D6657]/20 rounded mb-6 animate-pulse"></div>
              
              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#B5E5D4]/30">
                    <div className="w-6 h-6 bg-[#2C4A3E]/20 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-20 bg-gray-700/20 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-600/20 rounded animate-pulse"></div>
                    <div className="h-3 w-40 bg-gray-500/20 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="h-10 w-full bg-gradient-to-r from-[#B5E5D4]/50 to-[#DDF9F2]/50 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Coordinates */}
              <div className="mb-6">
                <div className="h-5 w-24 bg-gray-700/20 rounded mb-2 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="rounded-lg p-3 bg-[#B5E5D4]/20">
                      <div className="h-3 w-16 bg-gray-600/20 rounded mb-1 animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-700/20 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Transportation */}
              <div className="mb-6">
                <div className="h-5 w-24 bg-gray-700/20 rounded mb-2 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[#B5E5D4] bg-gradient-to-r from-[#B5E5D4]/10 to-[#DDF9F2]/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg">
                          <div className="w-5 h-5 bg-[#3D6657]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-24 bg-gray-700/20 rounded animate-pulse"></div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="h-4 w-16 bg-[#3D6657]/20 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-500/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Map Skeleton */}
              <div className="mb-6">
                <div className="h-5 w-24 bg-gray-700/20 rounded mb-2 animate-pulse"></div>
                <div className="rounded-xl overflow-hidden border border-[#B5E5D4] shadow-sm">
                  <div className="h-[400px] w-full bg-gradient-to-br from-[#B5E5D4]/10 to-[#DDF9F2]/10 relative">
                    {/* Grid lines simulation */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="border border-[#B5E5D4]/10"></div>
                      ))}
                    </div>
                    {/* Map pin placeholder */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#B5E5D4] to-[#DDF9F2] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-[#B5E5D4] bg-[#B5E5D4]/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#2C4A3E]/20 rounded mr-2 animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-600/20 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 w-24 bg-[#2C4A3E]/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Map Legend */}
                <div className="absolute transform translate-y-[-120px] ml-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-[#B5E5D4]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#B5E5D4]/50 rounded-full animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-600/20 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#C9EFE3]/50 rounded-full animate-pulse"></div>
                        <div className="h-3 w-16 bg-gray-600/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Highlights */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="text-center p-3 rounded-lg border border-[#B5E5D4] bg-gradient-to-r from-[#B5E5D4]/20 to-[#C9EFE3]/20">
                    <div className="w-5 h-5 bg-[#2C4A3E]/20 rounded mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-700/20 rounded mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Summary Skeleton - matches HostelAmenities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#B5E5D4] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                          <div className="w-5 h-5 bg-[#3A9B9B]/20 rounded animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-4 w-20 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-[#5A8F7A]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hostel Specific Features Summary */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-[#B5E5D4]/50 rounded-full"></div>
                      <div className="h-5 w-32 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#B5E5D4]">
                          <div className="w-2 h-2 bg-[#3A9B9B]/30 rounded-full"></div>
                          <div className="h-4 w-16 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Card Skeleton */}
            <div className="bg-gradient-to-br from-[#B5E5D4] to-[#DDF9F2] rounded-2xl shadow-md p-6 relative overflow-hidden border border-[#B5E5D4]">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="h-6 w-40 bg-[#2D4F43]/20 rounded mb-2 animate-pulse"></div>
                <div className="space-y-1 mb-4">
                  <div className="h-3 w-full bg-[#2D4F43]/20 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-[#2D4F43]/20 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-white/50 rounded-xl animate-pulse"></div>
                <div className="mt-3 text-center">
                  <div className="h-3 w-40 bg-[#2D4F43]/20 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note Skeleton */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#B5E5D4]">
            <div className="w-2 h-2 bg-[#B5E5D4]/50 rounded-full animate-pulse"></div>
            <div className="h-3 w-48 bg-[#2D4F43]/20 rounded animate-pulse"></div>
            <div className="w-2 h-2 bg-[#DDF9F2]/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsPageLoading;