interface FaqErrorProps {
  error: string;
}

export const FaqError = ({ error }: FaqErrorProps) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl p-6 sm:p-8 border border-red-200">
          <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
            ❌
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Failed to Load FAQs
          </h3>
          <p className="text-red-500 text-sm sm:text-base mb-4 sm:mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
};
