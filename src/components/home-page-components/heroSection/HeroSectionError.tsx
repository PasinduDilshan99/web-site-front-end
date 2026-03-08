import React from "react";

const HeroSectionError = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center">
      {/* Animated wave effect in background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-500/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-500/20 to-transparent animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="text-center text-white relative z-10 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 shadow-2xl shadow-teal-500/10">
        <div className="mb-6">
          {/* Ocean wave icon */}
          <svg
            className="w-16 h-16 mx-auto text-teal-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 12.5c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1-2.5-1-4-1M20 16.5c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1-2.5-1-4-1"
            />
          </svg>
          <p className="text-xl text-teal-300 mb-2 font-light">
            {"No sea treasures found"}
          </p>
          <p className="text-sm text-cyan-300/70 mb-6">
            The ocean depths are quiet...
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transform hover:scale-105 font-medium"
        >
          Dive Again
        </button>
      </div>
    </div>
  );
};

export default HeroSectionError;
