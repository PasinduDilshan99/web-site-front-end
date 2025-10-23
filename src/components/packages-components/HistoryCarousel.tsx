// components/packages-components/HistoryCarousel.tsx
import React from "react";
import { PackageHistory } from "../../types/packages-types";

interface HistoryCarouselProps {
  historyData: PackageHistory[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const HistoryCarousel: React.FC<HistoryCarouselProps> = ({
  historyData,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="py-8 sm:py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Loading historical packages...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
          <div className="text-red-600 mb-3">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">
            Failed to load history
          </h3>
          <p className="text-red-600 text-sm sm:text-base mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!historyData || historyData.length === 0) {
    return (
      <div className="py-8 sm:py-12 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
          <div className="text-gray-400 mb-3">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            No History Available
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            No historical package data found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Journey History
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the amazing experiences and memories created by our
            travelers
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-6 sm:pb-8">
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 min-w-min">
              {historyData.map((history) => (
                <HistoryCard key={history.packageHistoryId} history={history} />
              ))}
            </div>
          </div>

          {/* Scroll indicator for mobile */}
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex space-x-2">
              {historyData.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual History Card Component
const HistoryCard: React.FC<{ history: PackageHistory }> = ({ history }) => {
  const validImages = history.images.filter((img) => img.imageUrl);
  const mainImage =
    validImages[0]?.imageUrl || "/images/placeholder-history.jpg";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{
        borderLeft: `4px solid ${history.color}`,
        borderBottom: `4px solid ${history.hoverColor || history.color}`,
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={history.packageScheduleName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/placeholder-history.jpg";
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 text-xs sm:text-sm font-semibold text-white rounded-full shadow-lg"
            style={{ backgroundColor: history.color }}
          >
            {history.duration} Day{history.duration > 1 ? "s" : ""}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black bg-opacity-50 px-2 py-1 rounded-full">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white text-xs sm:text-sm font-semibold">
            {history.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
          {history.packageScheduleName}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
          {history.historyDescription}
        </p>

        {/* Package Info */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-700 font-semibold">
            {history.packageInfo.packageName}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs sm:text-sm text-gray-600">
              {formatDate(history.startDate)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm text-gray-600">
              {history.numberOfParticipate} Participants
            </span>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 overflow-hidden">
              {history.createdByUser.imageUrl ? (
                <img
                  src={history.createdByUser.imageUrl}
                  alt={history.createdByUser.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/users/user-placeholder.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {history.createdByUser.fullName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {history.createdByUser.fullName}
              </p>
              <p className="text-xs text-gray-500">Organizer</p>
            </div>
          </div>

          {/* Additional Images Count */}
          {validImages.length > 1 && (
            <div className="flex -space-x-2">
              {validImages.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <img
                    src={image.imageUrl || "/images/placeholder-history.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {validImages.length > 4 && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">
                    +{validImages.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryCarousel;
