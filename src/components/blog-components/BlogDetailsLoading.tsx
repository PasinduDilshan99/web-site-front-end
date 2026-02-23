// BlogDetailsLoading.tsx
import React, { useState } from "react";
import { ArrowLeft, User, Calendar, Clock, Eye, Tag, Heart, Share2, Bookmark, MessageCircle, TrendingUp, ChevronDown, MapPin, Globe } from "lucide-react";

const BlogDetailsLoading = () => {
  const [selectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      {/* Back Button Skeleton */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-teal-400/70 w-32 h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading blog post...</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Blog Header Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-teal-500/20">
              {/* Category & Stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full">
                    <div className="h-4 w-20 bg-gray-600/50 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-teal-500/50" />
                    <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                  </div>
                  <div className="p-2 bg-gray-800/50 rounded-lg">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 mb-4 animate-pulse"></div>

              {/* Subtitle */}
              <div className="h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-1/2 mb-6 animate-pulse"></div>

              {/* Author & Date */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t border-teal-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
                  <div>
                    <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-500/50" />
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-500/50" />
                    <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-800/50 to-teal-900/30 p-4 rounded-xl text-center border border-teal-500/20">
                    <div className="h-6 w-12 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto mb-1 animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-800 rounded mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Blog Images Skeleton */}
              <div className="relative mb-8 rounded-2xl overflow-hidden border border-teal-500/20">
                <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-teal-800/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Image Navigation */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
                </div>

                {/* Image Thumbnails */}
                <div className="flex gap-2 p-4 bg-gray-900/50">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-20 rounded-lg border-2 ${
                        i === selectedImageIndex ? "border-teal-500" : "border-teal-500/20"
                      } bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Blog Content Skeleton */}
              <div className="space-y-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Blog Tags Skeleton */}
              <div className="mt-8 pt-8 border-t border-teal-500/20">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-5 h-5 text-teal-500/50" />
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="px-3 py-1 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full border border-teal-500/20">
                        <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog Actions Skeleton */}
              <div className="mt-8 pt-8 border-t border-teal-500/20 flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-teal-500/30" />
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white/5 border border-teal-500/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-teal-500/30" />
                    <div className="h-5 w-12 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white/5 border border-teal-500/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-teal-500/30" />
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-3xl shadow-xl p-6 md:p-8 border border-teal-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500/30" />
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Add Comment Skeleton */}
              <div className="mb-8">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="w-full h-24 bg-gradient-to-br from-gray-800 to-teal-900/30 rounded-xl border border-teal-500/20 animate-pulse"></div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
                      <div className="px-6 py-2 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-lg">
                        <div className="h-5 w-20 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List Skeleton */}
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-4 border-b border-teal-500/20 pb-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-1 mb-2">
                          <div className="h-3 w-full bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
                          <div className="h-3 w-5/6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-4 w-12 bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-4 w-12 bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Reply Skeleton */}
                    <div className="ml-11 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
                        <div className="flex-1">
                          <div className="h-3 w-48 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Button Skeleton */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full">
                  <ChevronDown className="w-5 h-5 text-teal-500/30" />
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Author Card Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-3xl shadow-xl p-6 border border-teal-500/20 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50 mx-auto mb-4 border-4 border-teal-500/20"></div>
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-800 rounded mx-auto mb-4 animate-pulse"></div>
                <div className="flex justify-center gap-2">
                  <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                  </div>
                  <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-teal-500/30" />
                  <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-500/30" />
                  <div className="h-4 w-28 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-teal-500/30" />
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Related Blogs Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-3xl shadow-xl p-6 border border-teal-500/20">
              <div className="h-5 w-40 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 rounded-xl border border-teal-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-700 to-teal-800/50 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-4 w-full bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-2 animate-pulse"></div>
                        <div className="h-3 w-3/4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded mb-1 animate-pulse"></div>
                        <div className="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full mt-6 py-3 text-center border border-teal-500/20 rounded-xl">
                <div className="h-4 w-32 bg-gray-700 rounded mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Popular Tags Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-3xl shadow-xl p-6 border border-teal-500/20">
              <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded mb-6 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full border border-teal-500/20">
                    <div className="h-3 w-12 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Login Dialog Skeleton (hidden) */}
      {false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
          <div className="relative bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl shadow-2xl max-w-md w-full border border-teal-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50"></div>
                <div className="h-5 w-32 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-gray-800/50 rounded-full"></div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
              <div className="p-4 bg-gradient-to-br from-gray-800 to-teal-900/30 rounded-xl border border-teal-500/20">
                <div className="h-4 w-32 bg-gray-700 rounded mb-3"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></div>
                      <div className="h-3 w-40 bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-3 border border-teal-500/20 rounded-xl">
                <div className="h-4 w-20 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-xl">
                <div className="h-4 w-24 bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsLoading;