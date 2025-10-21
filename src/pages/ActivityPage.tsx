"use client";
import React, { useState, useEffect } from "react";
import {
  ActiveActivitiesType,
  ActivityFilters,
} from "@/types/activities-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import ActivitiesGrid from "@/components/activities-components/ActivitiesGrid";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import FilterSection from "@/components/activities-components/FilterSection";
import ReviewsSection from "@/components/activities-components/ReviewsSection";

// Review types (move these to a types file if needed)
interface CommentReaction {
  commentReactionId: number;
  commentReactionCommentId: number;
  userId: number;
  userName: string;
  commentReactionType: string;
  commentReactionStatus: string;
  commentReactionCreatedBy: number;
  commentReactionCreatedAt: string;
}

interface Comment {
  commentId: number;
  commentReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number | null;
  comment: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

interface Reaction {
  reviewReactionId: number;
  reactionReviewId: number;
  userId: number;
  userName: string;
  reactionType: string;
  reviewReactionStatus: string;
  reactionCreatedAt: string;
}

interface ReviewImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
}

export interface Review {
  reviewId: number;
  activityScheduleId: number;
  activityId: number;
  activityName: string;
  reviewName: string;
  review: string;
  rating: number;
  description: string;
  reviewStatus: string;
  numberOfParticipate: number;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number | null;
  reviewUpdatedAt: string;
  images: ReviewImage[];
  reactions: Reaction[];
  comments: Comment[];
}

const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActiveActivitiesType[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<
    ActiveActivitiesType[]
  >([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState<ActivityFilters>({
    search: "",
    priceRange: [0, 10000],
    duration: "",
    category: "",
    season: "",
    participants: "",
    status: "",
  });

  // Extract unique values for filter options from actual data
  const categories = [
    ...new Set(activities.map((activity) => activity.category_name)),
  ];
  const seasons = [
    ...new Set(
      activities.flatMap((activity) =>
        activity.season.split(",").map((s) => s.trim())
      )
    ),
  ];
  const statuses = [...new Set(activities.map((activity) => activity.status))];

  // Duration options based on duration_hours
  const durations = [
    ...new Set(
      activities.map((activity) => Math.ceil(activity.duration_hours))
    ),
  ].sort((a, b) => a - b);

  // Participants options
  const participantsOptions = [
    ...new Set(activities.map((activity) => activity.max_participate)),
  ].sort((a, b) => a - b);

  useEffect(() => {
    fetchActivities();
    fetchReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, activities]);

  const fetchActivities = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/active"
      );
      const result = await response.json();

      if (result.code === 200) {
        setActivities(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/reviews"
      );
      const result = await response.json();

      if (result.code === 200) {
        setReviews(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setReviewsError(
        err instanceof Error ? err.message : "Failed to load reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  const applyFilters = (): void => {
    let filtered = [...activities];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.name.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower) ||
          activity.category_name.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter (using foreign price)
    filtered = filtered.filter((activity) => {
      return (
        activity.price_foreigners >= filters.priceRange[0] &&
        activity.price_foreigners <= filters.priceRange[1]
      );
    });

    // Duration filter
    if (filters.duration) {
      const durationHours = parseInt(filters.duration);
      filtered = filtered.filter(
        (activity) => Math.ceil(activity.duration_hours) === durationHours
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (activity) => activity.category_name === filters.category
      );
    }

    // Season filter
    if (filters.season) {
      filtered = filtered.filter((activity) =>
        activity.season
          .split(",")
          .map((s) => s.trim())
          .includes(filters.season)
      );
    }

    // Participants filter
    if (filters.participants) {
      const maxParticipants = parseInt(filters.participants);
      filtered = filtered.filter(
        (activity) => activity.max_participate <= maxParticipants
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(
        (activity) => activity.status === filters.status
      );
    }

    setFilteredActivities(filtered);
  };

  const handleFilterChange = (
    filterName: keyof ActivityFilters,
    value: any
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const resetFilters = (): void => {
    setFilters({
      search: "",
      priceRange: [0, 10000],
      duration: "",
      category: "",
      season: "",
      participants: "",
      status: "",
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchActivities();
  };

  if (loading) {
    return (
      <Loading message="Loading activities..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load activities"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <NavBar />
      <div className="mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 min-h-screen">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Adventure Activities
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exciting activities and experiences for your next adventure
          </p>
        </div>

        {/* Filters Section */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          categories={categories}
          seasons={seasons}
          durations={durations}
          participantsOptions={participantsOptions}
          statuses={statuses}
        />

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredActivities.length} Activity
              {filteredActivities.length !== 1 ? "s" : ""} Found
            </h3>
          </div>

          {/* Activities Grid */}
          {filteredActivities.length > 0 ? (
            <ActivitiesGrid
              activities={filteredActivities}
              displayCount={filteredActivities.length}
            />
          ) : (
            <NoResults onResetFilters={resetFilters} />
          )}
        </div>

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
        />
      </div>
      <Footer />
    </>
  );
};

export default ActivityPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-gray-500 text-lg mb-4">
      No activities found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);
