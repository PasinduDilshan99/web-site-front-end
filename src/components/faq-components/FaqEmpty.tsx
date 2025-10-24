export const FaqEmpty = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl p-6 sm:p-8 border border-purple-100">
          <div className="text-purple-400 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
            💬
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2">
            No FAQs Available
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Check back later for frequently asked questions.
          </p>
        </div>
      </div>
    </section>
  );
};
