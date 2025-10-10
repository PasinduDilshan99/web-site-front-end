"use client";

import { GET_ALL_ACTIVE_REVIEW_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface ReviewImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface ActiveReviewsType {
  reviewId: number;
  reviewerName: string;
  review: string;
  rating: number;
  reviewDescription: string;
  numberOfParticipate: number;
  reviewCreatedAt: string;
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  startLocation: string;
  endLocation: string;
  userId: number;
  userFullName: string;
  userEmail: string;
  reviewStatus: string;
  images: ReviewImage[];
}

const ReviewsCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeReviews, setActiveReviews] = useState<ActiveReviewsType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchActiveReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_REVIEW_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveReviewsType[] = data.data || [];
          setActiveReviews(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active reviews");
        }
      } catch (err) {
        console.error("Error fetching active reviews:", err);
        setError("Something went wrong while fetching active reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveReviews();
  }, []);

  // Auto-play functionality for reviews
  useEffect(() => {
    if (!isAutoPlaying || activeReviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeReviews.length]);

  // Reset image index when review changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentIndex]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeReviews.length) % activeReviews.length
    );
  };

  const nextImage = () => {
    const currentReview = activeReviews[currentIndex];
    setCurrentImageIndex((prev) => (prev + 1) % currentReview.images.length);
  };

  const prevImage = () => {
    const currentReview = activeReviews[currentIndex];
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentReview.images.length) % currentReview.images.length
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] bg-white rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
            Loading amazing reviews...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] bg-white rounded-lg border border-gray-200">
        <div className="text-center p-4 sm:p-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-red-600 text-lg sm:text-xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium text-sm sm:text-base">
            {error}
          </p>
          <button
            onClick={handleRetry}
            className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activeReviews.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] bg-white rounded-lg border border-gray-200">
        <div className="text-center p-4 sm:p-8">
          <p className="text-gray-600 text-sm sm:text-base">
            No reviews available yet
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
            Be the first to leave a review!
          </p>
        </div>
      </div>
    );
  }

  const currentReview = activeReviews[currentIndex];
  const currentImage = currentReview.images[currentImageIndex];

  return (
    <div className="w-full mx-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-purple-100 to-amber-100">
      <div className="relative bg-gradient-to-r from-amber-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] sm:min-h-[500px] flex flex-col">
        {/* Header - Fixed height */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
                REVIEWS
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                What our travelers are saying
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isAutoPlaying ? (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                {currentIndex + 1} / {activeReviews.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - Responsive layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Image Carousel Section */}
          {currentReview.images.length > 0 && (
            <div className="lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-100 relative min-h-[200px] sm:min-h-[250px] lg:min-h-auto">
              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 lg:p-6">
                <div className="relative w-full h-full max-w-xs sm:max-w-sm lg:max-w-md max-h-48 sm:max-h-64 lg:max-h-80">
                  <img
                    src={currentImage?.imageUrl}
                    alt={currentImage?.imageDescription || "Review image"}
                    className="w-full h-full object-contain rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedImage(currentImage?.imageUrl);
                      setImageModalOpen(true);
                    }}
                  />

                  {/* Image Navigation */}
                  {currentReview.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/90 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
                      >
                        <svg
                          className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/90 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
                      >
                        <svg
                          className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                      </button>

                      {/* Image Pagination Dots */}
                      <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
                        {currentReview.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "bg-blue-600 w-3 sm:w-4"
                                : "bg-white/80 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-black/50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                    {currentImageIndex + 1} / {currentReview.images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {currentReview.images.length > 1 && (
                <div className="absolute bottom-1 sm:bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 max-w-full overflow-x-auto pb-1 sm:pb-2 px-2">
                  {currentReview.images.map((img, index) => (
                    <button
                      key={img.imageId}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded border-2 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "border-blue-500 scale-110"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.imageDescription || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Review Details Section */}
          <div
            className={`${
              currentReview.images.length > 0 ? "lg:w-3/5" : "w-full"
            } p-3 sm:p-4 lg:p-6`}
          >
            <div className="h-full flex flex-col justify-between">
              {/* Top Section - Review Content */}
              <div className="space-y-3 sm:space-y-4">
                {/* Review Title and Rating */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    {currentReview.reviewerName}
                  </h3>
                  <div className="flex justify-center gap-1 mb-2 sm:mb-3">
                    {renderStars(currentReview.rating)}
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 font-medium">
                      {currentReview.rating.toFixed(1)}
                    </span>
                  </div>
                  <blockquote className="text-sm sm:text-base lg:text-lg text-gray-800 italic leading-relaxed">
                    {currentReview.review}
                  </blockquote>
                  {currentReview.reviewDescription && (
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">
                      {currentReview.reviewDescription}
                    </p>
                  )}
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {currentReview.userFullName}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {new Date(
                        currentReview.reviewCreatedAt
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Tour and Schedule Info */}
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="truncate max-w-[80px] sm:max-w-none">
                      {currentReview.tourName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                    </svg>
                    <span className="truncate max-w-[80px] sm:max-w-none">
                      {currentReview.scheduleName}
                    </span>
                  </div>
                  {currentReview.numberOfParticipate > 0 && (
                    <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      <span>{currentReview.numberOfParticipate} travelers</span>
                    </div>
                  )}
                </div>

                {/* Location Info */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs text-gray-600">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-xs sm:text-sm">
                    {currentReview.startLocation} → {currentReview.endLocation}
                  </span>
                </div>
              </div>

              {/* Schedule Dates */}
              <div className="border-t border-gray-200 pt-2 sm:pt-3 lg:pt-4 mt-2 sm:mt-3">
                <div className="flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 text-xs text-gray-600">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 text-xs sm:text-sm">
                      Start Date
                    </div>
                    <div className="text-xs">
                      {new Date(
                        currentReview.assumeStartDate
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">→</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 text-xs sm:text-sm">
                      End Date
                    </div>
                    <div className="text-xs">
                      {new Date(currentReview.assumeEndDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Navigation Controls */}
        {activeReviews.length > 1 && (
          <>
            <button
              onClick={prevReview}
              className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/80 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
            >
              <svg
                className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/80 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
            >
              <svg
                className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}

        {/* Review Pagination Dots */}
        {activeReviews.length > 1 && (
          <div className="flex justify-center gap-1 pb-3 sm:pb-4 flex-shrink-0">
            {activeReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-3 sm:w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Review Image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsCarousel;
