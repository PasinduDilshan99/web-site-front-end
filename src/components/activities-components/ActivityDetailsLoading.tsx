"use client";
import React, { useState } from "react";

const ActivityDetailsLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* Hero Section with Slider Skeleton - Matches ActivityDetailsHeroSection */}
      <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
        {/* Image Slider Skeleton */}
        <div className="relative w-full h-full">
          {/* Main Image Placeholder */}
          <div className="absolute inset-0 opacity-100">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-teal-900/50">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content Overlay - CENTERED - Matches ActivityDetailsHeroSection */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center">
              {/* Activity Category Badges - CENTERED */}
              <div className="mb-6 flex flex-wrap gap-3 justify-center">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"
                  >
                    <div className="h-4 w-16 bg-gray-300/30 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Activity Title - CENTERED */}
              <div className="h-10 md:h-12 lg:h-14 bg-white/10 backdrop-blur-sm rounded-lg w-64 sm:w-72 md:w-80 lg:w-96 mx-auto mb-6 animate-pulse"></div>

              {/* Description Container - CENTERED */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-4xl mb-8">
                <div className="space-y-3 mb-6">
                  <div className="h-5 md:h-6 bg-white/20 rounded w-full animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-5/6 mx-auto animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-4/6 mx-auto animate-pulse"></div>
                </div>

                {/* Activity Info - CENTERED */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {[...Array(2)].map((_, i) => (
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

        {/* Navigation Arrows Skeleton */}
        <div className="hidden md:flex">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse"></div>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full w-12 h-12 animate-pulse"></div>
        </div>

        {/* Slide Indicators - CENTERED */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div className="h-full w-1/4 bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading activity details...</span>
          </div>
        </div>

        {/* Grid Layout - Matches main page structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - ActivityImages Component Skeleton */}
          <div className="space-y-4">
            {/* Main Image - Matches ActivityImages */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg overflow-hidden border border-teal-500/20">
              <div className="relative h-96 lg:h-[500px]">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse"></div>
              </div>
            </div>

            {/* Thumbnail Images - Matches ActivityImages */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    i === 0 ? "border-cyan-500" : "border-gray-700"
                  } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Activity Details Components */}
          <div className="space-y-6">
            {/* ActivityDetails Component Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="w-full">
                  <div className="inline-block bg-sky-900/50 px-3 py-1 rounded-full mb-2">
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-7 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="px-4 py-2 bg-gray-800 rounded-full">
                  <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
              </div>

              {/* Price Section Skeleton */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="h-6 lg:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                    <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                  </div>
                  <div className="h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-xl w-28 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* ActivityKeyInfo Component Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></div>
                <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-teal-500/20"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ActivitySeasons Component Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></div>
                <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-gray-800 to-teal-900/50 px-4 py-2 rounded-full border border-teal-500/20"
                  >
                    <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* ActivityRequirements Component Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></div>
                <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
              </div>
              <div className="grid gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-800 rounded-full border border-teal-500/20">
                      <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ActivitySchedules Component Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></div>
                <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-teal-500/20"
                  >
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections Skeleton */}
        <div className="mt-12 space-y-12">
          {/* ActivityHistorySection Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
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

          {/* ActivityHistoryGallery Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-44 animate-pulse"></div>
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

          {/* ReviewsSection Skeleton */}
          {/* <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
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
                          <div
                            key={j}
                            className="w-3 h-3 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"
                          />
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
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsLoading;