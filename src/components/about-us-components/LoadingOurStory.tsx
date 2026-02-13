import React from "react";

const LoadingOurStory = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="max-w-7xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading our story...</span>
          </div>
        </div>

        {/* Header Section Loading State */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {/* Badge */}
          <div className="h-6 sm:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full w-24 sm:w-28 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

          {/* Title */}
          <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-r from-gray-700 to-cyan-800/50 rounded w-32 sm:w-40 md:w-48 lg:w-56 mx-auto mb-3 sm:mb-4 animate-pulse"></div>

          {/* Divider */}
          <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-16 sm:w-20 md:w-24 mx-auto mb-4 sm:mb-5 md:mb-6 animate-pulse"></div>

          {/* Description */}
          <div className="max-w-3xl mx-auto px-4 space-y-2">
            <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full animate-pulse"></div>
            <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mx-auto animate-pulse"></div>
            <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Timeline Section Loading State */}
        <div className="relative mb-10 sm:mb-12 md:mb-16">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500/30 to-cyan-500/30"></div>
          <div className="md:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500/30 to-cyan-500/30"></div>

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {[...Array(4)].map((_, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start gap-4 sm:gap-6">
                    {/* Timeline dot */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 border-2 sm:border-3 border-gray-900/50 shadow-lg mt-1 animate-pulse"></div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/80 to-teal-900/30 border border-teal-500/20 animate-pulse">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="bg-gradient-to-br from-gray-700 to-teal-800/50 p-2 sm:p-2.5 rounded-lg">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-teal-400 to-cyan-400 rounded"></div>
                          </div>
                          <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 sm:w-24"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                          <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center">
                    {isEven ? (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-5 h-5 lg:w-6 lg:h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 border-4 border-gray-900/50 shadow-lg z-10 animate-pulse"></div>
                        <div className="w-1/2 pl-8 lg:pl-12">
                          <div className="p-5 lg:p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-teal-900/30 border border-teal-500/20 animate-pulse">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-gradient-to-br from-gray-700 to-teal-800/50 p-2.5 lg:p-3 rounded-lg">
                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-teal-400 to-cyan-400 rounded"></div>
                              </div>
                              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 lg:w-28"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                              <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-8 lg:pr-12 text-right">
                          <div className="p-5 lg:p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-teal-900/30 border border-teal-500/20 animate-pulse">
                            <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                              <div className="bg-gradient-to-br from-gray-700 to-teal-800/50 p-2.5 lg:p-3 rounded-lg">
                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-teal-400 to-cyan-400 rounded"></div>
                              </div>
                              <div className="h-5 lg:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 lg:w-28"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                              <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 ml-auto"></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-5 h-5 lg:w-6 lg:h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 border-4 border-gray-900/50 shadow-lg z-10 animate-pulse"></div>
                        <div className="w-1/2"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section Loading State */}
        <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-teal-500/20 animate-pulse">
          <div className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 sm:w-48 md:w-56 mx-auto mb-6 sm:mb-8"></div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-700 to-teal-800/50 mx-auto mb-3 sm:mb-4 shadow-md"></div>
                <div className="h-5 sm:h-6 md:h-7 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-24 sm:w-28 mx-auto mb-2 sm:mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingOurStory;
