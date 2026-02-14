// app/profile/package-reviews/page.tsx
"use client";
import UserProfilePackageReviewsLoading from "@/components/user-profile-components/Loadings/UserProfilePackageReviewsLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { PackageReview } from "@/types/user-profile";
import { USER_PROFILE_PACKAGE_REVIEWS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PackageReviewsPage() {
  const [packageReviews, setPackageReviews] = useState<PackageReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const apiService = new UserProfileAPIService();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_PACKAGE_REVIEWS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadPackageReviews();
  }, []);

  const loadPackageReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPackageReviews();
      setPackageReviews(response.data || []);
    } catch (error) {
      console.error("Failed to load package reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = packageReviews.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return review.status === "ACTIVE";
    if (activeFilter === "inactive") return review.status !== "ACTIVE";
    return true;
  });

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-5 h-5 ${
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
        <span className="text-base font-bold text-sky-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <UserProfilePackageReviewsLoading />;
  }

  const activeReviews = packageReviews.filter(
    (r) => r.status === "ACTIVE",
  ).length;
  const averageRating =
    packageReviews.length > 0
      ? (
          packageReviews.reduce((acc, review) => acc + review.rating, 0) /
          packageReviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Package Reviews
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Your reviews for travel packages and bundles
          </p>
        </div>

        {/* Stats Overview */}
        {packageReviews.length > 0 && (
          <div className="mb-6 md:mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-sky-100 p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-600">
                  {packageReviews.length}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Total Reviews
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">
                  {averageRating}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Avg Rating
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  {activeReviews}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Active
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {packageReviews.reduce(
                    (acc, review) => acc + (review.images?.length || 0),
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

        {/* Filter Tabs */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Reviews ({filteredReviews.length})
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-sky-200 hover:border-sky-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeFilter === "active"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-emerald-200 hover:border-emerald-300"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter("inactive")}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeFilter === "inactive"
                    ? "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-sky-400 text-5xl md:text-6xl mb-4">📦</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {activeFilter === "all"
                ? "No Package Reviews Yet"
                : `No ${activeFilter} Reviews`}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {activeFilter === "all"
                ? "You haven't reviewed any packages yet. Start sharing your experiences with travel packages!"
                : `No ${activeFilter} package reviews found. Try changing the filter.`}
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-md transition-all duration-300 font-medium">
              Write Your First Review
            </button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {filteredReviews.map((review) => (
              <div
                key={review.reviewId}
                className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 md:p-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 md:mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white text-lg md:text-xl">
                          📦
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1">
                            {review.name}
                          </h3>
                          <p className="text-sky-600 font-medium text-sm md:text-base line-clamp-1">
                            {review.description}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-gradient-to-r from-sky-50 to-teal-50 text-sky-800 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
                        {review.numberOfParticipate} participants
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          review.status === "ACTIVE"
                            ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border border-emerald-200"
                            : "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border border-gray-200"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4 md:mb-6">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                      {review.review}
                    </p>
                  </div>

                  {/* Images Gallery */}
                  {review.images && review.images.length > 0 && (
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 md:mb-3 flex items-center gap-2">
                        <span className="text-sky-500">📸</span>
                        Package Photos ({review.images.length})
                      </h4>
                      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
                        {review.images.map((image, index) => (
                          <div
                            key={image.id}
                            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-sky-50 to-teal-50 rounded-lg overflow-hidden border border-sky-100 group relative"
                          >
                            <img
                              src={image.imageUrl}
                              alt={`Package photo ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t border-sky-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                      <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-4 h-4 text-rose-500">❤️</span>
                          <span>{review.reactions?.length || 0} reactions</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span className="w-4 h-4 text-sky-500">💬</span>
                          <span>{review.comments?.length || 0} comments</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 text-xs md:text-sm text-gray-600">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-4 h-4 text-gray-500">📅</span>
                          <span>Reviewed {formatDate(review.createdAt)}</span>
                        </span>
                        <button className="text-sky-600 font-medium hover:text-sky-700 transition-colors">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredReviews.length > 5 && (
          <div className="mt-6 md:mt-8 text-center">
            <button className="px-6 py-3 bg-white text-sky-600 font-medium rounded-lg border border-sky-200 hover:border-sky-300 hover:shadow-sm transition-all duration-300">
              Load More Package Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
