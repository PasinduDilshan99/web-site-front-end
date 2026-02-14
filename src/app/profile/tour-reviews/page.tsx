// app/profile/tour-reviews/page.tsx
"use client";
import UserProfileTourReviewsLoading from "@/components/user-profile-components/Loadings/UserProfileTourReviewsLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { TourReview } from "@/types/user-profile";
import { USER_PROFILE_TOUR_REVIEWS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TourReviewsPage() {
  const [tourReviews, setTourReviews] = useState<TourReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "recent" | "top-rated"
  >("all");
  const apiService = new UserProfileAPIService();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_TOUR_REVIEWS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadTourReviews();
  }, []);

  const loadTourReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTourReviews();
      setTourReviews(response.data || []);
    } catch (error) {
      console.error("Failed to load tour reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = tourReviews.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "recent") {
      const reviewDate = new Date(review.reviewCreatedAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return reviewDate >= thirtyDaysAgo;
    }
    if (activeFilter === "top-rated") return review.rating >= 4;
    return true;
  });

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 md:w-5 md:h-5 ${
                star <= Math.floor(rating)
                  ? "text-amber-500 fill-current"
                  : star === Math.ceil(rating) && rating % 1 !== 0
                    ? "text-amber-500 fill-current"
                    : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-sky-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return <UserProfileTourReviewsLoading />;
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Tour Reviews
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Your reviews for tour experiences and adventures
          </p>
        </div>

        {/* Stats and Filter */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-800">
                  {tourReviews.length}
                </span>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-amber-500">★</span>
                    <span className="font-semibold">
                      {tourReviews.length > 0
                        ? (
                            tourReviews.reduce((acc, r) => acc + r.rating, 0) /
                            tourReviews.length
                          ).toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {tourReviews.reduce(
                      (acc, r) => acc + r.numberOfParticipate,
                      0,
                    )}{" "}
                    total participants
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Tour reviews across your travel history
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-sky-200 hover:border-sky-300"
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setActiveFilter("recent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "recent"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-blue-200 hover:border-blue-300"
                }`}
              >
                Recent (30d)
              </button>
              <button
                onClick={() => setActiveFilter("top-rated")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "top-rated"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-amber-200 hover:border-amber-300"
                }`}
              >
                Top Rated
              </button>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden flex items-center justify-between bg-white rounded-lg p-3 border border-sky-100 mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="text-amber-500">★</span>
                <span className="font-semibold">
                  {tourReviews.length > 0
                    ? (
                        tourReviews.reduce((acc, r) => acc + r.rating, 0) /
                        tourReviews.length
                      ).toFixed(1)
                    : "0.0"}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {tourReviews.reduce((acc, r) => acc + r.numberOfParticipate, 0)}{" "}
                participants
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-sky-400 text-5xl md:text-6xl mb-4">🚌</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {activeFilter === "all"
                ? "No Tour Reviews Yet"
                : "No Reviews Match Filter"}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto">
              {activeFilter === "all"
                ? "You haven't reviewed any tours yet. Share your travel experiences!"
                : `No ${activeFilter === "recent" ? "recent" : "top-rated"} tour reviews found.`}
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
              Browse Tours
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl hover:border-sky-200 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-5 md:p-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-gray-500">
                            {new Date(
                              review.reviewCreatedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                          {review.tourName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {review.reviewerName}
                        </p>
                      </div>
                      <span className="bg-gradient-to-r from-sky-50 to-teal-50 text-sky-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
                        {review.numberOfParticipate}{" "}
                        {review.numberOfParticipate === 1 ? "person" : "people"}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-4 line-clamp-3 text-sm md:text-base">
                      {review.review}
                    </p>

                    {/* Journey Route */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4 p-3 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg border border-sky-100">
                      <span className="font-medium truncate">
                        {review.startLocation}
                      </span>
                      <svg
                        className="w-4 h-4 text-sky-500 mx-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <span className="font-medium truncate">
                        {review.endLocation}
                      </span>
                    </div>

                    {/* Images Gallery */}
                    {review.images && review.images.length > 0 && (
                      <div className="mt-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
                          {review.images.map((image) => (
                            <div
                              key={image.imageId}
                              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-sky-50 to-teal-50 rounded-lg overflow-hidden border border-sky-100 group-hover:border-sky-200 transition-colors"
                            >
                              <img
                                src={image.imageUrl}
                                alt={image.imageName || "Tour image"}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-4 pt-4 border-t border-sky-50 flex justify-between items-center">
                      <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center space-x-1 transition-colors">
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4"
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
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <span className="w-4 h-4 text-rose-500">❤️</span>
                          <span>{0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-4 h-4 text-sky-500">💬</span>
                          <span>{0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredReviews.length > 8 && (
              <div className="mt-8 md:mt-12 text-center">
                <button className="px-6 py-3 bg-white text-sky-600 font-medium rounded-lg border border-sky-200 hover:border-sky-300 hover:shadow-md transition-all duration-300">
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}

        {/* Stats Summary */}
        {tourReviews.length > 0 && (
          <div className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
              Tour Review Insights
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <div className="text-2xl md:text-3xl font-bold text-sky-600">
                  {tourReviews.length}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Total Reviews
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">
                  {tourReviews.length > 0
                    ? (
                        tourReviews.reduce((acc, r) => acc + r.rating, 0) /
                        tourReviews.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Avg Rating
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                <div className="text-2xl md:text-3xl font-bold text-amber-600">
                  {tourReviews.reduce(
                    (acc, r) => acc + r.numberOfParticipate,
                    0,
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Participants
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {tourReviews.reduce(
                    (acc, r) => acc + (r.images?.length || 0),
                    0,
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Photos
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
