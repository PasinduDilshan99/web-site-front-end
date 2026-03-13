import React from 'react';

interface ActivityDetailsLoadingErrorProps {
  onRetry?: () => void;
  message?: string;
}

const ActivityDetailsLoadingError = ({ 
  onRetry, 
  message = "We're having trouble loading the activity details." 
}: ActivityDetailsLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[500px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Details-themed Icon */}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#1D4F6E] mb-3">
          Unable to Load Details
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

        {/* Back navigation hint (optional) */}
        <p className="mt-6 text-sm text-[#54A5CC]">
          or go back to{" "}
          <button 
            onClick={() => window.history.back()}
            className="text-[#2A6F97] hover:text-[#1D4F6E] underline underline-offset-2 font-medium"
          >
            previous page
          </button>
        </p>
      </div>
    </div>
  );
};

export default ActivityDetailsLoadingError;