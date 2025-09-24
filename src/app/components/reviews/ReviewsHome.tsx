"use client";

import { GET_ALL_ACTIVE_REVIEW_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface UserInfo {
  userId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface TourInfo {
  tourId: number;
  name: string;
}

interface PackageInfo {
  packageId: number;
  name: string;
}

interface ReviewImage {
  id: number;
  imageUrl: string;
}

interface ReviewReaction {
  id: number;
  reactionType: string;
  reactedByUserId: number;
  reactedByUsername: string;
}

interface ReviewComment {
  id: number;
  commentText: string;
  parentId?: number;
  commentedBy: UserInfo;
  createdAt: string;
}

interface ActiveReviewsType {
  reviewId: number;
  rating: number;
  reviewDescription: string;
  reviewStatus: string;
  reviewCreatedAt: string;
  reviewUpdatedAt: string;
  reviewer: UserInfo;
  tour?: TourInfo;
  packageInfo?: PackageInfo;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

const ReviewsCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeReviews, setActiveReviews] = useState<ActiveReviewsType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeReviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeReviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeReviews.length) % activeReviews.length
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  const getReactionIcon = (reactionType: string) => {
    switch (reactionType) {
      case "👍":
      case "like":
        return (
          <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24">
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
          </svg>
        );
      case "❤️":
      case "love":
        return (
          <svg
            className="w-4 h-4 fill-red-500 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        );
      default:
        return <span className="text-lg">{reactionType}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading amazing reviews...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-2xl border-2 border-red-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activeReviews.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl">
        <div className="text-center p-8">
          {/* <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" /> */}
          <p className="text-gray-600 text-lg">No reviews available yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Be the first to leave a review!
          </p>
        </div>
      </div>
    );
  }

  const currentReview = activeReviews[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Customer Reviews
              </h2>
              <p className="text-blue-100">What our travelers are saying</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isAutoPlaying ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {currentIndex + 1} / {activeReviews.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Review Content */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Review */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {currentReview.reviewer.avatarUrl ? (
                    <img
                      src={currentReview.reviewer.avatarUrl}
                      alt={currentReview.reviewer.username}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {currentReview.reviewer.firstName &&
                    currentReview.reviewer.lastName
                      ? `${currentReview.reviewer.firstName} ${currentReview.reviewer.lastName}`
                      : currentReview.reviewer.username}
                  </h3>
                  <p className="text-gray-500">
                    @{currentReview.reviewer.username}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                    </svg>
                    <span className="text-sm text-gray-500">
                      {new Date(
                        currentReview.reviewCreatedAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {renderStars(currentReview.rating)}
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {currentReview.rating}.0
                </span>
                <span className="text-gray-500">out of 5</span>
              </div>

              {/* Review Text */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentReview.reviewDescription}
                </p>
              </div>

              {/* Tour/Package Info */}
              <div className="flex flex-wrap gap-3">
                {currentReview.tour && (
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-semibold">
                      {currentReview.tour.name}
                    </span>
                  </div>
                )}
                {currentReview.packageInfo && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.5 4A1.5 1.5 0 006 5.5v1.764a.75.75 0 00.344.63l4.606 3.004L7.53 14.72a.75.75 0 00-.186 1.093l1.72 2.293a.75.75 0 001.093.186l3.42-2.567 3.42 2.567a.75.75 0 001.093-.186l1.72-2.293a.75.75 0 00-.186-1.093l-3.42-3.822L20.656 7.894A.75.75 0 0021 7.264V5.5A1.5 1.5 0 0019.5 4h-12z" />
                    </svg>
                    <span className="font-semibold">
                      {currentReview.packageInfo.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Images */}
            {currentReview.images.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Photos from this trip
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentReview.images.map((img, index) => (
                    <div
                      key={img.id}
                      className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                        index === 0 && currentReview.images.length > 1
                          ? "col-span-2"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedImage(img.imageUrl);
                        setImageModalOpen(true);
                      }}
                    >
                      <img
                        src={img.imageUrl}
                        alt="Review"
                        className="w-full h-32 sm:h-40 object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                            <span className="text-xl">🔍</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reactions and Comments */}
          <div className="mt-8 space-y-6">
            {/* Reactions */}
            {currentReview.reactions.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Reactions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentReview.reactions.map((reaction) => (
                    <div
                      key={reaction.id}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors cursor-pointer"
                    >
                      {getReactionIcon(reaction.reactionType)}
                      <span className="text-sm font-medium">
                        {reaction.reactedByUsername}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {currentReview.comments.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  Comments ({currentReview.comments.length})
                </h4>
                <div className="space-y-3">
                  {currentReview.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800">
                              {comment.commentedBy.username}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.commentText}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        {activeReviews.length > 1 && (
          <>
            <button
              onClick={prevReview}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {activeReviews.length > 1 && (
          <div className="flex justify-center gap-2 pb-6">
            {activeReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
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
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
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
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
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
