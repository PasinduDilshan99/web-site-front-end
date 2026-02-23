// SriLankanTourDetailsLoading.tsx
import React, { useState } from "react";
import { Calendar } from "lucide-react";

const SriLankanTourDetailsLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* Hero Section with Slider Skeleton - Matches SLTourDetailsHeroSection */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-sky-600/20 to-teal-600/20">
        {/* Image Slider Skeleton */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-100">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-teal-900/50">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content Overlay - CENTERED - Matches SLTourDetailsHeroSection */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center">
              {/* Tour Category Badges - CENTERED */}
              <div className="mb-6 flex flex-wrap gap-3 justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"
                  >
                    <div className="h-4 w-20 bg-gray-300/30 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Tour Title - CENTERED */}
              <div className="h-10 md:h-12 lg:h-14 bg-white/10 backdrop-blur-sm rounded-lg w-64 sm:w-72 md:w-80 lg:w-96 mx-auto mb-6 animate-pulse"></div>

              {/* Description Container - CENTERED */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-4xl mb-8">
                <div className="space-y-3 mb-6">
                  <div className="h-5 md:h-6 bg-white/20 rounded w-full animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-5/6 mx-auto animate-pulse"></div>
                  <div className="h-5 md:h-6 bg-white/20 rounded w-4/6 mx-auto animate-pulse"></div>
                </div>

                {/* Tour Info - CENTERED */}
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

      {/* Image Thumbnails Skeleton - Matches SLTourDetailsHeroSection */}
      {true && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 ${
                  i === 0 ? "border-sky-500" : "border-gray-700"
                } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
              >
                {i === 0 && (
                  <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 h-6"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading tour details...</span>
          </div>
        </div>

        {/* Grid Layout - Matches main page structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* SLTourDetailsOverview Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-teal-500/20">
              <div className="h-6 sm:h-7 lg:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>

              {/* Responsive grid layout - Info Items */}
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full flex items-center justify-center animate-pulse"></div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Responsive badge container */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full border border-teal-500/20"
                  >
                    <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>

            {/* Itinerary Header Skeleton */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg mb-4 sm:mb-5 md:mb-6 animate-pulse"></div>
              <div className="h-6 sm:h-7 md:h-8 lg:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 sm:w-56 md:w-64 mx-auto mb-3 animate-pulse"></div>
              <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-72 md:w-80 mx-auto animate-pulse"></div>
            </div>

            {/* Package Selector Skeleton */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md border border-teal-500/20">
              {/* Header section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex-1 space-y-2">
                  <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                  <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 animate-pulse"></div>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-10 sm:h-11 md:h-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-40 animate-pulse border border-teal-500/20"></div>
                </div>
              </div>

              {/* Packages grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border-2 ${
                      i === 0
                        ? "border-sky-600/50 bg-gradient-to-br from-gray-800 to-teal-900/50"
                        : "border-gray-700 bg-gradient-to-br from-gray-800/80 to-teal-900/30"
                    } animate-pulse`}
                    style={{
                      borderLeftColor: i === 0 ? "#0e7490" : undefined,
                      borderLeftWidth: "4px",
                    }}
                  >
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                        <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                        <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                      </div>
                      {i === 0 && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-sky-600/50 rounded-full flex items-center justify-center ml-2"></div>
                      )}
                    </div>
                    <div className="mb-3 sm:mb-4 space-y-2">
                      <div className="h-5 sm:h-6 lg:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 sm:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse border border-teal-500/20"></div>
                  </div>
                ))}
              </div>

              {/* Selected package indicator */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl border border-teal-500/20 animate-pulse">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 sm:h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 animate-pulse"></div>
                  </div>
                  <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* SLTourDayWiseDetails Skeleton */}
            <div className="space-y-6">
              {/* Days Navigation Skeleton */}
              <div className="mb-6 sm:mb-8">
                <div className="relative">
                  <div className="flex overflow-x-auto pb-3 sm:pb-4 space-x-3 sm:space-x-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-lg sm:rounded-xl ${
                          i === 0
                            ? "bg-gradient-to-r from-gray-700 to-teal-800/50"
                            : "bg-gradient-to-br from-gray-800/80 to-teal-900/30 border border-teal-500/20"
                        } animate-pulse`}
                      >
                        <div className="flex flex-col items-center">
                          <div className="h-4 w-12 bg-gray-600/50 rounded mb-1"></div>
                          <div className="h-3 w-16 bg-gray-600/30 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Days Content Skeleton */}
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg overflow-hidden border ${
                      i === 0 ? "border-2 border-teal-500/30" : "border-teal-500/20"
                    } animate-pulse`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {/* Day Header */}
                    <div
                      className={`w-full p-3 sm:p-4 md:p-5 flex items-center gap-3 ${
                        i === 0
                          ? "bg-gradient-to-r from-gray-700 to-teal-800/50"
                          : "bg-gradient-to-r from-gray-800 to-teal-900/50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg sm:rounded-xl">
                          <div className="h-5 w-5 bg-white/20 rounded"></div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="h-5 w-20 bg-white/20 rounded"></div>
                          <div className="h-4 w-12 bg-white/10 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-16 bg-white/10 rounded"></div>
                          <div className="h-3 w-3 bg-white/10 rounded-full"></div>
                          <div className="h-3 w-20 bg-white/10 rounded"></div>
                        </div>
                      </div>
                      <div className="h-5 w-5 bg-white/20 rounded"></div>
                    </div>

                    {/* Day Content */}
                    {i === 0 && (
                      <div className="p-6">
                        <div className="space-y-6">
                          {[...Array(2)].map((_, j) => (
                            <div key={j} className="border-b border-teal-500/20 pb-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                  <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
                                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                  <div className="h-3 w-40 bg-gray-700 rounded"></div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {[...Array(2)].map((_, k) => (
                                  <div key={k} className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                                    <div className="h-3 w-20 bg-gray-700 rounded"></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TourExtraDetails Skeleton */}
            <div className="mt-8 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl p-6 border border-teal-500/20">
              <div className="h-6 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-3 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* SLTourDetailsBookingSidebar Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 border border-teal-500/20 sticky top-6">
              <div className="space-y-6">
                {/* Price */}
                <div className="text-center pb-4 border-b border-teal-500/20">
                  <div className="h-3 w-20 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="h-8 w-32 bg-gradient-to-r from-cyan-600 to-teal-600 rounded mx-auto mb-1 animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-700 rounded mx-auto animate-pulse"></div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl animate-pulse"></div>
                </div>

                {/* Tour Guide */}
                <div className="pt-4 border-t border-teal-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TourMapContainer Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 mt-12">
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 mx-auto max-w-7xl">
          <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center">
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-80 md:w-96 lg:w-[32rem] mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* TourControls Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-28 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg animate-pulse"></div>
          </div>

          {/* Map Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl p-0.5 sm:p-1 border border-teal-500/20">
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse relative overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="border border-teal-500/10"></div>
                ))}
              </div>
              {/* Map pins */}
              <div className="absolute top-1/4 left-1/3">
                <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute top-2/3 left-2/3">
                <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
              </div>
              <div className="absolute top-1/2 left-1/2">
                <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections Skeleton (Reviews, History, Gallery) */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
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
                        <div key={j} className="w-3 h-3 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
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

        {/* TourHistorySection Skeleton */}
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

        {/* TourHistoryGallery Skeleton */}
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
      </div>
    </div>
  );
};

export default SriLankanTourDetailsLoading;