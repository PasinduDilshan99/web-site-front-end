import React from "react";

const HeroSectionLoading = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white w-full max-w-4xl px-4">
        {/* Header Section Loading State */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-white mx-auto mb-4 sm:mb-6"></div>
          <div className="h-3 sm:h-4 bg-gray-700 rounded w-32 sm:w-48 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="h-6 sm:h-8 md:h-10 bg-gray-700 rounded w-48 sm:w-64 md:w-80 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="h-1 bg-gray-700 rounded w-12 sm:w-16 mx-auto animate-pulse"></div>
        </div>
        ˝{/* Hero Image Slider Loading State */}
        <div className="max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">
          {[...Array(3)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden justify-center"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-gray-800 rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${rowIndex * 100 + i * 50}ms`,
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        {/* Button Loading State */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <div className="h-12 sm:h-14 bg-gray-800 rounded-full w-48 sm:w-56 animate-pulse"></div>
          <div className="h-12 sm:h-14 bg-gray-800 rounded-full w-48 sm:w-56 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionLoading;
