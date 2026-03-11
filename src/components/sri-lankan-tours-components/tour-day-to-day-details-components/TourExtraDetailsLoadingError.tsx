import React from 'react';

interface TourExtraDetailsLoadingErrorProps {
  onRetry?: () => void;
}

const TourExtraDetailsLoadingError = ({ onRetry }: TourExtraDetailsLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[300px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Icon */}
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1D4F6E] mb-2">
          Unable to Load Details
        </h3>

        {/* Message */}
        <p className="text-[#3F8AB2] mb-6">
          We&apos;re having trouble loading the additional tour details. Please try again.
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
      </div>
    </div>
  );
};

export default TourExtraDetailsLoadingError;