import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ThumbsUp,
  Smile,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Review } from "@/pages/ActivityPage";

// Props interface
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
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const toggleComments = (reviewId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case "LIKE":
        return <ThumbsUp className="w-4 h-4" />;
      case "LOVE":
        return <Heart className="w-4 h-4" />;
      case "WOW":
        return <Smile className="w-4 h-4" />;
      default:
        return <ThumbsUp className="w-4 h-4" />;
    }
  };

  const getReactionCounts = (reactions: any[]) => {
    const counts: { [key: string]: number } = {};
    reactions.forEach((reaction) => {
      counts[reaction.reactionType] = (counts[reaction.reactionType] || 0) + 1;
    });
    return counts;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-gray-500">
          <p>No reviews available yet.</p>
        </div>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];
  const reactionCounts = getReactionCounts(currentReview.reactions);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Customer Reviews
        </h2>
        <p className="text-gray-600">
          See what our adventurers have to say about their experiences
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Review Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentReview.reviewName}
                </h3>
                <p className="text-purple-600 font-medium mb-1">
                  {currentReview.activityName}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(currentReview.reviewCreatedAt)} •{" "}
                  {currentReview.numberOfParticipate} participants
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full">
                <Star className="w-5 h-5 fill-current mr-1" />
                <span className="font-bold text-lg">
                  {currentReview.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Description Badge */}
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {currentReview.description}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {currentReview.review}
            </p>

            {/* Images */}
            {currentReview.images.length > 0 && (
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentReview.images.map((image) => (
                  <div
                    key={image.imageId}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.imageName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Reactions */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              {Object.entries(reactionCounts).map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full"
                >
                  {getReactionIcon(type)}
                  <span className="text-sm font-medium text-gray-700">
                    {count}
                  </span>
                  <span className="text-xs text-gray-500">{type}</span>
                </div>
              ))}
            </div>

            {/* Comments Section */}
            <div>
              <button
                onClick={() => toggleComments(currentReview.reviewId)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {expandedComments[currentReview.reviewId] ? "Hide" : "Show"}{" "}
                  Comments ({currentReview.comments.length})
                </span>
              </button>

              {expandedComments[currentReview.reviewId] && (
                <div className="space-y-4">
                  {currentReview.comments.map((comment) => (
                    <div
                      key={comment.commentId}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {comment.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(comment.commentCreatedAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.comment}</p>

                      {/* Comment Reactions */}
                      {comment.commentReactions.length > 0 && (
                        <div className="flex items-center gap-2">
                          {comment.commentReactions.map((reaction) => (
                            <div
                              key={reaction.commentReactionId}
                              className="flex items-center gap-1 text-xs text-gray-600"
                            >
                              {getReactionIcon(reaction.commentReactionType)}
                              <span>{reaction.userName}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-purple-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Review Counter */}
      <div className="text-center mt-6 text-gray-600">
        Review {currentIndex + 1} of {reviews.length}
      </div>
    </div>
  );
};

export default ReviewsSection;
