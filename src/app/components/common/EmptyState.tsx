import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: "box" | "folder" | "search" | "document" | "user" | "data";
  actionLabel?: string;
  onAction?: () => void;
  size?: "sm" | "md" | "lg";
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Available",
  message = "There is no data to display at the moment.",
  icon = "box",
  actionLabel,
  onAction,
  size = "md",
}) => {
  const sizeClasses = {
    sm: {
      container: "min-h-[200px]",
      icon: "w-12 h-12 sm:w-14 sm:h-14",
      title: "text-sm sm:text-base font-semibold",
      message: "text-xs sm:text-sm",
    },
    md: {
      container: "min-h-[300px] sm:min-h-[400px]",
      icon: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
      title: "text-base sm:text-lg lg:text-xl font-semibold",
      message: "text-sm sm:text-base lg:text-lg",
    },
    lg: {
      container: "min-h-[400px] sm:min-h-[500px]",
      icon: "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32",
      title: "text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold",
      message: "text-base sm:text-lg lg:text-xl",
    },
  };

  const icons = {
    box: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    ),
    folder: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    user: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    data: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    ),
  };

  return (
    <div className={`${sizeClasses[size].container} flex items-center justify-center`}>
      <div className="text-center px-4 max-w-md">
        <div className="mb-4 sm:mb-6 relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-amber-400 opacity-20 blur-xl rounded-full"></div>
          <svg
            className={`${sizeClasses[size].icon} mx-auto text-gray-400 relative z-10`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icons[icon]}
          </svg>
        </div>
        <h3 className={`${sizeClasses[size].title} text-gray-700 mb-2`}>
          {title}
        </h3>
        <p className={`${sizeClasses[size].message} text-gray-500 mb-4`}>
          {message}
        </p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-amber-600 text-white text-sm sm:text-base font-medium rounded-lg hover:from-purple-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
