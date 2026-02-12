export const FaqLoading = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 min-h-screen">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Simple loading header */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
            <span className="text-teal-300 text-sm">Loading FAQs...</span>
          </div>
        </div>

        {/* Header Section Skeleton */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-lg w-48 sm:w-64 md:w-80 lg:w-96 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-32 sm:w-48 md:w-64 mx-auto animate-pulse"></div>
          <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-16 sm:w-20 md:w-24 mx-auto mt-4 animate-pulse"></div>
        </div>

        {/* FAQ Items Skeleton */}
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index} 
              className="animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-teal-500/20">
                {/* Question Row */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-3/4 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-1/2"></div>
                  </div>
                  {/* Chevron Icon Placeholder */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full ml-4 flex-shrink-0"></div>
                </div>
                
                {/* Answer Preview (hidden on some items for variety) */}
                {index % 2 === 0 && (
                  <div className="mt-4 pt-4 border-t border-teal-500/20">
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-4/6"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton - View More Button */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="h-10 sm:h-11 md:h-12 bg-gradient-to-r from-gray-800 to-teal-900/50 rounded-full w-32 sm:w-36 md:w-40 mx-auto animate-pulse border border-teal-500/20"></div>
          
          {/* FAQ Counter Skeleton */}
          <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center items-center space-x-2">
            <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-12 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};