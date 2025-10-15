import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface ReviewImage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

interface ReviewReaction {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdAt: string;
}

interface CommentReaction {
  id: number;
  commentId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

interface ReviewComment {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number;
  comment: string;
  status: string;
  createdAt: string;
  createdBy: number;
  reactions: CommentReaction[];
}

interface PackageReview {
  reviewId: number;
  packageId: number;
  packageScheduleId: number;
  name: string;
  review: string;
  rating: number;
  description: string;
  status: string;
  numberOfParticipate: number;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

interface ReviewsSectionProps {
  reviews: PackageReview[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
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
      }, 5000);
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

  const getReactionIcon = (reactionType: string) => {
    switch (reactionType) {
      case "LIKE":
        return "👍";
      case "LOVE":
        return "❤️";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              index < Math.floor(rating)
                ? "text-amber-400 fill-current"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-base sm:text-lg font-semibold text-gray-800">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl shadow-lg p-6 md:p-8">
        <p className="text-center text-gray-500">No reviews available</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-amber-50 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600 mb-2">
          CUSTOMER FEEDBACK
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent mb-3">
          What Our Travelers Say
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
          Read genuine reviews from travelers who have experienced our packages firsthand
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={goToPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-12 z-10 bg-gradient-to-br from-amber-500 to-purple-600 rounded-full p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-12 z-10 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>

        {/* Review Card */}
        <div className="bg-white border-2 border-purple-200 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div className="flex-1 w-full">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {currentReview.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  {currentReview.description}
                </p>
                {renderStars(currentReview.rating)}
              </div>
              <button
                onClick={togglePause}
                className="self-start sm:self-auto p-3 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 hover:from-amber-200 hover:to-purple-200 transition-all shadow-md hover:shadow-lg"
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
              >
                {isPaused ? (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700" />
                ) : (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700" />
                )}
              </button>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {currentReview.review}
            </p>

            {/* Review Images Gallery */}
            {currentReview.images.length > 0 && (
              <div className="mb-6 lg:mb-8">
                {/* Main Image */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-amber-100 mb-3 lg:mb-4 shadow-lg">
                  <img
                    src={currentReview.images[selectedImageIndex].imageUrl}
                    alt={currentReview.images[selectedImageIndex].description || currentReview.images[selectedImageIndex].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
                    }}
                  />
                  {currentReview.images[selectedImageIndex].description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 via-purple-900/60 to-transparent p-3 sm:p-4 lg:p-6">
                      <p className="text-white text-sm sm:text-base lg:text-lg font-medium">
                        {currentReview.images[selectedImageIndex].description}
                      </p>
                    </div>
                  )}
                  {/* Image Counter */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-purple-900/80 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {selectedImageIndex + 1} / {currentReview.images.length}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {currentReview.images.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-3">
                    {currentReview.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-16 sm:h-20 lg:h-24 rounded-lg overflow-hidden transition-all ${
                          selectedImageIndex === index
                            ? "ring-4 ring-amber-500 shadow-lg scale-105"
                            : "ring-2 ring-purple-200 hover:ring-purple-400 hover:scale-105"
                        }`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Review Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-sm text-gray-600 pb-6 border-b-2 border-purple-100">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">{currentReview.numberOfParticipate} participants</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(currentReview.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{currentReview.reactions.length}</span>
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-semibold">{currentReview.comments.length}</span>
                </span>
              </div>
            </div>

            {/* Reactions Summary */}
            {currentReview.reactions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  Reactions ({currentReview.reactions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentReview.reactions.map((reaction) => (
                    <div
                      key={reaction.id}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-50 to-purple-50 rounded-full border-2 border-purple-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
                    >
                      <span className="text-base sm:text-lg">{getReactionIcon(reaction.reactionType)}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{reaction.userName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Toggle Button */}
            {currentReview.comments.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={toggleComments}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-amber-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  {expandedComments ? "Hide" : "Show"} All Comments ({currentReview.comments.length})
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform ${
                      expandedComments ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Expanded Comments Section */}
          {expandedComments && currentReview.comments.length > 0 && (
            <div className="border-t-2 border-purple-200 bg-gradient-to-br from-purple-50 to-amber-50 p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-5">
                {currentReview.comments
                  .filter((comment) => comment.parentCommentId === 0)
                  .map((comment) => (
                    <div key={comment.id} className="space-y-3">
                      {/* Main Comment */}
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3 sm:gap-4 mb-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-xl flex-shrink-0 shadow-md">
                            {comment.userName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                              <span className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                                {comment.userName}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                        {comment.reactions.length > 0 && (
                          <div className="flex items-center gap-2 pt-3 border-t border-purple-100">
                            {comment.reactions.map((reaction) => (
                              <span
                                key={reaction.id}
                                className="flex items-center gap-1 text-base sm:text-lg"
                                title={reaction.userName}
                              >
                                {getReactionIcon(reaction.reactionType)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Replies */}
                      {currentReview.comments
                        .filter((reply) => reply.parentCommentId === comment.id)
                        .map((reply) => (
                          <div
                            key={reply.id}
                            className="ml-6 sm:ml-10 lg:ml-16 bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-2 sm:gap-3 mb-2">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 shadow-md">
                                {reply.userName.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                  <span className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base truncate">
                                    {reply.userName}
                                  </span>
                                  <span className="text-xs text-gray-500 flex-shrink-0">
                                    {formatDate(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed break-words">
                                  {reply.comment}
                                </p>
                              </div>
                            </div>
                            {reply.reactions.length > 0 && (
                              <div className="flex items-center gap-2 pt-2 border-t border-amber-100 ml-10 sm:ml-12">
                                {reply.reactions.map((reaction) => (
                                  <span
                                    key={reaction.id}
                                    className="flex items-center gap-1 text-sm sm:text-base"
                                    title={reaction.userName}
                                  >
                                    {getReactionIcon(reaction.reactionType)}
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
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setExpandedComments(false);
                setSelectedImageIndex(0);
              }}
              className={`h-2 sm:h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 sm:w-10 lg:w-12 bg-gradient-to-r from-amber-500 to-purple-600 shadow-lg"
                  : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={goToPrev}
            className="bg-gradient-to-br from-amber-500 to-purple-600 rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="bg-gradient-to-br from-purple-600 to-amber-500 rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;