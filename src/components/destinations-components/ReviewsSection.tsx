import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Calendar,
  MapPin,
} from "lucide-react";
import { Review } from "@/pages/DestinationPage";
import SectionHeader from "../common-components/section-header/SectionHeader";

interface ReviewsSectionProps {
  reviews: Review[];
  loading?: boolean;
  error?: string | null;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = [],
  loading = false,
  error = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setExpandedComments(false);
        setSelectedImageIndex(0);
      }, 8000); // Increased interval for better readability
      return () => clearInterval(interval);
    }
  }, [isPaused, reviews.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setExpandedComments(false);
    setSelectedImageIndex(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setExpandedComments(false);
    setSelectedImageIndex(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleComments = () => {
    setExpandedComments(!expandedComments);
    setIsPaused(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReactionIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "LOVE":
        return "❤️";
      case "LIKE":
        return "👍";
      case "HAHA":
        return "😄";
      case "WOW":
        return "😮";
      case "SAD":
        return "😢";
      case "ANGRY":
        return "😠";
      default:
        return "👍";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
              index < Math.floor(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm sm:text-base md:text-lg font-semibold text-gray-800">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <p className="text-center text-gray-500 text-sm sm:text-base">
          No reviews available
        </p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <SectionHeader
          subtitle="TRAVELER REVIEWS"
          title="What Travelers Say"
          description="Real experiences from our community of explorers"
          fromColor="#3B82F6"
          toColor="#8B5CF6"
        />
      </div>

      {/* Main Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons - Desktop */}
        <button
          onClick={goToPrev}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 xl:-translate-x-8 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all border border-gray-200"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 xl:translate-x-8 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all border border-gray-200"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-gray-700" />
        </button>

        {/* Review Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg sm:text-xl md:text-2xl flex-shrink-0 shadow-md">
                  {currentReview.reviewUserName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 truncate">
                    {currentReview.reviewUserName}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      {currentReview.destinationName}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {formatDate(currentReview.reviewCreatedAt)}
                    </div>
                  </div>
                  <div className="mt-1">
                    {renderStars(currentReview.reviewRating)}
                  </div>
                </div>
              </div>

              {/* Pause/Play Button */}
              <button
                onClick={togglePause}
                className="self-start sm:self-auto p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all shadow-sm hover:shadow-md"
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                ) : (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* Review Text */}
            <div className="mb-6 md:mb-8">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose">
                {currentReview.reviewText}
              </p>
            </div>

            {/* Review Images Gallery */}
            {currentReview.images.length > 0 && (
              <div className="mb-6 md:mb-8">
                {/* Main Image */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[420px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 mb-3 shadow-md">
                  <img
                    src={currentReview.images[selectedImageIndex].imageUrl}
                    alt={
                      currentReview.images[selectedImageIndex]
                        .imageDescription ||
                      currentReview.images[selectedImageIndex].imageName
                    }
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x600?text=Image+Not+Available";
                    }}
                  />

                  {/* Image Description Overlay */}
                  {currentReview.images[selectedImageIndex]
                    .imageDescription && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-6">
                      <p className="text-white text-xs sm:text-sm md:text-base font-medium line-clamp-2">
                        {
                          currentReview.images[selectedImageIndex]
                            .imageDescription
                        }
                      </p>
                    </div>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold">
                    {selectedImageIndex + 1} / {currentReview.images.length}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {currentReview.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {currentReview.images.map((image, index) => (
                      <button
                        key={image.imageId}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                          selectedImageIndex === index
                            ? "ring-2 ring-blue-500 shadow-md scale-105"
                            : "ring-1 ring-gray-200 hover:ring-gray-400 hover:scale-105"
                        }`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.imageName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Review Stats */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="font-semibold text-gray-900">
                    {currentReview.reactions.length}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">
                    {currentReview.comments.length}
                  </span>
                </span>
              </div>
            </div>

            {/* Reactions Summary */}
            {currentReview.reactions.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                  Reactions ({currentReview.reactions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentReview.reactions.map((reaction) => (
                    <div
                      key={reaction.reviewReactionId}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200 hover:border-gray-300 transition-all text-xs sm:text-sm"
                    >
                      <span className="text-base">
                        {getReactionIcon(reaction.reactionType)}
                      </span>
                      <span className="font-medium text-gray-700">
                        {reaction.reactionUserName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Toggle */}
            {currentReview.comments.length > 0 && (
              <div className="mb-2">
                <button
                  onClick={toggleComments}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm sm:text-base transition-all border border-gray-200 flex items-center justify-center gap-2"
                >
                  {expandedComments ? "Hide" : "Show"} Comments (
                  {currentReview.comments.length})
                  {expandedComments ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Expanded Comments Section */}
          {expandedComments && currentReview.comments.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50/50 p-4 sm:p-6 md:p-8">
              <div className="space-y-4">
                {currentReview.comments
                  .filter(
                    (comment) =>
                      comment.parentCommentId === null ||
                      comment.parentCommentId === 0
                  )
                  .map((comment) => (
                    <div key={comment.commentId} className="space-y-3">
                      {/* Main Comment */}
                      <div className="bg-white rounded-lg sm:rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                            {comment.commentUserName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                              <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                {comment.commentUserName}
                              </span>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {formatDate(comment.commentCreatedAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                              {comment.commentText}
                            </p>
                          </div>
                        </div>

                        {/* Comment Reactions */}
                        {comment.commentReactions.length > 0 && (
                          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            {comment.commentReactions.map((reaction) => (
                              <span
                                key={reaction.commentReactionId}
                                className="text-sm"
                                title={reaction.commentReactionUserName}
                              >
                                {getReactionIcon(reaction.commentReactionType)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Replies */}
                      {currentReview.comments
                        .filter(
                          (reply) => reply.parentCommentId === comment.commentId
                        )
                        .map((reply) => (
                          <div
                            key={reply.commentId}
                            className="ml-6 sm:ml-8 md:ml-12 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-start gap-2 sm:gap-3 mb-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                                {reply.commentUserName.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                  <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                                    {reply.commentUserName}
                                  </span>
                                  <span className="text-xs text-gray-500 flex-shrink-0">
                                    {formatDate(reply.commentCreatedAt)}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
                                  {reply.commentText}
                                </p>
                              </div>
                            </div>

                            {/* Reply Reactions */}
                            {reply.commentReactions.length > 0 && (
                              <div className="flex items-center gap-2 pt-2 border-t border-gray-100 ml-8 sm:ml-10">
                                {reply.commentReactions.map((reaction) => (
                                  <span
                                    key={reaction.commentReactionId}
                                    className="text-xs"
                                    title={reaction.commentReactionUserName}
                                  >
                                    {getReactionIcon(
                                      reaction.commentReactionType
                                    )}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setExpandedComments(false);
                setSelectedImageIndex(0);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                  : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex lg:hidden justify-center gap-3 mt-4 sm:mt-6">
          <button
            onClick={goToPrev}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all border border-gray-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all border border-gray-200"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
