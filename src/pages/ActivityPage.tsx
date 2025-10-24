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
import ActivityHistorySection, {
  ActivityHistory,
  ActivityHistoryImage,
} from "@/components/activities-components/ActivityHistorySection";
import ActivityHistoryGallery from "@/components/activities-components/ActivityHistoryGallery";

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
  const [histories, setHistories] = useState<ActivityHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<ActivityHistoryImage[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6); // Default for mobile

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
    fetchActivityHistory(); // Add this call
    fetchActivityHistoryImages();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, activities]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 768) {
          setItemsPerPage(6); // Mobile
        } else if (width < 1024) {
          setItemsPerPage(8); // Tablet
        } else if (width < 1280) {
          setItemsPerPage(9); // Laptop
        } else if (width < 1536) {
          setItemsPerPage(12); // PC
        } else {
          setItemsPerPage(16); // Large screens
        }
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  const fetchActivityHistoryImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/history-images"
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistoryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryImagesError(
        err instanceof Error ? err.message : "Failed to load activity images"
      );
    } finally {
      setHistoryImagesLoading(false);
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

  const fetchActivityHistory = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/history"
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistories(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error ? err.message : "Failed to load activity history"
      );
    } finally {
      setHistoryLoading(false);
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
    setReviewsError(null);
    setHistoryError(null);
    setHistoryImagesError(null);
    setLoading(true);
    setReviewsLoading(true);
    setHistoryLoading(true);
    setHistoryImagesLoading(true);
    fetchActivities();
    fetchReviews();
    fetchActivityHistory();
    fetchActivityHistoryImages();
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
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
        <div id="results-section" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredActivities.length} Activity
              {filteredActivities.length !== 1 ? "s" : ""} Found
            </h3>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
              </select>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                per page
              </span>
            </div>
          </div>

          {/* Activities Grid */}
          {currentActivities.length > 0 ? (
            <>
              <ActivitiesGrid
                activities={currentActivities}
                displayCount={currentActivities.length}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredActivities.length}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                  endIndex={Math.min(endIndex, filteredActivities.length)}
                />
              )}
            </>
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
        <ActivityHistorySection
          histories={histories}
          loading={historyLoading}
          error={historyError}
          onRetry={fetchActivityHistory}
        />
        <ActivityHistoryGallery
          imagesData={historyImages}
          loading={historyImagesLoading}
          error={historyImagesError}
          onRetry={fetchActivityHistoryImages}
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

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Showing {startIndex + 1} to {endIndex} of {totalItems} results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === page
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
