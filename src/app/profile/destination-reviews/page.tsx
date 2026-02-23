// app/profile/destination-reviews/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { DestinationReview } from "@/types/user-profile";
import { USER_PROFILE_TOUR_DESTINATION_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserProfileDestinationReviewsLoading from "@/components/user-profile-components/Loadings/UserProfileDestinationReviewsLoading";

export default function DestinationReviewsPage() {
  const [destinationReviews, setDestinationReviews] = useState<
    DestinationReview[]
  >([]);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_TOUR_DESTINATION_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadDestinationReviews();
  }, []);

  const loadDestinationReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDestinationReviews();
      setDestinationReviews(response.data || []);
    } catch (error) {
      console.error("Failed to load destination reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                star <= Math.floor(rating)
                  ? "text-amber-400 fill-current"
                  : star === Math.ceil(rating) && rating % 1 !== 0
                    ? "text-amber-400 fill-current"
                    : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return <UserProfileDestinationReviewsLoading />;
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-sky-50 via-white to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-700 to-teal-700 bg-clip-text text-transparent">
                Destination Reviews
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Your reviews and experiences at travel destinations
              </p>
            </div>

            {destinationReviews.length > 0 && (
              <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl px-4 py-2 sm:px-5 sm:py-3 border border-sky-200">
                <span className="text-sm sm:text-base font-semibold text-sky-800">
                  {destinationReviews.length} review
                  {destinationReviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {destinationReviews.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl sm:rounded-3xl shadow-lg border border-sky-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-r from-sky-100 to-teal-100 rounded-full flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🏝️</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              No Destination Reviews Yet
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              You haven&apos;t reviewed any destinations yet. Start exploring
              and share your experiences!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md">
              Explore Destinations
            </button>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-sky-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                      <span className="text-sky-600 text-lg sm:text-xl">
                        ⭐
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {(
                          destinationReviews.reduce(
                            (acc, review) => acc + review.reviewRating,
                            0,
                          ) / destinationReviews.length
                        ).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-teal-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                      <span className="text-teal-600 text-lg sm:text-xl">
                        💬
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Comments</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {destinationReviews.reduce(
                          (acc, review) => acc + (review.comments?.length || 0),
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-cyan-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-600 text-lg sm:text-xl">
                        ❤️
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Reactions</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {destinationReviews.reduce(
                          (acc, review) =>
                            acc + (review.reactions?.length || 0),
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {destinationReviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="group bg-white rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Review Header */}
                  <div className="p-5 sm:p-6 border-b border-sky-50">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate mb-1">
                          {review.destinationName}
                        </h3>
                        <StarRating rating={review.reviewRating} />
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        <span className="bg-gradient-to-r from-sky-50 to-teal-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-200">
                          {review.reactions?.length || 0} ❤️
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="p-5 sm:p-6">
                    <p className="text-gray-700 mb-4 sm:mb-5 line-clamp-3 text-sm sm:text-base leading-relaxed">
                      {review.reviewText}
                    </p>

                    {/* Images Gallery */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-4 sm:mb-5">
                        <p className="text-xs text-gray-500 mb-2">
                          Photos ({review.images.length})
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {review.images.slice(0, 3).map((image) => (
                            <div
                              key={image.imageId}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative"
                            >
                              <Image
                                src={image.imageUrl}
                                alt={image.imageName}
                                fill
                                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {review.images.length > 3 &&
                                image === review.images[2] && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                      +{review.images.length - 3}
                                    </span>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-5 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(review.reviewCreatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            review.reviewStatus === "Published"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : review.reviewStatus === "Pending"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {review.reviewStatus}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sky-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            {review.comments?.length || 0}
                          </span>
                        </div>

                        <button className="text-xs sm:text-sm font-medium bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent hover:from-sky-600 hover:to-teal-600 transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination/Footer */}
            {destinationReviews.length > 9 && (
              <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                        page === 1
                          ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white"
                          : "border border-sky-200 text-gray-700 hover:bg-sky-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
