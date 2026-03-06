import React from 'react';

interface PackagesLoadingErrorProps {
  onRetry?: () => void;
  message?: string;
}

const PackagesLoadingError = ({ 
  onRetry, 
  message = "We're having trouble loading our travel packages." 
}: PackagesLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[400px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Package-themed Icon */}
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
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1D4F6E] mb-2">
          Unable to Load Packages
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

        {/* Package categories hint */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1 bg-[#2A6F97]/10 text-[#2A6F97] rounded-full border border-[#54A5CC]/20">
            Adventure Tours
          </span>
          <span className="px-3 py-1 bg-[#2A6F97]/10 text-[#2A6F97] rounded-full border border-[#54A5CC]/20">
            Cultural Trips
          </span>
          <span className="px-3 py-1 bg-[#2A6F97]/10 text-[#2A6F97] rounded-full border border-[#54A5CC]/20">
            Beach Getaways
          </span>
          <span className="px-3 py-1 bg-[#2A6F97]/10 text-[#2A6F97] rounded-full border border-[#54A5CC]/20">
            Wildlife Safaris
          </span>
        </div>
      </div>
    </div>
  );
};

export default PackagesLoadingError;