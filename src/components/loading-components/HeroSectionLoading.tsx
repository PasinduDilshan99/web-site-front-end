import React from "react";

interface HeroSectionLoadingProps {
  text?: string;
}

const HeroSectionLoading: React.FC<HeroSectionLoadingProps> = ({
  text = "Loading hero content...",
}) => {
  return (
    <div className="relative w-full h-[700px] overflow-hidden bg-gray-900">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse">
        {/* Overlay gradient similar to actual hero section */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay Skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto w-full">
          {/* Title skeleton - matches actual structure with main title and subtitle */}
          <div className="mb-6 space-y-4">
            {/* Main title line */}
            <div className="h-12 md:h-16 bg-gray-700/50 rounded-lg w-3/4 mx-auto animate-pulse" />
            
            {/* Subtitle line - matching the gradient text styling */}
            <div className="h-8 md:h-10 bg-gradient-to-r from-cyan-400/20 to-emerald-500/20 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-3 mb-8 max-w-2xl mx-auto">
            <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-5/6 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-4/6 mx-auto animate-pulse" />
          </div>

          {/* Buttons skeleton - matching actual button styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary button skeleton */}
            <div className="h-14 w-48 bg-gradient-to-r from-blue-600/30 to-emerald-500/30 rounded-full animate-pulse mx-auto sm:mx-0" />
            
            {/* Secondary button skeleton */}
            <div className="h-14 w-48 bg-transparent border-2 border-cyan-300/20 rounded-full animate-pulse mx-auto sm:mx-0" />
          </div>
        </div>
      </div>

      {/* Navigation Arrows Skeleton (only visible on medium screens and up) */}
      <div className="hidden md:flex">
        {/* Left arrow */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full animate-pulse" />
        </div>

        {/* Right arrow */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full animate-pulse" />
        </div>
      </div>

      {/* Slide Indicators Skeleton */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-white/20 animate-pulse ${
              index === 0 ? "bg-white/40 scale-125" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Progress Bar Skeleton */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400/30 to-emerald-500/30 animate-pulse"
          style={{ width: "25%" }}
        />
      </div>

      {/* Auto-play Indicator Skeleton */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-400/30 animate-pulse" />
        <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
      </div>

      {/* Slide Counter Skeleton */}
      <div className="absolute top-6 left-6">
        <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
      </div>

      {/* Loading Badge - Floating indicator that matches your original design but positioned better */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
          <span className="text-teal-300 text-xs sm:text-sm md:text-base">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionLoading;