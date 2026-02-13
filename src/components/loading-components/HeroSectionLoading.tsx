import React from "react";

interface HeroSectionLoadingProps {
  text?: string;
}

const HeroSectionLoading: React.FC<HeroSectionLoadingProps> = ({
  text = "Loading hero content...",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center px-4">
      <div className="text-center text-white w-full max-w-7xl">

        {/* Top loading badge */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-14">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-xs sm:text-sm md:text-base">
              {text}
            </span>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 sm:w-40 md:w-48 mx-auto mb-3 animate-pulse"></div>

          <div className="h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-r from-gray-700 to-cyan-800/50 rounded w-40 sm:w-64 md:w-80 lg:w-96 mx-auto mb-3 animate-pulse"></div>

          <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-10 sm:w-14 md:w-16 mx-auto animate-pulse"></div>
        </div>

        {/* Grid skeleton */}
        <div className="w-full max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">

          {[...Array(3)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden justify-center"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="
                    flex-shrink-0
                    w-16 h-16
                    sm:w-24 sm:h-24
                    md:w-32 md:h-32
                    lg:w-40 lg:h-40
                    xl:w-48 xl:h-48
                    2xl:w-56 2xl:h-56
                    bg-gradient-to-br from-gray-800 to-teal-900/30
                    rounded-lg animate-pulse
                    border border-teal-500/10
                  "
                  style={{
                    animationDelay: `${rowIndex * 100 + i * 50}ms`,
                  }}
                />
              ))}
            </div>
          ))}

        </div>

        {/* Button skeleton */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <div className="h-10 sm:h-12 md:h-14 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full w-40 sm:w-48 md:w-56 animate-pulse border border-teal-500/20"></div>

          <div className="h-10 sm:h-12 md:h-14 bg-gradient-to-r from-gray-800 to-cyan-900/50 rounded-full w-40 sm:w-48 md:w-56 animate-pulse border border-cyan-500/20"></div>
        </div>

      </div>
    </div>
  );
};

export default HeroSectionLoading;
