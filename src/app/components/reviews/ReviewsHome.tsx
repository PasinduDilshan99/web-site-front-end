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
        className={`w-5 h-5 ${
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
    const type = reactionType.trim().toLowerCase(); // normalize

    switch (type) {
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
      <div className="flex items-center justify-center h-[500px] bg-white rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-white rounded-lg border border-gray-200">
        <div className="text-center p-8">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium">{error}</p>
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
      <div className="flex items-center justify-center h-[500px] bg-white rounded-lg border border-gray-200">
        <div className="text-center p-8">
          <p className="text-gray-600">No reviews available yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Be the first to leave a review!
          </p>
        </div>
      </div>
    );
  }

  const currentReview = activeReviews[currentIndex];
  const currentImage = currentReview.images[currentImageIndex];

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-r from-purple-100 to-amber-100">
      <div className="relative bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[500px] flex flex-col">
        {/* Header - Fixed height */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                REVIEWS
              </h2>
              <p className="text-gray-500 text-sm">
                What our travelers are saying
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isAutoPlaying ? (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {currentIndex + 1} / {activeReviews.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - Split layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Image Carousel */}
          {currentReview.images.length > 0 && (
            <div className="w-2/5 border-r border-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full max-w-md max-h-80">
                  <img
                    src={currentImage?.imageUrl}
                    alt="Review"
                    className="w-full h-full object-contain rounded-lg"
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                      </button>

                      {/* Image Pagination Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {currentReview.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "bg-blue-600 w-4"
                                : "bg-white/80 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {currentReview.images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {currentReview.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto pb-2">
                  {currentReview.images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "border-blue-500 scale-110"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img.imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right Side - Review Details */}
          <div
            className={`${
              currentReview.images.length > 0 ? "w-3/5" : "w-full"
            } p-6`}
          >
            <div className="h-full flex flex-col justify-between">
              {/* Top Section - Review Content */}
              <div className="space-y-4">
                {/* Review Text */}
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-3">
                    {renderStars(currentReview.rating)}
                  </div>
                  <blockquote className="text-lg text-gray-800 italic leading-relaxed line-clamp-4">
                    "{currentReview.reviewDescription}"
                  </blockquote>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center justify-center gap-3">
                  <div className="relative">
                    {currentReview.reviewer.avatarUrl ? (
                      <img
                        src={currentReview.reviewer.avatarUrl}
                        alt={currentReview.reviewer.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white shadow-sm">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {currentReview.reviewer.firstName &&
                      currentReview.reviewer.lastName
                        ? `${currentReview.reviewer.firstName} ${currentReview.reviewer.lastName}`
                        : currentReview.reviewer.username}
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

                {/* Tour/Package Info */}
                {(currentReview.tour || currentReview.packageInfo) && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentReview.tour && (
                      <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>{currentReview.tour.name}</span>
                      </div>
                    )}
                    {currentReview.packageInfo && (
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M7.5 4A1.5 1.5 0 006 5.5v1.764a.75.75 0 00.344.63l4.606 3.004L7.53 14.72a.75.75 0 00-.186 1.093l1.72 2.293a.75.75 0 001.093.186l3.42-2.567 3.42 2.567a.75.75 0 001.093-.186l1.72-2.293a.75.75 0 00-.186-1.093l-3.42-3.822L20.656 7.894A.75.75 0 0021 7.264V5.5A1.5 1.5 0 0019.5 4h-12z" />
                        </svg>
                        <span>{currentReview.packageInfo.name}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Section - Reactions and Comments */}
              {(currentReview.reactions.length > 0 ||
                currentReview.comments.length > 0) && (
                <div className="border-t border-gray-200 pt-4 space-y-4 flex flex-col md:flex-row md:justify-between">
                  {/* Reactions */}
                  {currentReview.reactions.length > 0 && (
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Reactions
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {/* Group reactions by type */}
                        {Object.entries(
                          currentReview.reactions.reduce((acc, reaction) => {
                            acc[reaction.reactionType] =
                              (acc[reaction.reactionType] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([reactionType, count]) => (
                          <div
                            key={reactionType}
                            className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1 rounded-lg text-sm cursor-pointer"
                            title={`${count} ${reactionType}${
                              count > 1 ? "s" : ""
                            }`}
                          >
                            {getReactionIcon(reactionType)}
                            <span className="text-gray-700 font-medium">
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  {currentReview.comments.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 md:mt-0 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>
                      <span>
                        {currentReview.comments.length} comment
                        {currentReview.comments.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Navigation Controls */}
        {activeReviews.length > 1 && (
          <>
            <button
              onClick={prevReview}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-300 border border-gray-200 z-10"
            >
              <svg
                className="w-4 h-4 text-gray-600"
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
          <div className="flex justify-center gap-1 pb-4 flex-shrink-0">
            {activeReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-4"
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
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold transition-colors"
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
