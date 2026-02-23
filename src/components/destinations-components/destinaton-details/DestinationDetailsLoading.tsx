"use client";
import React, { useState } from "react";

const DestinationDetailsLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* DestinationDetailsHeroSection Skeleton */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-sky-600 to-teal-600">
        {/* Image Slider Skeleton */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-100">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-teal-900/50">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Weather Widget Skeleton */}
        <div className="absolute top-6 right-6 md:block z-20">
          <div className="bg-white/10 backdrop-blur-2xl rounded-xl p-4 border border-white/20 min-w-[200px] shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 bg-yellow-300/30 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-white/30 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-white/30 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-32 bg-white/30 rounded animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-white/30 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-white/30 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center">
              {/* Destination Category Badges - CENTERED */}
              <div className="hidden mb-6 lg:flex flex-wrap gap-3 justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"
                  >
                    <div className="h-4 w-20 bg-white/30 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Destination Title - CENTERED */}
              <div className="mx-auto max-w-4xl">
                <div className="h-10 md:h-12 lg:h-14 bg-white/10 backdrop-blur-sm rounded-lg w-64 sm:w-72 md:w-80 lg:w-96 mx-auto mb-6 animate-pulse"></div>
                
                {/* Description Container - CENTERED */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-3xl mb-8">
                  <div className="space-y-3 mb-6">
                    <div className="h-5 md:h-6 bg-white/20 rounded w-full animate-pulse"></div>
                    <div className="h-5 md:h-6 bg-white/20 rounded w-5/6 mx-auto animate-pulse"></div>
                    <div className="h-5 md:h-6 bg-white/20 rounded w-4/6 mx-auto animate-pulse"></div>
                  </div>

                  {/* Destination Info - CENTERED */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full animate-pulse"
                      >
                        <div className="w-5 h-5 bg-white/20 rounded"></div>
                        <div className="h-4 w-24 bg-white/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Counter - CENTERED */}
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex mx-auto animate-pulse">
                  <div className="w-4 h-4 bg-white/20 rounded"></div>
                  <div className="h-4 w-16 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows Skeleton */}
        <div className="hidden md:flex">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse z-20"></div>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse z-20"></div>
        </div>

        {/* Slide Indicators - CENTERED */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === selectedImageIndex
                  ? "bg-gradient-to-r from-sky-400 to-teal-400"
                  : "bg-white/30"
              } animate-pulse`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
          <div className="h-full w-1/4 bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading destination details...</span>
          </div>
        </div>

        {/* Grid Layout - Matches main page structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - lg:col-span-2 */}
          <div className="lg:col-span-2">
            {/* DestinationImageGallery Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg overflow-hidden mb-6 border border-teal-500/20">
              {/* Main Image */}
              <div className="relative h-96">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse"></div>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 bg-gray-900/50 border-t border-teal-500/20">
                <div className="flex space-x-3 overflow-x-auto">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        i === 0
                          ? "border-gradient-to-r from-sky-500 to-teal-500"
                          : "border-gray-700"
                      } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* DestinationTabs Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg overflow-hidden mb-6 border border-teal-500/20">
              {/* Tab Navigation */}
              <div className="border-b border-teal-500/20">
                <nav className="flex -mb-px">
                  {["Overview", "Activities", "Location"].map((tab, i) => (
                    <div
                      key={i}
                      className={`flex-1 py-4 px-6 text-center ${
                        i === 0
                          ? "border-b-2 border-gradient-to-r from-sky-500 to-teal-500"
                          : ""
                      }`}
                    >
                      <div className="h-4 w-16 mx-auto bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Tab Content - OverviewTab Skeleton */}
              <div className="p-6 space-y-6">
                {/* Overview Section */}
                <div className="space-y-4">
                  <div className="h-5 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                  </div>
                </div>

                {/* Highlights Section */}
                <div className="space-y-3">
                  <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                        <div className="h-4 w-32 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Time to Visit */}
                <div className="space-y-3">
                  <div className="h-5 w-36 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="px-3 py-1 bg-gray-800 rounded-full">
                        <div className="h-4 w-16 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* QuickInfoCard Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* BookingCard Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
                <div className="h-10 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded-lg w-full animate-pulse"></div>
                <div className="h-12 bg-gradient-to-r from-sky-600 to-teal-600 rounded-lg w-full animate-pulse"></div>
              </div>
            </div>

            {/* GalleryPreview Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse border border-teal-500/20"
                  />
                ))}
              </div>
              <div className="mt-3 text-center">
                <div className="h-4 w-32 mx-auto bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections Skeleton */}
        <div className="mt-12 space-y-12">
          {/* DestinationHistory Section Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-64 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-96 max-w-full animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-6 border border-teal-500/20 animate-pulse"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* ReviewsSection Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-72 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-6 border border-teal-500/20 animate-pulse"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24"></div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-3 h-3 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* DestinationHistoryGallery Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-56 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-80 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg border border-teal-500/20 animate-pulse"
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsLoading;