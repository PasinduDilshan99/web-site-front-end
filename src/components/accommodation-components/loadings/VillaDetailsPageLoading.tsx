// components/villa/VillaDetailsPageLoading.tsx
import React from 'react';

const VillaDetailsPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F3EF] via-[#F0F9F5] to-[#D9ECE5] relative overflow-hidden">
      {/* Nature-Inspired Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#1B4D3E]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#428577]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#1B4D3E]/3 to-[#428577]/3 rounded-full blur-3xl"></div>

      {/* Leaf Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="villa-detail-leaf-loading"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 10 Q40 10 45 20 Q50 30 40 40 Q30 50 20 40 Q10 30 20 20 Q25 10 30 10"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
              <circle cx="30" cy="25" r="2" fill="#1B4D3E" opacity="0.2" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#villa-detail-leaf-loading)"
          />
        </svg>
      </div>

      {/* Simple loading header */}
      <div className="flex justify-center pt-24 pb-4 relative z-10">
        <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#1B4D3E]/30 shadow-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1B4D3E]"></div>
          <span className="text-[#1B4D3E] text-sm font-medium">Loading private luxury villa...</span>
        </div>
      </div>

      {/* Decorative Header Line */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <div className="h-4 w-20 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
          <span className="text-[#428577]/30">›</span>
          <div className="h-4 w-32 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
        </div>

        {/* Villa Header Skeleton - matches VillaHeader component */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B4D3E]/5 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#428577]/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl">
                  <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div className="h-8 lg:h-10 w-64 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#428577]/20 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-5 w-32 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-[#1B4D3E]/20 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#1B4D3E]/40 to-[#428577]/40 rounded-2xl p-6 min-w-[220px] relative overflow-hidden">
              <div className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full"></div>
              <div className="text-center relative z-10 space-y-1">
                <div className="h-6 w-32 bg-white/30 rounded mx-auto animate-pulse"></div>
                <div className="h-4 w-24 bg-white/20 rounded mx-auto animate-pulse"></div>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                  <div className="h-3 w-20 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Skeleton - matches VillaGallery component */}
        <div className="mt-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#1B4D3E]/10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index}
                  className={`relative aspect-video bg-gradient-to-br from-[#1B4D3E]/20 to-[#428577]/20 animate-pulse ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  {index === 4 && (
                    <div className="absolute inset-0 bg-[#1B4D3E]/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="h-6 w-16 bg-white/30 rounded animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Section Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl">
                  <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-40 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Villa Information */}
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-[#1B4D3E]/30 rounded mb-4 animate-pulse"></div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl">
                      <div className="p-2 bg-[#1B4D3E]/10 rounded-lg">
                        <div className="w-6 h-6 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Premium Amenities */}
                <div>
                  <div className="h-6 w-36 bg-[#1B4D3E]/30 rounded mb-4 animate-pulse"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#1B4D3E]/10">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-full"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-20 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Villa Description */}
              <div className="pt-8 border-t border-[#1B4D3E]/10">
                <div className="h-6 w-32 bg-[#1B4D3E]/30 rounded mb-4 animate-pulse"></div>
                <div className="bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-2xl p-6">
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="text-center p-3 bg-white/50 rounded-xl">
                        <div className="h-6 w-12 bg-[#1B4D3E]/30 rounded mx-auto mb-1 animate-pulse"></div>
                        <div className="h-3 w-16 bg-[#2E6B5C]/20 rounded mx-auto animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Section Skeleton - matches VillaRooms component */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#1B4D3E]/30 to-[#428577]/30 rounded-full"></div>
                <div className="h-8 w-32 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
              </div>
              
              <div className="space-y-8">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border border-[#1B4D3E]/10 rounded-2xl p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-2/5">
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-[#1B4D3E]/20 to-[#428577]/20 animate-pulse"></div>
                          <div className="absolute top-4 left-4">
                            <div className="h-6 w-32 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <div className="w-10 h-10 bg-white/30 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                          <div className="space-y-2">
                            <div className="h-6 w-40 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                            <div className="h-4 w-64 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                          </div>
                          
                          <div className="mt-4 lg:mt-0 text-right space-y-1">
                            <div className="h-8 w-24 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-16 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                              <div className="w-5 h-5 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                              <div className="space-y-1">
                                <div className="h-4 w-8 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                                <div className="h-3 w-12 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-8 w-20 bg-[#E8F3EF] rounded-full animate-pulse"></div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 h-12 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl animate-pulse"></div>
                          <div className="h-12 w-28 border-2 border-[#1B4D3E]/20 rounded-xl animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Section Skeleton - matches VillaPackages component */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#2E6B5C]/30 to-[#428577]/30 rounded-full"></div>
                  <div className="h-8 w-40 bg-[#2E6B5C]/30 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#428577]/20 rounded animate-pulse"></div>
                  <div className="h-5 w-32 bg-[#428577]/20 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border border-[#1B4D3E]/10 rounded-2xl overflow-hidden">
                    {/* Package Header */}
                    <div className="bg-gradient-to-r from-[#1B4D3E]/40 to-[#428577]/40 p-6 relative overflow-hidden">
                      <div className="space-y-2">
                        <div className="h-6 w-40 bg-white/30 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                      </div>
                      <div className="absolute top-6 right-6">
                        <div className="h-6 w-20 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="h-8 w-20 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                          <div className="h-3 w-16 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#428577]/20 rounded animate-pulse"></div>
                            <div className="h-5 w-16 bg-[#428577]/20 rounded animate-pulse"></div>
                          </div>
                          <div className="h-3 w-20 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="h-16 bg-[#E8F3EF] rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-[#428577]/20 rounded animate-pulse"></div>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex items-center gap-3 p-2">
                            <div className="w-5 h-5 bg-[#428577]/20 rounded animate-pulse"></div>
                            <div className="h-4 w-40 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-1 h-12 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-24 border-2 border-[#1B4D3E]/20 rounded-xl animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section Skeleton - matches VillaReviews component */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#1B4D3E]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#428577]/30 to-[#1B4D3E]/30 rounded-full"></div>
                <div className="h-8 w-36 bg-[#428577]/30 rounded animate-pulse"></div>
              </div>
              
              {/* Statistics Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center p-6 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-2xl border border-[#1B4D3E]/10">
                    <div className="h-6 w-12 bg-[#1B4D3E]/30 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 w-16 bg-[#2E6B5C]/20 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-4 h-4 bg-[#428577]/20 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Reviews List */}
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border border-[#1B4D3E]/10 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-5 h-5 bg-[#428577]/20 rounded animate-pulse"></div>
                          ))}
                        </div>
                        <div className="h-4 w-8 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <div className="h-5 w-40 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                      <div className="h-3 w-full bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                      <div className="h-3 w-5/6 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-10 bg-[#E8F3EF] rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-[#1B4D3E]/10">
                      <div className="h-3 w-24 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-[#428577]/20 rounded animate-pulse"></div>
                        <div className="h-3 w-16 bg-[#428577]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Section Skeleton - matches VillaLocation component */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#1B4D3E]/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#1B4D3E]/30 to-[#2E6B5C]/30 rounded-full"></div>
                  <div className="h-6 w-24 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                </div>
                
                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#1B4D3E]/10">
                      <div className="w-5 h-5 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-20 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                      <div className="h-3 w-full bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                      <div className="h-2 w-32 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="h-10 w-full bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-xl animate-pulse"></div>
                </div>
                
                {/* Coordinates */}
                <div className="mb-6">
                  <div className="h-4 w-20 bg-[#1B4D3E]/30 rounded mb-2 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="rounded-lg p-3 bg-[#1B4D3E]/5">
                        <div className="h-3 w-16 bg-[#1B4D3E]/20 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 w-20 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Transportation */}
                <div className="mb-6">
                  <div className="h-4 w-24 bg-[#1B4D3E]/30 rounded mb-2 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#1B4D3E]/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <div className="w-4 h-4 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                          </div>
                          <div className="h-4 w-24 bg-[#2E6B5C]/30 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-4 w-16 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                          <div className="h-3 w-12 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Map Skeleton */}
                <div className="mb-6">
                  <div className="h-4 w-24 bg-[#1B4D3E]/30 rounded mb-2 animate-pulse"></div>
                  <div className="rounded-xl overflow-hidden border border-[#1B4D3E]/20">
                    <div className="h-[400px] w-full bg-gradient-to-br from-[#1B4D3E]/10 to-[#428577]/10 relative">
                      {/* Grid lines simulation */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="border border-[#1B4D3E]/5"></div>
                        ))}
                      </div>
                      {/* Map pin placeholder */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#1B4D3E] to-[#428577] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-[#1B4D3E]/20 bg-[#1B4D3E]/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                          <div className="h-4 w-32 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-24 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location Highlights */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="text-center p-4 rounded-xl border border-[#1B4D3E]/20">
                      <div className="w-6 h-6 bg-[#1B4D3E]/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-3 w-20 bg-[#1B4D3E]/20 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Summary Skeleton - matches VillaAmenities component */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#1B4D3E]/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#428577]/30 to-[#1B4D3E]/30 rounded-full"></div>
                  <div className="h-6 w-32 bg-[#428577]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-6">
                  {/* Amenities Grid */}
                  <div>
                    <div className="grid grid-cols-1 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl border border-[#1B4D3E]/10">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-[#1B4D3E]/20 to-[#428577]/20 rounded-xl">
                              <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-24 bg-[#1B4D3E]/30 rounded animate-pulse"></div>
                              <div className="h-3 w-32 bg-[#2E6B5C]/20 rounded animate-pulse"></div>
                              <div className="h-3 w-16 bg-[#428577]/20 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Summary Card */}
                  <div className="p-6 bg-gradient-to-r from-[#1B4D3E]/30 to-[#428577]/30 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                    
                    <div className="text-center relative z-10 space-y-2">
                      <div className="h-5 w-40 bg-white/30 rounded mx-auto animate-pulse"></div>
                      <div className="h-3 w-64 bg-white/20 rounded mx-auto animate-pulse"></div>
                      <div className="flex justify-center gap-4 mt-2">
                        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Card Skeleton */}
            <div className="bg-gradient-to-br from-[#1B4D3E]/40 to-[#428577]/40 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="h-6 w-40 bg-white/30 rounded mb-2 animate-pulse"></div>
                <div className="space-y-1 mb-4">
                  <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-white/30 rounded-xl animate-pulse"></div>
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-1">
                    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="h-3 w-40 bg-white/20 rounded animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note Skeleton */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#1B4D3E]/10">
            <div className="w-2 h-2 bg-[#1B4D3E]/30 rounded-full animate-pulse"></div>
            <div className="h-3 w-48 bg-[#1B4D3E]/20 rounded animate-pulse"></div>
            <div className="w-2 h-2 bg-[#428577]/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetailsPageLoading;