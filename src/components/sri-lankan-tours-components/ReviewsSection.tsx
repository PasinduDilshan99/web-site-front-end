// components/sri-lankan-tours-components/ReviewsSection.tsx
import React, { useState, useEffect, useCallback, JSX } from "react";
import { TourReview } from "@/types/sri-lankan-tour-types";
import Image from "next/image";
import SectionHeader from "../common-components/section-header/SectionHeader";

interface ReviewsSectionProps {
  reviews: TourReview[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  loading,
  error,
  onRetry,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Auto-play interval (5 seconds)
  const AUTO_PLAY_INTERVAL = 5000;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || reviews.length <= 1) return;

    const interval = setInterval(() => {
      nextReview();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlay, reviews.length, currentIndex]);

  const nextReview = useCallback((): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedImageIndex(0); // Reset image selection when changing review
  }, [reviews.length]);

  const prevReview = useCallback((): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setSelectedImageIndex(0); // Reset image selection when changing review
  }, [reviews.length]);

  const goToReview = (index: number): void => {
    setCurrentIndex(index);
    setSelectedImageIndex(0);
  };

  const toggleAutoPlay = (): void => {
    setIsAutoPlay((prev) => !prev);
  };

  const selectImage = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const nextImage = (): void => {
    const currentReview = reviews[currentIndex];
    if (currentReview.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === currentReview.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (): void => {
    const currentReview = reviews[currentIndex];
    if (currentReview.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? currentReview.images.length - 1 : prev - 1
      );
    }
  };

  const getReactionIcon = (reactionType: string): string => {
    switch (reactionType) {
      case "LIKE":
        return "👍";
      case "LOVE":
        return "❤️";
      case "WOW":
        return "😮";
      default:
        return "👍";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 sm:ml-2 text-base sm:text-lg font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-base sm:text-lg text-gray-600">
              Loading reviews...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500 text-base sm:text-lg mb-2">
              No reviews available yet.
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Be the first to share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500 text-base sm:text-lg mb-2">
              No reviews available yet.
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Be the first to share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
          <SectionHeader
            subtitle=""
            title="Customer Reviews"
            description="See what our travelers are saying about their experiences"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Carousel Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 relative">
          {/* Navigation Arrows */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={prevReview}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Previous review"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextReview}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Next review"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Auto-play Toggle */}
          {reviews.length > 1 && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
              <button
                onClick={toggleAutoPlay}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isAutoPlay
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                <span className="text-xs sm:text-sm">
                  {isAutoPlay ? "⏸️" : "▶️"}
                </span>
                <span className="hidden xs:inline">
                  {isAutoPlay ? "Pause" : "Play"}
                </span>
              </button>
            </div>
          )}

          {/* Review Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Images Section */}
            <div className="space-y-3 sm:space-y-4">
              {/* Primary Image Display */}
              {currentReview.images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
                    <Image
                      src={currentReview.images[selectedImageIndex].imageUrl}
                      alt={currentReview.images[selectedImageIndex].imageName}
                      className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg sm:rounded-xl"
                      width={600}
                      height={400}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority={currentIndex === 0}
                    />
                  </div>

                  {/* Image Navigation Arrows */}
                  {currentReview.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-all duration-300"
                        aria-label="Previous image"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-all duration-300"
                        aria-label="Next image"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {currentReview.images.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                      {selectedImageIndex + 1} / {currentReview.images.length}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm sm:text-base">No images available</p>
                  </div>
                </div>
              )}

              {/* Thumbnail Gallery */}
              {currentReview.images.length > 1 && (
                <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-2">
                  {currentReview.images.map((image, index) => (
                    <button
                      key={image.imageId}
                      onClick={() => selectImage(index)}
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? "border-purple-500 ring-1 sm:ring-2 ring-purple-200"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.imageName}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Review Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Review Header */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {currentReview.reviewName}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-purple-600 font-medium mt-1">
                      {currentReview.tourName}
                    </p>
                  </div>
                  <div className="xs:self-start">
                    {renderStars(currentReview.rating)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <span>
                    👥 {currentReview.numberOfParticipate} participants
                  </span>
                  <span className="hidden xs:inline">•</span>
                  <span>{formatDate(currentReview.reviewCreatedAt)}</span>
                  <span className="hidden xs:inline">•</span>
                  <span>By {currentReview.reviewCreatedUser}</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed sm:leading-loose">
                  {currentReview.review}
                </p>
                {currentReview.reviewDescription && (
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 italic border-l-3 sm:border-l-4 border-purple-500 pl-3 sm:pl-4 py-1 sm:py-2">
                    {currentReview.reviewDescription}
                  </p>
                )}
              </div>

              {/* Reactions */}
              {currentReview.reactions.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                    Reactions
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {currentReview.reactions.map((reaction) => (
                      <div
                        key={reaction.reviewReactionId}
                        className="flex items-center space-x-1 bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full border text-xs sm:text-sm"
                        title={`${reaction.reactionUserName} - ${reaction.reactionType}`}
                      >
                        <span>{getReactionIcon(reaction.reactionType)}</span>
                        <span className="text-gray-700">
                          {reaction.reactionUserName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Summary */}
              {currentReview.comments.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                    {currentReview.comments.length} Comment
                    {currentReview.comments.length !== 1 ? "s" : ""}
                  </h4>
                  <div className="space-y-2 max-h-24 sm:max-h-32 overflow-y-auto">
                    {currentReview.comments
                      .filter((comment) => comment.parentCommentId === null)
                      .slice(0, 3)
                      .map((comment) => (
                        <div
                          key={comment.commentId}
                          className="text-xs sm:text-sm"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">
                              {comment.commentUserName}
                            </span>
                          </div>
                          <p className="text-gray-700 truncate">
                            {comment.comment}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Carousel Indicators */}
          {reviews.length > 1 && (
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-purple-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  } ${
                    index === currentIndex
                      ? "w-6 sm:w-8 h-2 sm:h-3"
                      : "w-2 sm:w-3 h-2 sm:h-3"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Review Counter */}
        <div className="text-center mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base">
          Review {currentIndex + 1} of {reviews.length}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
