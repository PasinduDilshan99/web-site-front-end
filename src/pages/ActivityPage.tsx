"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import ActivitiesGrid from "@/components/activities-components/ActivitiesGrid";
import FilterSection from "@/components/activities-components/FilterSection";
import ReviewsSection from "@/components/activities-components/ReviewsSection";
import ActivityHistorySection from "@/components/activities-components/ActivityHistorySection";
import ActivityHistoryGallery from "@/components/activities-components/ActivityHistoryGallery";
import {
  ActiveActivitiesType,
  ActivityFilters,
  ActivityHistory,
  ActivityHistoryImage,
  Review,
} from "@/types/activity-types";
import { ActivityService } from "@/services/activityService";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import ActivitiesLoading from "@/components/activities-components/ActivitiesLoading";
import { useCommon } from "@/context/CommonContext";
import ActivitiesLoadingError from "@/components/activities-components/ActivitiesLoadingError";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: ActivityFilters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.duration) params.set("duration", filters.duration.toString());
  if (filters.season) params.set("season", filters.season);
  if (filters.participants)
    params.set("participants", filters.participants.toString());
  if (filters.status) params.set("status", filters.status);

  // Price range - only add if not default values
  if (filters.priceRange[0] > 0)
    params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange[1] < 10000)
    params.set("maxPrice", filters.priceRange[1].toString());

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): ActivityFilters => {
  return {
    search: params.get("search") || "",
    category: params.get("category") || "",
    duration: params.get("duration") || "",
    season: params.get("season") || "",
    participants: params.get("participants") || "",
    status: params.get("status") || "",
    priceRange: [
      Number(params.get("minPrice")) || 0,
      Number(params.get("maxPrice")) || 10000,
    ],
  };
};

const urlParamsToPagination = (
  params: URLSearchParams,
): { page: number; pageSize: number } => {
  return {
    page: Number(params.get("page")) || 1,
    pageSize: Number(params.get("pageSize")) || 12,
  };
};

