// PackageDetailsLoading.tsx
import React, { useState } from "react";

const PackageDetailsLoading = () => {
  const [currentSlide] = useState(0);
  const [expandedDay] = useState(1);
  const [expandedDestination] = useState<number | null>(null);
  const [activeTab] = useState<"inclusions" | "exclusions" | "conditions">(
    "inclusions",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* PackageDetailsHeroSection Skeleton */}
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
        {/* Image Slider Skeleton */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-100">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(8, 145, 178, 0.8)), url('')`,
                backgroundColor: "#1e293b",
              }}
            />
          </div>
        </div>

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
            <div className="flex flex-col items-center text-center w-full">
              {/* Package Title */}
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 bg-white/10 backdrop-blur-sm rounded-lg w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[32rem] mx-auto mb-3 sm:mb-4 animate-pulse"></div>

              {/* Package Description */}
              <div className="space-y-2 mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto">
                <div className="h-4 sm:h-5 md:h-6 bg-white/10 rounded w-full animate-pulse"></div>
                <div className="h-4 sm:h-5 md:h-6 bg-white/10 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>

              {/* Package Meta - CENTERED */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 animate-pulse"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/20 rounded"></div>
                    <div className="h-4 w-20 bg-white/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows Skeleton */}
        <div className="hidden sm:flex absolute left-3 sm:left-4 md:left-5 lg:left-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 sm:p-3.5 md:p-4 rounded-full w-12 h-12 animate-pulse"></div>
        <div className="hidden sm:flex absolute right-3 sm:right-4 md:right-5 lg:right-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 sm:p-3.5 md:p-4 rounded-full w-12 h-12 animate-pulse"></div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                i === currentSlide
                  ? "bg-gradient-to-r from-sky-400 to-teal-400"
                  : "bg-white/30"
              } animate-pulse`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10">
          <div className="h-full w-1/4 bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Simple loading header */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading package details...
            </span>
          </div>
        </div>

        {/* Grid Layout - Matches main page structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Gallery and Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* PackageGallery Skeleton */}
            <div className="space-y-3 sm:space-y-4">
              {/* Main Image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-teal-900/50 border border-teal-500/20 animate-pulse">
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-gray-700 to-teal-800/50 px-2 sm:px-3 py-1 rounded-full">
                  <div className="h-4 w-16 bg-gray-600/50 rounded"></div>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border-2 ${
                      i === 0 ? "border-sky-500" : "border-gray-700"
                    } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
                  >
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gray-800/90 rounded text-xs">
                      <div className="h-3 w-4 bg-gray-600/50 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PackageInfo Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-teal-500/20">
              <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-4 sm:mb-6 animate-pulse"></div>

              {/* Package Type */}
              <div className="mb-4 sm:mb-6">
                <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 mb-2 sm:mb-3 animate-pulse"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800 border border-gray-700 w-24 h-8 animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4 sm:mb-6">
                <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 sm:mb-3 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-700 mt-1.5 sm:mt-2"></div>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* InclusionsExclusions Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-teal-500/20">
              <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-4 sm:mb-6 animate-pulse"></div>

              {/* Tabs Skeleton */}
              <div className="flex border-b border-teal-500/20 mb-4 sm:mb-6 overflow-x-auto">
                {["inclusions", "exclusions", "conditions"].map((tab, i) => (
                  <div
                    key={i}
                    className={`px-3 sm:px-4 py-2 sm:py-3 border-b-2 ${
                      i === 0 ? "border-teal-500" : "border-transparent"
                    }`}
                  >
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Content Skeleton */}
              <div>
                <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-3 sm:mb-4 animate-pulse"></div>
                <div className="space-y-2 sm:space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-teal-500/20"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 rounded flex-shrink-0 mt-0.5"></div>
                      <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TravelTips Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-teal-500/20">
              <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-teal-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 bg-gradient-to-b from-gray-800/80 to-teal-900/30"
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 rounded"></div>
                      <div className="h-5 w-24 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-700 rounded flex-shrink-0 mt-0.5"></div>
                          <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* DayByDayItinerary Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-teal-500/20">
              <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 mb-4 sm:mb-6 animate-pulse"></div>

              <div className="space-y-3 sm:space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-teal-500/20 rounded-lg sm:rounded-xl overflow-hidden"
                  >
                    {/* Day Header */}
                    <div className="w-full p-3 sm:p-4 bg-gradient-to-r from-gray-800 to-teal-900/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-8 h-8 sm:w-10 sm:h-10 animate-pulse"></div>
                          <div className="space-y-1">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="w-5 h-5 bg-gray-700 rounded"></div>
                      </div>
                    </div>

                    {/* Expanded Content - Only for first day */}
                    {i === 0 && (
                      <div className="p-3 sm:p-4 border-t border-teal-500/20">
                        {/* Hotel Information */}
                        <div className="mb-3 sm:mb-4">
                          <div className="h-4 w-28 bg-gray-700 rounded mb-2 animate-pulse"></div>
                          <div className="bg-gradient-to-br from-gray-800 to-teal-900/30 rounded-lg p-2.5 sm:p-3 border border-teal-500/20">
                            <div className="space-y-2">
                              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse"></div>
                              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <div
                                    key={j}
                                    className="w-3 h-3 bg-gray-700 rounded"
                                  ></div>
                                ))}
                              </div>
                              <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Meals */}
                        <div className="mb-3 sm:mb-4">
                          <div className="h-4 w-24 bg-gray-700 rounded mb-2 animate-pulse"></div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="flex items-center gap-2 p-2 bg-gray-800/50 rounded border border-teal-500/20"
                              >
                                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                                <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Transport */}
                        <div className="mb-3 sm:mb-4">
                          <div className="h-4 w-20 bg-gray-700 rounded mb-2 animate-pulse"></div>
                          <div className="bg-gradient-to-br from-gray-800 to-teal-900/30 rounded-lg p-2.5 sm:p-3 border border-teal-500/20">
                            <div className="space-y-2">
                              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse"></div>
                              <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DestinationsSection Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 border border-teal-500/20">
              <div className="h-7 sm:h-8 md:h-9 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-56 mb-4 sm:mb-5 lg:mb-6 animate-pulse"></div>

              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-teal-500/20 rounded-lg sm:rounded-xl overflow-hidden"
                  >
                    {/* Destination Header */}
                    <div className="w-full p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-gray-800 to-teal-900/50">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="h-6 w-40 bg-gray-700 rounded animate-pulse"></div>
                          <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <div className="px-2 py-1 bg-gray-800 rounded-full w-16 h-6"></div>
                            <div className="px-2 py-1 bg-gray-800 rounded-full w-20 h-6"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-2">
                          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content - Only for first destination */}
                    {i === 0 && expandedDestination && (
                      <div className="p-3 sm:p-4 lg:p-6 border-t border-teal-500/20">
                        {/* Gallery */}
                        <div className="mb-4 sm:mb-5 lg:mb-6">
                          <div className="h-5 w-16 bg-gray-700 rounded mb-2 animate-pulse"></div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                            {[...Array(4)].map((_, j) => (
                              <div
                                key={j}
                                className="relative aspect-square rounded-lg bg-gradient-to-br from-gray-700 to-teal-800/50 border border-teal-500/20 animate-pulse"
                              ></div>
                            ))}
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                          </div>
                          <div className="space-y-3 sm:space-y-4">
                            {[...Array(2)].map((_, j) => (
                              <div
                                key={j}
                                className="p-3 sm:p-4 border border-teal-500/20 rounded-lg sm:rounded-xl bg-gradient-to-b from-gray-800/80 to-teal-900/30"
                              >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-2">
                                  <div className="flex-1 min-w-0 space-y-2">
                                    <div className="h-5 w-40 bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                      <div className="px-2 py-1 bg-gray-800 rounded-full w-16 h-6"></div>
                                      <div className="px-2 py-1 bg-gray-800 rounded-full w-20 h-6"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4 sm:top-16 border border-teal-500/20">
              <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-4 sm:mb-6 animate-pulse"></div>

              {/* Price Display */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-lg sm:rounded-xl border border-teal-500/20">
                <div className="h-8 sm:h-9 md:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-700 rounded mx-auto animate-pulse"></div>
              </div>

              {/* Package Features Summary */}
              <div className="border-t border-teal-500/20 pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="h-5 w-28 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <li key={i} className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-700 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Now Button */}
              <div className="w-full py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg sm:rounded-xl animate-pulse"></div>

              {/* Quick Actions */}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                <div className="flex-1 py-1.5 sm:py-2 border border-teal-500/20 rounded-lg bg-gray-800/50 animate-pulse"></div>
                <div className="flex-1 py-1.5 sm:py-2 border border-teal-500/20 rounded-lg bg-gray-800/50 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections Skeleton */}
        <div className="mt-8 sm:mt-12 md:mt-16 space-y-8 sm:space-y-12 md:space-y-16">
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

          {/* HistoryCarousel Skeleton */}
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

          {/* PackageHistoryGallery Skeleton */}
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
    </div>
  );
};

export default PackageDetailsLoading;
