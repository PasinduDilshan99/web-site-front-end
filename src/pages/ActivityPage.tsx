"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ActiveActivitiesType,
  ActivityFilters,
  ActivitySearchRequest,
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
import ActivityHeroSection from "@/components/activities-components/ActivityHeroSection";
import LinkBar from "@/components/common-components/linkBar/LinkBar";

// Define API response interface
interface ActivityListResponse {
  activityCount: number;
  activityResponseDtos: ActiveActivitiesType[];
}

interface PaginatedActivityResponse {
  code: number;
  status: string;
  message: string;
  data: ActivityListResponse | null;
  timestamp: string;
}

// Review types (keep existing review types)
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

export interface Reaction {
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [histories, setHistories] = useState<ActivityHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<ActivityHistoryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyImagesLoading, setHistoryImagesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(null);

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
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [totalActivities, setTotalActivities] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Search button state
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from initial data
  const [categories, setCategories] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [participantsOptions, setParticipantsOptions] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // Fetch filter options (initial data)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const requestBody: ActivitySearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        activityCategory: null,
        season: null,
        status: null,
        pageSize: 100, // Fetch more for filter options
        pageNumber: 1,
      };

      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result: PaginatedActivityResponse = await response.json();

      if (result.code === 200 && result.data) {
        // Extract unique values for filters
        const categoriesList = [...new Set(result.data.activityResponseDtos.map((activity) => activity.category_name))];
        const seasonsList = [
          ...new Set(
            result.data.activityResponseDtos.flatMap((activity) =>
              activity.season.split(",").map((s) => s.trim())
            )
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.activityResponseDtos.map((activity) => Math.ceil(activity.duration_hours))
          ),
        ].sort((a, b) => a - b);
        const participantsList = [
          ...new Set(result.data.activityResponseDtos.map((activity) => activity.max_participate)),
        ].sort((a, b) => a - b);
        const statusesList = [...new Set(result.data.activityResponseDtos.map((activity) => activity.status))];
        
        setCategories(categoriesList);
        setSeasons(seasonsList);
        setDurations(durationsList);
        setParticipantsOptions(participantsList);
        setStatuses(statusesList);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Fetch activities with filters - main API call function
  const fetchActivitiesWithFilters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Prepare API request
      const requestBody: ActivitySearchRequest = {
        name: filters.search || null,
        minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
        maxPrice: filters.priceRange[1] < 10000 ? filters.priceRange[1] : null,
        duration: filters.duration ? parseFloat(filters.duration) : null,
        activityCategory: filters.category || null,
        season: filters.season || null,
        status: filters.status || null,
        pageSize: itemsPerPage,
        pageNumber: currentPage,
      };

      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/activities/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result: PaginatedActivityResponse = await response.json();

      if (result.code === 200) {
        if (result.data) {
          setActivities(result.data.activityResponseDtos);
          setTotalActivities(result.data.activityCount);
          setTotalPages(Math.ceil(result.data.activityCount / itemsPerPage));
        } else {
          setActivities([]);
          setTotalActivities(0);
          setTotalPages(0);
        }
        setError(null);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // Initial data fetch - runs only once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchFilterOptions();
        await fetchActivitiesWithFilters();
        fetchReviews();
        fetchActivityHistory();
        fetchActivityHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    
    fetchInitialData();
  }, []); // Empty dependency array - runs only once on mount

  // Fetch activities when search is triggered
  useEffect(() => {
    if (searchTriggered) {
      setCurrentPage(1); // Reset to first page when search is triggered
      fetchActivitiesWithFilters();
      setSearchTriggered(false);
    }
  }, [searchTriggered, fetchActivitiesWithFilters]);

  // Fetch activities when page changes
  useEffect(() => {
    if (!isInitialLoad && currentPage > 0) {
      fetchActivitiesWithFilters();
    }
  }, [currentPage]); // Only depends on currentPage

  // Fetch activities when items per page changes
  useEffect(() => {
    if (!isInitialLoad) {
      setCurrentPage(1); // Reset to first page
      fetchActivitiesWithFilters();
    }
  }, [itemsPerPage]); // Only depends on itemsPerPage

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

  const handleFilterChange = (
    filterName: keyof ActivityFilters,
    value: unknown
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    // Do NOT trigger API call here - wait for search button click
  };

  const handleSearch = (): void => {
    setSearchTriggered(true);
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
    // Trigger search automatically after reset
    setSearchTriggered(true);
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
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchActivitiesWithFilters();
    fetchReviews();
    fetchActivityHistory();
    fetchActivityHistoryImages();
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
    // API call will be triggered by the useEffect that watches itemsPerPage
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
      <ActivityHeroSection />
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
          onSearch={handleSearch}
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
              {totalActivities} Activity
              {totalActivities !== 1 ? "s" : ""} Found
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
          {activities.length > 0 ? (
            <>
              <ActivitiesGrid
                activities={activities}
                displayCount={activities.length}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalActivities}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                  endIndex={Math.min(endIndex, totalActivities)}
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
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
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