export const FaqLoading = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-purple-200 to-amber-200 rounded-lg w-48 sm:w-64 md:w-80 lg:w-96 mx-auto mb-3 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gradient-to-r from-amber-100 to-purple-100 rounded w-32 sm:w-48 md:w-64 mx-auto"></div>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-purple-100">
                <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-purple-200 to-amber-200 rounded mb-2"></div>
                <div className="h-3 sm:h-4 bg-gradient-to-r from-amber-100 to-purple-100 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