// Main component wrapped with Suspense for useSearchParams
const ActivityPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activities, setActivities] = useState<ActiveActivitiesType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [histories, setHistories] = useState<ActivityHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<ActivityHistoryImage[]>(
    [],
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
    null,
  );

  // Use the common context
  const { categories, loading: categoriesLoading } = useCommon();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<ActivityFilters>(() =>
    urlParamsToFilters(new URLSearchParams(searchParams?.toString())),
  );

  // Pagination states from URL params
  const [currentPage, setCurrentPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString())).page,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString()))
        .pageSize,
  );

  const [totalActivities, setTotalActivities] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from context and service
  const [activityCategories, setActivityCategories] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [participantsOptions, setParticipantsOptions] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // Transform context data into activity categories
  useEffect(() => {
    if (categories) {
      const categoryNames = categories.activityCategoryList.map(
        (cat) => cat.activityCategoryName,
      );
      setActivityCategories(categoryNames);
    }
  }, [categories]);

  // Fetch filter options
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const {
        seasons: seasonsList,
        durations: durationsList,
        participantsOptions: participantsList,
        statuses: statusesList,
        error,
      } = await ActivityService.fetchFilterOptions();

      if (error) {
        console.error("Error fetching filter options:", error);
      } else {
        setSeasons(seasonsList);
        setDurations(durationsList);
        setParticipantsOptions(participantsList);
        setStatuses(statusesList);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: ActivityFilters, page: number, pageSize: number) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Fetch activities with filters - main API call function
  const fetchActivitiesWithFilters = useCallback(
    async (
      filterValues: ActivityFilters,
      page: number,
      pageSize: number,
    ): Promise<void> => {
      try {
        setLoading(true);

        // Prepare API request using service helper
        const requestBody = ActivityService.buildSearchRequest(filterValues);

        const {
          activities: fetchedActivities,
          totalActivities: total,
          error,
        } = await ActivityService.fetchActivitiesWithFilters(
          requestBody,
          pageSize,
          page,
        );

        if (error) {
          setError(error);
        } else {
          setActivities(fetchedActivities);
          setTotalActivities(total);
          setTotalPages(Math.ceil(total / pageSize));
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [],
  );

  // Initial data fetch - runs once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchFilterOptions();
        await fetchActivitiesWithFilters(filters, currentPage, itemsPerPage);

        // Uncomment these if needed
        // await fetchReviews();
        // await fetchActivityHistory();
        // await fetchActivityHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array - runs only once on mount

  // Watch for URL params changes and fetch data
  useEffect(() => {
    if (!isInitialLoad) {
      const urlFilters = urlParamsToFilters(
        new URLSearchParams(searchParams?.toString()),
      );
      const { page, pageSize } = urlParamsToPagination(
        new URLSearchParams(searchParams?.toString()),
      );

      setFilters(urlFilters);
      setCurrentPage(page);
      setItemsPerPage(pageSize);

      fetchActivitiesWithFilters(urlFilters, page, pageSize);
    }
  }, [searchParams]); // Only depend on searchParams

  const handleFilterChange = (
    filterName: keyof ActivityFilters,
    value: unknown,
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = (): void => {
    // Reset to page 1 and update URL
    updateUrlParams(filters, 1, itemsPerPage);
  };

  const resetFilters = (): void => {
    const resetFilterValues = {
      search: "",
      priceRange: [0, 10000] as [number, number], // Explicitly cast as tuple
      duration: "",
      category: "",
      season: "",
      participants: "",
      status: "",
    };

    setFilters(resetFilterValues);
    // Update URL with reset filters and page 1
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
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
    fetchActivitiesWithFilters(filters, currentPage, itemsPerPage);
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    updateUrlParams(filters, page, itemsPerPage);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    updateUrlParams(filters, 1, value); // Reset to page 1 when changing items per page
  };

  if (loading || categoriesLoading) {
    return <ActivitiesLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <ActivitiesLoadingError
        onRetry={handleRetry}
        message="Couldn't fetch activities."
      />
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 min-h-screen">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Activities"
          description="Discover exciting activities and experiences for your next adventure"
          fromColor="#A855F7"
          toColor="#F59E0B"
        />
      </div>

      {/* Filters Section */}
      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onResetFilters={resetFilters}
        categories={activityCategories}
        seasons={seasons}
        durations={durations}
        participantsOptions={participantsOptions}
        statuses={statuses}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-row items-center justify-between gap-3 mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-900 leading-tight">
            {totalActivities} Activity{totalActivities !== 1 ? "s" : ""} Found
          </h3>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-2 sm:gap-3 bg-sky-50 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-sky-200">
            <label
              htmlFor="itemsPerPage"
              className="text-xs sm:text-sm font-medium text-sky-800 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer border border-sky-300 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-sky-700 transition-all duration-200 hover:border-sky-400"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
            <span className="hidden xs:inline text-xs sm:text-sm text-sky-600 whitespace-nowrap font-medium">
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

      {/* Optional Sections - Uncomment if needed */}
      {/* <ReviewsSection
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
      /> */}
      {/* <ActivityHistorySection
        histories={histories}
        loading={historyLoading}
        error={historyError}
        onRetry={fetchActivityHistory}
      /> */}
      {/* <ActivityHistoryGallery
        imagesData={historyImages}
        loading={historyImagesLoading}
        error={historyImagesError}
        onRetry={fetchActivityHistoryImages}
      /> */}
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const ActivityPage: React.FC = () => {
  return (
    <Suspense fallback={<ActivitiesLoading itemsPerPage={12} />}>
      <ActivityPageContent />
    </Suspense>
  );
};

export default ActivityPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-sky-600 text-lg mb-4">
      No activities found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
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
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-between gap-3 mt-8 pt-6 border-t border-sky-200 sm:flex-row">
  
  {/* Results count */}
  <div className="text-xs sm:text-sm text-sky-600 font-medium order-2 sm:order-1">
    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
  </div>

  {/* Pagination controls */}
  <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
    
    {/* Previous */}
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="cursor-pointer px-2.5 sm:px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1.5"
      aria-label="Previous page"
    >
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="hidden sm:inline">Previous</span>
    </button>

    {/* Page numbers */}
    <div className="flex items-center gap-1">
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 sm:w-10 text-center py-2 text-xs sm:text-sm font-medium text-sky-400"
            >
              …
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
              currentPage === page
                ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg scale-105"
                : "text-sky-700 bg-white border-2 border-sky-300 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 hover:shadow-md"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}
    </div>

    {/* Next */}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="cursor-pointer px-2.5 sm:px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1.5"
      aria-label="Next page"
    >
      <span className="hidden sm:inline">Next</span>
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

  </div>
</div>
  );
};
