import React from 'react'

const ContactHighlightsLoading = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="container mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading contact options...</span>
          </div>
        </div>

        {/* Header Section Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 md:w-56 lg:w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
            <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mx-auto animate-pulse"></div>
            <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 mx-auto animate-pulse"></div>
          </div>
          <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-24 mx-auto mt-6 animate-pulse"></div>
        </div>

        {/* Contact Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-teal-500/20 animate-pulse relative"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Highlight Badge Placeholder - appears on first card only */}
              {index === 0 && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <div className="h-5 sm:h-6 bg-gradient-to-r from-red-800/80 to-red-900/50 rounded-full w-28 border border-red-500/30"></div>
                </div>
              )}
              
              {/* Icon Container */}
              <div className="inline-flex p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 bg-gradient-to-br from-gray-700 to-teal-800/50 border border-teal-500/20">
                <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-400 rounded"></div>
              </div>
              
              {/* Title */}
              <div className="h-5 sm:h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-2 animate-pulse"></div>
              
              {/* Value & Description */}
              <div className="mb-2 space-y-2">
                <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-36 animate-pulse"></div>
              </div>
              
              {/* Action Button Placeholder */}
              <div className="mt-4 sm:mt-5 md:mt-6">
                <div className="h-8 sm:h-9 md:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-28 animate-pulse border border-teal-500/20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Banner Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/50 rounded-2xl p-6 md:p-8 border border-teal-500/20 animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 w-full md:w-auto">
              <div className="h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 md:w-56 mb-2 animate-pulse"></div>
              <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-80 animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="h-10 md:h-11 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-24 animate-pulse border border-teal-500/20"></div>
              <div className="h-10 md:h-11 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-28 animate-pulse border border-teal-500/20"></div>
            </div>
          </div>
        </div>

        {/* Timezone Information Skeleton */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/80 to-teal-900/30 rounded-full border border-teal-500/20 animate-pulse">
            <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded"></div>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactHighlightsLoading