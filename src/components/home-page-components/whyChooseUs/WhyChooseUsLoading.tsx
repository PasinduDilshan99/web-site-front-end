import React from "react";

const WhyChooseUsLoading = () => {
  return (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center p-8">
      <div className="w-full mx-auto">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">
              Loading why choose us...
            </span>
          </div>
        </div>

        {/* Why Choose Us Cards - 3 cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-6 border border-teal-500/20 animate-pulse"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mb-4 mx-auto"></div>
              <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mx-auto mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsLoading;
