// components/resort/ResortDetailsPageLoading.tsx
import React from 'react';

const ResortDetailsPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] via-[#F0F7FA] to-[#D9E9F0] relative overflow-hidden">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="resort-detail-wave-loading"
              x="0"
              y="0"
              width="80"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 15 Q20 8 40 15 T80 15 T120 15"
                stroke="#0A2F44"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 25 Q20 18 40 25 T80 25 T120 25"
                stroke="#144A5E"
                fill="none"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#resort-detail-wave-loading)"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Simple loading header */}
        <div className="flex justify-center pt-24 pb-4">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#0A2F44]/30 shadow-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A2F44]"></div>
            <span className="text-[#0A2F44] text-sm font-medium">Loading ultra-luxury resort details...</span>
          </div>
        </div>

        {/* Resort Header Skeleton */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-[#0A2F44]/10 relative overflow-hidden">
          {/* Wave Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="header-wave-loading" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q15 5 30 10 T60 10" stroke="#0A2F44" fill="none" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#header-wave-loading)"/>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-40 bg-gradient-to-r from-[#0A2F44] to-[#144A5E] rounded-full animate-pulse"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-[#1F5F72]/30 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
                
                <div className="h-10 lg:h-12 w-3/4 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-lg mb-4 animate-pulse"></div>
                
                <div className="flex flex-wrap gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                      <div className="h-5 w-32 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#0A2F44]/50 via-[#144A5E]/50 to-[#1F5F72]/50 rounded-2xl p-6 min-w-[280px] shadow-xl relative overflow-hidden">
                <div className="absolute top-2 right-2 w-12 h-12 bg-white/5 rounded-full"></div>
                <div className="text-center relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-white/20 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-32 bg-white/20 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="h-4 w-24 bg-white/20 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-24 bg-[#0A2F44]/20 rounded animate-pulse"></div>
            <span className="text-[#1F5F72]/30">›</span>
            <div className="h-4 w-32 bg-[#0A2F44]/30 rounded animate-pulse"></div>
          </div>

          {/* Gallery Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#0A2F44]/10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index}
                  className={`relative aspect-square bg-gradient-to-br from-[#0A2F44]/20 to-[#1F5F72]/20 animate-pulse ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  {index === 4 && (
                    <div className="absolute inset-0 bg-[#0A2F44]/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="h-6 w-16 bg-white/30 rounded animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section Skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl">
                    <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-40 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-[#1F5F72]/30 rounded animate-pulse"></div>
                      <div className="h-6 w-40 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                          <div className="p-2 bg-[#0A2F44]/10 rounded-lg">
                            <div className="w-6 h-6 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-4 w-24 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-32 bg-[#144A5E]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-amber-600/30 rounded animate-pulse"></div>
                      <div className="h-6 w-36 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full"></div>
                          <div className="h-4 w-20 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-[#0A2F44]/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-[#1F5F72]/30 rounded animate-pulse"></div>
                    <div className="h-6 w-36 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-2xl p-6 border border-[#0A2F44]/10 space-y-2">
                    <div className="h-4 w-full bg-[#0A2F44]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Rooms Section Skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-48 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-40 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-8">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#0A2F44]/10 rounded-2xl p-6 bg-gradient-to-br from-white to-[#F0F7FA]">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/5">
                          <div className="relative group overflow-hidden rounded-xl">
                            <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-[#0A2F44]/20 to-[#1F5F72]/20 rounded-xl animate-pulse"></div>
                            <div className="absolute top-4 right-4 h-6 w-24 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded-lg">
                              <div className="h-6 w-16 bg-white/30 rounded animate-pulse mb-1"></div>
                              <div className="h-3 w-12 bg-white/30 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                            <div className="space-y-2">
                              <div className="h-6 w-48 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                              <div className="h-4 w-64 bg-[#144A5E]/20 rounded animate-pulse"></div>
                            </div>
                            
                            <div className="mt-4 lg:mt-0 text-right">
                              <div className="h-8 w-24 bg-[#1F5F72]/30 rounded animate-pulse mb-1"></div>
                              <div className="h-3 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
                              <div className="h-3 w-20 bg-amber-500/30 rounded animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                                <div className="w-5 h-5 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                                <div className="space-y-1">
                                  <div className="h-3 w-12 bg-[#144A5E]/20 rounded animate-pulse"></div>
                                  <div className="h-4 w-16 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mb-6">
                            <div className="h-5 w-24 bg-[#0A2F44]/30 rounded mb-3 animate-pulse"></div>
                            <div className="flex flex-wrap gap-2">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-8 w-20 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-full animate-pulse"></div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 h-12 bg-gradient-to-r from-[#0A2F44]/30 via-[#144A5E]/30 to-[#1F5F72]/30 rounded-xl animate-pulse"></div>
                            <div className="h-12 w-32 border-2 border-[#0A2F44]/20 rounded-xl animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packages Section Skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl">
                        <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                      </div>
                      <div className="h-8 w-48 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-64 bg-[#144A5E]/20 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-32 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#0A2F44]/10 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-[#F0F7FA]">
                      <div className="relative h-56 bg-gradient-to-br from-[#0A2F44]/20 to-[#1F5F72]/20 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F44]/70 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <div className="h-6 w-32 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="h-6 w-24 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 space-y-1">
                          <div className="h-6 w-40 bg-white/30 rounded animate-pulse"></div>
                          <div className="h-4 w-32 bg-white/30 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                              <div className="h-4 w-20 bg-[#144A5E]/30 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-[#1F5F72]/20 rounded animate-pulse"></div>
                              <div className="h-4 w-24 bg-[#144A5E]/20 rounded animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="h-8 w-20 bg-[#1F5F72]/30 rounded animate-pulse mb-1"></div>
                            <div className="h-3 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
                            <div className="h-3 w-20 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="mb-6 space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2">
                              <div className="w-5 h-5 bg-green-500/30 rounded animate-pulse"></div>
                              <div className="h-4 w-40 bg-[#144A5E]/20 rounded animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 h-12 bg-gradient-to-r from-[#0A2F44]/30 via-[#144A5E]/30 to-[#1F5F72]/30 rounded-xl animate-pulse"></div>
                          <div className="h-12 w-32 border-2 border-[#0A2F44]/20 rounded-xl animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section Skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-40 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-32 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full animate-pulse"></div>
                </div>
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center p-6 bg-gradient-to-br from-[#0A2F44]/30 to-[#144A5E]/30 rounded-2xl">
                      <div className="h-8 w-16 bg-white/30 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
                        ))}
                      </div>
                      <div className="h-4 w-20 bg-white/20 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
                
                {/* Review Cards */}
                <div className="space-y-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#0A2F44]/10 rounded-2xl p-6 bg-gradient-to-br from-white to-[#F0F7FA]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-4 w-24 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-20 bg-[#144A5E]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-5 h-5 bg-amber-500/30 rounded animate-pulse"></div>
                            ))}
                          </div>
                          <div className="h-5 w-8 bg-amber-600/30 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="h-5 w-40 bg-[#0A2F44]/30 rounded mb-3 animate-pulse"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 w-full bg-[#144A5E]/20 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-[#144A5E]/20 rounded animate-pulse"></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-32 bg-[#144A5E]/20 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-green-600/30 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Location Section Skeleton */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#0A2F44]/20">
                <div className="h-8 w-40 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded mb-6 animate-pulse"></div>
                
                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#0A2F44]/10">
                      <div className="w-6 h-6 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-5 w-20 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-[#144A5E]/20 rounded animate-pulse"></div>
                      <div className="h-3 w-40 bg-gray-400/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="h-12 w-full bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl animate-pulse"></div>
                </div>
                
                {/* Coordinates */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#0A2F44]/30 rounded mb-3 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="rounded-lg p-3 bg-[#0A2F44]/5">
                        <div className="h-3 w-16 bg-[#0A2F44]/20 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 w-20 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Transportation */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#0A2F44]/30 rounded mb-3 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#0A2F44]/40 bg-gradient-to-r from-[#0A2F44]/5 to-[#1F5F72]/5">
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded-lg">
                            <div className="w-5 h-5 bg-[#144A5E]/20 rounded animate-pulse"></div>
                          </div>
                          <div className="h-4 w-24 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-4 w-16 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                          <div className="h-3 w-12 bg-[#144A5E]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Map Skeleton */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#0A2F44]/30 rounded mb-3 animate-pulse"></div>
                  <div className="rounded-xl overflow-hidden border border-[#0A2F44]/40 shadow-md">
                    <div className="h-[400px] w-full bg-gradient-to-br from-[#0A2F44]/10 to-[#1F5F72]/10 relative">
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="border border-[#0A2F44]/10"></div>
                        ))}
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#0A2F44] to-[#1F5F72] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-[#0A2F44]/40 bg-[#0A2F44]/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#0A2F44]/20 rounded mr-2 animate-pulse"></div>
                          <div className="h-4 w-32 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-24 bg-[#0A2F44]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location Highlights */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="text-center p-4 text-white rounded-xl bg-gradient-to-r from-[#0A2F44]/50 to-[#144A5E]/50">
                      <div className="w-6 h-6 bg-white/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-white/20 rounded mx-auto mb-1 animate-pulse"></div>
                      <div className="h-3 w-16 bg-white/20 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Summary Skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-xl">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-40 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-32 bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-amber-500/30 rounded animate-pulse"></div>
                      <div className="h-6 w-36 bg-[#0A2F44]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-[#F0F7FA] rounded-2xl border border-[#0A2F44]/10">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-[#0A2F44]/30 to-[#1F5F72]/30">
                            <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                          </div>
                          <div className="flex-1">
                            <div className="h-5 w-24 bg-[#0A2F44]/30 rounded mb-1 animate-pulse"></div>
                            <div className="h-3 w-32 bg-[#144A5E]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-[#0A2F44]/50 to-[#1F5F72]/50 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="h-6 w-40 bg-white/30 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 w-64 bg-white/30 rounded mx-auto mb-4 animate-pulse"></div>
                    <div className="flex justify-center gap-4">
                      <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                      <div className="h-4 w-40 bg-white/30 rounded animate-pulse"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note Skeleton */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#0A2F44]/10">
              <div className="w-2 h-2 bg-[#0A2F44]/30 rounded-full animate-pulse"></div>
              <div className="h-3 w-48 bg-[#0A2F44]/20 rounded animate-pulse"></div>
              <div className="w-2 h-2 bg-[#1F5F72]/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortDetailsPageLoading;