// BlogPageLoading.tsx
import React, { useState } from "react";
import {
  Filter,
  RotateCcw,
  Calendar,
  User,
  Tag,
  TrendingUp,
} from "lucide-react";

const BlogPageLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* Main Content Container */}
      <div className="mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-7xl">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 sm:w-56 md:w-64 lg:w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 sm:w-72 md:w-80 lg:w-96 mx-auto animate-pulse"></div>
        </div>

        {/* BlogFilter Skeleton - Matches BlogFilter */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 mb-8 border border-teal-500/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-xl animate-pulse">
                <Filter className="w-6 h-6 text-teal-500/30" />
              </div>
              <div>
                <div className="h-6 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-48 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 rounded-lg border border-teal-500/20 animate-pulse">
              <RotateCcw className="w-4 h-4 text-teal-500/30" />
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-teal-500/30 rounded"></div>
              <div className="w-full h-12 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/20 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-teal-500/30 rounded"></div>
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/20 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full border border-teal-500/20 animate-pulse"
              >
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>

          {/* Quick Sort Buttons */}
          <div className="pt-4 border-t border-teal-500/20">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-gray-800/50 rounded-lg animate-pulse"
                >
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternative Filter Banner (when URL params present) */}
        {false && (
          <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-6 mb-8 border border-teal-500/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="h-6 w-48 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-64 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
              </div>
              <div className="px-4 py-2.5 bg-gray-800/50 rounded-lg border border-teal-500/20 animate-pulse">
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>

            {/* Items per page selector */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-9 w-28 bg-gradient-to-r from-gray-800 to-teal-900/50 border-2 border-teal-500/20 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogCardSkeleton key={index} delay={index * 100} />
            ))}
          </div>

          {/* Pagination Controls Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-teal-500/20">
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 animate-pulse"></div>

            <div className="flex items-center gap-1">
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-md w-20 animate-pulse"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-md w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* No Results Skeleton (hidden by default) */}
        {false && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-teal-500/20">
              <div className="text-gray-500 text-lg mb-4">
                No blogs found matching your filters.
              </div>
              <div className="px-6 py-2 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-lg animate-pulse">
                <div className="h-5 w-24 bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// BlogCardSkeleton Component - Matches BlogCard structure
const BlogCardSkeleton = ({ delay = 0 }) => {
  return (
    <div
      className="group bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-teal-500/20 cursor-pointer hover:-translate-y-1 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full border border-teal-500/20">
            <div className="h-3 w-16 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/20">
            <div className="h-3 w-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Writer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
          <div className="space-y-1">
            <div className="h-3 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
            <div className="h-2 w-16 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4 space-y-2">
          <div className="h-5 w-3/4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
          <div className="h-4 w-full bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
          <div className="h-4 w-5/6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
          <div className="h-3 w-5/6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
          <div className="h-3 w-4/6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded"></div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-teal-500/20">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
                <div className="space-y-1">
                  <div className="h-3 w-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto"></div>
                  <div className="h-2 w-8 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageLoading;
