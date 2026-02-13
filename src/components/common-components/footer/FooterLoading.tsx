import React from "react";

const FooterLoading = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-gray-900 to-teal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Simple loading header */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading footer...</span>
          </div>
        </div>

        {/* Footer Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Column - Left */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo & Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-xl animate-pulse border border-teal-500/20"></div>
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            {/* Company Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse border border-teal-500/20"
                ></div>
              ))}
            </div>
          </div>

          {/* Dynamic Sections - 3 columns */}
          {[...Array(3)].map((_, colIndex) => (
            <div key={colIndex} className="lg:col-span-1">
              {/* Section Title */}
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mb-6 pb-3 border-b border-teal-500/20 animate-pulse"></div>

              {/* Section Links */}
              <div className="space-y-4">
                {[...Array(5)].map((_, linkIndex) => (
                  <div key={linkIndex} className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright Section Skeleton */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-teal-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright Text */}
            <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 animate-pulse"></div>

            {/* Additional Links */}
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"
                ></div>
              ))}
            </div>

            {/* Back to Top Button */}
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-1 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLoading;
