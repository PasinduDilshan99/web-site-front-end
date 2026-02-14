import React from "react";

const SecretQuestionsLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading security questions...
            </span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="h-8 md:h-9 lg:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-48 md:w-56 lg:w-64 mb-2 animate-pulse"></div>
              <div className="h-4 md:h-5 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 md:w-72 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-24 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-16 animate-pulse"></div>
            </div>
          </div>

          {/* Error/Success Message Placeholder */}
          <div className="mb-4 p-4 bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-64 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Current Questions Section Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 animate-pulse"></div>
            <div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-48 animate-pulse"></div>
            </div>
          </div>

          {/* Questions List Skeleton */}
          <div className="space-y-4 mb-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 rounded-lg border border-teal-500/20 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full animate-pulse"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded animate-pulse"></div>
                </div>

                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 mb-3 animate-pulse"></div>

                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 animate-pulse"></div>
                  <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Question Form Skeleton */}
          <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 border border-teal-500/20 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded mr-2 animate-pulse"></div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-36 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
              </div>

              <div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-20 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
              </div>

              <div className="md:col-span-2">
                <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules & Info Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/20 border border-teal-500/20 rounded-lg p-5 mb-6">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mr-3 flex-shrink-0 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-40 mb-2 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full mr-2 mt-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-3/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6">
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <div className="h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-20 animate-pulse"></div>
            <div className="h-10 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg w-44 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretQuestionsLoading;
