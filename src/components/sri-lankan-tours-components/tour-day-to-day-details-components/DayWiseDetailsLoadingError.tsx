import React from 'react';

interface DayWiseDetailsLoadingErrorProps {
  onRetry?: () => void;
  message?: string;
}

const DayWiseDetailsLoadingError = ({ 
  onRetry, 
  message = "We're having trouble loading the day-wise itinerary." 
}: DayWiseDetailsLoadingErrorProps) => {
  return (
    <div className="w-full min-h-[500px] bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-[#54A5CC]/20">
        {/* Day-wise themed Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#2A6F97] to-[#54A5CC] rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {/* Calendar icon */}
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
              {/* Clock icon */}
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 11v3l2 2" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#1D4F6E] mb-3">
          Unable to Load Itinerary
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

        {/* Day-wise preview skeleton */}
        <div className="mt-8 space-y-4">
          {/* Day indicators */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((day) => (
              <div 
                key={day}
                className="w-10 h-10 rounded-full bg-[#2A6F97]/10 border border-[#54A5CC]/20 flex items-center justify-center text-[#2A6F97] font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Sample day activity */}
          <div className="bg-white/50 rounded-xl p-4 border border-[#54A5CC]/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A6F97] to-[#54A5CC]/30 flex items-center justify-center text-white text-sm">
                1
              </div>
              <div className="flex-1 text-left">
                <div className="h-4 w-32 bg-[#2A6F97]/20 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-24 bg-[#54A5CC]/20 rounded animate-pulse"></div>
              </div>
              <div className="text-[#2A6F97] text-sm font-medium">
                Day 1
              </div>
            </div>
            <div className="space-y-2 text-left">
              <div className="h-3 w-full bg-[#2A6F97]/10 rounded animate-pulse"></div>
              <div className="h-3 w-3/4 bg-[#2A6F97]/10 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Activity tags preview */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Morning Tour
            </span>
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lunch
            </span>
            <span className="px-3 py-1 bg-[#2A6F97]/5 text-[#2A6F97] rounded-full text-xs border border-[#54A5CC]/20 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Evening Activity
            </span>
          </div>

          {/* Meals preview */}
          <div className="flex justify-center gap-4 text-xs text-[#54A5CC]">
            <span>🍳 Breakfast</span>
            <span>🍽️ Lunch</span>
            <span>🍽️ Dinner</span>
          </div>
        </div>

        {/* Back navigation */}
        <p className="mt-6 text-sm text-[#54A5CC]">
          or{" "}
          <button 
            onClick={() => window.history.back()}
            className="text-[#2A6F97] hover:text-[#1D4F6E] underline underline-offset-2 font-medium"
          >
            return to package overview
          </button>
        </p>
      </div>
    </div>
  );
};

export default DayWiseDetailsLoadingError;