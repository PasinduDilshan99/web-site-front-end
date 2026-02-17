// components/hotel/HotelDetailsPageLoading.tsx
import React from 'react';

const HotelDetailsPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] relative overflow-hidden">
      {/* Decorative Elements - matching the actual page */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A6F97]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#54A5CC]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hotel-wave-pattern-loading"
              x="0"
              y="0"
              width="60"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q15 10 30 20 T60 20"
                stroke="#2A6F97"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q15 20 30 30 T60 30"
                stroke="#3F8AB2"
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
            fill="url(#hotel-wave-pattern-loading)"
          />
        </svg>
      </div>

      {/* Simple loading header */}
      <div className="flex justify-center pt-24 pb-4 relative z-10">
        <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2A6F97]/30 shadow-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2A6F97]"></div>
          <span className="text-[#2A6F97] text-sm font-medium">Loading luxury hotel details...</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-16 bg-[#2A6F97]/20 rounded animate-pulse"></div>
          <span className="text-[#2A6F97]/30">›</span>
          <div className="h-4 w-24 bg-[#2A6F97]/30 rounded animate-pulse"></div>
        </div>

        {/* Hotel Header Skeleton - matches HotelHeader component */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#2A6F97]/10 relative overflow-hidden mb-6">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A6F97]/5 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#54A5CC]/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-6 w-24 bg-[#2A6F97]/20 rounded-full animate-pulse"></div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              <div className="h-8 lg:h-10 w-3/4 bg-[#2A6F97]/30 rounded-lg mb-2 animate-pulse"></div>
              
              <div className="flex flex-wrap gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] border border-[#2A6F97]/20 rounded-xl p-4 min-w-[200px] shadow-md">
              <div className="text-center space-y-1">
                <div className="h-6 w-32 bg-[#2A6F97]/30 rounded mx-auto animate-pulse"></div>
                <div className="h-4 w-24 bg-[#3F8AB2]/20 rounded mx-auto animate-pulse"></div>
                <div className="h-3 w-20 bg-[#54A5CC]/20 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Skeleton - matches HotelGallery component */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#2A6F97]/10 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-1">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className={`relative aspect-video bg-gradient-to-br from-[#2A6F97]/20 to-[#54A5CC]/20 animate-pulse ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {index === 3 && (
                  <div className="absolute inset-0 bg-[#2A6F97]/40 backdrop-blur-sm flex items-center justify-center">
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#2A6F97]/30 rounded-full"></div>
                      <div className="h-6 w-32 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
                          <div className="w-5 h-5 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-4 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#54A5CC]/30 rounded-full"></div>
                      <div className="h-6 w-28 bg-[#54A5CC]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                          <div className="w-2 h-2 bg-[#2A6F97]/30 rounded-full"></div>
                          <div className="h-4 w-16 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#2A6F97]/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-[#3F8AB2]/30 rounded-full"></div>
                    <div className="h-6 w-24 bg-[#3F8AB2]/30 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-[#F0F7FF] p-4 rounded-xl border border-[#2A6F97]/10 space-y-2">
                    <div className="h-4 w-full bg-[#2A6F97]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Section Skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-full"></div>
                  <div className="h-8 w-40 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#2A6F97]/10 rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          <div className="w-full h-48 lg:h-full bg-gradient-to-br from-[#2A6F97]/20 to-[#54A5CC]/20 rounded-lg animate-pulse"></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="space-y-2">
                              <div className="h-6 w-40 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                              <div className="h-4 w-64 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                            </div>
                            
                            <div className="mt-4 lg:mt-0 text-right">
                              <div className="h-8 w-24 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                              <div className="h-3 w-16 bg-[#54A5CC]/20 rounded mt-1 animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                                <div className="w-4 h-4 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                                <div className="h-4 w-16 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="h-6 w-20 bg-[#F0F7FF] rounded-full animate-pulse"></div>
                            ))}
                          </div>
                          
                          <div className="h-10 w-32 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages Section Skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#3F8AB2]/30 to-[#2A6F97]/30 rounded-full"></div>
                  <div className="h-8 w-40 bg-[#3F8AB2]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="h-4 w-48 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border border-[#2A6F97]/10 rounded-xl overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-[#2A6F97]/20 to-[#54A5CC]/20 relative">
                        <div className="absolute top-4 left-4">
                          <div className="h-6 w-24 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="h-6 w-20 bg-[#1D4F6E]/30 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="h-6 w-32 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                          <div className="text-right">
                            <div className="h-8 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-16 bg-[#54A5CC]/20 rounded mt-1 animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="h-4 w-full bg-[#3F8AB2]/20 rounded mb-4 animate-pulse"></div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-10 bg-[#F0F7FF] rounded-lg animate-pulse"></div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                              <div className="h-4 w-40 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <div className="flex-1 h-10 bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg animate-pulse"></div>
                          <div className="w-20 h-10 border border-[#2A6F97]/20 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="h-5 w-32 bg-[#2A6F97]/20 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Reviews Section Skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#54A5CC]/30 to-[#2A6F97]/30 rounded-full"></div>
                  <div className="h-8 w-36 bg-[#54A5CC]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center p-4 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
                      <div className="h-6 w-16 bg-[#2A6F97]/30 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-[#3F8AB2]/20 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-3 h-3 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border border-[#2A6F97]/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        ))}
                        <div className="h-4 w-8 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-40 bg-[#2A6F97]/30 rounded mb-2 animate-pulse"></div>
                      <div className="space-y-1 mb-3">
                        <div className="h-3 w-full bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                        <div className="h-3 w-5/6 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#2A6F97]/30 rounded-full"></div>
                        <div className="h-3 w-32 bg-[#54A5CC]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="h-10 w-full bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Section Skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#2A6F97]/30 to-[#3F8AB2]/30 rounded-full"></div>
                  <div className="h-6 w-24 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                </div>
                
                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#2A6F97]/10">
                      <div className="w-6 h-6 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-5 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                      <div className="h-3 w-40 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="h-10 w-full bg-gradient-to-r from-[#2A6F97]/30 to-[#54A5CC]/30 rounded-lg animate-pulse"></div>
                </div>
                
                {/* Coordinates */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#2A6F97]/30 rounded mb-2 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="rounded-lg p-3 bg-[#2A6F97]/5">
                        <div className="h-3 w-16 bg-[#2A6F97]/20 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Transportation */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#2A6F97]/30 rounded mb-2 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[#2A6F97]/20 bg-gradient-to-r from-[#2A6F97]/5 to-[#3F8AB2]/5">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                          <div className="h-4 w-24 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-4 w-16 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                          <div className="h-3 w-12 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Map Skeleton */}
                <div className="mb-6">
                  <div className="h-5 w-24 bg-[#2A6F97]/30 rounded mb-2 animate-pulse"></div>
                  <div className="rounded-xl overflow-hidden border border-[#2A6F97]/20 shadow-md">
                    <div className="h-[400px] w-full bg-gradient-to-br from-[#2A6F97]/10 to-[#54A5CC]/10 relative">
                      {/* Grid lines simulation */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="border border-[#2A6F97]/5"></div>
                        ))}
                      </div>
                      {/* Map pin placeholder */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#2A6F97] to-[#54A5CC] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-[#2A6F97]/20 bg-[#2A6F97]/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#2A6F97]/20 rounded mr-2 animate-pulse"></div>
                          <div className="h-4 w-32 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-24 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Legend */}
                  <div className="absolute transform translate-y-[-120px] ml-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-[#2A6F97]/20">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#2A6F97]/30 rounded-full animate-pulse"></div>
                          <div className="h-3 w-12 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#3F8AB2]/30 rounded-full animate-pulse"></div>
                          <div className="h-3 w-16 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location Highlights */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="text-center p-3 rounded-lg border border-[#2A6F97]/20 bg-gradient-to-r from-[#2A6F97]/5 to-[#3F8AB2]/5">
                      <div className="w-5 h-5 bg-[#2A6F97]/20 rounded mx-auto mb-1 animate-pulse"></div>
                      <div className="h-3 w-20 bg-[#2A6F97]/20 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Summary Skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2A6F97]/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#54A5CC]/30 to-[#2A6F97]/30 rounded-full"></div>
                  <div className="h-6 w-24 bg-[#54A5CC]/30 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                      <div className="h-5 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                          <div className="w-5 h-5 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-4 w-20 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-[#3F8AB2]/20 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-[#2A6F97]/30 rounded-full"></div>
                      <div className="h-5 w-32 bg-[#2A6F97]/30 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#2A6F97]/10">
                          <div className="w-2 h-2 bg-[#2A6F97]/30 rounded-full"></div>
                          <div className="h-4 w-16 bg-[#2A6F97]/20 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Card Skeleton */}
            <div className="bg-gradient-to-br from-[#2A6F97]/50 to-[#54A5CC]/50 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="h-6 w-40 bg-white/20 rounded mb-2 animate-pulse"></div>
                <div className="space-y-1 mb-4">
                  <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-white/30 rounded-xl animate-pulse"></div>
                <div className="mt-3 text-center">
                  <div className="h-3 w-40 bg-white/20 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note Skeleton */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-[#2A6F97]/20">
            <div className="w-2 h-2 bg-[#2A6F97]/30 rounded-full animate-pulse"></div>
            <div className="h-3 w-48 bg-[#2A6F97]/20 rounded animate-pulse"></div>
            <div className="w-2 h-2 bg-[#54A5CC]/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPageLoading;