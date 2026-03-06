import React from 'react';

interface PackageDetailsLoadingErrorProps {
  onRetry?: () => void;
  message?: string;
}

const PackageDetailsLoadingError = ({ 
  onRetry, 
  message = "We're having trouble loading the package details." 
}: PackageDetailsLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[500px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Package Details-themed Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#2A6F97] to-[#54A5CC] rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-white" 
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#1D4F6E] mb-3">
          Unable to Load Package Details
        </h3>

        {/* Message */}
        <p className="text-[#3F8AB2] text-lg mb-8">
          {message} Please try again.
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] text-white font-medium rounded-lg hover:from-[#1D4F6E] hover:to-[#3F8AB2] transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            <svg 
              className="w-5 h-5 mr-2" 
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

        {/* Package highlights skeleton preview */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center gap-4 text-sm text-[#54A5CC]">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Locations
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Price
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="px-4 py-1.5 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              Meals Included
            </span>
            <span className="px-4 py-1.5 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              Guide Service
            </span>
            <span className="px-4 py-1.5 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20">
              Transport
            </span>
          </div>
        </div>

        {/* Back navigation */}
        <p className="mt-6 text-sm text-[#54A5CC]">
          or{" "}
          <button 
            onClick={() => window.history.back()}
            className="text-[#2A6F97] hover:text-[#1D4F6E] underline underline-offset-2 font-medium"
          >
            go back to packages
          </button>
        </p>
      </div>
    </div>
  );
};

export default PackageDetailsLoadingError;