// components/user-profile-components/ProfileLayoutLoading.tsx
import React from "react";

const ProfileLayoutLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="flex relative">
        {/* Sidebar Skeleton */}
        <aside className="hidden md:block fixed md:sticky md:top-0 z-40 bg-gradient-to-br from-gray-800/80 to-teal-900/30 border-r border-teal-500/20 w-64 transition-all duration-300"
          style={{ height: "100vh", maxHeight: "100vh" }}
        >
          {/* Sidebar Header Skeleton */}
          <div className="p-4 border-b border-teal-500/20 bg-gradient-to-r from-gray-800/50 to-teal-900/30">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse border border-teal-500/20"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Items Skeleton */}
          <div className="p-4 space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center space-x-3 p-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mt-1 animate-pulse"></div>
                  </div>
                </div>
                {/* Sub-items for some items */}
                {i % 3 === 0 && (
                  <div className="ml-8 space-y-2 mt-2">
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Collapse Button Skeleton */}
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-10 w-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-r-lg animate-pulse"></div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 p-6">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">Loading your profile...</span>
            </div>
          </div>

          {/* Profile Content Skeleton */}
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl p-6 border border-teal-500/20 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse border border-teal-500/20"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Profile Tabs Skeleton */}
            <div className="flex space-x-2 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-24 animate-pulse"></div>
              ))}
            </div>

            {/* Profile Form Skeleton */}
            <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl p-6 border border-teal-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                    <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-24 animate-pulse"></div>
                <div className="h-10 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayoutLoading;