import React from 'react';

interface PackageLoadingErrorProps {
  onRetry?: () => void;
  message?: string;
}

const PackageLoadingError = ({ 
  onRetry, 
  message = "We're having trouble loading this package." 
}: PackageLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[400px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Single Package-themed Icon */}
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2A6F97] to-[#54A5CC] rounded-full flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M5 12h14" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1D4F6E] mb-2">
          Unable to Load Package
        </h3>

        {/* Message */}
        <p className="text-[#3F8AB2] mb-6">
          {message} Please try again.
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] text-white font-medium rounded-lg hover:from-[#1D4F6E] hover:to-[#3F8AB2] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Try Again
          </button>
        )}

        {/* Package quick overview skeleton */}
        {/* <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center gap-3 text-xs text-[#54A5CC]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 Days
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              3 Cities
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              🏨 Hotel
            </span>
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              🚗 Transport
            </span>
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              🍽️ Meals
            </span>
          </div>
          <div className="pt-2">
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#2A6F97]/10 to-[#54A5CC]/10 rounded-full">
              <span className="text-sm font-medium text-[#1D4F6E]">From $499</span>
            </div>
          </div>
        </div> */}

        {/* Back navigation */}
        <p className="mt-6 text-sm text-[#54A5CC]">
          or{" "}
          <button 
            onClick={() => window.history.back()}
            className="text-[#2A6F97] hover:text-[#1D4F6E] underline underline-offset-2 font-medium"
          >
            browse other packages
          </button>
        </p>
      </div>
    </div>
  );
};

export default PackageLoadingError;