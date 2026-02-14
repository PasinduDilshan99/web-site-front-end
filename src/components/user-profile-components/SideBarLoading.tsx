import React from "react";

const SideBarLoading = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div
      className={`hidden md:block fixed md:sticky md:top-0 z-40 bg-gradient-to-br from-gray-800/90 to-teal-900/40 backdrop-blur-sm border-r border-teal-500/30 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      {/* Sidebar Header Skeleton */}
      <div className="p-4 border-b border-teal-500/30">
        <div className="flex items-center space-x-3">
          {/* Avatar Skeleton */}
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-700 to-teal-800/50 animate-pulse border border-teal-500/30"></div>

          {!isCollapsed && (
            <div className="flex-1 space-y-2">
              {/* User Name Skeleton */}
              <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 animate-pulse"></div>
              {/* User Email Skeleton */}
              <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Items Skeleton */}
      <div className="p-4 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Main Menu Item */}
            <div className="flex items-center space-x-3 p-2 rounded-lg">
              {/* Icon Skeleton */}
              <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>

              {!isCollapsed && (
                <>
                  {/* Label Skeleton */}
                  <div className="flex-1">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-28 animate-pulse"></div>
                  </div>
                  {/* Chevron Skeleton for items with children */}
                  {i % 3 === 0 && (
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                  )}
                </>
              )}
            </div>

            {/* Sub-items Skeleton for some items */}
            {!isCollapsed && i % 3 === 0 && (
              <div className="ml-8 space-y-2 mt-2 border-l-2 border-teal-500/20 pl-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex items-center space-x-2 py-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-cyan-800/40 rounded animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 animate-pulse"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Collapse Button Skeleton for desktop */}
      {!isCollapsed && (
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <div className="h-10 w-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-r-lg animate-pulse"></div>
        </div>
      )}

      {/* Expand Button Skeleton for collapsed state */}
      {isCollapsed && (
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <div className="h-10 w-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-r-lg animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default SideBarLoading;
