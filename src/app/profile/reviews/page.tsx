// app/profile/reviews/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { USER_PROFILE_REVIEWS_VIEW_PRIVILEGE } from "@/utils/privileges";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  ActivityReview,
  ReviewImage,
  ReviewReaction,
  ReviewComment,
  DestinationReview,
  PackageReview,
  TourReview,
} from "@/types/user-profile";
import UserProfileReviewsLoading from "@/components/user-profile-components/Loadings/UserProfileReviewsLoading";

interface DisplayReview {
  reviewId: number;
  reviewer: {
    id: number;
    username: string;
    fullName?: string;
    email?: string;
  };
  reviewDescription: string;
  rating: number;
  reviewStatus: string;
  reviewCreatedAt: string;
  tour?: {
    id: number;
    name: string;
    description?: string;
  };
  packageInfo?: {
    id: number;
    name: string;
    description?: string;
  };
  activity?: {
    id: number;
    name: string;
  };
  destination?: {
    id: number;
    name: string;
  };
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
  reviewType: "TOUR" | "ACTIVITY" | "DESTINATION" | "PACKAGE";
  numberOfParticipate?: number;
  scheduleName?: string;
}

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<DisplayReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    | "all"
    | "active"
    | "inactive"
    | "tour"
    | "package"
    | "activity"
    | "destination"
  >("all");
  const [apiService] = useState(() => new UserProfileAPIService());
  const [reviewCategories, setReviewCategories] = useState([
    {
      title: "Tour Reviews",
      description: "Your reviews for complete tour experiences",
      icon: "🚌",
      path: "/profile/tour-reviews",
      color: "from-sky-500 to-blue-600",
      count: 0,
    },
    {
      title: "Activity Reviews",
      description: "Your reviews for individual activities",
      icon: "🎯",
      path: "/profile/activity-reviews",
      color: "from-teal-500 to-emerald-600",
      count: 0,
    },
    {
      title: "Destination Reviews",
      description: "Your reviews for travel destinations",
      icon: "🏝️",
      path: "/profile/destination-reviews",
      color: "from-cyan-500 to-sky-600",
      count: 0,
    },
    {
      title: "Package Reviews",
      description: "Your reviews for travel packages",
      icon: "📦",
      path: "/profile/package-reviews",
      color: "from-blue-500 to-indigo-600",
      count: 0,
    },
  ]);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_REVIEWS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadAllReviews();
  }, []);

  const loadAllReviews = async () => {
    try {
      setLoading(true);

      // Fetch all review types in parallel
      const [
        tourReviewsResponse,
        activityReviewsResponse,
        destinationReviewsResponse,
        packageReviewsResponse,
      ] = await Promise.all([
        apiService.getTourReviews(),
        apiService.getActivityReviews(),
        apiService.getDestinationReviews(),
        apiService.getPackageReviews(),
      ]);

      const allReviewsData: DisplayReview[] = [];

      // Process tour reviews
      const tourReviews: DisplayReview[] = [];
      if (tourReviewsResponse?.data) {
        tourReviews.push(
          ...tourReviewsResponse.data.map((review: TourReview) => ({
            reviewId: review.reviewId,
            reviewer: {
              id: review.userId,
              username: review.reviewerName,
              fullName: review.userFullName,
              email: review.userEmail,
            },
            reviewDescription: review.reviewDescription || review.review,
            rating: review.rating,
            reviewStatus: review.reviewStatus,
            reviewCreatedAt: review.reviewCreatedAt,
            tour: {
              id: review.tourId,
              name: review.tourName,
              description: review.tourDescription,
            },
            images: review.images || [],
            reactions: [],
            comments: [],
            reviewType: "TOUR" as const,
            numberOfParticipate: review.numberOfParticipate,
            scheduleName: review.scheduleName,
          })),
        );
        allReviewsData.push(...tourReviews);
      }

      // Process activity reviews
      const activityReviews: DisplayReview[] = [];
      if (activityReviewsResponse?.data) {
        activityReviews.push(
          ...activityReviewsResponse.data.map((review: ActivityReview) => ({
            reviewId: review.reviewId,
            reviewer: {
              id: review.reviewCreatedBy,
              username: review.reviewName || "Anonymous",
              fullName: review.reviewName || "Anonymous",
            },
            reviewDescription: review.description || review.review,
            rating: review.rating,
            reviewStatus: review.reviewStatus,
            reviewCreatedAt: review.reviewCreatedAt,
            activity: {
              id: review.activityId,
              name: review.activityName,
            },
            images: review.images || [],
            reactions: review.reactions || [],
            comments: review.comments || [],
            reviewType: "ACTIVITY" as const,
            numberOfParticipate: review.numberOfParticipate,
          })),
        );
        allReviewsData.push(...activityReviews);
      }

      // Process destination reviews
      const destinationReviews: DisplayReview[] = [];
      if (destinationReviewsResponse?.data) {
        destinationReviews.push(
          ...destinationReviewsResponse.data.map(
            (review: DestinationReview) => ({
              reviewId: review.reviewId,
              reviewer: {
                id: review.reviewUserId,
                username: review.reviewUserName,
                fullName: review.reviewUserName,
              },
              reviewDescription: review.reviewText,
              rating: review.reviewRating,
              reviewStatus: review.reviewStatus,
              reviewCreatedAt: review.reviewCreatedAt,
              destination: {
                id: review.destinationId,
                name: review.destinationName,
              },
              images: review.images || [],
              reactions: review.reactions || [],
              comments: review.comments || [],
              reviewType: "DESTINATION" as const,
            }),
          ),
        );
        allReviewsData.push(...destinationReviews);
      }

      // Process package reviews
      const packageReviews: DisplayReview[] = [];
      if (packageReviewsResponse?.data) {
        packageReviews.push(
          ...packageReviewsResponse.data.map((review: PackageReview) => ({
            reviewId: review.reviewId,
            reviewer: {
              id: review.createdBy,
              username: review.name || "Anonymous",
              fullName: review.name || "Anonymous",
            },
            reviewDescription: review.description || review.review,
            rating: review.rating,
            reviewStatus: review.status,
            reviewCreatedAt: review.createdAt,
            packageInfo: {
              id: review.packageId,
              name: review.name,
            },
            images: review.images || [],
            reactions: review.reactions || [],
            comments: review.comments || [],
            reviewType: "PACKAGE" as const,
            numberOfParticipate: review.numberOfParticipate,
          })),
        );
        allReviewsData.push(...packageReviews);
      }

      setAllReviews(allReviewsData);

      // Update review categories with counts
      setReviewCategories((prev) =>
        prev.map((category) => {
          if (category.title === "Tour Reviews") {
            return { ...category, count: tourReviews.length };
          }
          if (category.title === "Activity Reviews") {
            return { ...category, count: activityReviews.length };
          }
          if (category.title === "Destination Reviews") {
            return { ...category, count: destinationReviews.length };
          }
          if (category.title === "Package Reviews") {
            return { ...category, count: packageReviews.length };
          }
          return category;
        }),
      );
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = allReviews.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return review.reviewStatus === "ACTIVE";
    if (activeFilter === "inactive") return review.reviewStatus !== "ACTIVE";
    if (activeFilter === "tour") return review.reviewType === "TOUR";
    if (activeFilter === "package") return review.reviewType === "PACKAGE";
    if (activeFilter === "activity") return review.reviewType === "ACTIVITY";
    if (activeFilter === "destination")
      return review.reviewType === "DESTINATION";
    return true;
  });

  // Helper functions to get counts
  const getTourReviewsCount = () =>
    allReviews.filter((r) => r.reviewType === "TOUR").length;
  const getActivityReviewsCount = () =>
    allReviews.filter((r) => r.reviewType === "ACTIVITY").length;
  const getDestinationReviewsCount = () =>
    allReviews.filter((r) => r.reviewType === "DESTINATION").length;
  const getPackageReviewsCount = () =>
    allReviews.filter((r) => r.reviewType === "PACKAGE").length;
  const getActiveReviewsCount = () =>
    allReviews.filter((r) => r.reviewStatus === "ACTIVE").length;
  const getInactiveReviewsCount = () =>
    allReviews.filter((r) => r.reviewStatus !== "ACTIVE").length;

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
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

  const ReviewCard = ({ review }: { review: DisplayReview }) => {
    const getReviewTypeBadge = () => {
      switch (review.reviewType) {
        case "TOUR":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-sky-50 to-sky-100 text-sky-800 border border-sky-200 font-medium">
              <span className="mr-1">🚌</span>
              <span>Tour</span>
            </span>
          );
        case "ACTIVITY":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 border border-teal-200 font-medium">
              <span className="mr-1">🎯</span>
              <span>Activity</span>
            </span>
          );
        case "DESTINATION":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800 border border-cyan-200 font-medium">
              <span className="mr-1">🏝️</span>
              <span>Destination</span>
            </span>
          );
        case "PACKAGE":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-800 border border-blue-200 font-medium">
              <span className="mr-1">📦</span>
              <span>Package</span>
            </span>
          );
        default:
          return null;
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 transition-all duration-300 p-4 md:p-5 h-full">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="mb-4 flex-1">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-1">
                    {review.reviewer.username}
                  </h3>
                  {getReviewTypeBadge()}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-gray-500">
                    {new Date(review.reviewCreatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {review.reviewDescription}
                </p>
              </div>
            </div>

            {/* Entity Info */}
            <div className="flex flex-wrap gap-2 mb-3">
              {review.tour && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-sky-50 to-sky-100 text-sky-800 border border-sky-200 font-medium">
                  <span className="mr-1">🚌</span>
                  <span className="truncate max-w-[120px]">
                    {review.tour.name}
                  </span>
                </span>
              )}
              {review.activity && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 border border-teal-200 font-medium">
                  <span className="mr-1">🎯</span>
                  <span className="truncate max-w-[120px]">
                    {review.activity.name}
                  </span>
                </span>
              )}
              {review.destination && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800 border border-cyan-200 font-medium">
                  <span className="mr-1">🏝️</span>
                  <span className="truncate max-w-[120px]">
                    {review.destination.name}
                  </span>
                </span>
              )}
              {review.packageInfo && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-800 border border-blue-200 font-medium">
                  <span className="mr-1">📦</span>
                  <span className="truncate max-w-[120px]">
                    {review.packageInfo.name}
                  </span>
                </span>
              )}
              {review.numberOfParticipate && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200 font-medium">
                  <span className="mr-1">👥</span>
                  <span>{review.numberOfParticipate}</span>
                </span>
              )}
            </div>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
                {review.images.slice(0, 3).map((image) => (
                  <div
                    key={image.imageId}
                    className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-sky-50 to-teal-50 rounded-lg overflow-hidden border border-sky-100"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.imageName || "Review"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://via.placeholder.com/150/93c5fd/1e3a8a?text=Review+${review.reviewId}`;
                      }}
                    />
                  </div>
                ))}
                {review.images.length > 3 && (
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-sky-100 to-teal-100 rounded-lg flex items-center justify-center border border-sky-200">
                    <span className="text-sky-700 font-bold text-sm">
                      +{review.images.length - 3}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="pt-3 border-t border-sky-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <span className="flex items-center space-x-1">
                  <span className="w-4 h-4 text-rose-500">❤️</span>
                  <span>{review.reactions?.length || 0}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-4 h-4 text-sky-500">💬</span>
                  <span>{review.comments?.length || 0}</span>
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  review.reviewStatus === "ACTIVE"
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border border-emerald-200"
                    : "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border border-gray-200"
                }`}
              >
                {review.reviewStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <UserProfileReviewsLoading />;
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            My Reviews
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Manage and view all your travel reviews in one place
          </p>
        </div>

        {/* Review Categories - Responsive Grid */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
            Review Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {reviewCategories.map((type) => (
              <Link
                key={type.title}
                href={type.path}
                className="block group transform transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${type.color} rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl text-white flex-shrink-0`}
                      >
                        {type.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 truncate">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-sky-600 font-semibold text-sm md:text-base group-hover:text-sky-700 transition-colors flex items-center">
                        View Reviews
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                      </span>
                      <span className="bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 text-xs md:text-sm font-semibold px-2.5 py-1 rounded-full">
                        {type.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filter Tabs and Stats */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                All Reviews ({filteredReviews.length})
              </h2>
              <p className="text-gray-600 text-sm">
                Filter and manage your review collection
              </p>
            </div>

            {/* Filter Buttons - Updated with all options */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                All ({allReviews.length})
              </button>
              <button
                onClick={() => setActiveFilter("tour")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "tour"
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                Tour ({getTourReviewsCount()})
              </button>
              <button
                onClick={() => setActiveFilter("package")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "package"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                Package ({getPackageReviewsCount()})
              </button>
              <button
                onClick={() => setActiveFilter("activity")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "activity"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-teal-200 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                Activity ({getActivityReviewsCount()})
              </button>
              <button
                onClick={() => setActiveFilter("destination")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "destination"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50"
                }`}
              >
                Destination ({getDestinationReviewsCount()})
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "active"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                Active ({getActiveReviewsCount()})
              </button>
              <button
                onClick={() => setActiveFilter("inactive")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === "inactive"
                    ? "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                Inactive ({getInactiveReviewsCount()})
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-sky-400 text-5xl md:text-6xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              No Reviews Found
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto">
              {activeFilter === "all"
                ? "You haven't written any reviews yet. Start sharing your travel experiences!"
                : `No ${activeFilter} reviews found. Try changing the filter.`}
            </p>
            <button
              onClick={() => router.push("/reviews/create")}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Start Reviewing
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredReviews.map((review) => (
                <ReviewCard
                  key={`${review.reviewType}-${review.reviewId}`}
                  review={review}
                />
              ))}
            </div>

            {/* Load More Button */}
            {filteredReviews.length > 12 && (
              <div className="mt-8 md:mt-12 text-center">
                <button className="px-6 py-3 bg-white text-sky-600 font-medium rounded-lg border border-sky-200 hover:border-sky-300 hover:shadow-md transition-all duration-300">
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}

        {/* Quick Stats - Only show if there are reviews */}
        {allReviews.length > 0 && (
          <div className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
              Review Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <div className="text-2xl md:text-3xl font-bold text-sky-600">
                  {allReviews.length}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Total Reviews
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">
                  {(
                    allReviews.reduce((acc, review) => acc + review.rating, 0) /
                    allReviews.length
                  ).toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Avg Rating
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg border border-emerald-200">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  {getActiveReviewsCount()}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Active
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {allReviews.reduce(
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
      </div>
    </div>
  );
}
