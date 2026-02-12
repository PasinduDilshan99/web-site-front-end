import React from "react";

const CeoSpeechLoading = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 py-6 md:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 lg:mb-10">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading CEO message...
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT IMAGE - CEO PHOTO PLACEHOLDER */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>

              {/* Image placeholder */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-700 to-teal-800/50 border border-teal-500/20 animate-pulse flex items-center justify-center">
                  {/* User icon placeholder */}
                  <svg
                    className="w-32 h-32 text-teal-500/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Name card placeholder */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 text-center min-w-[260px] border border-teal-500/30 animate-pulse">
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mx-auto mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SPEECH PLACEHOLDER */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Quote icon placeholder */}
            <div className="inline-block p-4 bg-gradient-to-br from-gray-800 to-teal-900/50 rounded-2xl border border-teal-500/20 animate-pulse">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded"></div>
            </div>

            {/* Title section */}
            <div className="space-y-3">
              <div className="h-6 md:h-8 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 md:w-56 lg:w-64 animate-pulse"></div>
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full w-24 animate-pulse"></div>
            </div>

            {/* Speech paragraphs */}
            <div className="space-y-4">
              {/* First paragraph */}
              <div className="space-y-2">
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 animate-pulse"></div>
              </div>

              {/* Second paragraph */}
              <div className="space-y-2">
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Typing effect placeholder - last paragraph with cursor */}
              <div className="flex items-center space-x-1">
                <div className="h-4 md:h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 animate-pulse"></div>
                <span className="inline-block w-0.5 h-5 bg-teal-400 animate-pulse"></span>
              </div>
            </div>

            {/* CEO name and title placeholder */}
            <div className="pt-6 space-y-2">
              <div className="h-5 md:h-6 lg:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 animate-pulse"></div>
              <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoSpeechLoading;
